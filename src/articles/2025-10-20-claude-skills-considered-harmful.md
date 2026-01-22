---
title: "Claude Skills Considered Harmful"
description: "Anthropic's Skills feature looks convenient, but it locks critical project knowledge into an opaque system that undermines portability and trust."
date: 2025-10-20
published: true
tags:
  - articles
  - ai
  - tooling
  - anthropic
  - agents
layout: article.njk
image: "/img/optimized/article-claude-skills-considered-harmful.webp"
---

<div class="tldr-banner">
  <strong>tl;dr:</strong>
  <p>Skills weld your docs and workflows to Anthropic's opaque runtime, making migration and auditing painful. Version-controlled README hierarchies give every agent portable, reviewable "skills" instead.</p>
</div>

<strong>Since this article was written, Anthropic has made the skill spec open, and Codex has implementedd support for them. I still think skills are overhyped, but they're not actively harmful.</strong>

There's a lot of hype building around Claude's "Skills" feature. Simon Willison wrote a hyperbolic article about it, it's all over LinkedIn and I've seen several prominent YouTubers feature it. Skills promise seamless integration of documentation and commands, it's being sold as a step forward for AI-assisted development.

We need to pump the brakes on this hype train. Skills are a poorly conceived pattern that introduces significant long-term problems for the sake of minor, vendor-specific conveniences.

## What Are Claude Skills, Really?

In a nutshell, Skills are a bundle of documentation and API calls that live exclusively within the Anthropic ecosystem. Once you create a Skill, the Claude API magically decides when to use it based on the context of your conversation. The key word here is "magically"—the process is completely opaque. You have no visibility into why a Skill was triggered or how it influences the model's reasoning.

## The Core Problems with Skills

This "magic" comes at a high cost. Adopting Skills means buying into several critical anti-patterns:

- Vendor Lock-In, Amplified: You are taking your project's essential documentation and processes and welding them directly to the API with, frankly, the worst uptime and consistency among the major frontier labs. Migrating away from Anthropic in the future wouldn't just mean swapping an API client; it would mean manually reconstructing your entire "Skills" system elsewhere.
- A Black Box with No Audit Trail: Why was that Skill used for this task? You have no way of knowing. For any professional software development, auditability is non-negotiable. Skills remove this, making debugging, optimization, and compliance a nightmare. There's no record of the selection process, making the system inherently un-trustworthy.
- The Documentation Silo: You're splitting critical project knowledge—your processes and commands—into a separate, non-portable silo. This documentation is no longer readily accessible to humans or other AI agents outside the Claude API. It's a step backward for collaboration and knowledge sharing.
- You Cede All Control: You cannot optimize the prompt that selects Skills. You are entirely at the mercy of Anthropic's hidden, proprietary logic. If your Skills are being underutilized or misapplied, your only option is to complain into the void.

## The One (Bad) Use Case for Skills

The only scenario where I can see Skills making a sliver of sense is for a solo developer who is irrevocably committed to the Anthropic ecosystem and whose project is not in a collaborative version control system.

In this narrow case, the negatives of lock-in and lack of auditability are less relevant, and the ease of not handling skill selection might seem like a win. But let's be honest: how many serious, future-proof projects fit this description? This is a feature for amateur "vibe coding" that its users will quickly outgrow, only to face the immense pain of migrating away from it—a pain that is, of course, a feature for Anthropic's retention strategy.

## A Better, Proven Alternative: Agent-Agnostic Documentation

So, if Skills are bad, what should we do instead? The answer is simple, powerful, and has been working for decades: colocate documentation and scripts with code in your version control system.

Structure your project with README.md files at every level of your folder hierarchy. In these files, link to relevant documents, scripts, and APIs for that part of the codebase. Then, instruct your AI agents to read the relevant README.md when planning their work.

This approach creates "skills" that are:

- Human Accessible: Your team can read and update them.
- Version Controlled: Changes are tracked, blame-able, and reversible.
- Agent Agnostic: Works with Claude, GPT, Gemini, or any model that can read text.
- Fully Auditable: You can see exactly what documentation was provided to the agent.
- Optimizable: You have full control over the skill selection prompts.

## The Supposed "Benefit" Isn't What It Seems

You might ask: what are we giving up?

Theoretically, we're losing potentially "free" server-side skill selection that Anthropic provides.

Let's be charitable and assume they are using a small, optimized model for Skill selection outside the main context window, and not charging you for it. In this best-case scenario, the benefit is avoiding a few extra API calls over a long conversation, potentially saving low single digits on your API bill vs the version controlled solution. For a cost-sensitive user, this is negligible, and they shouldn't be using Anthropic in the first place. For Anthropic's enterprise target, it's a rounding error.

Now, let's consider the less charitable possibility: that Skills are stealth-injected into the main context, and you pay for them. If this is the case—and given Anthropic's track record with engineering polish (look no further than their uptime or the performance of Claude Code), it wouldn't be a shock—then the "feature" is just bad all around. It would be consuming valuable context tokens, increasing your costs, and reducing the model's effective working memory, all without your knowledge. In that scenario, Skills would be F-tier.

## The Takeaway: Reject the Hype

Claude Skills are a micro-optimization designed to lock in customers, dressed up as an innovation. They trade long-term project health, transparency, and portability for a sliver of convenience.

This is not the pattern a healthy, open agent ecosystem needs. If we allow this feature to be hyped into the mainstream, other providers will feel pressured to copy it, leading to a future of fragmented, incompatible, and opaque AI tooling.

We have an obligation to push back. For the sake of human-friendly project structures and open AI development, we must champion agent-agnostic, version-controlled documentation over vendor-locked "magic." Don't get trapped by the hype.
