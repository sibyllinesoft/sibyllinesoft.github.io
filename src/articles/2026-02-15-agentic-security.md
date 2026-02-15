---
title: "The Pillars of Agentic Security"
description: "A quick primer on securing autonomous agents"
date: 2026-02-15
published: true
tags:
  - articles
  - agents
  - security
layout: article.njk
image: "/img/optimized/article-agent-security.webp"
---

Until recently, most agents operated in controlled environments. Coding agents run in monitored sessions with limited autonomy, and the untrusted data they encounter mostly arrives through web search tools where providers handle some basic input sanitization. Prompt injection has been a known problem, but it hasn't been top of mind for most builders because the attack surface was small and the autonomy was constrained.

OpenClaw is a preview of where things are headed, an always-on agent with access to your email, filesystem, shell, and messaging platforms, pulling in community-contributed skills with minimal vetting. It's not the thing most organizations will deploy, but it's a map of the attack surface that the next generation of agentic products will share: broad access, persistent autonomy, and heavy reliance on untrusted external data.

When that agentic footprint hits critical mass, the open web becomes a target. Prompt injections in the wild are rare right now because there aren't enough autonomous agents processing web content to make poisoning it worthwhile. That's about to change, and the defenders need to be ready before the attackers finish ramping up.

The good news is that securing agents isn't fundamentally different from securing any other system. The same principles that protect your infrastructure for human users (input sanitization, policy enforcement, and isolation) work for agents too, with a few adjustments for the ways agents differ from people.

## Sanitization

To agents, the only thing that distinguishes instructions and data is inferred intent. Because inference has a random element and reinforcement learning generalizes poorly, there will always be sequences capable of steering the model into insecure behavior.

> **Aside: The instruction-data confusion problem**
>
> This framing comes from Greshake et al.'s 2023 paper ["Not What You've Signed Up For"](https://arxiv.org/abs/2302.12173), which coined *indirect prompt injection*. When LLMs process retrieved content (web pages, documents, emails), they can't reliably tell data from instructions, so anyone who controls data the LLM retrieves can effectively control its behavior. Most subsequent research builds on this taxonomy.

In theory, as these models get better, the number of sequences will decrease. The problem is that the sequence space is quite large and architectural changes are likely to cause regressions in alignment. There's always going to be gaps that a sufficiently dedicated attacker will be able to leverage to inject behavior into even the most advanced frontier models.

The frontier labs will align away common attack vectors as they appear, but shipping new models is a slow process. You need to be able to react to "zero day" injections immediately. Sanitization is your first line of defense, and should be applied to all untrusted input.

There are a few preprocessing steps I've found to make sanitization easier:

