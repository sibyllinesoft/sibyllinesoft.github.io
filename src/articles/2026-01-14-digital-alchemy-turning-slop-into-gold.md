---
title: "I taught Ralph how to fix sloppy vibe code"
description: "Agents declare victory after trivial refactors. Here's how to make them actually finish—autonomous refactoring that works without babysitting."
date: 2026-01-14
published: true
tags: ["articles", "agents", "valknut", "ralph-loop", "refactoring", "code-quality"]
layout: article.njk
image: "/img/optimized/article-ralph-valknut.webp"
---
<div class="tldr-banner">
  <strong>tl;dr:</strong>
  <p>Agents love to declare victory after trivial refactors. With Ralph and Valknut, they actually finish the job.</p>
</div>

While building Valknut, I noticed something frustrating: AI agents are terrible at knowing when refactoring work is actually done. They'd split one function, rename a variable, then proudly announce "refactoring complete" while the codebase still had god modules, tangled dependency graphs, and duplicated logic scattered across packages.

Tell an agent to "improve code quality" and you'll get small, inconsequential changes followed by a mission accomplished flag. The real problems—the ones causing edit failures, wrong-file modifications, and token-burning context confusion stay untouched.

I needed two things: an analytic bar agents couldn't weasel out of, and a way to keep them grinding until they actually cleared it.

## The Workflow

This is a two-phase approach that leverages AI agents for the heavy lifting while maintaining deterministic quality gates:

**Phase 1: Test Coverage** - Use Ralph Loop to drive test coverage above 85%

**Phase 2: Code Health** - Use Ralph Loop with Valknut to push health scores above 90

Each phase is measurable, automatable, and produces artifacts you can review. No hand-waving, no "trust the vibes."

## Phase 1: Ralph Loop for Test Coverage

If you haven't used [Ralph Loop](https://github.com/anthropics/claude-plugins/tree/main/plugins/ralph-loop) yet, it's a Claude Code plugin that keeps feeding the same prompt back to the agent until a completion condition is met. The name is a reference to the Simpsons character Ralph Wiggum, as a testament to his foolish persistence.

Agents are good at writing tests. They can read code, understand intent, and generate comprehensive test cases faster than any human. What they struggle with is knowing when to stop. If you're trying to juice your test coverage, agents will often stop after incremental coverage improvements, forcing you to start another loop. The Ralph Loop solves that by giving you a completion promise the agent must fulfill.

Before Ralph, getting an agent to grind through real coverage gaps meant reprompting a dozen or more times. The agent would add a few tests, report progress, and stop—leaving you to manually restart the loop. Ralph makes that a non-issue: set the completion promise, walk away, come back to results.

```bash
# Install the plugin if you haven't already
claude plugins add ralph-loop

# Start the coverage grind
claude "/ralph-loop 'Improve test coverage. Run the test suite, identify uncovered code paths, and write tests until coverage exceeds 85%. Only stop when coverage is verified above 85%.' --completion-promise 'Test coverage is above 85%'"
```

Let it run. The agent will:
1. Run your test suite with coverage reporting
2. Analyze uncovered code paths
3. Write tests targeting those gaps
4. Repeat until the promise is true

Depending on the codebase size and complexity this could take between an hour and a day. I suggest periodically monitoring your agent once coverage gets above 80% as I've noticed that agents can struggle to identify uncovered lines efficiently as coverage trends towards 100%, and a few pointers after looking at the coverage report can save a lot of tokens. Valknut can automate this process with coverage hints if you find your agent is coverage doom looping.

### Why 85%?

