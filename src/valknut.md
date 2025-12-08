---
eleventyNavigation:
  key: Valknut
  parent: Products
  order: 4
layout: simple.njk
permalink: "/products/valknut/"
title: "Valknut: Code Intelligence for Agents"
description: "Stop AI agents hunting blindly. Precise problem roadmaps with 0-1 urgency scores guide agents to highest-impact issues first."
enableModals: true
stylesheets:
  - "/styles/components/modal.css"
  - "/styles/components/service-cards.css"
  - "/styles/components/section-layouts.css"
  - "/styles/components/product-features.css"
  - "/styles/valknut.css"
scripts:
  - "/js/valknut-banners.js"
---

<!-- Hidden data for rotating banners - customize this for Valknut -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Write Code That Keeps You Shipping</div>
      <div class="subtitle">Transform sloppy code into scalable, maintainable software</div>
      <div class="subtitle">Reorganize your code to unlock the full power of your agents</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Don't Let Tech Debt Drag You Down</div>
      <div class="subtitle">Root out the underlying causes of bugs before they occur</div>
      <div class="subtitle">Stop putting out fires and focus on building your product</div>
   </div>
      <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Unleash the Full Power of AI</div>
      <div class="subtitle">Agents generate better code while slashing your inference bill</div>
      <div class="subtitle">Agents stay focused and need fewer interventions</div>
   </div>
