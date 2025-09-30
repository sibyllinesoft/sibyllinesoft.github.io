---
eleventyNavigation:
key: Arbiter
parent: Products
order: 4
layout: simple.njk
title: "Arbiter – Spec Compiler & Rails for AI Agents"
description: "Compile agent-authored specs into synchronized code, tests, infra, and docs—enforced in CI."
enableModals: true
stylesheets:
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
      <div class="title">The Spec Compiler for AI Development</div>
      <div class="subtitle">Compile agent-authored specs into code, tests, infra, and docs in seconds. Syncs to GitHub and GitLab.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Agents Generate. Arbiter Enforces. Humans Audit.</div>
      <div class="subtitle">The mission control for AI agent teams.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Rails for AI Development</div>
      <div class="subtitle">Keep your agents on track.</div>
   </div>
</div>
{% set heroLogo = '/img/logos/arbiter-large.png' %}
{% set heroLogoAlt = 'Arbiter Logo' %}
{% set heroLogoHeight = '72px' %}
{% set heroTitle = 'The Spec Compiler for AI Development' %}
{% set heroSubtitle -%}
<div class="rotating-banners">
         <div class="banner-container">
            <span class="banner-text" data-text="Talk to an agent. Arbiter turns conversation into specs, code, tests, and docs—kept in sync and enforced in CI">Talk to an agent. Arbiter turns conversation into specs, code, tests, and docs—kept in sync and enforced in CI</span>
         </div>
         <div class="banner-container">
            <span class="banner-text" data-text="Agents generate. Arbiter enforces. Humans audit.">Agents generate. Arbiter enforces. Humans audit.</span>
         </div>
      </div>
{%- endset %}
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<div class="centered-section">
   <p><strong>AI agents write code at superhuman speed. Without rails, they diverge.</strong> Arbiter enforces a single spec so agents produce consistent, correct systems.</p>
   
   <p>Other tools stop at markdown specs or UML. Arbiter compiles specs into running systems, enforces them in CI, and syncs with GitHub/GitLab. It's the only platform designed for agent-driven development end-to-end.</p>
</div>

<div class="content-section">
   <h2>Arbiter's Competitive Edge</h2>
   
   <div class="services-grid">
      <div class="service-card" data-service="mathematical-correctness">
         <h3><i data-lucide="shield-check"></i> Constraint-Backed Specs</h3>
         <div class="service-summary">
            <p><strong>PM agents produce specs execution agents can't misinterpret;</strong> CUE constraints compile into validation logic and CI gates.</p>
         </div>
         <div class="service-details">
            <p><strong>Constraint-validated, CI-enforced consistency.</strong> Unlike markdown specs that agents interpret differently, Arbiter's PM agent builds constraint-backed CUE specs through conversation, creating unambiguous constraints that execution agents implement consistently.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"With CUE specifications, agents get constraint-backed specs kept in sync—constraint-validated, CI-enforced consistency prevents drift."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> AI Team Lead
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="full-system">
         <h3><i data-lucide="layers"></i> Full-Stack Generation & Sync</h3>
         <div class="service-summary">
            <p><strong>From one spec: services, APIs, infra, tests, and docs—kept synchronized as the spec evolves.</strong></p>
         </div>
         <div class="service-details">
            <p><strong>Complete artifact generation from specs.</strong> Execution agents shouldn't waste time on boilerplate and configuration. Arbiter generates your entire technology stack from PM agent specs, letting execution agents focus on business logic within pre-built scaffolding.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"Arbiter generated everything from PostgreSQL schemas to React components—agents focus on business logic, not plumbing."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Product Manager
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="github-integration">
         <h3><i data-lucide="git-branch"></i> Version Control & CI Sync</h3>
         <div class="service-summary">
            <p><strong>Issues, checks, and webhooks align agents with your repo;</strong> spec changes trigger pipelines and block merges on drift.</p>
         </div>
         <div class="service-details">
            <p><strong>Native integration with development workflow.</strong> Agent teams need coordination mechanisms beyond chat. Arbiter creates GitHub Issues for every epic and task, with webhook events that notify execution agents of spec changes, test results, and deployment status from the PM agent.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"We've essentially created a GitHub-native operating system for AI agent collaboration."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> DevOps Engineer
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
<span class="kicker">Agent Coordination</span>
<h2>From Conversation to Code</h2>
<p class="lead">Other tools stop at markdown specs or UML. Arbiter compiles specs into running systems—validation logic, tests, scaffolding, documentation, and deployment configs.</p>
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
<span class="kicker">Specification Generation</span>
<h2>Specs Without Humans Writing Specs</h2>
<p class="lead"><strong>PM agent builds the spec; Arbiter enforces it.</strong> By default, you don't touch CUE/YAML. The PM agent knows what "done" requires and refines through conversation until all constraints are defined.</p>
</div>

