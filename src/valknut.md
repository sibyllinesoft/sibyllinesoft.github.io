---
eleventyNavigation:
  key: Valknut
  parent: Products
  order: 4
layout: simple.njk
title: "Valknut: Static Analysis Engine for AI-Guided Refactoring"
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
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Valknut Keeps You Shipping</div>
      <div class="subtitle">Transform sloppy code into maintainable software</div>
      <div class="subtitle">Reorganize your code to unlock the full power of your agents</div>
   </div>
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Valknut Tames Your Tech Debt</div>
      <div class="subtitle">Root out the underlying causes of bugs before they can occur</div>
      <div class="subtitle">Stop putting out fires and focus on building your product</div>
   </div>
      <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Valknut Empowers Your Agents</div>
      <div class="subtitle">Generate better code while slashing your inference bill</div>
      <div class="subtitle">Reduce errors while eliminate code duplication</div>
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
<h3>Valknut optimizes your codebase for long term velocity</h3>
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
   <p><strong>Vibe coding starts out great.</strong> You tell your agent to do things, and you come back ten minutes later to working software. Fast forward 50,000 lines of code and you have a labrynthian codebase that agents struggle with, full of duplication and architectural drift. <strong>The vibes have faded.</strong></p>
   <p><strong>You need a healthy codebase to keep shipping quickly.</strong> Messy codebases confuses agents and bias them towards writing lower quality code. Agents struggle refactor difficult codebases; they tend to get confused when refactoring just like they do when trying to create new code. <strong>Agents need guidance to keep your codebase healthy.</strong></p>
</div>
<div class="content-section">

##   Why Current AI Refactoring Fails

   <div class="services-grid">
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="compass"></i> Random Code Wandering</h3>
         <div class="service-summary">
            <p><strong>Agents explore without direction, wasting time on low-impact areas.</strong> Critical architectural problems go unnoticed while superficial issues get endless attention.</p>
         </div>
         <div class="service-details">
            <p><strong>Your agents are burning cycles on noise.</strong> Without urgency guidance, AI tools treat a missing semicolon the same as a circular dependency that's crushing team velocity. They'll spend hours perfecting indentation while technical debt compounds in critical pathways.</p>
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
         <h3><i data-lucide="scissors"></i> Isolated Refactoring</h3>
         <div class="service-summary">
            <p><strong>Piecemeal changes miss systemic relationships.</strong> Fix one file, break three others—agents create inconsistencies instead of solving root problems.</p>
         </div>
         <div class="service-details">
            <p><strong>Playing whack-a-mole with symptoms, not causes.</strong> Agents see individual code smells but miss the architectural patterns that created them. They'll extract a method here, rename a variable there—never addressing the coupling that's making your codebase unmaintainable.</p>
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
         <h3><i data-lucide="cpu"></i> Context Overload</h3>
         <div class="service-summary">
            <p><strong>Large codebases overwhelm agents completely.</strong> Without filtering, agents get lost in the noise and can't identify high-impact improvement areas.</p>
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
<div class="centered-section">

   <p>Fear not though, there's a solution to keep the good vibes rolling: give your agents a map. That's where Valknut comes in.<strong> Valknut gives agents a step by step plan they can follow to make your code cleaner, more organized and maintainable.</strong> No random walks through code space, no futile cycling, no nit picking, just a clear path to improved code quality.</p>
   
   <p>Under the hood, Valknut is a performance monster built on cutting-edge algorithms. We're talking SIMD-accelerated mathematical processing delivering 2-4x performance gains, Bayesian statistical normalization for robust analysis across challenging codebases, and LSH-based duplicate detection with sub-linear similarity search. <strong>Valknut analyzes 100k+ files in under 30 seconds while using less than 2GB of memory.</strong> Most tools choke on large codebases; Valknut laughs.</p>
   
   <p>Speed means nothing if the output is garbage though. Valknut is best in class here as well. It combines graph-based dependency analysis with centrality metrics (betweenness, eigenvector, PageRank-style importance), quantifies technical debt ratios with ROI-driven prioritization, and groups related problems into Impact Packs for systematic refactoring. <strong>This isn't your father's linter—it's a next-generation analysis engine that bridges traditional static analysis with modern AI-powered development workflows.</strong></p>

   <p><strong>Valknut goes beyond refactoring to help agents quickly find and test un-covered code.</strong> Standard coverage reports are hard for agents to read and act upon. Valknut groups uncovered code into blocks and provides agents with clear code pointers they can use to accurately identify untested code from coverage report data.</p>
