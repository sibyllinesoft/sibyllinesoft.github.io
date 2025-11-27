---
eleventyNavigation:
  key: Arbiter
  parent: Products
  order: 2
layout: simple.njk
title: "Arbiter – Spec Compiler & Rails for AI Agents"
description: "Compile agent-authored specs into synchronized code, tests, infra, and docs—enforced in CI."
enableModals: true
stylesheets:
  - "/styles/components/modal.css"
  - "/styles/components/service-cards.css"
  - "/styles/components/section-layouts.css"
  - "/styles/components/product-features.css"
  - "/styles/arbiter.css"
scripts:
  - "/js/modals.js"
  - "/js/arbiter-animation.js"
openGraph:
  title: "Arbiter – Spec Compiler & Rails for AI Agents"
  description: "Compile agent-authored specs into synchronized code, tests, infra, and docs—enforced in CI."
  type: website
  image: "/img/arbiter-portal-screenshot.png"
jsonLD:
  "@context": "https://schema.org"
  "@type": SoftwareApplication
  "name": "Arbiter"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Cross-platform"
  "offers":
    "@type": "Offer"
    "price": "0"
    "priceCurrency": "USD"
    "description": "Free CLI"
  "sameAs": "https://github.com/sibyllinesoft/arbiter"
---

<!-- Hidden data for rotating banners - customize this for Arbiter -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Ship Quality Software Faster</div>
      <div class="subtitle">Skip the false starts and rework with validated specs that compile to code</div>
      <div class="subtitle">Make better decisions with realtime collaborative spec building</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Do Less, Build More</div>
      <div class="subtitle">Specify your software in minutes with quickstart templates and streamlined workflows</div>
      <div class="subtitle">Compile your specs into high quality code, tests and docs based on customizable rules</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Collaborate With Clarity</div>
      <div class="subtitle">Understand projects in seconds with the spec workbench</div>
      <div class="subtitle">See team member changes in realtime, revert mistakes anytime</div>
   </div>
