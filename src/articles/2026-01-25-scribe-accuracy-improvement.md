---
title: "Scribe Increases Agent Success Rate on Hard Problems by 57%"
description: "On hard SWE-bench tasks, scribe-context mode achieves 91% success vs 58% for standard exploration"
date: 2026-01-25
published: true
tags:
  - articles
  - scribe
  - benchmarks
  - agents
  - swebench
layout: article.njk
image: "/img/optimized/article-scribe-swebench-2.webp"
---

<div class="tldr-banner">
  <strong>tl;dr:</strong>
  <p>I calibrated SWE-bench tasks to find hard problems where standard agents struggle, then gave them scribe and made them repeat the test 5 times. Result: 91.1% success rate vs 58.1% baseline (+57%). </p>
</div>

In my [previous benchmark](/articles/2026-01-22-scribe-swebench-benchmark/), I showed that scribe reduces token usage by 30% with no loss in accuracy. But that benchmark deliberately used easier tasks to get clean efficiency comparisons. The natural follow-up question: what happens on harder problems where agents actually struggle?

In my early explorations, I saw data suggesting a 5-10% improvement. Then I realized that the SWE-bench questions I was testing on were too easy to clearly resolve positive difference over a random error floor. I needed to do another experiment designed to fully resolve the difference. To identify candidate tasks that could clearly show the full magnitude of Scribe's difference, I had claude pre-filter easy questions from the full SWE-bench set, then I ran rounds of benchmarks on the remainder looking for quick convergence around 50% P(success).

With a set of calibrated questions identified, I wanted to set up a simple experimental baseline before deep diving agent tool use evals. To achieve this, I added a step to prepend Scribe covering set output to the prompt. This is similar to how you might use RepoMix, however Scribe supports token budgets and smart context selection based on graph centrality, git activity and query hints, along with signature demotion and attention aware ordering, so the results are a lot better. This usage pattern typically underperforms just letting the agent use Scribe directly when tool use hooks are available, but it's a bit more robust to low quality models and harnesses, and slightly lower variance overall, so I went with it.

With my experiment defined, I queued up each of the calibrated questions 5 times and went to bed. I figured I would show a modest improvement then follow it up with something spicier.

You can imagine what a fun surprise it was to wake up to a 91% average success rate with each trial repeated 5 times. These benchmarks were run with GLM 4.7 in claude code; Opus 4.5 only succeeds unaided on the same problems ~95% of the time. The gap closure dropped my jaw.

## Data Set

There was no cherry picking or intentional filtering beyond for raw agent P(success).

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Language</th>
      <th>Standard Rate</th>
      <th>Runs</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>sympy__sympy-19254</td><td>Python</td><td>71%</td><td>7</td></tr>
    <tr><td>django__django-11283</td><td>Python</td><td>80%</td><td>5</td></tr>
    <tr><td>gin-gonic__gin-2755</td><td>Go</td><td>53%</td><td>72</td></tr>
    <tr><td>vuejs__core-11589</td><td>JavaScript</td><td>52%</td><td>75</td></tr>
    <tr><td>preactjs__preact-4182</td><td>JavaScript</td><td>56%</td><td>66</td></tr>
    <tr><td>babel__babel-15649</td><td>JavaScript</td><td>67%</td><td>24</td></tr>
    <tr><td>sphinx-doc__sphinx-7686</td><td>Python</td><td>75%</td><td>8</td></tr>
    <tr><td>sympy__sympy-20322</td><td>Python</td><td>78%</td><td>9</td></tr>
    <tr><td>sympy__sympy-20049</td><td>Python</td><td>82%</td><td>11</td></tr>
  </tbody>
</table>
</div>

## Results

I ran scribe-context mode 5 times on each task. The context was pre-fetched using scribe's covering-set-diff feature, which analyzes the problem statement and gathers relevant code dependencies before the agent starts.

<div class="table-wrapper">
<table>
  <thead>
    <tr>
      <th>Task</th>
      <th>Standard</th>
      <th>Scribe</th>
      <th>Improvement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gin-gonic__gin-2755</td>
      <td>53%</td>
      <td>100%</td>
      <td><strong>+47 pp</strong></td>
    </tr>
    <tr>
      <td>preactjs__preact-4182</td>
      <td>56%</td>
      <td>100%</td>
      <td><strong>+44 pp</strong></td>
    </tr>
    <tr>
      <td>sympy__sympy-19254</td>
      <td>71%</td>
      <td>100%</td>
      <td><strong>+29 pp</strong></td>
    </tr>
    <tr>
      <td>sphinx-doc__sphinx-7686</td>
      <td>75%</td>
      <td>100%</td>
      <td><strong>+25 pp</strong></td>
    </tr>
    <tr>
      <td>sympy__sympy-20322</td>
      <td>78%</td>
      <td>100%</td>
      <td><strong>+22 pp</strong></td>
    </tr>
    <tr>
      <td>django__django-11283</td>
      <td>80%</td>
      <td>100%</td>
      <td><strong>+20 pp</strong></td>
    </tr>
    <tr>
      <td>sympy__sympy-20049</td>
      <td>82%</td>
      <td>100%</td>
      <td><strong>+18 pp</strong></td>
    </tr>
    <tr>
      <td>babel__babel-15649</td>
      <td>67%</td>
      <td>80%</td>
      <td><strong>+13 pp</strong></td>
    </tr>
    <tr>
      <td>vuejs__core-11589</td>
      <td>52%</td>
      <td>40%</td>
      <td>-12 pp</td>
    </tr>
    <tr style="font-weight: bold; background: var(--color-gray-10, #f5f5f5);">
      <td>OVERALL</td>
      <td>58.1%</td>
      <td>91.1%</td>
      <td><strong>+33.0 pp</strong></td>
    </tr>
  </tbody>