</div>
{% set heroLogo = '/img/logos/valknut-large.webp' %}
{% set heroLogoAlt = 'Valknut Logo' %}
{% set heroLogoHeight = '61px' %}
{% set heroTitle = 'Ship Better Software, Faster' %}
{% set heroSubtitle %}
<div class="rotating-banners"></div>
{% endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script src="/js/trefoil-animation.js"></script>
<div class="centered-section">
<h3>Valknut gives you a plan to optimize your codebase for long term scalability, maintainability and velocity.</h3>
{% set tertiary = {
  "href": "https://valknut.sibylline.dev/report-dev.html",
  "label": "View Demo",
  "icon": "play-circle"
} %}
{% set primary = {
  "href": "https://github.com/sibyllinesoft/valknut/",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% set secondary = {
  "href": "https://valknut.sibylline.dev",
  "label": "Read the Docs",
  "icon": "book-open"
} %}
{% include "components/cta-buttons.njk" %}
   <p><strong>Vibe coding started out great.</strong> You tell your agent to do things, and you come back ten minutes later to working software. Fast forward 50,000 lines of code and you have a labyrinthine codebase that agents struggle with, full of duplication and architectural drift. <strong>The vibes are fading.</strong></p>
   <p><strong>You need a healthy codebase to keep shipping quickly.</strong> Messy codebases confuse agents and bias them toward lower-quality code. Refactoring is the answer, but agents struggle to refactor difficult codebases; they get just as confused trying to clean it up as they do when creating new code. <strong>Agents need guidance to keep your codebase healthy.</strong></p>
</div>
<div class="content-section">

## How Valknut Fixes AI Refactoring

   <div class="services-grid">
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="compass"></i> Changes That Matter</h3>
         <div class="service-summary">
            <p>Agents analyze superficially, wasting time on low-impact areas.</p><p><strong> Valknut directs agents to critical architectural problems.</strong></p>
         </div>
         <div class="service-details">
            <p><strong>Stop Wasting Cycles on Noise.</strong> Without urgency guidance, AI tools treat a missing semicolon the same as a circular dependency that's crushing team velocity. They'll spend hours perfecting indentation while technical debt compounds in critical pathways.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"When I first approached the Valknut codebase, I spent my entire initial session jumping between files with no clear strategy. I'd see a complex function in `pipeline_executor.rs`, then get distracted by imports that led me to `bayesian.rs`, then notice some error handling patterns that seemed inconsistent across modules.</p>
                  <p>I found myself making mental notes about potential improvements everywhere but had no way to prioritize them. Should I fix the missing documentation first? The unused variables? Or tackle that monster function that looked way too complex? Every direction seemed equally valid and equally overwhelming.</p>
                  <p>The result was analysis paralysis disguised as thoroughness. I was busy, I was learning the code, but I wasn't making any concrete progress toward actually improving anything."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="isolated">
         <h3><i data-lucide="scissors"></i> Eliminate Guesswork</h3>
         <div class="service-summary">
            <p>Agents simplify one thing and break three others.</p><p><strong> Valknut gives agents safe plans to simplify your code.</strong></p>
         </div>
         <div class="service-details">
            <p><strong>Stop playing whack-a-mole with symptoms, not causes.</strong> Agents see individual code smells but miss the architectural patterns that created them. They'll extract a method here, rename a variable there—never addressing the coupling that's making your codebase unmaintainable.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I thought I'd found a simple win: consolidating error handling patterns. I spotted similar `match` statements across multiple files and figured I could extract a common error handling utility. Seemed straightforward.</p>
                  <p>But when I started tracing through the dependencies, I discovered the error types were slightly different across modules. The CLI module expected different context than the MCP server. The pipeline executor had its own error recovery patterns. What looked like duplication was actually context-specific handling.</p>
                  <p>My 'simple' refactor would have required changing 8 files, updating error type definitions, and potentially breaking the error recovery logic I didn't fully understand. Instead of fixing the root architectural issue—inconsistent error handling design—I was about to create more inconsistency."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="overload">
         <h3><i data-lucide="cpu"></i> Skip Random Walks</h3>
         <div class="service-summary">
            <p>Large codebases overwhelm agents completely.</p><p><strong> Valknut gives agents a map to follow.</strong></p>
         </div>
         <div class="service-details">
            <p><strong>Agents drown in data without intelligence.</strong> Hand them a 100k-line codebase and they'll struggle to build a model of the system, preventing them from identifying real architectural improvements.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"The sheer volume of the Valknut codebase broke my ability to maintain coherent strategy. I'd start analyzing the core pipeline logic, then get pulled into understanding the Tree-sitter language adapters, then dive into the statistical normalization algorithms, then notice the duplicate detection system.</p>
                  <p>Each subsystem was fascinating and complex in its own right. But I couldn't hold all the relationships in my head simultaneously. I'd understand the complexity analysis in isolation, but lose track of how it connected to the refactoring recommendations. I'd grasp the scoring algorithms but forget how they influenced the pipeline execution.</p>
                  <p>Without a map of what actually mattered most, I treated every complexity equally. I spent as much time trying to understand the MCP protocol implementation as the core analysis algorithms, even though one is clearly more central to the system's purpose. The result was shallow understanding everywhere and deep insight nowhere."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
   </div>
</div>
<div class="content-section">
<h2>Why Valknut?</h2>
   <p><strong>Standard linters are noisy, focused on file level insights, and designed around humans as the primary consumers of code.</strong> Valknut is a state of the art static analysis tool designed for a world where agents are the primary consumers of code:</p>
   <ul>
   <li>Simple CLI designed for agent use</li>
   <li>Structured JSON for agents, HTML reports for humans</li>
   <li>Plans that effectively guide your agents</li>
   <li>Tips to optimize your code for agent performance</li>
   </ul>
   
   <p><strong>Valknut sees beyond surface level issues to identify patterns that cause agents to fail.</strong> Agent failure patterns are distinct, so time spent fixing standard linting issues is low value. Instead, spend time optimizing your codebase for agent performance. Well structured code can be the difference between one shotting a task and being stuck prompting for hours, so it shouldn't be an afterthought, it's the foundation of your ability to ship quickly.</p>

   <p><strong>Valknut can formulate plans for deeper structural optimization.</strong> Valknut uses AI to analyze a optimized bundle of your code's tech debt hot spots and identify high leverage optimizations. It then formulates them into a coherent plan that guides your agents through completing the work safely. Valknut uses extensive context engineering paired with Gemini's best in class long context reasoning to produce plans that are far superior to plans produced by Claude Code, Codex and Cursor.
   </p>

   <p><strong>Valknut ensures your code is well tested and documented.</strong> Agents struggle to act on the line numbers produced by standard coverage reports, and existing coverage renderers are designed for humans with a bunch of fluff that degrades context. When tasked with documenting code, agents burn tokens exploring then add bloat by adding low value comments to semantically clear code. Valknut gives agents clear targets so they test and document your code efficiently.</p>

   <p><strong>Valknut makes it easy to visualize project health at a glance.</strong> No more combing through a mountain of tool logs; see your problems instantly in a sleek graphical dashboard.</p>
</div>
<div class="content-section">
   <h2>From Quick Wins to Architectural Transformation</h2>
   <div class="services-grid">
      <div class="service-card" data-service="quick-wins">
         <h3><i data-lucide="target"></i> Emergency Triage</h3>
         <div class="service-summary">
            <p>Stop your agents from nit-picking while critical architectural debt bleeds your productivity.</p>
            <p><strong>Urgency scores guide agents to high impact problems.</strong></p>
         </div>
         <div class="service-details">
            <h4>Example Output:</h4>
            <p>Your agents focus on the code that matters most—tackling architectural debt that's actually slowing your team down instead of wandering through random style violations.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I actually know which problems matter instead of treating every lint warning like a crisis."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="systemic">
         <h3><i data-lucide="network"></i> Uncover Systemic Issues</h3>
         <div class="service-summary">
            <p>Analytic plans keep agents on rails, so you can keep ratcheting up codebase quality.</p>
            <p><strong>Impact Packs guide agents refactor safely and efficiently.</strong></p>
         </div>
         <div class="service-details">
            <h4>Example Impact Pack:</h4>
            <p>When your agents tackle an Impact Pack, they're solving the underlying architectural problem—not just treating symptoms that'll resurface later in different files.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I can fix root causes instead of playing whack-a-mole with the same issues in different files."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="comprehensive">
         <h3><i data-lucide="layers"></i> Accelerate Code Coverage</h3>
         <div class="service-summary">
            <p>Complete analysis across all modules with dependency-aware refactoring plans for architectural overhauls.</p>
            <p><strong>Coverage Packs ensure no stone is left unturned.</strong></p>
         </div>
         <div class="service-details">
            <h4>Example Coverage Pack:</h4>
            <p>Coverage Packs make it easy for agents to quickly identify un-covered code and craft tests to plug coverage caps.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I get a complete transformation plan instead of wandering around hoping I'm making progress."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
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
      <h2>Quick Start</h2>
   </div>

Using Valknut is easy! Just point your agent at this URL and tell it to install Valknut, then tell it to analyze your codebase and act on identified issues. If you want an Oracle generated refactoring plan, make sure you have `GEMINI_API_KEY` set in your environment.

### Homebrew (macOS)
```bash
brew tap sibyllinesoft/valknut
brew install valknut
```

### Cargo (cross-platform)
```bash
cargo install valknut-rs
```

### Build from Source
```bash
git clone https://github.com/sibyllinesoft/valknut
cd valknut
cargo build --release
```

### Examples
```bash
# Fast scan with JSONL output (default profile)
valknut analyze ./src --format jsonl

# HTML + Markdown bundle for stakeholders
valknut analyze ./ --format html --profile thorough

# Documentation audit with strict exit codes
valknut doc-audit --root . --strict
```

{% set tertiary = {
  "href": "https://valknut.sibylline.dev/report-dev.html",
  "label": "View Demo",
  "icon": "play-circle"
} %}
{% set primary = {
  "href": "https://github.com/sibyllinesoft/valknut/",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% set secondary = {
  "href": "https://valknut.sibylline.dev",
  "label": "Read the Docs",
  "icon": "book-open"
} %}
   {% include "components/cta-buttons.njk" %}
</div>
