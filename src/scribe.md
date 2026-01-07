---
eleventyNavigation:
  key: Scribe
  parent: Products
  order: 5
layout: simple.njk
permalink: "/products/scribe/"
title: "Scribe – Make AI Agents 10x More Efficient"
description: "LSP gives agents symbol lookup. Scribe gives them understanding. One call returns a function and all its dependencies—no iterative discovery, no wasted turns."
enableModals: true
stylesheets:
  - "/styles/components/modal.css"
  - "/styles/components/service-cards.css"
  - "/styles/components/section-layouts.css"
  - "/styles/components/product-features.css"
  - "/styles/valknut.css"
scripts:
  - "/js/valknut-banners.js"
openGraph:
  title: "Scribe – Make AI Agents 10x More Efficient"
  description: "LSP gives agents symbol lookup. Scribe gives them understanding. One call returns a function and all its dependencies—no iterative discovery, no wasted turns."
  type: website
  image: "/img/optimized/product-scribe.webp"
jsonLD:
  "@context": "https://schema.org"
  "@type": SoftwareApplication
  "name": "Scribe"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Cross-platform"
  "offers":
    "@type": "Offer"
    "price": "0"
    "priceCurrency": "USD"
    "description": "Free CLI"
  "sameAs": "https://github.com/sibyllinesoft/scribe"
---

<!-- Hidden data for rotating banners -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Make AI Agents 10x More Efficient</div>
      <div class="subtitle">One call returns a function and all its dependencies</div>
      <div class="subtitle">No iterative discovery, no wasted turns, no missing context</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">LSP Gives Lookup. Scribe Gives Understanding.</div>
      <div class="subtitle">Transitive context expansion: everything needed to reason about code</div>
      <div class="subtitle">Complete dependency cone in a single tool call</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Stop Burning Tokens on Iterative Discovery</div>
      <div class="subtitle">Agents don't know what they don't know—Scribe does</div>
      <div class="subtitle">95%+ relevant context vs 40% with LSP iteration</div>
   </div>