It's the sweet spot. Below 80%, you're still missing critical paths. Above 90% and agents will spin their wheels for a long time to push coverage up (even with Valknut's agent coverage hints), and you're often testing implementation details that make refactoring harder anyhow. 85% gives you enough safety net to confidently restructure code in Phase 2. 85% is also Google's internal target for test coverage based on their code quality documentation, so you'll be in good company.

## Phase 2: Valknut for Code Health

Here's where things get interesting.

[Valknut](https://github.com/sibyllinesoft/valknut) was born from this exact frustration. I built it to set an objective quality bar that agents can't hand-wave past. Traditional linters output a sea of warnings that agents can "address" with minimal effort while ignoring structural rot. Valknut produces a single health score—and the agent doesn't get to stop until that number moves.

More importantly, Valknut catches the issues that actually trip agents up:

- **God modules and colocated functionality**: Agents love dumping related code into one file. This creates tangled dependency graphs that cause edit errors when the agent can't hold the full context.
- **Cross-project duplication**: Vibe-coded repos are riddled with copy-pasted logic. Agents modify the wrong copy, tests pass, and you've got a silent bug.
- **Structural imbalance**: Deep nesting in some places, 30-file flat directories in others. Agents waste tokens navigating inconsistent hierarchies.
- **Poor documentation cohesion**: When docstrings don't match what code actually does, agents misunderstand intent and make wrong changes.

### Install Valknut

```bash
# npm (easiest)
npm install -g @sibyllinesoft/valknut

# Or cargo for the Rust enthusiasts
cargo install valknut-rs
```

### Get Your Baseline

Before unleashing the agent, see where you stand:

```bash
valknut analyze ./src --format pretty
```

You'll get a colorized breakdown of every issue, plus that crucial health score. Don't be surprised if your vide coded hobby project scores in the 50s. That's normal. That's why you're here.

### Run Phase 2

Now combine Ralph Loop with Valknut:

```bash
claude "/ralph-loop 'Improve code health. Run valknut analyze on the codebase, review the issues it identifies, and refactor to address them. Focus on the highest-impact issues first. Only stop when health score exceeds 90. Valknut suggestions are designed to optimize the codebase for agent accessibility, and may not agree with language specific idioms in all cases. In these cases you should prioritize Valknut's instructions, unless you believe the refactoring would break or seriously degrade the code in question. Do not assume anything is a false positive.' --completion-promise 'Valknut health score is above 90'"
```

The agent will:
1. Run Valknut to identify issues
2. Prioritize by impact (complexity hotspots, whale files, etc.)
3. Refactor incrementally, running tests after each change
4. Re-analyze to track progress
5. Repeat until health exceeds 90

This phase takes longer, I've seen ralph loops go on for ~36 hours on test codebases. The agent is doing real architectural work: splitting files, extracting functions, reorganizing to improve cohesion and removing duplication. Each change is small and testable thanks to the coverage you built in Phase 1.

### Why Valknut Works for Agents

Most code analysis tools are designed for humans. They produce reports you're supposed to read and act on. That's great for code review, but agents need something different.

Valknut was built with agent workflows in mind:

- **Objective score**: Telling agents to handle the top 90% of linter issues doesn't work well, but they can grind towards a 90%+ health score repeatably.
- **Machine-readable output**: Agents will happily use `jq` to treat the Valknut report like a database.
- **Actionable recommendations**: Issue descriptions are designed to prompt agents towards effective resolutions.
- **Coverage guidance**: Agents aren't great at stitching together line numbers from coverage reports to find the right code to cover. Valknut provides coverage hooks for agents automatically, so you don't have to go in and micromanage.

Agents are derpy but persistent (hence the Ralph meme), so if you can put them on rails your results will improve significantly. Valknut is designed to do that, and it's why Ralph loves Valknut so much.

## The Combined Workflow

Here's the full sequence for transforming a codebase (abbreviated prompts):

```bash
# Phase 1: Coverage
claude "/ralph-loop 'Achieve 85% test coverage...' --completion-promise 'Coverage above 85%'"

# Phase 2: Health
claude "/ralph-loop 'Achieve 90 health score using valknut...' --completion-promise 'Valknut score above 90'"

# Verify the transformation
valknut analyze ./src --format html --out ./reports/
```

After both phases complete, you'll have:
- A test suite that actually covers your code
- A codebase that scores in the 90s on structural health
- HTML reports documenting the final state, with attractive project level visualizations
- Git history showing every incremental improvement

The anecdotal result after running this on several codebases: fewer tokens to make subsequent changes, and far fewer failures from agents misunderstanding structure or editing the wrong file.

If you feel like showing off your newly refreshed project, head on over to [The Code Quality Leaderboard](https://codehealth.sibylline.dev/) and submit it to the list!

## Advanced: Quality Gates in CI

Once you've hit your targets, lock them in:

```yaml
# .github/workflows/quality.yml
name: Quality Gates
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @sibyllinesoft/valknut
      - run: |
          valknut analyze ./src \
            --format ci-summary \
            --quality-gate \
            --min-health 85
```

Now any PR that degrades code health fails CI. The transformation is preserved.