<p>Generated tests and validation rules are enforced in CI as the system evolves.</p>
</div>

<div class="content-section">
<div class="section-header">
<span class="kicker">Real-time Monitoring</span>
<h2>Watch the System Emerge</h2>
<p class="lead"><strong>Real-time docs and diagrams provide auditability and clear stakeholder communication</strong>—architecture, API docs, and test results update live as agents work.</p>
</div>
</div>

<div class="centered-section">
<h3>Who It's For</h3>
<p><strong>Solo devs</strong> • Time saved through automated constraint validation and spec compilation<br>
<strong>Seed/Series A teams</strong> • Drift removed through CI-enforced consistency and agent coordination<br>
<strong>SMBs with growing repos</strong> • CI gates that scale without manual oversight or technical debt accumulation</p>
</div>

<div class="centered-section">
<p>Arbiter is built from the ground up to support agent coordination. Technical debt is the single largest driver of AI project failure. With Arbiter, your PM and execution agents have the guardrails they need to keep projects consistent and debt-free.</p>

<h3>Why Arbiter vs. Markdown/UML Tools?</h3>
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

<h2>Ready to Give Your AI Agents the Intelligence They Deserve?</h2>
{% set primary = {
  "href": "https://github.com/sibyllinesoft/arbiter",
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
   <h2>More Advantages</h2>
   
   <p>Beyond core spec compilation, Arbiter provides real-time visibility and agent-native coordination that traditional tools can't match.</p>
   
   <div class="services-grid">
      <div class="service-card" data-service="schema-validation">
         <h3><i data-lucide="file-text"></i> Live Docs & Diagrams</h3>
         <div class="service-summary">
            <p><strong>Portal renders architecture, API docs, and test status in real time for fast human audit.</strong></p>
         </div>
         <div class="service-details">
            <p><strong>Real-time visualization of agent progress.</strong> Stakeholders see progress through live diagrams, not code review. System architecture, dependency graphs, and documentation update automatically as agents work.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"Stakeholders get instant visibility into system changes without parsing code or waiting for documentation updates."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Product Manager
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="api-contracts">
         <h3><i data-lucide="bot"></i> Agent-Native Integration</h3>
         <div class="service-summary">
            <p><strong>NDJSON streams and webhooks for orchestration;</strong> Arbiter speaks agent, not just human.</p>
         </div>
         <div class="service-details">
            <h4>Example API Specification:</h4>

```cue
#UserAPI: {
    // Create user endpoint
    "/users": {
        POST: {
            request: {
                body: #User & {
                    // ID is generated, not provided
                    id?: string
                }
            }
            responses: {
                201: {body: #User}
                400: {body: #ValidationError}
                409: {body: #ConflictError}
            }
            constraints: [
                "email must be unique",
                "admin role requires approval workflow"
            ]
        }
    }
    
    // Get user endpoint
    "/users/{id}": {
        GET: {
            parameters: {
                path: {id: string & =~"^[a-z0-9-]+$"}
            }
            responses: {
                200: {body: #User}
                404: {body: #NotFoundError}
            }
        }
    }
}
```

            <p>API contracts become executable specifications that generate consistent implementations across all your services and client libraries.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"My API documentation, validation, and implementation are kept in sync because they're generated from the same source."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> API Developer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      <div class="service-card" data-service="surgical-generation">
         <h3><i data-lucide="diff"></i> Incremental Generation</h3>
         <div class="service-summary">
            <p><strong>Evolve existing code without full regeneration;</strong> new constraints update scaffolding while custom code stays intact.</p>
         </div>
         <div class="service-details">
            <h4>Example Incremental Generation:</h4>

```cue
#UserAPI: {
    // Add new endpoint to existing API
    "/users/{id}/preferences": {
        PUT: {
            request: {
                body: #UserPreferences
            }
            responses: {
                200: {body: #User}
                404: {body: #NotFoundError}
            }
        }
    }
}
```
            <p>Arbiter analyzes existing code patterns and guides execution agents to enhance incrementally. New features integrate seamlessly with existing patterns, middleware, and error handling that agents recognize.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"When I add a new API endpoint, Arbiter surgically updates everything—no regeneration, no lost custom logic."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Backend Developer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>

   </div>
</div>
<div class="centered-section">

   <h3>Legacy Codebases? No Problem.</h3>
   
   <p>Arbiter imports existing repos to generate a baseline spec so agents can work safely inside explicit constraints.</p>
   
   <p><strong>Instantly get:</strong> a comprehensive spec of your current architecture • clear constraints for agents • a baseline for safe, incremental collaboration.</p>
</div>

<div class="content-section">
   <h2>Quick Start</h2>
   
   ```bash
   # Via bun (recommended)
   bun install -g arbiter-cli

   # Via npm
   npm install -g arbiter-cli

   # Download standalone binary
   curl -L https://github.com/arbiter-framework/arbiter/releases/latest/download/arbiter-cli > arbiter
   chmod +x arbiter
   ```

   <h3>Create Your First Project:</h3>

   ```bash
   # Initialize a new project
   mkdir my-app && cd my-app
   arbiter init "My Application"

   # Add your first components
   arbiter add service user-service --language typescript --port 3000
   arbiter add database userdb --attach-to user-service
   arbiter add endpoint POST /users --service user-service
   arbiter add endpoint GET /users/{id} --service user-service

   # Generate the complete application
   arbiter generate --include-ci

   # Validate everything is correct
   arbiter check --verbose
   ```

</div>
<div>
   <h2>Command Line Reference</h2>

   ```bash
   # Project Management
   arbiter init [display-name]                    # Initialize new CUE project
   arbiter onboard [project-path]                 # Onboard existing projects
   
   # Specification Building
   arbiter add service <name>                     # Add new service
   arbiter add endpoint <path>                    # Add API endpoint
   arbiter add database <name>                    # Add database with service attachment
   arbiter add cache <name>                       # Add cache service
   arbiter add route <path>                       # Add UI route
   arbiter add flow <id>                          # Add user flow for testing
   arbiter add load-balancer                      # Add load balancer
   arbiter add schema <name>                      # Add API schema
   arbiter add component <name>                   # Add UI component
   arbiter add module <name>                      # Add standalone module
   
   # Epic & Task Management
   arbiter epic list                              # List all epics
   arbiter epic create                            # Create new epic
   arbiter epic show <epic-id>                    # Show epic details
   arbiter epic update <epic-id>                  # Update epic
   arbiter task list                              # List tasks
   arbiter task create                            # Create new task
   arbiter task complete <task-id>                # Mark task complete
   arbiter execute <epic>                         # Execute entire epic
   
   # Code Generation
   arbiter generate [spec-name]                   # Generate from specifications
   arbiter preview                                # Preview without creating files
   arbiter surface <language>                     # Extract API surface from code
   
   # Validation & Testing
   arbiter check [patterns...]                    # Validate CUE files
   arbiter validate <files...>                    # Validate with explicit schema
   arbiter tests run                              # Run unified test harness
   arbiter tests scaffold                         # Generate test scaffolds
   arbiter tests cover                            # Compute coverage metrics
   
   # Development Workflow
   arbiter watch [path]                           # File watcher with live validation
   arbiter diff <old-file> <new-file>             # Compare schema versions
   arbiter migrate [patterns...]                  # Migrate schemas to latest format
   arbiter sync                                   # Sync project manifests
   
   # Version Management
   arbiter version plan                           # Analyze changes and recommend semver
   arbiter version release                        # Update manifests and generate changelog
   
   # Integration & CI/CD
   arbiter integrate                              # Generate CI/CD workflows
   arbiter github-templates                       # Manage GitHub issue templates
   
   # Templates & Documentation
   arbiter template list                          # List available templates
   arbiter templates list                         # List template aliases
   arbiter docs schema                            # Generate schema documentation
   arbiter docs api                               # Generate API documentation
   arbiter explain                                # Plain-English summaries
   
   # System Management
   arbiter health                                 # Health check
   arbiter server                                 # Start local server
   arbiter config show                            # Show configuration
   
   # Utilities
   arbiter examples <type>                        # Generate example projects
   arbiter export <files...>                     # Export CUE to JSON/YAML/TOML
   arbiter create <type>                          # Create schemas interactively
   arbiter rename                                 # Migrate to naming conventions
   arbiter spec status                            # Manage spec revisions
   ```

   <h3>Global Options</h3>
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `-v, --version` | Display version number | |
   | `-c, --config <path>` | Path to configuration file | .arbiter.json |
   | `--no-color` | Disable colored output | false |
   | `--api-url <url>` | API server URL | http://localhost:5050 |
   | `--timeout <ms>` | Request timeout in milliseconds | 30000 |
   | `-h, --help` | Display help for command | |
   
   <h3>Key Command Options</h3>
   
   **Generate:** `arbiter generate [spec-name] [OPTIONS]`
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--output-dir <dir>` | Output directory | . |
   | `--include-ci` | Include CI/CD workflow files | false |
   | `--dry-run` | Preview what would be generated | false |
   | `--force` | Overwrite existing files | false |
   | `--format <type>` | Output format (auto, json, yaml, typescript, python, rust, go, shell) | auto |
   | `--sync-github` | Sync epics and tasks to GitHub after generation | false |
   
   **Init:** `arbiter init [display-name] [OPTIONS]`
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `-t, --template <name>` | Project template (basic, kubernetes, api) | basic |
   | `-f, --force` | Overwrite existing files | false |
   | `--list-templates` | List available templates | false |
   
   **Add Service:** `arbiter add service <name> [OPTIONS]`
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--language <lang>` | Programming language (typescript, python, rust, go) | typescript |
   | `--port <port>` | Service port number | |
   | `--platform <platform>` | Target platform (cloudflare, vercel, supabase, kubernetes) | |
   | `--directory <dir>` | Source directory path | |
   
   **Check:** `arbiter check [patterns...] [OPTIONS]`
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `-r, --recursive` | Recursively search for CUE files | true |
   | `-f, --format <type>` | Output format (table, json) | table |
   | `-v, --verbose` | Verbose output with detailed errors | false |
   | `--fail-fast` | Stop on first validation error | false |
   
   **Watch:** `arbiter watch [path] [OPTIONS]`
   
   | Parameter | Description | Default |
   |-----------|-------------|---------|
   | `--agent-mode` | Output NDJSON for agent consumption | false |
   | `--ndjson-output <file>` | Write NDJSON events to file | |
   | `--debounce <ms>` | Debounce delay in milliseconds | 300 |
   | `--patterns <patterns>` | Comma-separated file patterns to watch | |
   | `--plan` | Enable planning pipeline on assembly changes | false |
   

   <h3>Agent-Friendly Features</h3>
   
   The Arbiter CLI is specifically designed for AI agents and automation:
   
   **NDJSON Output for Real-time Processing:**
   ```bash
   # Output NDJSON to stdout
   arbiter watch --agent-mode
   
   # Output NDJSON to file
   arbiter execute EPIC-001 --ndjson-output results.ndjson
   arbiter surface typescript --agent-mode --ndjson-output surface-events.ndjson
   ```
   
   **Non-Interactive Commands:**
   ```bash
   # Force operations without confirmation
   arbiter init --force MyApp
   arbiter add service api --force
   
   # Dry-run operations for planning
   arbiter generate --dry-run
   arbiter sync --dry-run
   ```
   
   **Structured Output:**
   - **JSON Format**: `--format json` for structured data
   - **Verbose Mode**: `-v, --verbose` for detailed information  
   - **Exit Codes**: 0=success, 1=error, 2=config error
   
   **Batch Operations:**
   ```bash
   # Process multiple files
   arbiter check *.cue
   arbiter validate user.cue order.cue product.cue
   
   # Chain commands
   arbiter generate && arbiter check && arbiter tests run
   
   # Batch create tasks
   arbiter task batch --epic EPIC-001 --file tasks.json
   ```

   <h3>Configuration</h3>
   
   Create `.arbiter.json` in your project root:
   
   ```json
   {
     "apiUrl": "http://localhost:5050",
     "timeout": 30000,
     "format": "table",
     "color": true,
     "projectDir": ".",
     "templates": {
       "default": "basic"
     },
     "github": {
       "repository": {
         "owner": "username",
         "repo": "project"
       }
     }
   }
   ```
   
   Environment variables:
   ```bash
   ARBITER_API_URL=http://localhost:5050
   ARBITER_TIMEOUT=30000
   ARBITER_FORMAT=json
   ARBITER_NO_COLOR=true
   ```
   
   <h3>Example Workflows</h3>

   ```bash
   # Quick start workflow
   arbiter init "My App" --template basic
   arbiter add service api --language typescript --port 3000
   arbiter add database appdb --attach-to api
   arbiter add endpoint GET /health --service api
   arbiter check --verbose
   arbiter generate --include-ci
   
   # Epic-based development
   arbiter epic create --name "User Management" --priority high
   arbiter task create --epic EPIC-001 --name "User model" --type feature
   arbiter task create --epic EPIC-001 --name "Authentication" --depends-on TASK-001
   arbiter execute EPIC-001 --agent-mode --ndjson-output execution.ndjson
   
   # Agent automation
   arbiter health --verbose --timeout 5000
   arbiter watch --agent-mode --patterns "*.cue,*.ts" --ndjson-output events.ndjson
   arbiter surface typescript --diff --agent-mode --output-dir ./docs
   ```
</div>
