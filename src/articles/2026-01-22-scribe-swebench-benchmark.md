---
title: "Scribe reduces SWE-bench token usage by 30% with no loss of accuracy"
description: "95 benchmark runs across 14 tasks in Python, Rust, Go, and JavaScript confirm the results"
date: 2026-01-22
published: true
tags:
  - articles
  - scribe
  - benchmarks
  - agents
  - swebench
layout: article.njk
image: "/img/optimized/article-scribe-swebench.webp"
---

In the world of AI, tokens are money. If you aren't thinking about how to make the most of your tokens, you're leaving money on the table.

I designed Scribe to intelligently collect context for AI agents so I wouldn't have to. Give Scribe a file or function, and it'll intelligently collect the relevant context from the codebase so agents can get to work immediately rather than explore for 50 turns. Even better, it organizes the results in context based on LLM attention patterns, so the most important code is the most visible.

I've been having great success with Scribe, but I wanted to quantify that success so that it'd become concrete for you, and you could understand why you need to be using it. To this end, I ran extensive benchmarks using SWE-bench multilingual and lite tasks to give rock solid numbers.

The result? **30% fewer tokens and 18% faster completion with no correctness regressions.**

<figure class="benchmark-chart" style="margin: 2rem 0;">
  <svg viewBox="0 0 600 140" style="width: 100%; max-width: 600px; height: auto;" role="img" aria-label="Bar chart comparing average token usage across all tasks">
    <title>Average Token Usage Across All Tasks (95 runs)</title>
    <!-- Standard bar (full width = 2.36M tokens) -->
    <rect x="140" y="20" width="400" height="40" fill="#e74c3c" rx="4"/>
    <text x="130" y="45" text-anchor="end" font-size="14" fill="currentColor">Standard</text>
    <text x="150" y="45" font-size="13" fill="white" font-weight="bold">2.36M tokens (baseline)</text>
    <!-- Scribe-Tool bar (70% of standard = 280px) -->
    <rect x="140" y="70" width="280" height="40" fill="#27ae60" rx="4"/>
    <text x="130" y="95" text-anchor="end" font-size="14" fill="currentColor">Scribe-Tool</text>
    <text x="150" y="95" font-size="13" fill="white" font-weight="bold">1.64M tokens</text>
    <text x="430" y="95" font-size="12" fill="currentColor" font-weight="bold">-30%</text>
  </svg>
  <figcaption style="text-align: center; font-size: 0.9rem; color: var(--color-gray-60, #666); margin-top: 0.5rem;">Average token usage across 95 runs using GLM 4.7</figcaption>
</figure>

Given my compute limitations, for this first round of evals I selected tasks that were non-trivial but hypothetically solvable with high probability, in order to avoid doom loops and random task failures that would make a clear apples to apples comparison more difficult without extensive re-runs. Early experiments with harder problems show scribe having a 5-10% resolve rate advantage over baseline (bigger difference than Claude Sonnet -> Claude Opus), but the variance is quite large so I want to get the sample size up and diagnose that variance before making any accuracy claims.

The eval process itself was quite instructive. One thing that surprised me is just how much agent tool use ability comes from reinforcement learning on known tools like grep, and how bad they are at using novel tools. I started off benchmarking with a small instructional addition to the system prompt using Sonnet 4.5, and the results were underwhelming. The agent used the tool in some incredibly asinine ways. Opus performed much better, so smarter models do help here, but having to use the top frontier model just to get mileage out of a tool seemed like a tall ask.

Tweaking the prompt was the obvious low hanging fruit, and this helped significantly, but the agents would still do really stupid stuff that had been repeatedly prohibited in the prompt, or try to use the tool wrong once then fall back to grep/read.

The answer to this was hooks. Hooks fire when certain events occur in the agent harness, and they let you block or respond to those events. This gave me a mechanism to filter out the common asinine patterns that I observed agents falling into when using tools. With hooks in place, I was able to repeatedly nudge the model to correct behaviors, and almost all the variance disappeared.

Once my results stabilized, I switched to GLM 4.7 with the plan to save Claude tokens, and I was surprsied to find that GLM 4.7 with hooks outperformed Opus 4.5 without hooks in tool use compliance. I suspect GLM 4.7 is better at generalized tool use than Claude 4.5, but I'm still going to go out on a limb here and say hooks are the superfeature people are sleeping on in agent harnesses.

### Want scribe in your agent workflow?

