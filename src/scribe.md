---
eleventyNavigation:
  key: Scribe
  parent: Products
  order: 5
layout: simple.njk
title: "Scribe: Repository Intelligence for AI-Powered Development"
description: "Transform repositories into high-quality, contextually-rich bundles that supercharge AI assistance, code review, and documentation workflows."
enableModals: true
stylesheets:
  - "/styles/valknut.css"
scripts:
  - "/js/valknut-banners.js"
---

<!-- Hidden data for rotating banners - customize this for Scribe -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Scribe turns repositories into AI-ready intelligence</div>
      <div class="subtitle">Stop AI Agents From Getting Lost—SCRIBE Gives Them Context</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Repository Analysis That Understands Structure</div>
      <div class="subtitle">Transform your codebase into precise, contextual bundles</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Intelligent Code Selection for AI Workflows</div>
      <div class="subtitle">From scattered files to focused, dependency-aware documentation</div>
   </div>
</div>
{% set heroLogo = '/img/logos/scribe-large.webp' %}
{% set heroLogoAlt = 'Scribe Logo' %}
{% set heroLogoHeight = '61px' %}
{% set heroTitle = 'Scribe turns repositories into AI-ready intelligence' %}
{% set heroSubtitle -%}
<div class="rotating-banners">
         <div class="banner-container">
            <span class="banner-text" data-text="Transform your codebase into precise, contextual bundles">Transform your codebase into precise, contextual bundles</span>
         </div>
         <div class="banner-container">
            <span class="banner-text" data-text="From scattered files to focused, dependency-aware documentation">From scattered files to focused, dependency-aware documentation</span>
         </div>
      </div>
{%- endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script src="/js/trefoil-animation.js"></script>
<div class="centered-section">
   <p><strong>AI development starts out magical.</strong> You feed your agents a few key files, and they understand your codebase instantly. Fast forward to a 100k+ line repository and your agents are drowning in noise, unable to distinguish critical architecture from boilerplate. They hallucinate relationships that don't exist and miss the ones that do. Your AI-assisted development has slowed to a crawl as agents waste cycles parsing irrelevant files. <strong>The magic has faded and you're left with confused AI that can't see the forest for the trees.</strong></p>
      <p>You might try manually curating file lists or writing custom selection scripts, but now you're spending more time managing context than building features. Your competitors are shipping faster because their AI actually understands their codebase structure. <strong>The answer to AI confusion isn't to give up on automation, but to give your AI the intelligence it needs.</strong></p>
   <p>I know what you're thinking—why not just throw everything at the AI and let it figure it out? You might have succeeded with small projects, but don't let that mislead you. <strong>AI understanding doesn't scale with raw file count.</strong> Once your repository passes a threshold, agents get overwhelmed trying to parse everything, just like humans do when dropped into an unfamiliar large codebase.</p>
</div>
<div class="content-section">
   <h2>Why Current AI Context Fails</h2>
   <div class="services-grid">
      <div class="service-card" data-service="wandering">
         <h3><i data-lucide="compass"></i> Context Overload</h3>
         <div class="service-summary">
            <p><strong>AI agents drown in irrelevant files, losing focus on what matters.</strong> Critical architecture gets buried under configuration files, tests, and generated code.</p>
         </div>
         <div class="service-details">
            <p><strong>Your AI is burning tokens on noise.</strong> Without intelligent file selection, AI tools treat a package.json the same as your core business logic. They'll analyze thousands of test files while missing the central patterns that define your system architecture.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"When I first analyzed this large repository, I was immediately overwhelmed by the sheer volume of files. I found myself trying to parse 15,000+ files across dozens of directories, with no clear sense of what was actually important.</p>
                  
                  <p>I spent equal time analyzing generated migration files, node_modules dependencies, and build artifacts as I did on the core business logic. The result was a shallow understanding of everything and deep insight into nothing. I couldn't identify the key patterns because I was drowning in peripheral details.</p>
                  
                  <p>Without a way to distinguish signal from noise, I treated every file as equally important. This led to responses that mentioned trivial configuration details alongside critical architectural decisions, making my analysis practically useless for understanding the system's design."</p>
                  
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
            <p><strong>Random file selection misses critical relationships.</strong> AI gets partial context without understanding how components actually connect.</p>
         </div>
         <div class="service-details">
            <p><strong>Context without connections is just confusion.</strong> AI sees individual files but misses the import graphs, inheritance hierarchies, and data flow patterns that make systems comprehensible. They recommend changes that break unseen dependencies.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I was given a handful of TypeScript components to review, but without their dependencies and imports, I couldn't understand how they actually worked together. I could see individual functions but not the data flow.</p>
                  
                  <p>When I suggested improvements, I had no idea whether they would break downstream consumers. I was analyzing components in isolation that were actually part of a complex dependency tree. My recommendations looked good for individual files but would have caused cascading failures across the system.</p>
                  
                  <p>Without the import graph and usage patterns, I was essentially doing code review blind. I could spot syntax issues and basic patterns, but I couldn't provide the architectural insights that actually matter for system-level improvements."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="overload">
         <h3><i data-lucide="cpu"></i> Poor File Prioritization</h3>
         <div class="service-summary">
            <p><strong>No intelligence about what files actually matter.</strong> AI wastes attention on boilerplate while missing the core patterns that define your system.</p>
         </div>
         <div class="service-details">
            <p><strong>Equal treatment of unequal importance.</strong> Without scoring heuristics, AI can't tell the difference between your main application entry point and a random utility file. They analyze everything with the same attention.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I was asked to understand a complex web application, but I treated every file with equal importance. I spent as much time analyzing a simple constants file as the main router configuration. I dove deep into utility functions while barely skimming the core business logic.</p>
                  
                  <p>The result was analysis that focused on peripheral concerns while missing the central architectural patterns. I could tell you about the logging utility implementation but couldn't explain the overall request flow or business domain modeling.</p>
                  
                  <p>Without understanding file importance and centrality within the dependency graph, I provided recommendations that optimized the wrong things. I suggested improvements to rarely-used utilities while overlooking performance bottlenecks in critical path components."</p>
                  
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

   <p>The solution isn't more context—it's smarter context. That's where Scribe comes in. <strong>Scribe transforms your repository into intelligent, AI-ready bundles that preserve what matters while filtering out the noise.</strong> No more random file selection, no more missing dependencies, no more drowning in irrelevant details—just precise, contextual understanding.</p>
   
   <p>Under the hood, Scribe is an analysis powerhouse built with cutting-edge algorithms. We're talking multi-language AST parsing, PageRank-based dependency analysis for import graph centrality, and sophisticated heuristic scoring that identifies truly important files. <strong>Scribe analyzes 100k+ files in seconds while building complete dependency maps and intelligent file rankings.</strong> Most tools just list files; Scribe understands relationships.</p>
   
   <p>Speed means nothing if the output lacks intelligence though. Scribe excels here with multi-dimensional scoring that weighs documentation importance, import centrality, git churn signals, template detection, and entrypoint analysis. It groups related files into coherent bundles and provides interactive editing for fine-tuning selection. <strong>This isn't your typical file listing tool—it's a next-generation repository intelligence engine that bridges traditional static analysis with modern AI-powered workflows.</strong></p>

   <p><strong>Scribe goes beyond simple file selection to create contextually rich, dependency-aware bundles.</strong> Standard repository tools just concatenate files. Scribe provides structured metadata, import relationship maps, and intelligent file scoring that helps AI understand not just what files exist, but how they relate and which ones matter most.</p>
</div>
<div class="content-section">
   <h2>Three Modes of Analysis: From Quick Selection to Complete Repository Intelligence</h2>
   <div class="services-grid">
      <div class="service-card" data-service="quick-wins">
         <h3><i data-lucide="target"></i> Smart File Selection</h3>
         <div class="service-summary">
            <p><strong>Heuristic scoring identifies the files that actually matter.</strong> Stop your AI from analyzing boilerplate while missing the architecture that defines your system.</p>
         </div>
         <div class="service-details">
            <h4>Example Scoring Output:</h4>

```json
{
  "file": "src/components/Dashboard.tsx",
  "score": 0.92,
  "ranking": 3,
  "components": {
    "doc_score": 0.8,
    "import_centrality": 0.95,
    "path_depth": 0.9,
    "git_churn": 0.75,
    "template_boost": 0.0,
    "entrypoint_score": 0.0
  },
  "reasoning": "High import centrality (12 dependencies), recent activity, core component",
  "imports": ["@/hooks/useAuth", "@/components/Chart", "@/api/dashboard"],
  "dependencies": 12,
  "dependents": 8
}
```

            <p>Your AI focuses on the code that actually defines your system—core components, architectural patterns, and key business logic instead of getting lost in configuration files and build scripts.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I can immediately identify which files define the system architecture instead of wasting time on generated code and utilities."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="systemic">
         <h3><i data-lucide="network"></i> Dependency-Aware Bundles</h3>
         <div class="service-summary">
            <p><strong>Import graph analysis ensures complete context.</strong> AI gets the full picture with dependency relationships preserved across file boundaries.</p>
         </div>
         <div class="service-details">
            <h4>Example Bundle Structure:</h4>

```json
{
  "bundle_type": "feature_complete",
  "target": "Authentication System",
  "files": [
    {
      "path": "src/auth/AuthProvider.tsx",
      "role": "core_component",
      "imports": ["./hooks/useAuth", "./types/User"],
      "dependents": ["src/App.tsx", "src/components/LoginForm.tsx"]
    },
    {
      "path": "src/auth/hooks/useAuth.ts", 
      "role": "supporting_hook",
      "imports": ["../api/authApi", "../types/User"],
      "dependents": ["../AuthProvider.tsx", "../../components/Profile.tsx"]
    }
  ],
  "dependency_graph": {
    "depth": 3,
    "completeness": 0.95,
    "missing_dependencies": []
  },
  "bundle_stats": {
    "total_files": 12,
    "total_tokens": 8450,
    "coverage_ratio": 0.89
  }
}
```

            <p>When your AI analyzes a Scribe bundle, it understands how components connect—no more missing context that leads to broken recommendations or incomplete understanding.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I get complete context with all dependencies included, so I can provide recommendations that actually work within the existing architecture."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="bot"></i> Claude
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="comprehensive">
         <h3><i data-lucide="layers"></i> Interactive Repository Intelligence</h3>
         <div class="service-summary">
            <p><strong>Interactive HTML editor for fine-tuned bundle creation.</strong> Complete analysis with visual dependency exploration and customizable output formats.</p>
         </div>
         <div class="service-details">
            <h4>Interactive Features:</h4>

```json
{
  "editor_capabilities": {
    "visual_dependency_graph": true,
    "file_importance_heatmap": true,
    "interactive_selection": true,
    "real_time_scoring": true,
    "custom_weight_tuning": true
  },
  "output_formats": [
    "markdown",
    "html", 
    "json",
    "structured_context"
  ],
  "analysis_depth": {
    "import_resolution": "complete",
    "template_detection": "15+ engines", 
    "language_support": "multi_language_ast",
    "git_integration": "churn_and_activity"
  },
  "performance": {
    "analysis_time": "< 30 seconds for 100k files",
    "memory_usage": "< 2GB for large repositories"
  }
}
```
            <p>The interactive editor lets you explore your repository structure visually, adjust selection criteria, and export perfectly tailored bundles for any AI workflow.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I can visually explore the dependency graph and create precisely targeted bundles instead of guessing what files to include."</p>
                  
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
<p>Scribe is built from the ground up to support AI-powered development workflows. Context confusion is the single largest driver of AI development failures. With Scribe, your AI agents have the repository intelligence they need to understand your codebase structure and relationships.</p>
   <h2>Ready to Give Your AI the Repository Intelligence It Deserves?</h2>
   {% set primary = {
  "href": "https://github.com/sibyllinesoft/scribe",
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
   # Cargo (Rust)
   cargo install --path scribe-rs --locked

   # From Source
   git clone https://github.com/sibyllinesoft/scribe
   cd scribe/scribe-rs
   cargo install --path . --locked
   ```

   <h3>Basic Usage:</h3>

   ```bash
   # Generate a markdown bundle
   scribe --style markdown --output bundle.md

   # Create interactive HTML editor
   scribe --style html --editor --output bundle.html

   # JSON output for programmatic use
   scribe --style json --output analysis.json
   ```

   <h3>Advanced Analysis:</h3>

   ```bash
   # Focus on specific directories
   scribe --include "src/**" --exclude "**/*.test.*" --output focused.md

   # Token-budget aware selection
   scribe --token-limit 50000 --style markdown --output constrained.md

   # With git integration
   scribe --git-aware --include-recent --output recent-changes.md
   ```

</div>
<div>
   <h2>Command Reference</h2>

   ```bash
   # Main command
   scribe [OPTIONS] [PATH]
   
   # Common options
   --style <FORMAT>          # Output format: markdown, html, json
   --output <FILE>           # Output file path
   --editor                  # Generate interactive HTML editor
   --token-limit <NUM>       # Respect token budget constraints
   --include <PATTERN>       # Include file patterns (glob)
   --exclude <PATTERN>       # Exclude file patterns (glob)
   ```

   <h3>Analysis Options</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--style` | Output format (markdown, html, json) | markdown |
   | `--output` | Output file path | stdout |
   | `--editor` | Generate interactive HTML editor | false |
   | `--token-limit` | Maximum token budget | unlimited |
   | `--include` | File inclusion patterns (glob) | all files |
   | `--exclude` | File exclusion patterns (glob) | .git, node_modules |
   | `--git-aware` | Include git activity analysis | false |
   | `--template-detection` | Enable template engine detection | true |

   <h3>Selection Algorithms</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--algorithm` | Selection algorithm (heuristic, random, recent) | heuristic |
   | `--centrality-weight` | Import centrality importance (0.0-1.0) | 0.2 |
   | `--doc-weight` | Documentation file importance (0.0-1.0) | 0.15 |
   | `--churn-weight` | Git activity importance (0.0-1.0) | 0.15 |
   | `--depth-preference` | Prefer shallow files (0.0-1.0) | 0.1 |

   <h3>Output Formats</h3>

   **Markdown**: Clean, readable format perfect for AI consumption
   ```bash
   scribe --style markdown --output bundle.md
   ```

   **HTML with Editor**: Interactive analysis and bundle customization
   ```bash
   scribe --style html --editor --output analysis.html
   ```

   **JSON**: Structured data for programmatic processing
   ```bash
   scribe --style json --output data.json
   ```

   <h3>Integration Examples</h3>

   **Code Review Preparation**:
   ```bash
   # Recent changes with dependencies
   scribe --git-aware --include-recent --token-limit 30000 --output review.md
   ```

   **Documentation Generation**:
   ```bash
   # Core architecture files
   scribe --include "src/**" --exclude "**/*.test.*" --doc-weight 0.3 --output docs.md
   ```

   **AI Analysis Bundle**:
   ```bash
   # Balanced selection for AI understanding
   scribe --algorithm heuristic --token-limit 50000 --style json --output ai-context.json
   ```

</div>