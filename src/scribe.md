---
eleventyNavigation:
  key: Scribe
  parent: Products
  order: 5
layout: simple.njk
permalink: "/products/scribe/"
title: "Scribe – Intelligent Repository Bundling for LLMs"
description: "Stop dumping files and hoping for the best. Scribe uses PageRank centrality to build bundles that maximize LLM reasoning quality."
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
  title: "Scribe – Intelligent Repository Bundling for LLMs"
  description: "Stop dumping files and hoping for the best. Scribe uses PageRank centrality to build bundles that maximize LLM reasoning quality."
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
      <div class="title">Give Your LLM the Code That Matters</div>
      <div class="subtitle">PageRank-based file selection identifies what's actually important</div>
      <div class="subtitle">Sub-30 second analysis on 100k+ file repositories</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Repository Bundling as Information Retrieval</div>
      <div class="subtitle">Surgical precision: extract only what's needed to understand a specific function</div>
      <div class="subtitle">Transformer-aware positioning maximizes LLM attention utilization</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Context That Makes LLMs Smarter</div>
      <div class="subtitle">Progressive demotion preserves critical information within any token budget</div>
      <div class="subtitle">Explainable selections show exactly why each file was included</div>
   </div>
</div>
{% set heroLogo = '/img/logos/scribe-large.webp' %}
{% set heroLogoAlt = 'Scribe Logo' %}
{% set heroLogoHeight = '61px' %}
{% set heroTitle = 'Repository Intelligence for LLMs' %}
{% set heroSubtitle %}
<div class="rotating-banners"></div>
{% endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<div class="centered-section">
<h3>Scribe uses research-grade graph algorithms to build bundles that maximize LLM reasoning quality—not just token count.</h3>
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
   <p><strong>Most repository bundlers are glorified file concatenators.</strong> They dump your codebase into one giant blob and hope your LLM figures it out. But transformers don't attend equally to all tokens—they focus on the beginning and end while the middle gets lost. Random file ordering wastes precious context on boilerplate while burying your critical architecture.</p>
   <p><strong>Scribe treats repository bundling as an information retrieval problem.</strong> PageRank centrality identifies truly important files. Surgical covering-set selection extracts only what's needed to understand specific functions. Transformer-aware positioning puts high-priority code where LLMs actually pay attention. <strong>The result: bundles that make LLMs reason better, not just longer.</strong></p>
</div>
<div class="content-section">

## Why File Dumping Fails

   <div class="services-grid">
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="compass"></i> Context Overload</h3>
         <div class="service-summary">
            <p><strong>LLMs drown in irrelevant files, losing focus on what matters.</strong> Critical architecture gets buried under config files, tests, and generated code.</p>
         </div>
         <div class="service-details">
            <p><strong>Your LLM is burning tokens on noise.</strong> Without intelligent selection, models treat package.json the same as your core business logic. They'll analyze thousands of test files while missing the central patterns that define your system.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"When I received the full repository dump, I was immediately overwhelmed. 15,000+ files with no signal about what actually mattered. I spent equal attention on generated migrations, node_modules dependencies, and build artifacts as I did on core business logic.</p>
                  <p>The result was shallow understanding everywhere and deep insight nowhere. I mentioned trivial config details alongside critical architectural decisions because I couldn't distinguish signal from noise. My analysis was practically useless for understanding the system's actual design."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="isolated">
         <h3><i data-lucide="scissors"></i> Missing Dependencies</h3>
         <div class="service-summary">
            <p><strong>Random file selection misses critical relationships.</strong> LLMs get partial context without understanding how components actually connect.</p>
         </div>
         <div class="service-details">
            <p><strong>Context without connections is just confusion.</strong> LLMs see individual files but miss import graphs, inheritance hierarchies, and data flow patterns. They recommend changes that break unseen dependencies.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I was given a handful of TypeScript components but without their dependencies and imports, I couldn't understand how they worked together. I could see individual functions but not the data flow.</p>
                  <p>When I suggested improvements, I had no idea if they'd break downstream consumers. I was analyzing components in isolation that were part of a complex dependency tree. My recommendations looked good for individual files but would have caused cascading failures."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="overload">
         <h3><i data-lucide="cpu"></i> No File Prioritization</h3>
         <div class="service-summary">
            <p><strong>Equal treatment of unequal importance.</strong> LLMs waste attention on boilerplate while missing the patterns that define your system.</p>
         </div>
         <div class="service-details">
            <p><strong>Not all files deserve equal attention.</strong> Without centrality analysis, LLMs can't tell the difference between your main entry point and a random utility. They analyze everything with the same weight.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I treated every file with equal importance. I spent as much time on a simple constants file as the main router configuration. I dove deep into utility functions while barely skimming the core business logic.</p>
                  <p>Without understanding file centrality in the dependency graph, I optimized the wrong things. I suggested improvements to rarely-used utilities while overlooking performance bottlenecks in critical path components."</p>
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
   <p>Scribe is the intelligent repository bundler built in Rust for production-grade performance. While other tools simply concatenate files, <strong>Scribe uses research-grade graph algorithms, surgical entity selection, and transformer-aware context positioning</strong> to build bundles that help LLMs truly understand your code.</p>

   <p><strong>Scribe identifies what's genuinely important.</strong> PageRank centrality—the same algorithm Google uses to rank web pages—analyzes your dependency graph to find the files that matter most. Multi-dimensional scoring combines documentation coverage, git churn, import centrality, and entrypoint detection into explainable file rankings.</p>

   <p><strong>Scribe exploits transformer architecture.</strong> Research shows LLMs attend heavily to the beginning and end of context, with the middle getting less attention. Scribe's 3-tier positioning places high-priority, query-relevant files at the HEAD (20%), supporting context in the MIDDLE (60%), and core functionality at the TAIL (20%). <strong>Same tokens, better reasoning.</strong></p>

   <p><strong>Scribe degrades gracefully.</strong> Hit your token budget and most tools either fail or arbitrarily truncate. Scribe uses progressive demotion: FULL content → AST-based CHUNKS → type SIGNATURES only. Maximum information density within any budget.</p>
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