```bash
npm install -g @sibyllinesoft/scribe
scribe --install claude # For the hooks, which you definitely want
```

## The Experiment

We tested two approaches on issues from SWE-bench Multilingual:

1. **Standard**: Agent explores code using grep, find, and reading individual files
2. **Scribe-Tool**: Agent has access to scribe as a tool for on-demand exploration

Each task was run multiple times per mode to capture variance. All tests used GLM 4.7 via Claude Code CLI, with 30-minute timeouts. Tasks were selected to cover diverse languages and codebase sizes.

## Results

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Language</th>
      <th>Runs</th>
      <th>Standard (avg)</th>
      <th>Scribe-Tool (avg)</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>axios__axios-5085</td>
      <td>JavaScript</td>
      <td>6</td>
      <td>3.93M</td>
      <td>1.21M</td>
      <td><strong>-69%</strong></td>
    </tr>
    <tr>
      <td>caddyserver__caddy-6051</td>
      <td>Go</td>
      <td>4</td>
      <td>0.61M</td>
      <td>0.34M</td>
      <td><strong>-44%</strong></td>
    </tr>
    <tr>
      <td>caddyserver__caddy-5404</td>
      <td>Go</td>
      <td>8</td>
      <td>1.34M</td>
      <td>0.78M</td>
      <td><strong>-42%</strong></td>
    </tr>
    <tr>
      <td>sharkdp__bat-1892</td>
      <td>Rust</td>
      <td>6</td>
      <td>7.02M</td>
      <td>4.23M</td>
      <td><strong>-40%</strong></td>
    </tr>
    <tr>
      <td>gin-gonic__gin-3820</td>
      <td>Go</td>
      <td>6</td>
      <td>2.41M</td>
      <td>1.59M</td>
      <td><strong>-34%</strong></td>
    </tr>
    <tr>
      <td>pytest-dev__pytest-5413</td>
      <td>Python</td>
      <td>6</td>
      <td>3.90M</td>
      <td>2.61M</td>
      <td><strong>-33%</strong></td>
    </tr>
    <tr>
      <td>scikit-learn__scikit-learn-15512</td>
      <td>Python</td>
      <td>6</td>
      <td>1.66M</td>
      <td>1.25M</td>
      <td><strong>-25%</strong></td>
    </tr>
    <tr>
      <td>gin-gonic__gin-4003</td>
      <td>Go</td>
      <td>6</td>
      <td>0.68M</td>
      <td>0.53M</td>
      <td><strong>-22%</strong></td>
    </tr>
    <tr>
      <td>gin-gonic__gin-1805</td>
      <td>Go</td>
      <td>5</td>
      <td>3.27M</td>
      <td>2.66M</td>
      <td><strong>-19%</strong></td>
    </tr>
    <tr>
      <td>tokio-rs__tokio-4384</td>
      <td>Rust</td>
      <td>19</td>
      <td>1.72M</td>
      <td>1.44M</td>
      <td><strong>-17%</strong></td>
    </tr>
    <tr>
      <td>astropy__astropy-12907</td>
      <td>Python</td>
      <td>7</td>
      <td>1.77M</td>
      <td>1.48M</td>
      <td><strong>-16%</strong></td>
    </tr>
    <tr>
      <td>preactjs__preact-4182</td>
      <td>JavaScript</td>
      <td>4</td>
      <td>3.21M</td>
      <td>2.81M</td>
      <td><strong>-12%</strong></td>
    </tr>
    <tr>
      <td>immutable-js__immutable-js-2005</td>
      <td>JavaScript</td>
      <td>6</td>
      <td>1.96M</td>
      <td>1.74M</td>
      <td><strong>-11%</strong></td>
    </tr>
    <tr>
      <td>pytest-dev__pytest-8906</td>
      <td>Python</td>
      <td>6</td>
      <td>1.64M</td>
      <td>1.50M</td>
      <td><strong>-9%</strong></td>
    </tr>
  </tbody>
</table>
</div>

The results show consistent token savings across languages, ranging from 9% to 69% depending on codebase structure. Both modes achieved 100% resolve rate on the tested tasks, demonstrating that scribe's efficiency gains don't come at the cost of task completion.

## Where Scribe Helps Most

The token savings vary by codebase structure:

**JavaScript codebases (11-69% savings)**: JavaScript projects showed the widest range, with axios seeing massive 69% savings while immutable-js was more modest at 11%. The difference correlates with codebase complexity and import patterns.

