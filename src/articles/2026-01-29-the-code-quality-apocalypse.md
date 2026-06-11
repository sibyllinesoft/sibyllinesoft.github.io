---
title: "Averting the Code Quality Apocalypse"
description: "Market forces are driving software engineering towards a crisis, it's up to us to avert it"
date: 2026-01-29
published: true
tags:
  - articles
  - agents
  - validation
  - software-engineering
  - opinion
layout: article.njk
image: "/img/optimized/article-code-quality-apocalypse.webp"
---

We're on the brink of a code quality apocalypse. Coding agents are getting really good at solving hard problems, but they're still really bad at writing maintainable code. Agents write big balls of mud, building around broken code rather than fixing it, piling lines of code wherever it's convenient rather than keeping things organized.

Because of the way agents are trained, this is unlikely to change. The expert evals being used by frontier labs are narrow and targeted on specific capabilities, code quality is hardly on the radar and effective evals for it are expensive, since it requires evaluating changes in a much larger context. Code quality is also somewhat subjective, so unless the eval companies have put great care into the experts they've hired for quality code quality evals (spoiler, they haven't, care isn't "scalable"), it's likely the end result of their feedback is a watered down, platitude driven middle of the road approach that doesn't fully meet anyone's idea of quality code.

Engineers have always had to fight tooth and nail with business stakeholders to carve out time to maintain code quality and long term project health, and now that the business folks think we have magic software that can code anything unconditionally, how willing do you think they're going to be to give us the time to focus on codebase health?

The reality is, if you want to maintain a healthy codebase, you're going to have to carve out unscheduled time or find ways to automate code quality. I find it quite ironic that the tools that are supposed to save us time are going to result in having to work even harder to avert future problems that management is unwilling to acknowledge and budget time for.

This was the future I saw when I started working on [Valknut](https://github.com/sibyllinesoft/valknut). I wanted a tool that could guide agents to write more maintainable code by default, so I could reduce the amount of time I had to spend in the loop manually directing them.

The first challenge in creating Valknut was coming up with an objective measure for code quality. This is a hotly debated subject and different language communities have different ideas of what code quality means.

After looking at prior art and thinking about the problem deeply, I came to the realization that code quality as defined for humans is an outdated metric, as agents are now the majority consumers of code. As such, we need a new definition of code quality weighted towards agent task success, while still being respectful of human code interaction patterns.

To figure out what sort of code agents liked, I started doing evals on agent tasks from various benchmarks, and analyzing task failures on my own codebase. I discovered a few common failure patterns:

- Agents burning tens of thousands of tokens trying to assemble the necessary context to complete their task due to oversized code files and lack of progressive disclosure in the codebase. This can balloon context usage an order of magnitude above what would be required if you manually curated the context. This context rot also makes the model dumber, so it's a double whammy.
- Failing to edit files. Agents will bend themselves into contortions with sed and python trying to edit unwieldy files for five or six turns at times, effectively poisoning the chat.
- Shadow clones. Agents (looking at you Claude) will at times prematurely determine that they need to create functionality that already exists in your codebase. Over time, this duplicated code diverges, leading to hard to track down bugs that can waste countless turns.
- Incomplete or out of date documentation confuses agents, causing them to do the wrong thing.

Traditional linters mostly focus on file-level issues, and while they can catch things like oversized/overcomplicated functions/modules, they don't provide any guidance on remediation,  they don't catch folder level organization issues, semantic cohesion violations or stale documentation. If you're just using a typechecker and a linter, you're still going to be very much in the loop, and you're going to be optimizing based on vibes rather than data.

I've had excellent results using Valknut to restructure codebases for agent consumption. [Using it with the Ralph loop](https://sibylline.dev/articles/2026-01-14-digital-alchemy-turning-slop-into-gold/) makes it easy to completely restructure a codebase in a hands-off manner.

As a sanity check, I wanted to validate how well Valknut's code quality analysis lined up with human perceptions of good code. To achieve this I created a [code quality leaderboard](https://codehealth.sibylline.dev/) using Valknut's output, and did a thorough sanity check on a wide variety of open source repos. The results were heartening; the top scoring codebases on the leaderboard were modular, decoupled, well documented and tightly focused projects, and the bottom scoring projects were skewed towards bloated, unfocused large legacy codebases that already had a reputation for poor quality.

Between Ralph, Gastown, Vibe Kanban and other tools, orchestration is the hot topic du jour, but if you're serious about building software with agents, [you should be focused on code quality and validation](https://sibylline.dev/articles/2026-01-27-stop-orchestrating-and-start-validating/). Your future self and your users will thank you.



