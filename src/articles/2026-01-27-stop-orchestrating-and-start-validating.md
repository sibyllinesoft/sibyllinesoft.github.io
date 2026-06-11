---
title: "Stop Screwing Around with Agent Orchestration, Your Bottleneck Is Validation"
description: "If you're building faster than you're validating you're disrespecting your users and wasting their time"
date: 2026-01-27
published: true
tags:
  - articles
  - agents
  - validation
  - software-engineering
  - opinion
layout: article.njk
image: "/img/optimized/article-orchestration-validation.webp"
---

As someone who is really into agent orchestration, with several projects that tie into orchestration loops, it hurts me a little to say this, but **orchestration is not your bottleneck** and if you're focused on orchestration without having solved validation, **you're just writing bad software faster and trying to foist your validation on your users.**

I get the love for orchestration, it's a drug being able to build things at warp speed. You have to be able to validate what you're building though, or you're doing a massive disservice to your users. If you haven't validated every piece of functionality you're marketing, you're being deceptive.

So, for the love of god, put down Gastown, Vibe Kanban or whatever tool du jour you're using to blow up your codebase, and make sure every claim in your README, every claim in your docs (you have docs, right?), every claim on your website is 100% tested and validated. Run actual rigorous benchmarks. Set up E2E tests driven by behavioral specs. Take your users seriously enough to deliver a good experience out of the box rather than trying to use hype to drive uptake then hoping they'll provide you with free QA.

You know what you're going to find when you start to do this? Aside from bootstrapping a level zero version of your ideas, your orchestration tools are a complete waste of time, because you don't know how to remove yourself from the validation loop efficiently enough for orchestration to be the bottleneck!

As someone who's been hyping the potential of advanced orchestration on social media for over a year, the cart has gotten out ahead of the horse, and we need to pump the brakes and focus our efforts on rigorous validation frameworks and making it easier to deliver provably correct software.

What can you do to help fix this situation we've found ourselves in?  There are a few quick wins.

* Lean into doctests heavily, and make sure your release CI (you do have release CI, right?) blocks on 100% doctest pass rate.
* Practice behavior driven development, create behaviors before writing code, and don't document or market anything that doesn't have E2E test coverage.
* Define SLAs for your software and set up stress tests to prove conformance.
* Create a manual QA matrix for things that E2E testing doesn't catch, and rigorously validate any releases.

Note I'm not telling you to review code harder or let the product languish in private beta. Just apply some rigor to how you validate, thoughtfully remove yourself from the loop where possible, and be methodical about manual evaluations rather than try to vibe your way to "works for me."

For all the advances in orchestration, human attention hasn't scaled. If you're not validating your software, you're asking your users to burn their attention validating your software for you, and I think that's unethical.
