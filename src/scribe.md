---
eleventyNavigation:
  key: Scribe
  parent: Products
  order: 5
layout: simple.njk
permalink: "/products/scribe/"
title: "Scribe – Stop Burning Tokens on Code Exploration"
description: "AI agents waste 80% of context on exploration and irrelevant code. Scribe returns complete, relevant context in one call—no grep chains, no iterative lookups, no wasted turns."
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
  title: "Scribe – Stop Burning Tokens on Code Exploration"
  description: "AI agents waste 80% of context on exploration and irrelevant code. Scribe returns complete, relevant context in one call—no grep chains, no iterative lookups, no wasted turns."
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
      <div class="title">Stop Burning Tokens on Code Exploration</div>
      <div class="subtitle">Agents waste 80% of context reading irrelevant code</div>
      <div class="subtitle">Scribe returns exactly what they need in one call</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">One Tool Call. Complete Context.</div>
      <div class="subtitle">No grep chains. No iterative lookups. No wasted turns.</div>
      <div class="subtitle">Every dependency, every type, every import—instantly.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Make AI Agents 10x More Efficient</div>
      <div class="subtitle">From 15 tool calls to 1. From 20k tokens to 3k.</div>
      <div class="subtitle">Fast, exact, and easy to integrate.</div>
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
<h3>Your AI agent is burning tokens just to find code</h3>
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
   <p><strong>Every time an agent explores your codebase, it's wasting context.</strong> Grep returns whole files when you need one function. Reading files pulls in hundreds of irrelevant lines. And finding all the code related to a feature? That's a maze of searches, reads, and guesswork—each step burning tokens on code that doesn't matter.</p>
   <p><strong>Scribe gives agents exactly what they need.</strong> One call returns a function and all its dependencies—types, helpers, components—with surgical precision. No exploration. No irrelevant code. No wasted context. <strong>The result: agents that understand code instantly, not after 15 tool calls.</strong></p>
</div>
<div class="content-section">

## The Problem with Current Approaches

   <div class="services-grid">
      <div class="service-card" data-service="overload">
         <h3><i data-lucide="search"></i> Grep + Read: Wasteful and Inexact</h3>
         <div class="service-summary">
            <p><strong>Text search finds fragments, not context.</strong> Grep returns a few lines around matches—not enough to understand. So agents read whole files, burning tokens on irrelevant code.</p>
         </div>
         <div class="service-details">
            <p><strong>Grep is the default—and the worst option.</strong> Search for "checkout", get 50 matches with a few lines of context each. Not enough to understand anything. So the agent reads whole files to see what's actually there. Then it finds imports to shared components. Grep those. Read more files. Repeat until you've burned 20,000 tokens on exploration alone.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I grepped for 'CheckoutForm' and got 3 lines of context—enough to see it existed, not enough to understand it. So I read the whole file—400 lines—when I only needed 80. Then I saw it imports useCart, formatCurrency, and Button. Grep again. Read three more whole files. Find more imports. Grep again.</p>
                  <p>After 12 rounds of grep-and-read, I'd consumed 18,000 tokens. Maybe 10% was actually relevant to understanding the checkout flow."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="repeat"></i> LSP: Exact but Slow</h3>
         <div class="service-summary">
            <p><strong>Symbol lookup is precise, but agents don't know when to stop.</strong> Each lookup burns a tool call, thinking tokens, and time.</p>
         </div>
         <div class="service-details">
            <p><strong>LSP is designed for humans clicking "Go to Definition."</strong> An agent using LSP must decide which symbols to look up, call the tool, process the result, decide what else to look up, call again... Each tool call invokes the model's reasoning. 8 symbol lookups means 8 rounds of thinking tokens on top of the content tokens.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"LSP gave me precise definitions, but I had to call it for every symbol: get_definition('CheckoutForm'), then get_definition('useCart'), then get_definition('CartItem'), then get_definition('formatCurrency')...</p>
                  <p>Each call was a tool use. Each tool use meant I had to reason about what to look up next. After 11 lookups I had the context—but I'd spent more tokens on the exploration process than on the actual code."</p>
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="isolated">
         <h3><i data-lucide="package"></i> Bundlers: Everything at Once</h3>
         <div class="service-summary">
            <p><strong>Full dumps drown the signal in noise.</strong> You wanted checkout code, you got the entire repository.</p>
         </div>
         <div class="service-details">
            <p><strong>More context isn't always better.</strong> Without intelligent selection, models treat package.json the same as your checkout logic. They'll wade through test files, config files, and unrelated features while the code they actually need gets lost in the noise.</p>
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"The bundler gave me 200 files. I needed maybe 15. The checkout feature was buried between authentication code, admin dashboards, and marketing pages.</p>
                  <p>I understood everything shallowly and nothing deeply. When asked about the checkout flow specifically, I had to guess which parts of the dump were relevant."</p>
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
   <p>Let's make this concrete. You ask an agent: <strong>"Refactor the checkout form to use the new payment API."</strong></p>
   <p>The agent needs to find all checkout-related code. Here's a typical frontend codebase:</p>

