---
title: "Your Model Is Smart Enough. Your Process Isn't."
description: "Why process intelligence—not model intelligence—is the real automation bottleneck, and how to build AI workflows that actually work."
date: 2025-08-17
published: true
tags: ["articles", "ai", "automation", "process-intelligence", "agents"]
layout: article.njk
---

<div class="tldr-banner">
  <strong>TL;DR</strong> Build orchestrated agent workflows with delegation to specialized subagents. Use agents to automate requirement gathering and issue management. Process intelligence > one shot intelligence.
</div>

A [recent post argues](https://latentintent.substack.com/p/model-intelligence-is-no-longer-the) that "model intelligence is no longer the constraint for automation"—that we just need better tooling and information access. I half-agree, but there's a crucial caveat that changes everything.

Yes, modern models are "intelligent enough" to one-shot remarkably hard problems when given sufficient instructions. We've likely hit saturation on **small hard one-shots**—I don't expect dramatic improvements in raw reasoning for tightly scoped problems in the next generation. GPT-5, Gemini 2.5, and Claude 3.5 can already solve complex algorithmic challenges, debug tricky edge cases, and write sophisticated code snippets given the right context.

But here's where the premise breaks down: **we're measuring intelligence wrong**. Real automation doesn't need better one-shot problem solving—it needs **process intelligence**: planning across multiple steps, tracking state, calibrating from unexpected feedback, and systematically recovering when tools fail or assumptions break.

Case in point: I recently burned an hour on a Plotly dendrogram "fold-back" visualization bug. Multiple retries with different models failed, despite each being capable of sophisticated plotting logic. The breakthrough came only when I systematically injected the library's source code into context—something that required **procedural thinking about when to escalate, what information to gather, and how to route specialized questions to knowledge sources**.

This explains why Claude often outperforms "smarter" models like GPT-5 in agentic workflows. It's not about raw reasoning power—Claude is better trained on systematic tool use and tends to break down complex problems more methodically. **Process intelligence beats point intelligence** for real-world automation.

So while the tooling focus is important, it misses the deeper issue: models aren't "there yet" because we haven't trained them to think procedurally across extended workflows. The constraint isn't just information access—it's the intelligence to orchestrate that access systematically.

## From Context Engineering to Process Engineering

This reframing reveals why [Philipp Schmid's insight](https://www.philschmid.de/context-engineering) about context engineering is so crucial—but not for the reasons he initially outlined.

If process intelligence is the real constraint, then we need models that can **actively manage context** as part of their procedural thinking. My Plotly bug wasn't solved by better prompt engineering—it was solved when I systematically identified what knowledge was missing and injected the right source code. That's **context engineering as a process skill**, not just a human packaging skill.

Schmid argues that context engineering is becoming more important than prompt engineering because modern models (GPT-5, Gemini 2.5) are less sensitive to how information is formatted. He's right, but this points to something bigger: if models care less about **how** context is packaged, we can train them to care more about **when and what** context to retrieve.

This is where **agents as tools** becomes critical. Instead of a single agent struggling with context management, we need specialized **knowledge management agents** that can field questions, retrieve relevant information, and return clean, focused answers to working agents. The context engineering discipline doesn't disappear—it moves from human preprocessing to **agent-to-agent delegation**.

So both posts are onto something essential: we do need better tooling (first post) and systematic context management (second post). But the synthesis is training models to use **context management tools** as part of their process intelligence—which brings us to subagents and shared scratch pads.

## What Actually Matters Right Now

This distinction explains why Claude with Claude Code punches above its weight class—it's built for process intelligence, not just clever responses. But regardless of which model you're using, here's what actually moves the needle on agentic automation today, ranked by impact:

### 1. Speed Above All Else

Latency kills agentic workflows. Every step in a multi-step process compounds the delay, turning a 2-second model call into a 30-second chain. The math is brutal: a 10-step workflow with 3-second average latency takes 30 seconds; bump that to 5 seconds per step and you're at 50 seconds for the same outcome.

**What works**: Reserve expensive models like GPT-5 or Claude Opus for the hard reasoning steps. Use fast models (Gemini 2.5 Flash, Claude Haiku) for knowledge retrieval, planning, and coordination. Anthropic's own agent research shows they spend more time optimizing tool response times than prompts—speed is the multiplier that makes everything else possible.

### 2. Tool Reliability Over Tool Cleverness

Agents fail on flaky tools with ambiguous outputs. A deterministic CLI tool that returns structured JSON beats a "smarter" tool that sometimes works.

**What works**: Standardize on tools with predictable interfaces. Prefer absolute paths over relative ones. Make error messages parsable by LLMs (structured, not free-form). When Anthropic built their coding agents, they spent more engineering effort on tool reliability than on model improvements—the lesson is clear.

### 3. Planning That Survives Contact With Reality

Current models are brittle at long-horizon planning and recovery. SWE-bench-Live shows agents still struggle when plans need updating based on real feedback.

**What works**: Build chain-level metrics (time-to-green, recovery rate, plan adherence). Train on adversarial tasks where the environment changes. More importantly, design for replanning—don't just make better initial plans, make systems that can pivot when assumptions break.

### 4. State Tracking Via Tools, Not Memory

The biggest process intelligence gap: keeping track of what was tried, why it failed, and what to try next. Models forget; tools remember.

**What works**: Maintain durable state outside the model's context. Use scratch pads, structured logs, and persistent memory that tools can query. Don't rely on the model to "remember" what happened 20 steps ago—give it tools to look up its own history. This is where shared scratch pads and knowledge management subagents become essential.

## The Architecture That Works Today

The solution isn't better models—it's better **orchestration**. Here's an architecture you can implement today that addresses every constraint we just covered:

### Control Agent: The Delegating Conductor

Your main agent (Claude Code, or whatever you're using) shouldn't be doing the heavy lifting. It should **plan, delegate, and monitor**. Think conductor, not virtuoso. The control agent maintains the overall goal, breaks it into subtasks, routes questions to specialists, and integrates results.

Claude Code's **Subagents** feature is perfect for this—each subagent spawns with fresh context and specialized toolsets. No context pollution, no jack-of-all-trades prompting. The controller stays focused on workflow orchestration while specialists handle domain expertise.

### Knowledge Subagent: Your Context Engineering Specialist

Stop dragging raw documentation into your coding agent's context. Instead, delegate knowledge questions to a specialized **question-answering subagent** that can search, synthesize, and return clean answers.

**Stack that works**: Wire up **Elastic MCP** (BM25 + vectors with RRF for hybrid search) over your org docs and code. Add **LEANN** for fast local vector search and **Serena MCP** for symbol-level code understanding. Front it with a long-context model like **Gemini 2.5 Flash** that can process long contexts quickly.

This subagent doesn't just retrieve—it **answers questions**. "How does authentication work in our codebase?" gets a focused answer, not a dump of auth-related files. Your coding agent gets exactly what it needs, nothing more.

### Hard-Task Subagent: When You Need the Big Guns

For deep debugging or complex design decisions, escalate to premium frontier models that can pull library source code (via Serena) and synthesize with your org knowledge. This is where you delegate to **GPT-5 Pro** or crank up the thinking budget on **Opus/Gemini** for special cases requiring extended analysis.

The key: **it's specialized for genuinely hard problems**, not routine work. Let fast models handle the planning and coordination; bring in the heavy artillery only when you need to burn serious compute on complex architectural decisions or deep debugging sessions.

### Support Cast: The Specialized Workforce

**UX/Design Agent**: This is where the magic happens for UI work. Tell this agent to create a complete design system, implement Storybook stories for all UI components, then **get into an evaluate→iterate loop** using **Playwright MCP**. The agent loads each component, evaluates the design, identifies improvements, implements changes, then re-evaluates with Playwright. This evaluate→iterate cycle is how the magic works—the agent can churn for over an hour autonomously, producing remarkably polished results while you focus on other work.

**PM/PO Agent**: Eliminates the drudgery of issue management while giving you clean tracking and pristine GitHub history. Wire it to **Slack, Discord, or other chat MCPs** for seamless communication workflows. This agent accelerates your coding workforce by keeping their pipeline filled with well-defined tasks. Plan out entire sprints through a chat interface—it can even hook into meetings or voice chat for hands-free project management. The clean issue tracking and automated ticket generation means your coding agents always have clear next steps.

**Debugger Agent**: Enables **extremely verbose logging output** while keeping your main agent context pristine. You can have detailed debug traces, stack dumps, and comprehensive logging without polluting the primary workflow. The debugger agent manages scoped logging and reads logs via knowledge tools, systematically tracking down issues using structured investigation patterns—all while your main agents stay focused and uncluttered.

### Deployment: Local Container Orchestration

Here's the workflow that actually works: Run **Vibe Kanban** in a container on your local system. **Claude Code on the host** manages the board via MCP, chatting with you to understand requirements and coordinating the agent workforce.

The agents use **Graphite** to maintain **a single stack for all AI-developed code**. Instead of messy feature branches, you get one clean, browsable stack of commits that you can merge atomically or review step-by-step. Each commit in the stack tells a clear story of what was built and why.

The **PM/PO agent** can automatically convert PR comments and repo issues into **Vibe Kanban tickets** via MCP—creating a feedback loop where human reviewers can flag issues that bots automatically pick up and address.

Since Vibe Kanban runs containerized, you can **expose it safely to the outside world** and manage your agents from anywhere. Wire the PM agent to **Discord, Slack, Signal**—whatever chat tools you prefer—so you can orchestrate development from your phone while the agents work in their sandbox.

**Container isolation + single-stack development + chat-based orchestration** = production-ready automation you can actually trust.

## Your Cheat Sheet to Vibe Coding Bliss

**Copy-paste your way to process intelligence:**

### Step 1: Core Infrastructure Setup

**Install Claude Code**
```bash
# Official installation (recommended)
npm install -g @anthropic-ai/claude-code
# Or via shell script: curl -fsSL https://claude.ai/install.sh | bash
```

**Install Claude Code Studio**
```bash
# Clone to temp directory (since you likely already have ~/.claude)
git clone https://github.com/arnaldo-delisio/claude-code-studio.git /tmp/claude-code-studio
# Copy files to your existing .claude directory
cp -r /tmp/claude-code-studio/* ~/.claude/
cd ~/.claude
# Customize your environment
cp CONTEXT_TEMPLATE.md CONTEXT.md
# Edit CONTEXT.md with your personal details
```

**Create/Configure Subagents**
Configure [Subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents) for specialized roles:
- Knowledge agent (long-context model for Q&A)
- Hard-task agent (expensive model for complex debugging)
- Debugger agent (log analysis and scoped debugging)

**Set up Vibe Kanban in container**
```bash
git clone https://github.com/BloopAI/vibe-kanban
cd vibe-kanban
# Update Dockerfile to include: Claude Code, Claude Code Studio 
# (git clone https://github.com/arnaldo-delisio/claude-code-studio.git ~/.claude), 
# graphite-cli, and any additional tools mentioned in this article
docker-compose up -d
# Expose port 3000 for remote access
```

**Install Graphite for stack management**
```bash
npm install -g @withgraphite/graphite-cli
gt auth
gt repo init
```

### Step 2: Knowledge & Context Tools

**Add to Claude Code MCP Configuration:**
- **Elastic MCP**: `@elastic/mcp-server-elasticsearch` for org search (BM25 + vectors with RRF)
- **Serena MCP**: `oraios/serena` for symbol-level code understanding and LSP integration  
- **Context7 MCP**: `upstash/context7-mcp` for live, up-to-date library documentation
- **LEANN**: `yichuan-w/LEANN` for fast local vector search

Claude Code will automatically install and configure these when you add them to your MCP settings. No manual npm installs required.

### Step 3: Communication & Automation

**Add to Claude Code MCP Configuration:**
- **GitHub MCP**: `github/github-mcp-server` for PR/issue management with repository access
- **Slack MCP**: `@modelcontextprotocol/server-slack` for requirements gathering and chat-to-ticket conversion
- **Playwright MCP**: `microsoft/playwright-mcp` for UI testing and browser automation

**Note**: The PM agent can run on the Claude Code host or as a separate cloud agent—your choice depending on your workflow preferences.

### Step 4: Orchestration Flow

1. **Claude Code** (host) manages Vibe Kanban board via MCP
2. **PM agent** takes requirements from Slack/Discord → creates Kanban tickets
3. **Specialized agents** pick up tickets, use knowledge tools, commit to Graphite stack
4. **You review the stack** atomically after a long vibing session, merge in one shot
5. **Feedback loop**: PR comments → new tickets → automatic bot fixes

### Step 5: Safety & Monitoring

- Run all agents in containers (blast radius containment)
- Use Graphite stacks for clean commit history
- Enable auto-execution only in sandboxed environments
- Monitor agent performance via Kanban completion rates

**Total setup time**: ~1-2 hours for manual configuration, or just spin up Claude Code, feed it this article, and go get a bagel.

## The Challenge

Here's my challenge to anyone still convinced that model intelligence is the constraint: **Show me a case where a knowledge subagent + deterministic tools + a delegating controller doesn't beat a model swap on time-to-green.**

My Plotly dendrogram bug says hi. An hour of retries—4-5 goes with Sonnet, 2 with Opus—all failed. Five minutes with the right process—manually injecting library source code into context—solved it permanently.

This isn't about having the smartest model in the room. It's about having the smartest **process** in the room. Claude Code with subagents often outperforms "smarter" models precisely because it's built for orchestration, not just cleverness.

The future of automation isn't in the next frontier model release. It's in the stack you build this weekend: containerized agents, knowledge subagents, clean tool interfaces, and systematic delegation.

Stop waiting for GPT-6. Start building process intelligence.

**Go get that bagel. Let the agents handle the rest.**