**Go codebases (19-44% savings)**: Go's clear package boundaries and explicit imports align well with scribe's covering-set approach. The agent gets exactly what it needs without pulling in extraneous code.

**Rust codebases (17-40% savings)**: Rust's complex trait and generic systems require more context to understand fully. bat saw 40% savings while tokio's async runtime was more modest at 17%.

**Python codebases (9-33% savings)**: Python's dynamic nature means more context is needed. pytest saw strong 33% savings, while astropy and scikit-learn ranged from 16-25%.

## The axios Case Study

The axios task (axios__axios-5085) demonstrates scribe's impact on JavaScript codebases. The issue involved fixing how the library handles certain HTTP request configurations.

**Standard mode** averaged 3.93M tokens across 6 runs, as the agent navigated axios's modular architecture—tracing through adapters, interceptors, and config merging logic spread across many files.

**Scribe-tool mode** averaged 1.21M tokens (69% fewer) by resolving the relevant modules with their dependencies in single calls. Instead of grep → read → discover more context → repeat, the agent got complete module definitions with their import chains upfront.

## Why Does Scribe Help?

The standard approach forces agents into an expensive exploration loop:

1. Search for relevant files (grep/find)
2. Read a file, realize more context is needed
3. Search again, read another file
4. Repeat until full understanding is built

Each iteration consumes tokens for both the search results and the file contents. On larger codebases, agents spend more time discovering what they need than actually solving the problem.

**Scribe changes this pattern.** A single `scribe --covering-set "src/pytest/_code/code.py:ExceptionInfo"` call returns the class and all its dependencies already resolved. The agent gets complete context in one call instead of dozens.

## Two Integration Patterns

### Scribe-Context (Pre-fetched)

Before giving the agent a task, run scribe to gather relevant context and include it in the prompt:

```bash
scribe --covering-set-diff --stdout  # Context for current git changes
scribe --covering-set "src/api/auth.ts:validateToken" --stdout  # Specific function
```

This approach:
- Provides complete dependency context upfront
- Works with any agent framework, no hooks required
- Is completely reliable (no agent decision-making required)

This is similar to the pattern used by RepoMix and other code bundling tools, however Scribe is superior for several reasons:
- **Token budget compliance:** set a token cap and Scribe will fill it with the highest priority code
- **Intelligent prioritization:** uses pagerank algorithm and full-text query hints to prioritize code
- **Speed:** Scribe is optized for performance, which is important when agents are using it as their primary discovery tool

### Scribe-Tool (Agent-Driven)

Give the agent access to scribe as a tool:

```bash
# If you're using Claude Code, just install scribe and you're good to go
scribe --install claude

# If you're using a harness that doesn't have hooks, you'll need to prompt your agent to use it effectively
```

This approach:
- Lets the agent request exactly what it needs, when it needs it
- Works best with capable models that follow instructions well and harnesses that support hooks to enforce compliance
- Achieved 18% faster completion times in my benchmarks

## Methodology

- **Benchmark**: SWE-bench Multilingual
- **Languages**: Python, Rust, Go, JavaScript
- **Tasks**: 14 tasks across 10 repositories
- **Runs**: 4-19 runs per task per mode (95 total runs)
- **Model**: GLM 4.7 via Claude Code CLI
- **Timeout**: 1800 seconds per task
- **Evaluation**: SWE-bench test harness validates patches against original test suites
- **Scribe Settings**: `--max-depth 4`, `--token-target` scaled to codebase size

Tasks run in isolated Docker containers with identical environments. The multi-run design captures variance in agent behavior, confirming that single-run benchmarks can be misleading.

## Implications

### For Agent Developers

If you're building agents that work with code, scribe offers consistent efficiency gains: 30% average token savings across diverse codebases and languages. The scribe-tool approach requires minimal integration—add scribe to your tool list and prompt the agent to use it for context gathering.

### For Cost Optimization

Token reductions of 30% on average (up to 69% on favorable codebases) translate directly to cost savings on the exploration phase of agent work. For teams running many agent tasks, this adds up quickly.

### For Benchmark Designers

The high variance we observed (standard deviations of 390K-1.4M tokens) underscores why single-run benchmarks can be misleading. Multiple runs per task provide more reliable comparisons.

---

Scribe is open source and available at [github.com/sibyllinesoft/scribe](https://github.com/sibyllinesoft/scribe). The benchmark runner is in the `scribe-rs/benchmarks/swebench/` directory.