</div>
<div class="content-section">
   <h2>Three Levels of Analysis: From Quick Wins to Architectural Transformation</h2>
   <div class="services-grid">
      <div class="service-card" data-service="quick-wins">
         <h3><i data-lucide="target"></i> Emergency Triage</h3>
         <div class="service-summary">
            <p><strong>Urgency scores guide agents to high impact problems.</strong> Stop your agents from nit-picking while critical architectural debt bleeds your productivity.</p>
         </div>
         <div class="service-details">
            <h4>Example Output:</h4>

```json
{
  "type": "god_function_detected",
  "severity": "critical", 
  "urgency": 0.96,
  "message": "Extreme cyclomatic complexity: 334.0 (13x over threshold)",
  "file": "src/detectors/complexity.rs",
  "metrics": {
    "cyclomatic_complexity": 334.0,
    "threshold_exceeded": "13.4x over limit",
    "maintainability_index": 0.0,
    "technical_debt_score": 100.0
  },
  "refactoring_type": "ExtractMultipleMethods",
  "estimated_impact": 95.0,
  "estimated_effort": 40.0,
  "priority_score": 2.38
}
```

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
            <p><strong>Impact Packs guide agents refactor safely and efficiently.</strong> Analytic plans keep agents on rails, so you can keep ratcheting up codebase quality.</p>
         </div>
         <div class="service-details">
            <h4>Example Impact Pack:</h4>

```json
{
  "type": "duplication_elimination_pack",
  "target": "Benchmark initialization patterns",
  "urgency": 0.85,
  "file": "benches/performance.rs",
  "patterns": [
    {
      "code": "group.bench_with_input(",
      "occurrences": 13,
      "locations": [83, 339],
      "estimated_effort": 5.0,
      "estimated_impact": 10.0,
      "priority_score": 2.0
    },
    {
      "code": "b.iter(|| {",
      "occurrences": 11, 
      "locations": [87, 343],
      "estimated_effort": 5.0,
      "estimated_impact": 10.0,
      "priority_score": 2.0
    }
  ],
  "refactoring_type": "EliminateDuplication",
  "benefit": "Consolidates 24+ duplicate benchmark patterns into reusable helper functions"
}
```

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
            <p><strong>Coverage Packs ensure no stone is left unturned.</strong> Complete analysis across all modules with dependency-aware refactoring plans for architectural overhauls.</p>
         </div>
         <div class="service-details">
            <h4>Example Coverage Pack:</h4>