</table>
</div>

Eight of nine tasks improved with scribe. Seven tasks achieved perfect success with scribe context. Only vuejs showed a slight decline, and even there the difference is within noise for 5 runs.

## Why Does Scribe Context Improve Accuracy?

I believe this is a combination of scribe providing higher signal to noise ratio than traditional exploration tools, and the fact that scribe organizes context based on transformer attention patterns, putting the most relevant information in the head and tail of the context. It's also likely that prepending background information before the prompt instead of piling it on after improves prompt adherence.

One example of how scribe improves upon standard exploratory patterns is the `ls` command. Its output is designed for human readability. When I was designing Scribe's file map, I ran a benchmark where I quizzed LLMs on filesystem trivia, providing them context in various formats, including `ls` commands and paired output and a brace compressed format (e.g. `/home/xyz/{.bashrc,.profile,etc}`), and the results weren't even close: the brace compressed format stomped at ~85%, ls output was ~45%.

I hypothesize this is because agents have to build an implicit map of the directory structure for `ls` output (or waste a ton of tokens using fully qualified directory names), whereas the compressed format naturally leverages attention. This aligns with a study where researchers got better prompt adherence in Llama3 by adding braces around part of a prompt.

Scribe also pulls in fewer irrelevant tokens during exploration, since it can extract functions and classes from files rather than read the whole thing, and include their dependencies in one round trip rather than several.

The impact of Scribe's context ordering is significant as well. The ["Lost in the Middle" study by Liu et al.](https://arxiv.org/abs/2307.03172) demonstrated that LLM performance degrades by 30%+ when relevant information is in the middle of context rather than at the beginning or end.

I think it likely the lion's share of the improvement is coming from just placing the prompt **after** the exploratory context. Models tend to drift from your prompt as it gets pushed back in context (i.e. context rot), this is an obvious consequence of the previously noted transformer attention patterns. If the agent doesn't need to explore much, the prompt stays in the high attention portion of context for longer. The only wrinkle in this hypothesis is that agents using scribe as a tool outperform agents with context pre-filled, I'd like to think that's a testament to how effective Scribe is as a tool, but I'm a scientist, so I'm planning to answer it with data. It's possible that a method that combines the two approaches will be even more effient still. I'd also like to quatify how much scribe improves Opus 4.5 performance on the hardest questions.

## The Vue.js Outlier

The one task where scribe underperformed (vuejs__core-11589) is instructive. This was an SSR hydration bug involving subtle interactions between v-bind in CSS and child component style bindings.

Looking at the failure cases, the issue wasn't context. Scribe provided the relevant code. The problem was that Vue's reactivity system has implicit behaviors that aren't captured by static dependency analysis. The agent needed to understand runtime behavior that isn't visible in the source code.

The negative delta was small, and as mentioned it could just be a statistical anomaly. Fisher's exact test confirms the difference isn't significant (p=0.67, comparing 2/5 scribe vs 39/75 standard). If there is any real difference, it could be due to naive exploration better matching transformer attention patterns in this case, or Scribe's context relevance calculation pulling false positives. I've run code analysis on the Vue codebase using another tool I developed (https://github.com/sibyllinesoft/valknut) and it scores poorly for agent usability, so it doesn't surprise me that it's a hard task and analytic methods/heuristics that help in other codebases might hinder agents here.

This points to a limitation: scribe excels when the solution depends on code structure and explicit dependencies. Problems where agents have to untangle magic (requiring deep framework-specific knowledge or runtime behavior understanding) may not benefit as much. This isn't just a Scribe problem, agents don't like this stuff in general. Magic is for humans, agents prefer explicit code.

## Methodology

- **Calibration**: 60+ tasks from SWE-bench Lite and Multilingual, 2+ standard runs each
- **Selection**: Tasks with 25-75% standard success rate
- **Test runs**: 5 scribe-context runs per task (45 total)
- **Model**: GLM 4.7 via Claude Code CLI
- **Scribe mode**: Pre-fetched context using `--covering-set-diff`
- **Timeout**: 2400 seconds per task
- **Evaluation**: SWE-bench test harness validates patches

Standard run counts varied by task due to accumulation across calibration sessions. 

## Implications

### For Hard Problems, Context Quality Matters More Than Model Size

The 57% relative improvement from scribe exceeds what you'd typically get from upgrading model tiers.

This suggests a priority order for improving agent performance:
1. Better context retrieval (high leverage, low cost)
2. Better prompting and tool design (medium leverage, low cost)
3. Larger models (lower leverage, high cost)

### Accuracy Gains Compound With Token Savings

Scribe provides both accuracy improvement (this benchmark) and token efficiency (previous benchmark). These compound: you're not just solving more problems, you're solving them cheaper. On a 50% baseline task, going to 100% success at 70% of the token cost means 2.8x better cost-effectiveness.

## Try It Yourself

```bash
# Install scribe
npm install -g @sibyllinesoft/scribe

# For Claude Code integration with hooks
scribe --install claude

# Pre-fetch context for current changes
scribe --covering-set-diff --stdout

# Get context for a specific function
scribe --covering-set "src/auth/validate.py:check_token" --stdout
```

The benchmark code is in the [scribe repository](https://github.com/sibyllinesoft/scribe/tree/main/scribe-rs/benchmarks/swebench).

---

*This is the follow-up to [Scribe reduces agent token usage by 30%](/articles/2026-01-22-scribe-swebench-benchmark/). That article covers efficiency; this one covers accuracy.*
