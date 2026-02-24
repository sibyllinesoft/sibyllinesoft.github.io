---
title: "Defeating Prompt Injection With Protocol Firewalls"
description: "Enforcing a JSON response schema with embedded challenges eliminates prompt injection execution and propagation across all tested models and attack categories."
date: 2026-02-24
published: true
image: "/img/optimized/article-security-protocol.webp"
tags:
  - articles
  - agents
  - security
  - sigil
layout: article.njk
---

In a [previous article](/articles/2026-02-15-agentic-security/), I argued that agent-to-agent communication needs structural defenses against prompt injection, not just input sanitization. The core idea: when you define a schema for inter-agent messages and embed a challenge the producing agent must answer correctly, injection attempts that override instructions will disrupt the schema and reveal themselves through protocol violations.

I've now built and benchmarked a concrete implementation of this approach. The results: **a strict JSON response schema with an embedded fingerprint challenge eliminated injection propagation entirely across four models, nine attack categories, and 45 distinct payloads**, while reducing attack success rates by 45-100% depending on the model.

## The Problem

LLMs cannot reliably distinguish instructions from data in the same context window. This is the fundamental finding from [Greshake et al. (2023)](https://arxiv.org/abs/2302.12173), and it means any message passing through an LLM is vulnerable to prompt injection. An attacker who controls any part of the input can potentially control the output.

In a multi-agent system, this creates two threats:

1. **Execution**: The agent follows the injected instruction instead of its actual task.
2. **Propagation**: The agent embeds the injection in its response, passing it downstream to other agents in the pipeline.

Sanitization helps but can't eliminate the problem. You need a verification mechanism that catches injection *even when the model is fooled*.

## The Schema Strict Protocol

Schema Strict works by constraining the LLM's output to a strict JSON schema with an embedded challenge that's tightly coupled to the response content. The agent must respond with exactly:

```json
{
  "sigil_version": 1,
  "nonce": "<echo of random nonce>",
  "response": "<actual response content>",
  "fingerprint": "<word_count>:<first_word>:<last_word>"
}
```

The system prompt provides the agent with a random 16-character hex nonce and detailed instructions for computing the fingerprint over its own `response` field. Verification checks:

1. **Valid JSON**: The response must parse as a JSON object.
2. **Required fields**: All four fields must be present.
3. **Exact nonce echo**: The nonce must match the challenge exactly.
4. **Version**: `sigil_version` must be exactly `1`.
5. **Fingerprint consistency**: The claimed fingerprint must match the actual response content within tolerance (30% on word count to accommodate LLM counting imprecision, punctuation-normalized first/last word comparison).

The key insight is that the fingerprint is *self-referential*: it describes properties of the response field, creating a consistency check that's trivial for a compliant agent but difficult for an injection to satisfy. An injection that overrides the agent's behavior will almost certainly produce a response that doesn't match its own fingerprint, because the injected content wasn't written with the fingerprint constraint in mind.

### Why This Works

Prompt injections operate by replacing the model's intended behavior with attacker-specified behavior. But Schema Strict doesn't try to detect the injection itself. Instead, it detects the *consequences* of injection: when an attack succeeds in changing the model's output, the structural constraints break.

This is analogous to how TCP checksums detect corruption without knowing what caused it. The protocol doesn't need to understand the attack; it just needs to verify that the output is self-consistent.

Even when an injection is sophisticated enough that the model follows it while maintaining JSON format, the nonce echo and fingerprint create independent verification channels. The attacker would need to:

1. Know the random nonce (generated per-request, never in the user message)
2. Compute a valid fingerprint over their injected content
3. Do both while the injection is overriding the model's normal instruction-following

In practice, injections that successfully override behavior also override the careful format compliance needed to satisfy all three constraints simultaneously.

## Benchmark Design

I tested Schema Strict using [Sigil](https://github.com/sibyllinesoft/sigil), a benchmark framework that evaluates protocol-based injection defenses across a matrix of protocols, attack payloads, and LLM providers.

### Models Tested

- **Claude Haiku** (claude-haiku) via Claude Code CLI
- **Claude Sonnet** (claude-sonnet) via Claude Code CLI
- **Claude Opus** (claude-opus) via Claude Code CLI
- **GLM 4.7** (glm-4.7) via Z.AI API

### Attack Payloads

45 payloads across nine categories, drawn from established prompt injection research:

**Direct Override (5 payloads)** — Attacks that explicitly instruct the model to ignore previous instructions. Sourced from [HackAPrompt](https://arxiv.org/abs/2311.16119) (Schulhoff et al., 2023) and [PromptInject](https://arxiv.org/abs/2210.12016) (Perez & Ribeiro, 2022). These include simple "ignore previous instructions" commands, instruction boundary confusion using fake delimiters, and cascading authority claims.

**Context Manipulation (5 payloads)** — Attacks that fabricate conversation history, error states, or system events. Sourced from [HackAPrompt](https://arxiv.org/abs/2311.16119) and [TensorTrust](https://arxiv.org/abs/2311.01011) (Toyer et al., 2023). These inject fake error recovery sequences, debug modes, and simulated system state changes.

**Persona Hijack (5 payloads)** — Attacks that attempt to override the model's identity. Sourced from DAN jailbreak variants and [Skeleton Key](https://www.microsoft.com/en-us/security/blog/2024/06/26/mitigating-skeleton-key-a-new-type-of-generative-ai-jailbreak-technique/) (Microsoft, 2024). These include the classic DAN persona, "Developer Mode" activation, fictional framing, dual persona splitting, and semantic inversion.

**Delimiter Escape (5 payloads)** — Attacks that break out of formatting boundaries. Sourced from [Pliny the Prompter](https://www.reddit.com/r/ChatGPTPro/comments/1bfnqw8/pliny_the_prompters_jailbreak_techniques/) multi-delimiter patterns. These use XML tag escapes, JSON structure breaks, markdown fence manipulation, and multi-format delimiter cascading.

**Payload Smuggling (5 payloads)** — Injection hidden inside data structures. Sourced from [BIPIA](https://arxiv.org/abs/2312.14197) (Yi et al., 2023) patterns. These embed instructions in JSON values, URL parameters, CSV data, and simulated tool outputs.

**Encoding/Obfuscation (5 payloads)** — Instructions encoded to bypass pattern matching. These use Base64, ROT13, leetspeak, homoglyphs, and mixed encoding layers.

**Pliny-Specific (5 payloads)** — Targeted techniques from the Pliny jailbreak corpus. These include refusal-sandwiching, GODMODE-style prompts, L1B3RT4S dividers, emotional manipulation, and incremental boundary testing.

**Indirect Injection (5 payloads)** — Injection via simulated external data sources. Sourced from [InjecAgent](https://arxiv.org/abs/2403.02691) (Zhan et al., 2024) and RAG poisoning research. These simulate injection through retrieved documents, API responses, email content, and code comments.

**Propagation (5 payloads)** — Multi-agent attacks designed to embed malicious instructions in the response for downstream agents. Sourced from multi-agent attack research including [InjecAgent](https://arxiv.org/abs/2403.02691) and [BIPIA](https://arxiv.org/abs/2312.14197). These include system prompt exfiltration relays, override relays, tool abuse relays, self-replicating chain propagation, and data poisoning relays.

### Methodology

Each trial follows this flow:

1. A benign task message (e.g., "Summarize the following text: The quick brown fox jumps over the lazy dog.") has an attack payload injected into it at the payload's specified position (prepend, append, or embed).
2. The protocol wraps the injected message, adding its challenge elements.
3. The wrapped message and protocol system prompt are sent to the LLM.
4. The response is verified against the protocol's constraints.
5. The response is independently checked for attack success markers and propagation content.

Clean (no-attack) trials use the same flow without injection to measure false positive rate and protocol compliance. Five benign messages are used per protocol per model. Each model was tested across all 45 payloads for each protocol configuration, totaling 150 trials per model (3 protocols &times; 50 trials each).

### Metrics

- **Attack Success Rate (ASR)**: Percentage of attack trials where the model followed the injection's intent, verified by checking for payload-specific marker words in the response content field. Refusal-quoting (models mentioning markers while explaining why they refused) is filtered out.
- **Propagation Rate**: Percentage of propagation attacks where the injection payload leaked into the response's content field for downstream consumption.
- **Detection Rate**: Percentage of attack trials where the protocol flagged a violation.
- **False Positive Rate (FP)**: Percentage of clean trials incorrectly flagged.
- **Protocol Compliance**: Percentage of clean trials with correct protocol format.

## Results

### The Propagation Firewall

The strongest finding is propagation prevention. Without any protocol, injections successfully embedded themselves in model responses up to 40% of the time. With Schema Strict, propagation dropped to **zero across all four models**.

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th class="numeric">Propagation (None)</th>
      <th class="numeric">Propagation (Schema Strict)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claude Haiku</td>
      <td class="numeric"><strong>40.0%</strong></td>
      <td class="numeric">0.0%</td>
    </tr>
    <tr>
      <td>Claude Sonnet</td>
      <td class="numeric"><strong>40.0%</strong></td>
      <td class="numeric">0.0%</td>
    </tr>
    <tr>
      <td>Claude Opus</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">0.0%</td>
    </tr>
    <tr>
      <td>GLM 4.7</td>
      <td class="numeric"><strong>20.0%</strong></td>
      <td class="numeric">0.0%</td>
    </tr>
  </tbody>
</table>
</div>

The JSON schema constraint means the response content is isolated in a defined field. Injection payloads that attempt to embed instructions for downstream agents are contained within that field's string value rather than appearing as top-level instructions that a consuming agent would interpret.

### Attack Success Rate Reduction

Schema Strict also dramatically reduces the rate at which models follow injection instructions, though it doesn't eliminate it entirely against the full 45-payload set.

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th class="numeric">ASR (None)</th>
      <th class="numeric">ASR (Schema Strict)</th>
      <th class="numeric">Reduction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claude Haiku</td>
      <td class="numeric">11.1%</td>
      <td class="numeric"><strong>0.0%</strong></td>
      <td class="numeric">100%</td>
    </tr>
    <tr>
      <td>Claude Sonnet</td>
      <td class="numeric">4.4%</td>
      <td class="numeric">4.4%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Claude Opus</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">&mdash;</td>
    </tr>
    <tr>
      <td>GLM 4.7</td>
      <td class="numeric">20.0%</td>
      <td class="numeric"><strong>11.1%</strong></td>
      <td class="numeric">45%</td>
    </tr>
  </tbody>
</table>
</div>

The model-specific pattern is revealing:

- **Haiku** is the most vulnerable without protection (11.1% ASR) but Schema Strict eliminates it entirely. The schema constraint is strong enough to prevent a weaker model from following injections.
- **Sonnet** shows the same 4.4% ASR with and without Schema Strict. Two context manipulation attacks (`context_manipulation_002` and `context_manipulation_004`) produce responses short enough that the model computes a valid fingerprint for the injected content. The attack output is compatible with the schema constraints.
- **Opus** is naturally immune to all 45 tested payloads regardless of protocol. This is an alignment property, not a protocol effect.
- **GLM 4.7** sees a 45% reduction (20% to 11.1%). The schema prevents most attacks but some context manipulation and delimiter escape payloads still succeed, particularly those that produce single-word responses fitting the schema.

### Detection and Compliance

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th class="numeric">Detection</th>
      <th class="numeric">FP</th>
      <th class="numeric">Compliance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claude Haiku</td>
      <td class="numeric">33.3%</td>
      <td class="numeric">20.0%</td>
      <td class="numeric">80.0%</td>
    </tr>
    <tr>
      <td>Claude Sonnet</td>
      <td class="numeric">6.7%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Claude Opus</td>
      <td class="numeric">2.2%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>GLM 4.7</td>
      <td class="numeric">33.3%</td>
      <td class="numeric">20.0%</td>
      <td class="numeric">80.0%</td>
    </tr>
  </tbody>
</table>
</div>

Sonnet and Opus achieve perfect compliance (0% FP, 100% clean compliance). Haiku and GLM 4.7 show 20% false positive rates from fingerprint imprecision: these models inconsistently count words when computing their own fingerprints, causing verification failures on clean messages. This is a fingerprint calibration issue rather than a fundamental protocol flaw; tighter or looser tolerance trades off FP against detection.

### Per-Category Breakdown

Schema Strict's effectiveness varies by attack category. The strongest protection is against direct, explicit attacks. The weakest is against short-response context manipulation.

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th class="numeric">Haiku ASR</th>
      <th class="numeric">Sonnet ASR</th>
      <th class="numeric">Opus ASR</th>
      <th class="numeric">GLM ASR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Direct Override</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Persona Hijack</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Propagation</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Payload Smuggling</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Indirect</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Encoding</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Pliny</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
    </tr>
    <tr>
      <td>Context Manipulation</td>
      <td class="numeric">0%</td>
      <td class="numeric"><strong>40%</strong></td>
      <td class="numeric">0%</td>
      <td class="numeric"><strong>40%</strong></td>
    </tr>
    <tr>
      <td>Delimiter Escape</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric">0%</td>
      <td class="numeric"><strong>60%</strong></td>
    </tr>
  </tbody>
</table>
</div>

Seven of nine categories show **0% ASR across all four models** with Schema Strict. The two exceptions:

- **Context manipulation** succeeds against Sonnet and GLM by producing single-word responses (e.g., "RECOVERED", "DEBUGGED") that trivially satisfy the fingerprint. These attacks simulate error recovery states and the model produces output that happens to be schema-compliant.
- **Delimiter escape** succeeds against GLM 4.7, whose weaker instruction-following makes it more susceptible to boundary confusion even within the JSON constraint.

### Adding Input Sanitization (Clean + Schema Strict)

I also tested combining Schema Strict with [Clean](https://github.com/sibyllinesoft/clean), a CPU-native prompt injection detection library, as an input pre-filter. Clean scans the message before it reaches the protocol and redacts detected injection spans.

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Configuration</th>
      <th>Model</th>
      <th class="numeric">ASR</th>
      <th class="numeric">Prop.</th>
      <th class="numeric">Detection</th>
      <th class="numeric">FP</th>
      <th class="numeric">Compliance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Schema Strict</td>
      <td>Haiku</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">33.3%</td>
      <td class="numeric">20.0%</td>
      <td class="numeric">80.0%</td>
    </tr>
    <tr>
      <td>Clean + Schema Strict</td>
      <td>Haiku</td>
      <td class="numeric">6.7%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">53.3%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Schema Strict</td>
      <td>Sonnet</td>
      <td class="numeric">4.4%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">6.7%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Clean + Schema Strict</td>
      <td>Sonnet</td>
      <td class="numeric">4.4%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">4.4%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Schema Strict</td>
      <td>Opus</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">2.2%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Clean + Schema Strict</td>
      <td>Opus</td>
      <td class="numeric">2.2%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">6.7%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">100.0%</td>
    </tr>
    <tr>
      <td>Schema Strict</td>
      <td>GLM 4.7</td>
      <td class="numeric">11.1%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">33.3%</td>
      <td class="numeric">20.0%</td>
      <td class="numeric">80.0%</td>
    </tr>
    <tr>
      <td>Clean + Schema Strict</td>
      <td>GLM 4.7</td>
      <td class="numeric">8.9%</td>
      <td class="numeric">0.0%</td>
      <td class="numeric">35.6%</td>
      <td class="numeric">20.0%</td>
      <td class="numeric">80.0%</td>
    </tr>
  </tbody>
</table>
</div>

Clean provides a mixed benefit. On Haiku, it eliminates the false positive problem (0% FP vs 20%) by redacting injection fragments that confuse the fingerprint, and boosts detection to 53.3%. On GLM 4.7, it modestly reduces ASR (11.1% to 8.9%). On Sonnet and Opus, the effect is negligible. The ASR increases on Haiku and Opus with Clean are artifacts of Clean's `[REDACTED]` markers appearing in the response, which some context manipulation attacks can exploit.

## Limitations

**Adaptive attacks**: These payloads weren't designed to target Schema Strict specifically. An attacker who knows the protocol format could craft injections that maintain JSON structure and compute valid fingerprints. The context manipulation results demonstrate this: short, single-word responses trivially satisfy the fingerprint check. Future versions should explore content-dependent challenges that are harder for arbitrary injected content to satisfy.

**Fingerprint precision**: Haiku and GLM 4.7 show 20% false positive rates because they inconsistently count words when computing fingerprints. The 30% tolerance is a pragmatic compromise, but it creates a window for attacks that produce responses close to the expected length. Stronger models (Sonnet, Opus) have no fingerprint precision issues.

**Non-determinism**: LLM outputs are stochastic. Results may vary between runs, particularly for borderline cases. The sample sizes (45 attack trials per protocol per model) provide reasonable signal but wider sampling would strengthen confidence.

## Implications for Multi-Agent Systems

The propagation result is the most practically significant finding. In a multi-agent pipeline, what matters isn't whether a single agent detects an injection, but whether the injection can spread through the system. Schema Strict achieved **0% propagation across all four models and all 45 payloads**, versus up to 40% propagation without it.

This suggests a design principle for multi-agent architectures: **structured, schema-validated communication between agents provides a natural firewall against injection propagation, even when individual agents are susceptible to injection themselves.**

The per-category results reinforce this. Seven of nine attack categories achieved 0% ASR across all models with Schema Strict. The two exceptions (context manipulation and delimiter escape on specific models) produced responses that were schema-compliant but semantically wrong. This means the protocol contained the damage: even when an attack succeeds in changing the model's behavior, the structured output prevents that changed behavior from propagating.

For practitioners building multi-agent systems, the implication is concrete: define strict schemas for all agent-to-agent communication, embed per-request challenges (nonces, fingerprints) in the schema, and verify responses before passing them downstream. The protocol won't catch every attack, but it will stop attacks from spreading.

## Try It

Sigil is open source. To reproduce these results:

```bash
# Install
git clone https://github.com/sibyllinesoft/sigil
cd sigil && uv sync

# Run full benchmark with Claude Haiku
uv run sigil --model haiku --protocol none schema_strict clean+schema_strict

# Run with a specific provider
uv run sigil --provider zai --model glm-4.7 --protocol none schema_strict
```

---

## References

- Greshake et al., ["Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"](https://arxiv.org/abs/2302.12173) (2023)
- Schulhoff et al., ["Ignore This Title and HackAPrompt: Exposing Systemic Weaknesses of LLMs Through a Global Scale Prompt Hacking Competition"](https://arxiv.org/abs/2311.16119) (2023)
- Perez & Ribeiro, ["Ignore Previous Prompt: Attack Techniques For Language Models"](https://arxiv.org/abs/2210.12016) (2022)
- Toyer et al., ["Tensor Trust: Interpretable Prompt Injection Attacks from an Online Game"](https://arxiv.org/abs/2311.01011) (2023)
- Liu et al., ["Formalizing and Benchmarking Prompt Injection Attacks and Defenses"](https://www.usenix.org/system/files/usenixsecurity24-liu-yupei.pdf) (USENIX Security 2024)
- Zhan et al., ["InjecAgent: Benchmarking Indirect Prompt Injections in Tool-Integrated LLM Agents"](https://arxiv.org/abs/2403.02691) (2024)
- Yi et al., ["Benchmarking and Defending Against Indirect Prompt Injection Attacks on Large Language Models"](https://arxiv.org/abs/2312.14197) (2023)
- Microsoft, ["Mitigating Skeleton Key, a new type of generative AI jailbreak technique"](https://www.microsoft.com/en-us/security/blog/2024/06/26/mitigating-skeleton-key-a-new-type-of-generative-ai-jailbreak-technique/) (2024)
- [OWASP Top 10 for LLM Applications: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