* Convert everything to bare markdown if possible. Document layout elements can embed instruction fragments invisibly in a way that's hard to detect; it's much easier to strip them out entirely.
* Normalize glyphs and strip extended unicode characters. Injections frequently use [homoglyphs](https://mindgard.ai/blog/outsmarting-ai-guardrails-with-invisible-characters-and-adversarial-prompts) and [zero-width characters](https://www.promptfoo.dev/blog/invisible-unicode-threats/) to dodge alignment.

> **Aside: How invisible characters break guardrails**
>
> Unicode is a rich attack surface. Zero-width spaces (U+200B), joiners (U+200D), bidirectional overrides (U+202E), and variation selectors can alter how an LLM tokenizes input while staying invisible to humans. [Hackett et al.](https://arxiv.org/html/2504.11168v2) tested twelve injection techniques against six major guardrail systems: emoji smuggling achieved 100% evasion across all of them, bidirectional text hit 79–90%, and even basic homoglyph substitution evaded 44–76%. A [separate study](https://arxiv.org/html/2508.14070v1) found encoding-based attacks (Base64, hex) succeeded 64–67% of the time. The fix is straightforward: NFC/NFKC normalization, strip zero-width and control characters, detect mixed-script anomalies.

From there I strongly recommend you implement some sort of prompt injection detection and mitigation to ensure harmful instructions are blocked or redacted. There are a variety of algorithms you can use. They roughly segment into classical ML and transformer-based families.

Transformer-based methods are more powerful, but they're computationally expensive. Classical ML methods can get 80% of the results for less than 1% of the computation, so it's often a good idea to use them by default and reserve the big guns for the most untrusted content and privileged agents.

> **Aside: Prompt injection detection tools**
>
> On the transformer side, the most adopted open-source detector is [ProtectAI's DeBERTa-v3 model](https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2), a fine-tuned DeBERTa-v3-base that classifies inputs as benign or injection (F1 0.9998, Apache-licensed, ONNX support). For a training-free alternative, [Attention Tracker](https://arxiv.org/abs/2411.00348) detects injections by monitoring attention head shifts, getting up to 10% AUROC improvement without additional LLM inference.
>
> On the classical side: perplexity-based detection, known-answer verification, and embedding similarity against known patterns. My library [Clean](https://github.com/sibyllinesoft/clean) layers regex extraction, fuzzy motif matching, and CRF sequence labeling with built-in input sanitization, running in single-digit milliseconds on CPU.
>
>[Liu et al. (USENIX Security 2024)](https://www.usenix.org/system/files/usenixsecurity24-liu-yupei.pdf) provides the most comprehensive benchmark of both families. The [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) lists prompt injection as LLM01. One blind spot across both families: many detectors train primarily on English and fall over on mixed-language injections. Clean supports 13 languages.

## Policy

With swarms of agents acting on behalf of people, controlling who has access and what they can do is something everyone building software needs to care about. At the same time, agents break old security models, because they should clearly inherit some context from their user, but they should also be treated distinctly.

Rather than re-invent the wheel here, I suggest leveraging pre-existing tools. [OPA](https://www.openpolicyagent.org/)/Rego is flexible enough to manage policy for heterogeneous agentic systems, it has tooling and libraries for a variety of languages, it's battle tested and agents understand it. Think of OPA like the React of the policy world; it's a safe, well-trodden path that you probably shouldn't deviate from without a good reason.

> **Aside: OPA in the agentic context**
>
> OPA is a CNCF Graduated project using Rego to define policies as code. For agents, the value is that calls need conditional logic on identity, message context, call chains, and parameters, not just "who can call this API" checks. Rego can express rules like "this agent can execute trades under $10,000 without approval, but anything over requires human confirmation" in an auditable, version-controlled, testable way. It integrates with Envoy's ext_authz API, so you can enforce at the network layer rather than in the harness.
>
> One thing to watch: in August 2025, Apple hired the core OPA maintainers with [plans to sunset Styra's enterprise offerings](https://www.osohq.com/learn/opa-vs-cedar-vs-zanzibar). OPA stays open source, but if you need commercial support, look at [AWS Cedar](https://www.cedarpolicy.com/) or [Zanzibar](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/)-based systems (OpenFGA, SpiceDB). For most teams OPA is still the right call, but keep an eye on governance.

Whatever policy engine you pick, I suggest implementing policy guards at the service level rather than in the harness. Given the escalation of supply chain attacks in this rapidly evolving space I don't believe harness-level security is reliable. The recent [NPM ecosystem worms](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) were big and brazen, but professionals playing a long game can engineer deep vulnerabilities that are very difficult to spot.

> **Aside: Supply chain attacks, from brazen to patient**
>
> The NPM attacks were the [Shai-Hulud campaigns](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/) of September–November 2025. The first wave compromised 500+ packages through maintainer phishing, deploying a self-replicating worm that harvested credentials and publishing rights. The second wave hit 25,000+ GitHub repos and added a destructive fallback that wiped home directories if exfiltration failed.
>
> These were noisy by design. The deeper concern is patient, state-level compromise. Stuxnet took years to develop before destroying Iranian centrifuges via compromised industrial controls. The 2024 Hezbollah pager attack showed supply chain compromise extending to hardware. Salt Typhoon (Chinese state-sponsored) compromised nine major U.S. telecoms and went undetected for two years, embedding in lawful intercept infrastructure to monitor officials across 80+ countries.
>
> If nation-states invest years compromising telecom firmware, they'll invest in agent software supply chains too. Service-level policy enforcement creates a trust boundary that doesn't depend on supply chain integrity.

One issue with OPA/Rego is that it can be challenging to represent complex stateful policies. Depending on the authorization framework OPA is running in, you can apply additional decision logic after OPA calculates a policy result; [Envoy's ext_authz](https://www.openpolicyagent.org/docs/latest/envoy-introduction/) makes this straightforward.

Once you've got your policy engine, the trick is to integrate it with your agent. This is easy for networked services, but for built-in agent functionality it gets more difficult. Hooks are sufficient for harness-level policy enforcement, but as I mentioned, ideally you shouldn't trust the harness.

The easiest solution to reliably locking down closed-source or inflexible harnesses is to neuter their native tools, then provide secure tools as alternatives. This results in some tool bloat due to duplicated definitions, however the secure tools can piggyback on the semantics of the insecure tools so the tokens aren't entirely wasted, and hooks can keep the agents from reverting to insecure behavior.

## Isolation

Those outside the security world might ask, why spend energy isolating if we're already sanitizing inputs and locking down policy? The answer to this is that you need to design your systems to be robust to user error, because even for the best in the world it's only a matter of time, and as AI disconnects us from the code, this type of failure is getting more common.

Taking the time to configure isolation has two core benefits:

1. **It contains your blast radius.** When you eventually make a mistake, the odds that an attacker will be able to leverage that for some sort of privilege escalation or aggressive foothold in your system go down significantly.

2. **It acts like a form of double-entry bookkeeping for your security architecture.** If you have a probability P of making an insecure change to your system, the chance that you'd mess up twice is P² (assuming uncorrelated random errors; knowledge-gap errors will be correlated).

> **Aside: The limits of the P² argument**
>
> The P² math holds when errors are independent. In practice, many security errors come from knowledge gaps: if you don't understand an attack surface, you'll misconfigure both layers the same way. This makes isolation valuable not just for probabilistic redundancy, but because it *forces you to think about security from different angles*. Configuring network isolation requires a different mental model than writing Rego policies, which is different from building input sanitizers. The diversity of perspectives matters as much as the redundancy.

There are a lot of dimensions to isolation. For example, a coding agent needs a sandbox to build and test software, but that agent doesn't necessarily need full internet access, whereas a research agent will likely need full internet access but has no need for a sandbox. By isolating code creation and research to separate agents, you limit the impact of prompt injections, since they have to induce the research agent to propagate the injection into the research report, which is likely to make it less effective if it succeeds at all, and if your research reports have a fixed schema with a test canary, it's likely you'll be able to detect injection attempts.

> **Aside: Schema canaries for injection detection**
>
> When you define a schema for agent-to-agent communication, include a challenge field that the producing agent must answer correctly. For example, require a field like `"canary_response": "blue-seven-oak"` or a simple factual question from the system prompt.
>
> Prompt injections work by overriding instructions. When one succeeds, it typically disrupts the model's ability to follow formatting and response requirements, so the output will tend to omit the canary, answer incorrectly, or break the schema. Any of these becomes a signal to discard the output.
>
> This extends the [known-answer detection defense](https://www.usenix.org/system/files/usenixsecurity24-liu-yupei.pdf) (Liu et al., USENIX Security 2024) from a single verification step to a structural property of all inter-agent communication.

Putting a human in the loop is a good way to create isolation at the cost of velocity. Code review is a good example of this; the human acts as a buffer preventing code from running in trusted environments before being properly vetted. In the case of code review, this is often a bad tradeoff to make wholesale, but it's still definitely a good idea to selectively validate important parts of the code.

---

## Further Reading

* Greshake et al., ["Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"](https://arxiv.org/abs/2302.12173) (AISec 2023), the foundational paper on indirect prompt injection
* Liu et al., ["Formalizing and Benchmarking Prompt Injection Attacks and Defenses"](https://www.usenix.org/system/files/usenixsecurity24-liu-yupei.pdf) (USENIX Security 2024), comprehensive defense taxonomy and benchmark
* Hackett et al., ["Bypassing Prompt Injection and Jailbreak Detection in LLM Guardrails"](https://arxiv.org/html/2504.11168v2) (2025), empirical analysis of guardrail evasion via character injection
* [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), industry-standard risk framework
* Ferrag et al., ["From Prompt Injections to Protocol Exploits"](https://www.sciencedirect.com/science/article/pii/S2405959525001997) (2025), unified threat model bridging input-level and protocol-layer vulnerabilities in agent ecosystems
* CISA, ["Widespread Supply Chain Compromise Impacting npm Ecosystem"](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) (September 2025)
* [ProtectAI DeBERTa-v3 Prompt Injection Detector (v2)](https://huggingface.co/protectai/deberta-v3-base-prompt-injection-v2), open-source transformer-based detection model
* [Clean](https://github.com/sibyllinesoft/clean), multilingual classical ML prompt injection detection with built-in sanitization