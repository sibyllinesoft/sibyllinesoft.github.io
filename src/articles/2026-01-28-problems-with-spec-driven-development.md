---
title: "The Problems with Spec Driven Development"
description: "Specs seem great in theory, but agents treat them more like suggestions than contracts"
date: 2026-01-28
published: true
tags:
  - articles
  - agents
  - validation
  - software-engineering
  - opinion
layout: article.njk
image: "/img/optimized/article-problems-spec-driven-development.webp"
---

Spec driven development has gotten a lot of hype over the last few months, and the idea is great: work with an agent to plan your software, then decompose it into a clear spec and bite sized tasks that an agent is more likely to create successfully. Unfortunately, like most cases the reality doesn't live up to the hype. Current spec driven development tools deliver the theater of spec driven development, but when it comes time to implement, the agents treat the specs more like suggestions. You end up spending a ton of time discussing and reviewing, just for the agent to follow 70% of what you told it.

Imagine this in literally any other engineering field. Blueprints that are just rough suggestions? Your building is never going to get built. Schematics with hand waiving for dimensions? Whatever it is, it's almost certainly never going to work. We get away with it in software engineering by banging our heads a wall repeatedly (the "stochastic method") because the cost of failure in software is generally low, but I don't think things have to be this way, and it's not scalable, as agents are quickly revealing.

The core problem with all these tools is that markdown does a poor job of capturing intent. They'll burn 50,000 tokens eliciting precise requirements from you, which they'll turn around and lossily summarize in 15,000 tokens worth of markdown. Even if you spend the time thoroughly reviewing and correcting the spec, when they actually implement it, agents will typically only do 80-90% of what they were instructed to do, and you can't tell what's missing until you actually QA the software.

I believe that spec driven workflows are a prerequisite to unlocking fully autonomous engineering, but I don't think the workflows we currently have are up to the task. Given this, I've thought a lot about how we can fix the problems with spec driven development.

One interesting thing to note is that all these spec driven development tools have essentially ignored a lot of hard won software engineering wisdom. Software specifications have a rich history, and there's a whole field of software modelling built around making sure complex software provably does what it's supposed to do. These tools saw limited adoption in the past because they were overkill in most cases, but they solved real problems that are very similar to the ones we're facing now and agents make them accessible like never before.

To be fair, many of the assumptions made in these fields are tuned to human software engineers and may not hold when applied to agentic development. We need to have an open mind, examine things from first principles and perform experiments. My suspicion is that having been trained on human text, many human biases have been subtly encoded in these models.