</div>
{% set heroLogo = '/img/logos/scribe-large.webp' %}
{% set heroLogoAlt = 'Scribe Logo' %}
{% set heroLogoHeight = '61px' %}
{% set heroTitle = 'Complete Code Context in One Call' %}
{% set heroSubtitle %}
<div class="rotating-banners"></div>
{% endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<div class="centered-section">
<h3>Your agent has LSP access. Why isn't that enough?</h3>
   {% set primary = {
  "href": "https://scribe.sibylline.dev",
  "label": "Read the Docs",
  "icon": "book-open"
} %}
{% set secondary = {
  "href": "https://github.com/sibyllinesoft/scribe",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% include "components/cta-buttons.njk" %}
   <p><strong>LSP lets agents look up symbols one at a time.</strong> But to truly understand a function, you need more than its definition—you need every type it uses, every function it calls, every config it reads. With LSP, agents discover these dependencies iteratively: look up a function, see it calls another, look that up, see it uses a type, look that up... Each lookup is a tool call. Each tool call burns tokens and time.</p>
   <p><strong>Scribe provides transitive context expansion.</strong> Ask for a function and get everything in its dependency cone—types, called functions, constants, configs—in a single call. No iterative discovery. No missing context. No wasted turns. <strong>The result: agents that understand code on the first pass, not the fifth.</strong></p>
</div>
<div class="content-section">

## The Problem with Current Approaches

   <div class="services-grid">
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="repeat"></i> LSP: Iterative Discovery</h3>
         <div class="service-summary">
            <p><strong>Agents don't know what they don't know.</strong> Each symbol lookup reveals more dependencies, burning tool calls and tokens on discovery.</p>
         </div>
         <div class="service-details">
            <p><strong>LSP is designed for humans, not agents.</strong> A human developer knows when they have enough context. An agent doesn't. It looks up a function, sees it calls verify_password, looks that up, sees it uses PasswordHash, looks that up... 5-15 tool calls later, it might have enough context—or it might have missed a critical config constant.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I had LSP access and could look up any symbol. But when I tried to understand authenticate_user(), I fell into a rabbit hole. Each definition revealed more dependencies. After 8 lookups I thought I understood it—but I'd missed the AUTH_TIMEOUT constant that was causing the bug.</p>
                  <p>The problem isn't that LSP is bad. It's that I can't know when I'm done. I can't see the full dependency graph. I'm discovering it one symbol at a time, and that's slow and incomplete."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="isolated">
         <h3><i data-lucide="package"></i> Bundlers: Context Overload</h3>
         <div class="service-summary">
            <p><strong>Full dumps drown the signal in noise.</strong> Critical architecture gets buried under config files, tests, and generated code.</p>
         </div>
         <div class="service-details">
            <p><strong>More context isn't always better.</strong> Without intelligent selection, models treat package.json the same as your core business logic. They'll analyze thousands of test files while missing the central patterns that define your system.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"When I received the full repository dump, I was immediately overwhelmed. 15,000+ files with no signal about what actually mattered. I spent equal attention on generated migrations and build artifacts as I did on core business logic.</p>
                  <p>The result was shallow understanding everywhere and deep insight nowhere. My analysis was practically useless for understanding the system's actual design."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="overload">
         <h3><i data-lucide="search"></i> Grep: No Understanding</h3>
         <div class="service-summary">
            <p><strong>Text search finds strings, not meaning.</strong> Agents read whole files to find one function, missing dependencies entirely.</p>
         </div>
         <div class="service-details">
            <p><strong>Grep finds where, not what.</strong> When an agent greps for a function, it gets the file. But it doesn't know what else it needs. It reads an 800-line file for a 20-line function, then has to grep again for each dependency it discovers.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I grepped for the function and found it in auth.rs. I read the whole file—800 lines—when I only needed 20. Then I saw it called verify_password. Grep again. Read another whole file. Find another dependency. Grep again.</p>
                  <p>After 10 rounds of grep-and-read, I'd consumed 15,000 tokens and maybe 5% of it was actually relevant to my task."</p>
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
<h2>Why Scribe?</h2>
   <p>Scribe gives AI agents what they actually need: <strong>complete, relevant context in a single call.</strong> Built in Rust for production-grade performance, Scribe understands code structure—not just text.</p>

   <p><strong>Transitive context expansion.</strong> Ask for a function and get its complete dependency cone: the types it uses, the functions it calls, the configs it reads. One call, complete understanding. No iterative discovery, no missed dependencies, no wasted turns.</p>

   <p><strong>Surgical precision at entity level.</strong> Don't read 800 lines to understand a 20-line function. Scribe extracts exactly the entities you need—functions, types, constants—not entire files. 95%+ relevance vs. 5% with file-level tools.</p>

   <p><strong>Graph-based importance ranking.</strong> PageRank centrality identifies architecturally important code. When you need repository-wide context, Scribe selects files that matter—not just files that exist.</p>

   <p><strong>Token-budget aware.</strong> Scribe degrades gracefully within any budget: FULL content → AST-based CHUNKS → type SIGNATURES only. Maximum information density, always.</p>
</div>
<div class="content-section">
   <h2>From Surgical Selection to Full Repository Intelligence</h2>
   <div class="services-grid">
      <div class="service-card" data-service="quick-wins">
         <h3><i data-lucide="target"></i> Surgical Covering Sets</h3>
         <div class="service-summary">
            <p><strong>Target a specific function and get exactly what's needed.</strong> Automatic transitive dependency computation returns the minimal file set for understanding.</p>
         </div>
         <div class="service-details">
            <h4>Example Usage:</h4>

```bash
# Get only files needed to understand authenticate_user
scribe --covering-set "authenticate_user" \
       --entity-type function \
       --max-files 20
```

            <p>Scribe computes the transitive closure of dependencies and dependents, returning exactly what your LLM needs—nothing more. Every file includes explainable inclusion reasons: target, direct dependency, transitive, or centrality-based.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I finally have complete context for the specific thing I'm analyzing, without drowning in the entire repository."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="systemic">
         <h3><i data-lucide="network"></i> PageRank Centrality</h3>
         <div class="service-summary">
            <p><strong>Graph algorithms identify truly important files.</strong> The same approach Google uses to rank web pages, adapted for code dependency graphs.</p>
         </div>
         <div class="service-details">
            <h4>How It Works:</h4>
            <p>Scribe builds your import graph and runs PageRank with configurable damping and convergence detection. Files with high centrality—those that many others depend on—bubble to the top. Performance: 10ms for small repos, ~100ms for large ones.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"PageRank centrality shows me the files that actually matter to the system, not just the ones that happen to be large or recently modified."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="comprehensive">
         <h3><i data-lucide="layers"></i> Transformer-Aware Positioning</h3>
         <div class="service-summary">
            <p><strong>Put important files where LLMs actually pay attention.</strong> 3-tier context positioning exploits transformer architecture for better reasoning.</p>
         </div>
         <div class="service-details">
            <h4>Context Positioning:</h4>
            <p>Transformers attend strongly to HEAD and TAIL positions, with MIDDLE getting less focus. Scribe positions query-relevant high-centrality files at the HEAD (20%), supporting context in the MIDDLE (60%), and core functionality at the TAIL (20%).</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"Same context length, dramatically better understanding. The positioning makes a real difference in my reasoning quality."</p>
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
<h2>Scribe vs. File Concatenators</h2>
<p>Most repository bundlers just list files. Scribe understands relationships.</p>
<div class="comparison-grid">
   <div class="comparison-item">
      <h4>File Concatenators</h4>
      <ul class="text-left">
         <li class="text-left">Dump all files or manual selection</li>
         <li class="text-left">Random or alphabetical ordering</li>
         <li class="text-left">Truncate at token limits</li>
         <li class="text-left">No dependency awareness</li>
      </ul>
   </div>
   <div class="comparison-item">
      <h4>Scribe</h4>
      <ul class="text-left">
         <li class="text-left">PageRank centrality selection</li>
         <li class="text-left">Transformer-aware positioning</li>
         <li class="text-left">Progressive demotion (full → chunks → signatures)</li>
         <li class="text-left">Complete dependency graph analysis</li>
      </ul>
   </div>
</div>

<div class="content-section">
   <h2>Production-Grade Performance</h2>

   <p>Built in Rust with parallel processing via Rayon, Scribe handles repositories of any size:</p>

   - **Small repos:** < 1 second
   - **Medium repos:** ~5 seconds
   - **Large repos:** ~15 seconds
   - **100k+ files:** < 30 seconds

   <p>Memory scales from 50MB to ~2GB based on repository size. Persistent caching with signature-based invalidation enables incremental updates. Streaming architecture prevents memory overload on massive codebases.</p>

   <h3>Multi-Language Support</h3>

   <p>Tier-1 AST parsing for Python, JavaScript/TypeScript, Rust, and Go. Plus 15+ additional languages through tree-sitter integration. AST-based semantic chunking preserves critical functions and type signatures when reducing content.</p>
</div>

<div class="content-section">
   <h2>Quick Start</h2>

```bash
# Install from source
cargo install --path scribe-rs --locked

# Generate a Markdown bundle
scribe --style markdown --output bundle.md

# Create an interactive HTML editor
scribe --style html --editor --output bundle.html

# Surgical selection for a specific function
scribe --covering-set "authenticate_user" \
       --entity-type function \
       --max-files 20

# Token-budget aware selection
scribe --token-budget 100000 --style markdown
```

   <h3>Common Workflows</h3>

```bash
# Code review: recent changes with dependencies
scribe --git-aware --include-recent \
       --token-budget 30000 --output review.md

# Architecture overview: core files only
scribe --include "src/**" --exclude "**/*.test.*" \
       --centrality-weight 0.4 --output architecture.md

# AI analysis: balanced selection for understanding
scribe --algorithm heuristic \
       --token-budget 50000 --style json \
       --output ai-context.json
```
</div>

<div class="centered-section">
   <h2>Ready to Give Your LLM Context That Actually Works?</h2>
   <p>Stop dumping files and hoping for the best. Build bundles that maximize LLM reasoning quality.</p>
   {% set primary = {
  "href": "https://scribe.sibylline.dev",
  "label": "Read the Docs",
  "icon": "book-open"
} %}
{% set secondary = {
  "href": "https://github.com/sibyllinesoft/scribe",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% include "components/cta-buttons.njk" %}
</div>