</div>
{% set heroLogo = '/img/logos/arbiter-large.png' %}
{% set heroLogoAlt = 'Arbiter Logo' %}
{% set heroLogoHeight = '72px' %}
{% set heroTitle = 'Spec Compiler & Rails for AI Agents' %}
{% set heroSubtitle %}
<div class="rotating-banners"></div>
{% endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<div class="centered-section">
<h3>Arbiter produces software specifications that can be compiled into code, tests, documentation and infrastructure in minutes</h3>
   {% set primary = {
  "href": "https://valknut.sibylline.dev",
  "label": "Read the Docs",
  "icon": "book-open"
} %}
{% set secondary = {
  "href": "https://github.com/sibyllinesoft/valknut/",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% include "components/cta-buttons.njk" %}
   <p><strong>Markdown specs don't work.</strong> They're a chore to read, imprecise, and agents treat them more like suggestions than constraints. Code conventions get ignored. Tech debt accrues.</p>
   <p><strong>Arbiter's structured specs produce clean, consistent code.</strong> Stop trying to tame slop and start building real software at the speed of vibes.</p>

</div>
<div class="content-section">
   <h2>Arbiter's Competitive Edge</h2>
   <div class="services-grid">
      <div class="service-card" data-service="mathematical-correctness">
         <h3><i data-lucide="shield-check"></i> Specs are Contracts</h3>
         <div class="service-summary">
            <p><strong>What you spec is what you get.</strong> Say goodbye to agent drift and architectural slop, and hello to consistent, predictable code.</p>
         </div>
         <div class="service-details">
            <p><strong>Project specs use a structured, typed language.</strong> Analyze and validate your specs instantly. See if critical pieces are missing before you start to build.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"Arbiter pulled constraint-backed CUE specs out of our brownfield monorepo in minutes, then wired the generated checks straight into GitHub so agents can't merge drift."</p>
                  <p>"Customising the templates with a few TypeScript hooks kept the spec declarative while the generated code matched our stack. It finally feels like humans and agents are working from the same score."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Codex
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="full-system">
         <h3><i data-lucide="layers"></i> Full-Stack Generation & Sync</h3>
         <div class="service-summary">
            <p><strong>Use your spec to generate code and scaffolding.</strong> Stubs, tests, docs and infrastracture with a single command.</p>
         </div>
         <div class="service-details">
            <p><strong>Arbiter does code generation your way.</strong> Every stage of code generation can be overridden to produce exactly the output you demand. Stop burning tokens generating boilerplate and refocus that energy on building great products.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"The importer mapped our existing services into CUE, then the CLI regenerated TypeScript APIs, PostgreSQL migrations, Terraform modules, and Playwright specs without trampling custom code. Agents only touch the parts humans actually care about."</p>
                  <p>"Every template override lived right beside the spec, so rerunning Arbiter after a change kept the stack synchronized instead of creating churn."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Codex
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="github-integration">
         <h3><i data-lucide="git-branch"></i> Collaborative Specification</h3>
         <div class="service-summary">
            <p><strong>Build specs together with our real-time spec workbench.</strong> See what's being built in a simple visual interface.</p>
         </div>
         <div class="service-details">
            <p><strong>Visual collaboration between humans and agents.</strong> The spec workbench provides a real-time view of your specifications as they're being built, making it easy to review, refine, and validate agent-generated specs before committing to implementation.</p>

            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"The workbench turned spec review from a chore into a conversation. I could see exactly what the PM agent was building in real-time, catch issues early, and guide it toward what we actually needed."</p>
                  <p>"Instead of reading through pages of markdown hoping I didn't miss something critical, I had a visual representation of the entire system architecture. Missing endpoints and inconsistent schemas jumped out immediately."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Codex
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
   </div>
</div>
<div class="content-section">
<div class="section-header">
<span class="kicker">Agent Driven</span>
<h2>How Does it Work?</h2>
<p>Arbiter provides an agent-optimized CLI for spec management. Just provide the CLI to the agent and instruct them to create an implementation spec, then examine the output in the spec workbench and make corrections if required. Once the spec is good, the CLI can automatically generate code for it!</p>
<p>
Arbiter is designed to be unopinionated about how you do spec-driven development. If you already know exactly what you need to build and you just want to generate clean code and tests quickly, Arbiter makes that easy. If you like to use a heavyweight spec workflow and you want more consistent, reliable generation, that's easy too.
</p>
<p>For users of tools like SpecKit or BMAD, you can take the completed spec they produce and have your agent create an Arbiter project from it. This makes it easier to review the implementation plan, and customizable generation engine produces higher quality, more consistent code.</p>
</div>
<figure class="workflow" aria-label="Conversation to code workflow">
  <div class="workflow-row">
    <div class="node">PM Agent</div>
    <i data-lucide="arrow-right" class="workflow-arrow-right"></i>
    <p class="note">PM agent drives Arbiter CLI/MCP to build a <em>constraint-backed spec</em>.</p>
  </div>
  <div class="workflow-row arrow-row">
    <i class="arrow" data-lucide="arrow-down" aria-hidden="true"></i>
  </div>
  <div class="workflow-row">
    <div class="node">Constraint Spec</div>
    <i data-lucide="arrow-right" class="workflow-arrow-right"></i>
    <p class="note">Arbiter compiles specs into <em>validation rules, tests, scaffolding, and docs</em>.</p>
  </div>
  <div class="workflow-row arrow-row">
    <i class="arrow" data-lucide="arrow-down" aria-hidden="true"></i>
  </div>
  <div class="workflow-row">
    <div class="node">Execution Agents</div>
    <i data-lucide="arrow-right" class="workflow-arrow-right"></i>
    <p class="note">Execution agents implement <em>inside those constraints</em>; Version Control &amp; CI keep everything in sync.</p>
  </div>
  <figcaption class="caption">Workflow coordination through constraint specs</figcaption>
</figure>
</div>
<div class="content-section">
<div class="section-header">
<span class="kicker">Real-time Monitoring</span>
<h2>Watch the System Emerge</h2>
<p class="lead"><strong>Real-time docs and diagrams provide auditability and clear stakeholder communication</strong>—architecture, API docs, and test results update live as agents work.</p>
</div>

The spec workbench provides a WebSocket-based event system that keeps teams synchronized as specifications evolve:

- **Live Architecture Diagrams**: See your system architecture update in real-time as services, endpoints, and dependencies are added to the spec
- **Instant Validation Feedback**: CUE constraint violations surface immediately—catch type mismatches, missing fields, and broken references before they become code
- **Generation Progress Tracking**: Watch as Arbiter compiles specs into code, tests, docs, and infrastructure manifests
- **Change Attribution**: Every modification is tracked with timestamps and authorship, so you know exactly who changed what and when
- **Monaco Editor Integration**: Full CUE syntax support with autocomplete, error highlighting, and inline documentation

The workbench turns spec review from a chore into a conversation. Instead of reading through pages of markdown hoping you didn't miss something critical, you get a visual representation of the entire system architecture where missing endpoints and inconsistent schemas jump out immediately.
</div>

<div class="content-section">
<h2>Arbiter vs. Markdown Specs</h2>
<p>Traditional documentation tools create static artifacts that drift from reality. Arbiter compiles conversational requirements into <strong>executable specifications</strong> that stay synchronized with your code through CI enforcement.</p>
<div class="comparison-grid">
   <div class="comparison-item">
      <h4>Traditional Tools</h4>
      <ul class="text-left">
         <li class="text-left">Static documentation</li>
         <li class="text-left">Manual updates required</li>
         <li class="text-left">No enforcement mechanism</li>
         <li class="text-left">Best-effort</li>
      </ul>
   </div>
   <div class="comparison-item">
      <h4>Arbiter</h4>
      <ul class="text-left">
         <li class="text-left">Executable specifications</li>
         <li class="text-left">Auto-updated from code changes</li>
         <li class="text-left">CI-enforced constraints</li>
         <li class="text-left">Constraint-validated consistency</li>
      </ul>
   </div>
</div>

<div class="content-section">

   <h2>Legacy Codebases? No Problem.</h2>

   <p>Arbiter's plugin-based importer analyzes existing repositories to bootstrap specifications from real projects—complete with confidence scoring and provenance tracking.</p>

   <h3>What the Importer Detects</h3>

   <p>Point Arbiter at any codebase and it automatically identifies:</p>

   - **Services**: HTTP APIs, web services, microservices with framework detection (Express, FastAPI, Actix, Gin)
   - **Databases & Infrastructure**: PostgreSQL, Redis, Docker configs, Kubernetes manifests
   - **Frontend Applications**: React components, Vue apps, routing structures
   - **Background Jobs**: Workers, schedulers, queue consumers
   - **Binaries & CLIs**: Command-line tools and executables
   - **Schemas**: Database schemas, API contracts, type definitions

   <h3>How It Works</h3>

```bash
# Import from GitHub (fetches branch metadata)
arbiter init --github-url https://github.com/org/project

# Import from local checkout
arbiter init --local-path ../my-existing-project

# Enable deeper analysis for complex repos
arbiter init --local-path ../project --deep-analysis

# Speed up large monorepos
arbiter init --local-path ../project --target-languages ts,go
```

   <p>The importer follows a five-stage pipeline: <strong>Discovery</strong> (file scanning) → <strong>Parse</strong> (evidence collection) → <strong>Infer</strong> (artifact detection) → <strong>Normalize</strong> (deduplication) → <strong>Validate</strong> (consistency checks). Every detected artifact includes confidence metrics and detailed provenance explaining exactly how it was identified.</p>

   <p><strong>The result:</strong> a comprehensive spec of your current architecture with clear constraints for agents and a validated baseline for safe, incremental collaboration. Agents can only touch the parts you actually care about—everything else stays protected by the spec.</p>
</div>