```json
{
  "type": "coverage_gap_analysis",
  "target": "Uncovered configuration builder methods", 
  "urgency": 0.78,
  "file": "src/api/config_types.rs",
  "uncovered_lines": [
    {
      "line_number": 80,
      "code": "self",
      "context": "with_scoring_enabled method return",
      "hits": 0,
      "risk_level": "medium"
    },
    {
      "line_number": 81, 
      "code": "}",
      "context": "with_scoring_enabled method end",
      "hits": 0,
      "risk_level": "medium"
    },
    {
      "line_number": 141,
      "code": "// Error handling path",
      "context": "Configuration validation error branch", 
      "hits": 0,
      "risk_level": "high"
    },
    {
      "line_number": 142,
      "code": "return Err(ValidationError);",
      "context": "Error return statement",
      "hits": 0, 
      "risk_level": "high"
    }
  ],
  "test_recommendation": "Add tests for scoring configuration and error handling paths",
  "coverage_improvement": "18% increase in configuration module coverage"
}
```
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
<div class="centered-section">
<p>Valknut is built from the ground up to support autonomous coding. Technical debt is the single largest driver of vibe coding project failure (and project failure in general). With Valknut, your agents has the tool they need to keep your projects debt free.</p>
   <h2>Ready to Give Your AI Agents the Intelligence They Deserve?</h2>
   {% set primary = {
  "href": "https://github.com/sibyllinesoft/valknut",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% set secondary = {
  "href": "/products",
  "label": "View All Products",
  "icon": "arrow-left"
} %}
{% include "components/cta-buttons.njk" %}

<div class="content-section">
   <h2>Quick Start</h2>
   
   ```bash
   # Homebrew (macOS/Linux)
   brew install sibyllinesoft/tap/valknut

   # Cargo (Rust)
   cargo install valknut

   # From Source
   git clone https://github.com/sibyllinesoft/valknut
   cd valknut
   cargo install --path .
   ```

   <h3>MCP Server for Claude Code:</h3>

   Add this configuration to your Claude Code MCP settings:

   ```json
   {
     "mcpServers": {
       "valknut": {
         "command": "valknut",
         "args": ["mcp-stdio", "--config", ".valknut.yml"],
         "env": {}
       }
     }
   }
   ```

   Or use the Claude Code command:
   ```bash
   # Add Valknut MCP server to Claude Code
   claude-code mcp add valknut --command "valknut" --args "mcp-stdio --config .valknut.yml"
   ```

   <h3>Basic Analysis:</h3>

   ```bash
   # Quick analysis
   valknut analyze ./src

   # Generate JSON output for agents
   valknut analyze ./src --format json --out valknut-output/
   ```

</div>
<div>
   <h2>Command Line Reference</h2>

   ```bash
   # Main analysis command
   valknut analyze [PATH] [OPTIONS]
   
   # Structure refactoring recommendations
   valknut structure <PATH> [OPTIONS]
   
   # Impact analysis (cycles, clones, chokepoints)
   valknut impact <PATH> [OPTIONS]
   
   # MCP server for Claude Code integration
   valknut mcp-stdio [OPTIONS]
   
   # Configuration management
   valknut init-config
   valknut print-default-config
   valknut validate-config <CONFIG_FILE>
   
   # Utility commands
   valknut list-languages
   valknut mcp-manifest
   ```

   <h3>Analyze Command Options</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--format` | Output format (jsonl, json, yaml, html, markdown, csv, sonar, ci-summary, pretty) | jsonl |
   | `--out` | Output directory for reports | .valknut |
   | `--quality-gate` | Fail if thresholds exceeded | false |
   | `--max-complexity` | Maximum complexity score (0-100) | 75 |
   | `--min-health` | Minimum health score (0-100) | 60 |
   | `--max-debt` | Maximum technical debt ratio (0-100) | 30 |
   | `--min-maintainability` | Minimum maintainability index (0-100) | 20 |
   | `--max-issues` | Maximum total issues count | 50 |
   | `--max-critical` | Maximum critical issues count | 0 |
   | `--max-high-priority` | Maximum high-priority issues count | 5 |
   
   <h3>Structure Command Options</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--extensions` | File extensions to analyze (comma-separated) | auto-detect |
   | `--branch-only` | Only branch reorganization analysis | false |
   | `--file-split-only` | Only file splitting analysis | false |
   | `--top` | Maximum number of recommendations | 10 |
   | `--format` | Output format | json |
   
   <h3>Impact Command Options</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--cycles` | Enable cycle detection | false |
   | `--clones` | Enable clone detection | false |
   | `--chokepoints` | Enable chokepoint detection | false |
   | `--min-similarity` | Clone similarity threshold (0.0-1.0) | 0.85 |
   | `--min-total-loc` | Minimum clone group size (lines) | 60 |
   | `--top` | Maximum recommendations to show | 10 |

   <h3>MCP Server</h3>
   
   ```bash
   valknut mcp-stdio [OPTIONS]
   ```
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--config` | Configuration file path | .valknut.yml |
   | `--log-level` | Logging level (debug, info, warn, error) | info |
   | `--port` | TCP port (if using TCP mode) | stdio |

   <h3>CI/CD Integration</h3>

   ```bash
   # Fail build if quality thresholds exceeded
   valknut analyze --quiet \
     --quality-gate \
     --max-complexity 75 \
     --min-health 60 \
     --max-debt 30 ./src
   ```
   
   | Exit Code | Description |
   |-----------|-------------|
   | `0` | Analysis successful, quality gates passed |
   | `1` | Quality gates failed |
   | `2` | Analysis error or invalid configuration |
</div>