The agent community has been hyped about orchestration lately, but [the bottleneck in software delivery is currently validation](https://sibylline.dev/articles/2026-01-27-stop-orchestrating-and-start-validating/). Without automated validation, the total quality of the software you're delivering remains constant; you're shipping more, but the quality is proportionately lower given constant effort.

Traditional software modelling solves both of these problems. They give you specs for free, since models are just structured specs that can be composed iteratively ("vibed"), with the upside that they come with tools for visualization and validation, so you don't have to debug markdown line by line.

I've been thinking for months about the right pieces of prior art to draw upon given the trajectory we're on in software engineering. So far I've settled on:


* Gherkin Behavior models. These are great because they're easy to understand and there's a lot of tooling support, so once you've defined your behaviors you can generate E2E tests and diagrams easily.
* C4 systems schemas. Fairly simple and expressive, already has some traction and reasonable tool support. These are a good substrate for code generation, and they make it easy to understand what agents are building at a high level and quickly course correct architectural issues.
* OpenAPI contracts. JSON schema isn't great, but for interoperability it's what you're stuck with, though there are some options I'll talk about later.
* UML sequence diagrams. People are familiar with these and understand them, and they can serve as a single source of truth for documentation and code generation.

There are a lot of other software modelling tools, but this was the subset that seemed immediately applicable to a wide range of problems given awareness and a little bit of extra tooling.

If you take one thing away from this, it's that you should ditch the markdown specs and start getting your agent to create structured artifacts that you can validate and transform.

One issue with all those tools is that they exist in a vacuum. They're parts of a spec, but there's no validation between them, nor an expectation of what should be present or absent in the spec as a whole, only the correctness of individual pieces. That freedom gives agents rope to hang themselves; they don't know what done looks like, so if you tell them to implement structured specs you'll get wildly varying results.

The obvious answer is a "master" spec schema that constrains agents, so their behavior is more predictable. There are a few directions you can go with that.

OpenAPI already uses JSON schema, so re-using that would be elegant, but it's weakly expressive, so ultimately I found it a poor choice.

I considered using a programming language that's DSL friendly, but that can inflate toolchain dependencies and agents often struggle with overly "magical" DSLs.

The solution I ultimately landed on was a handy little language called [CUE](https://cuelang.org/) designed to "make it easy to validate data, write schemas, and ensure configurations align with policies." CUE is a declarative language that looks a lot like JSON with some extra bells and whistles, it's a tiny dependency (there's even a WASM version) and it lets you specify complex requirements elegantly in a way that things like JSON schema and many programming language type systems don't.

CUE is a great "lingua franca" for specifications because it can model OpenAPI schemas, Zod and Pydantic types, Java POMs, UML, etc. Being JSON adjacent while having strong consistency guarantees is a very nice property as well. 

When I started working on my spec driven development tool [Arbiter](https://github.com/sibyllinesoft/arbiter), the only thing I was sure of was that structured specs were the right way forward. I didn't have any other biases, but my hunch was that the best approach would leverage existing tools and try to emulate existing best practices in most ways. I'm still muddling through how to elegantly tie all these things together, but I think I'm getting pretty close now.

My philosophy with spec driven development is that the spec should be sufficient to reproducibly generate the system. Ideally, a good spec would let you delete your existing code base and regenerate a working version with a swarm of agents in short order. This is the sort of reliability we're going to need if we're going to move up the abstraction ladder from code to specifications.

This drove me to the realization that "issues" are part of the spec. They're usually treated as software defects, but that's an imperative framing. Through a declarative lens, issues are just new behavioral specifications with tighter bounds.

This framing of issues makes the dream of spec driven development a real possibility. Given the popularity of [Beads](https://github.com/steveyegge/beads), it's clear that people also like having a structured task log attached to their projects, so empirically it's a usability win. I think Beads is too bloated and noisy personally, but given the compelling reasons for something *like* Beads, I thought this was an element I should tackle thoughtfully.

This led me to the design I'm iterating on now:

* A master specification written in CUE that provides shared types and validates composition and correctness of child sections.
* A simple entity/relationship base schema with subtypes and metadata capable of modelling diverse systems.
* Re-use of off the shelf modelling tools whenever possible
* Template/Macro driven transformation of graph nodes/cliques using deterministic code generation for scaffolding, tests and documentation.
* Tasks and comments as first class queryable specification elements, associated to systems via relationships, letting your spec serve as a task log and knowledge graph.

To put the workflow differences front and center, instead of having a long conversation that results in a lossy summarization into markdown, my design proposes an agent model the software iteratively during the conversation, so you can course correct in real time rather than reviewing 10 pages of text after the fact. My design then proposes you feed that structured specification into code generation tools as a first step rather than delegate scaffolding to agents. Those code generation tools could be generated bespoke for your specific case by agents from examples, and it would still be a quality, consistency and performance win over having agents scaffold projects directly.

One important thing I've learned in this effort is that software projects vary so wildly that you need an expressive language with minimal assumptions to model them, and you need to make configurability and extensibility core design principles. CUE is great about compositional validation, and I designed the code generation to be completely overridden at a granular level.

Arbiter is still under heavy iteration, however the CLI, schema and generation logic have started to stabilize enough that I'm comfortable inviting people to play with it. I think there's room for a wide variety of spec driven development tools, but unstructured Markdown specs need to die in a dumpster fire; we as a community need to consolidate on a loose software project spec schema and format to enable tooling and interoperability. My hope is that Arbiter can serve as a replacement storage and verification layer for the existing spec driven development tools.

<div class="cta-section cta-section--centered article-github-cta">
  <a href="https://github.com/sibyllinesoft/arbiter" class="btn-unified btn-primary" target="_blank" rel="noopener noreferrer">
    <span class="btn-inner">
      Arbiter on GitHub
      <i data-lucide="github"></i>
    </span>
  </a>
</div>