```
src/
  features/
    checkout/
      CheckoutPage.tsx      # 180 lines
      CheckoutForm.tsx      # 240 lines
      useCheckout.ts        # 90 lines
      PaymentSection.tsx    # 120 lines
  components/
    Button.tsx              # 45 lines
    Modal.tsx               # 85 lines
    FormInput.tsx           # 60 lines
  helpers/
    formatCurrency.ts       # 25 lines
    validateCard.ts         # 40 lines
  hooks/
    useApi.ts               # 70 lines
  types/
    cart.ts                 # 35 lines
    payment.ts              # 50 lines
```

   <p>CheckoutForm imports from components/, helpers/, hooks/, and types/. Those imports have their own dependencies. Here's how each approach handles it:</p>
</div>

<div class="content-section">
   <h3>Grep + Read: 12 tool calls, ~15,000 tokens</h3>

```
1. grep "checkout" → 8 matches across 6 files
2. read CheckoutPage.tsx → 180 lines (need ~80)
3. read CheckoutForm.tsx → 240 lines (need ~150)
4. grep "useCheckout" → 2 matches
5. read useCheckout.ts → 90 lines
6. grep "Button" → 47 matches (oops, too common)
7. read components/Button.tsx → 45 lines
8. grep "formatCurrency" → 3 matches
9. read helpers/formatCurrency.ts → 25 lines
10. grep "CartItem" → 5 matches
11. read types/cart.ts → 35 lines
12. read types/payment.ts → 50 lines
... still missing FormInput, validateCard, useApi
```

   <p><strong>Result:</strong> 12 tool calls, 700+ lines read, ~15,000 tokens consumed. Maybe 40% relevant. Still incomplete—missed dependencies the agent didn't think to search for.</p>
</div>

<div class="content-section">
   <h3>LSP: 11 tool calls, ~8,000 tokens + thinking overhead</h3>

```
1. get_definition("CheckoutForm") → definition + imports visible
2. get_definition("useCheckout") → 90 lines
3. get_definition("Button") → 45 lines
4. get_definition("FormInput") → 60 lines
5. get_definition("Modal") → 85 lines
6. get_definition("formatCurrency") → 25 lines
7. get_definition("validateCard") → 40 lines
8. get_definition("useApi") → 70 lines
9. get_definition("CartItem") → type definition
10. get_definition("PaymentMethod") → type definition
11. get_definition("ApiResponse") → type definition
```

   <p><strong>Result:</strong> 11 tool calls, each requiring the agent to decide what to look up next. More precise than grep, but each tool call triggers a reasoning cycle. The agent spends thinking tokens deciding "what else do I need?" after every lookup. Total context is smaller, but exploration overhead is high.</p>
</div>

<div class="content-section">
   <h3>Scribe: 1 tool call, ~3,000 tokens</h3>

```bash
scribe --covering-set "CheckoutForm" --entity-type component
```

```
# Returns: CheckoutForm + all transitive dependencies
# - CheckoutForm (target)
# - useCheckout (direct dependency)
# - Button, FormInput, Modal (component deps)
# - formatCurrency, validateCard (helper deps)
# - useApi (hook dep)
# - CartItem, PaymentMethod, ApiResponse (type deps)
#
# Each entity extracted surgically—not whole files.
# ~3,000 tokens, 95%+ relevant.
```

   <p><strong>Result:</strong> 1 tool call. No exploration. No "what should I look up next?" reasoning. Complete transitive dependency graph computed automatically. Every line returned is relevant to understanding CheckoutForm.</p>
</div>

<div class="content-section">
   <h3>The Comparison</h3>
   <div class="comparison-matrix">
      <table>
         <thead>
            <tr>
               <th></th>
               <th>Grep + Read</th>
               <th>LSP</th>
               <th>Scribe</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td class="metric-label">Tool Calls</td>
               <td class="metric-bad">12+</td>
               <td class="metric-warning">11</td>
               <td class="metric-good">1</td>
            </tr>
            <tr>
               <td class="metric-label">Content Tokens</td>
               <td class="metric-bad">~15,000</td>
               <td class="metric-warning">~8,000</td>
               <td class="metric-good">~3,000</td>
            </tr>
            <tr>
               <td class="metric-label">Thinking Overhead</td>
               <td class="metric-warning">Per read decision</td>
               <td class="metric-bad">Per lookup</td>
               <td class="metric-good">None</td>
            </tr>
            <tr>
               <td class="metric-label">Relevance</td>
               <td class="metric-bad">~40%</td>
               <td class="metric-warning">~70%</td>
               <td class="metric-good">95%+</td>
            </tr>
            <tr>
               <td class="metric-label">Completeness</td>
               <td class="metric-bad">Often incomplete</td>
               <td class="metric-warning">Agent decides</td>
               <td class="metric-good">Complete by construction</td>
            </tr>
         </tbody>
      </table>
   </div>
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
# Install via npm (recommended)
npm install -g @sibyllinesoft/scribe

# Or use directly with npx
npx @sibyllinesoft/scribe --help

# Or install via cargo
cargo install scribe-cli
```

```bash
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
