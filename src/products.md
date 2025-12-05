---
eleventyNavigation:
  key: Products
  order: 2
layout: simple.njk
stylesheets:
  - "/styles/pages/products.css"
title: Products
description: Next-generation AI tools currently in development
---

# Products

Our products provide a cutting edge developer experience and AI capabilities while slashing your SaaS bill and giving you total control over your software.

## Developer Platform

Ship faster with integrated development environments, specification-driven development, and reactive agent orchestration. From zero-setup infrastructure to production-ready agent systems.

<!-- Product Rave -->
<div class="project-brochure" id="rave-product">
  <div class="project-visual">
    <h1>RAVE</h1>
  </div>
  <div class="project-content">
    <h3>Your Dev Stack, Fully Managed</h3>
    <div class="project-pitch">
      <p><strong>We handle the infrastructure. You ship features.</strong></p>
      <p>Stop spending weeks wiring up GitLab, CI/CD, databases, and chat. We provision and maintain your complete dev environment—you get system access to customize what you need while we handle the operational burden.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Complete Stack, Zero Setup:</strong> GitLab with CI runners, PostgreSQL, Redis, NATS JetStream, Mattermost, and Penpot—already integrated with SSO and encrypted secrets.
        </div>
        <div class="feature-item">
          <strong>Co-Managed Access:</strong> Full system access when you need to tweak configurations. We handle maintenance, updates, and keeping everything running.
        </div>
        <div class="feature-item">
          <strong>Agent-Ready from Day One:</strong> JetStream events, structured logs, and Mattermost channels give your AI agents a command deck the moment you start.
        </div>
      </div>
      <p>Skip the 20-40 hours of environment setup on every project. Focus on building your product while we keep the lights on.</p>
      <div class="project-cta">
        <a href="/products/rave/" class="btn-unified btn-primary">
          <span class="btn-inner">
            Learn More
            <i data-lucide="arrow-right"></i>
          </span>
        </a>
        <a href="javascript:void(0)" class="btn-unified btn-primary" data-contact-type="contact" data-subject-type="waitlist" data-custom-body="I'm interested in a managed RAVE environment. Please share next steps for getting access.">
          <span class="btn-inner">
            Get Started
            <i data-lucide="mail"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Arbiter -->
<div class="project-brochure" id="arbiter-product">
  <div class="project-visual">
    <h1>ARBITER</h1>
  </div>
  <div class="project-content">
    <h3>Keep Your Agents on Rails</h3>
    <div class="project-pitch">
      <p><strong>Specs that compile into working software.</strong></p>
      <p>Markdown specs don't work. Agents treat them like suggestions, ignore conventions, and drift from requirements. Arbiter turns specifications into executable contracts—what you spec is what you get.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Specs Are Contracts:</strong> Constraint-backed CUE specs create unambiguous rules. CI gates block merges when agents drift. No more "that's not what I asked for."
        </div>
        <div class="feature-item">
          <strong>Generate Everything:</strong> One spec produces APIs, tests, infrastructure, and docs. Stop burning tokens on boilerplate. Agents focus on business logic.
        </div>
        <div class="feature-item">
          <strong>Collaborate in Real-Time:</strong> Watch your system emerge in the spec workbench. Catch missing endpoints and inconsistent schemas before a single line of code is written.
        </div>
      </div>
      <p>Stop trying to tame slop. Build real software at the speed of vibes—with specs that agents can't misinterpret and code that stays synchronized as requirements evolve.</p>
      <div class="project-cta">
        <a href="/products/arbiter/" class="btn-unified btn-primary">
          <span class="btn-inner">
            Learn More
            <i data-lucide="arrow-right"></i>
          </span>
        </a>
        <a href="https://github.com/sibyllinesoft/arbiter" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Smith -->
<div class="project-brochure" id="smith-product">
  <div class="project-visual">
    <h1>SMITH</h1>
  </div>
  <div class="project-content">
    <h3>Agent Orchestration That Actually Scales</h3>
    <div class="project-pitch">
      <p><strong>Agents that react in milliseconds, not seconds.</strong></p>
      <p>Slow agents kill user experience and waste compute. SMITH orchestrates agent swarms through event streams—instant dispatch, automatic scaling, zero polling overhead.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Respond to Anything:</strong> Business events trigger agent dispatch instantly through NATS streams. No polling delays. No coordination bottlenecks. Agents act the moment something happens.
        </div>
        <div class="feature-item">
          <strong>10x Faster, 80% Lighter:</strong> Sub-5ms cold starts and under 150MB memory footprint. Rust performance means you run more agents on less hardware.
        </div>
        <div class="feature-item">
          <strong>Built for Production:</strong> Deterministic replay for debugging. Process isolation for security. Automatic recovery for reliability. Your agents stay up when it matters.
        </div>
      </div>
      <p>Stop overpaying for slow agents that poll for work. Smith lets you build reactive systems where agents respond to events anywhere in your organization—with centralized policy and full auditing.</p>
      <div class="project-cta">
        <a href="javascript:void(0)" class="btn-unified btn-primary" data-contact-type="contact" data-subject-type="waitlist" data-custom-body="I'm interested in becoming a tester for this product. Please let me know about testing opportunities.">
          <span class="btn-inner">
            Experience Sub-5ms Response
            <i data-lucide="mail"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

## Code Intelligence

AI-native static analysis and codebase preparation tools that help agents understand and improve your code.

<!-- Product Valknut -->
<div class="project-brochure" id="valknut-product">
  <div class="project-visual">
    <h1>VALKNUT</h1>
  </div>
  <div class="project-content">
    <h3>Keep Shipping Fast as Your Codebase Grows</h3>
    <div class="project-pitch">
      <p><strong>Agents need guidance to keep your codebase healthy.</strong></p>
      <p>Vibe coding starts great—until 50,000 lines later your agents are drowning in a labyrinth of duplication and drift. Valknut gives agents a map: urgency-ranked problems, safe refactoring plans, and targeted work that compounds.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Stop Random Wandering:</strong> Urgency scores tell agents which problems actually hurt velocity. No more treating missing semicolons like circular dependencies.
        </div>
        <div class="feature-item">
          <strong>Fix Root Causes, Not Symptoms:</strong> Impact Packs identify code that should be refactored together. Agents solve architectural problems instead of playing whack-a-mole.
        </div>
        <div class="feature-item">
          <strong>Plug Coverage Gaps Fast:</strong> Coverage Packs show exactly what's untested. Agents write targeted tests instead of guessing where to start.
        </div>
      </div>
      <p>Messy codebases confuse agents and bias them toward low-quality output. Valknut keeps your code healthy so agents generate better code while using fewer tokens—and your velocity stays high.</p>
      <div class="project-cta">
        <a href="/products/valknut/" class="btn-unified btn-primary">
          <span class="btn-inner">
            Learn More
            <i data-lucide="arrow-right"></i>
          </span>
        </a>
        <a href="https://github.com/sibyllinesoft/valknut" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Scribe -->
<div class="project-brochure" id="scribe-product">
  <div class="project-visual">
    <h1>SCRIBE</h1>
  </div>
  <div class="project-content">
    <h3>Effortless Codebase Sharing with LLMs That Scales to Any Repository</h3>
    <div class="project-pitch">
      <p><strong>Point at any repo, get LLM-ready code.</strong></p>
      <p>Preparing code for LLMs is tedious—you guess which files matter, hit token limits, and miss critical dependencies. SCRIBE uses PageRank algorithms to find what's actually important and formats it perfectly for any LLM.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>One-Command Analysis:</strong> Point at any GitHub repo and get perfectly formatted, LLM-ready code in seconds. Zero manual file selection.
        </div>
        <div class="feature-item">
          <strong>Smart Code Ranking:</strong> PageRank centrality identifies critical relationships and core functionality that manual selection typically misses.
        </div>
        <div class="feature-item">
          <strong>Scales to Any Size:</strong> Small projects get full coverage, massive codebases get intelligently prioritized using research-backed algorithms.
        </div>
      </div>
      <p>Teams cut code preparation time by 85% while LLMs get maximum insight per token through semantic chunking and dependency-aware selection.</p>
      <div class="project-cta">
        <a href="/products/scribe/" class="btn-unified btn-primary">
          <span class="btn-inner">
            Learn More
            <i data-lucide="arrow-right"></i>
          </span>
        </a>
        <a href="https://github.com/sibyllinesoft/scribe" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

## Alpha Products

Early-stage tools exploring the frontier of AI-assisted development. These products are in active development and available for early adopter testing.

<!-- Product Mimir -->
<div class="project-brochure" id="mimir-product">
  <div class="project-visual">
    <h1>MIMIR</h1>
  </div>
  <div class="project-content">
    <h3>Research Swarm Intelligence for Hard Problems</h3>
    <div class="project-pitch">
      <p><strong>When one agent isn't enough.</strong></p>
      <p>Complex problems need specialized expertise from multiple angles. MIMIR coordinates research agents—code analysis, literature review, cross-domain synthesis—into a six-stage intelligence pipeline that tackles what single agents miss.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Unified Search Intelligence:</strong> Combines code search, documentation, and research tools into one interface. No more agent confusion from overlapping tools.
        </div>
        <div class="feature-item">
          <strong>Coordinated Agent Swarm:</strong> Specialists work in parallel—code analyzers find patterns, literature reviewers surface research, synthesis agents connect insights.
        </div>
        <div class="feature-item">
          <strong>Six-Stage Problem Pipeline:</strong> From initial analysis through breakthrough synthesis, each stage builds toward solutions that manual research typically misses.
        </div>
      </div>
      <p>Engineering teams cut complex problem resolution time by 70% through coordinated intelligence. Citation tracking and systematic workflow coordination eliminate research chaos.</p>
      <div class="project-cta">
        <a href="https://github.com/sibyllinesoft/mimir" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Lens -->
<div class="project-brochure" id="lens-product">
  <div class="project-visual">
    <h1>LENS</h1>
  </div>
  <div class="project-content">
    <h3>Production-Ready Code Search with 24.4% Better Relevance</h3>
    <div class="project-pitch">
      <p><strong>Code search that actually understands your code.</strong></p>
      <p>Traditional search tools miss the mark—text search is fast but doesn't understand structure, while semantic search is smart but too slow. LENS combines all approaches in a three-stage pipeline delivering 0.779 nDCG@10 with sub-millisecond response times.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Three-Stage Intelligence:</strong> Lexical + Symbol + Semantic layers work together—fuzzy text search, AST understanding, and natural language queries.
        </div>
        <div class="feature-item">
          <strong>Sub-Millisecond Speed:</strong> P95 response times under 0.1ms while delivering 88.9% recall at 50 results through optimized indexing.
        </div>
        <div class="feature-item">
          <strong>Enterprise-Grade Systems:</strong> Witness set mining, query-DAG optimization, and tenant economics with mathematical rigor.
        </div>
        <div class="feature-item">
          <strong>MCP Integration:</strong> Native Model Context Protocol support for direct AI assistant integration with structured search capabilities.
        </div>
      </div>
      <p>Development teams cut code search time by 98% while achieving 24.4% better relevance than traditional tools. Perfect for large codebases where finding the right code quickly makes the difference.</p>
      <div class="project-cta">
        <a href="/products/lens/" class="btn-unified btn-primary">
          <span class="btn-inner">
            Learn More
            <i data-lucide="arrow-right"></i>
          </span>
        </a>
        <a href="https://github.com/sibyllinesoft/lens" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Lethe -->
<div class="project-brochure" id="lethe-product">
  <div class="project-visual">
    <h1>LETHE</h1>
  </div>
  <div class="project-content">
    <h3>Infinite Context for Agents Through Intelligent Forgetting</h3>
    <div class="project-pitch">
      <p><strong>Infinite context without the noise.</strong></p>
      <p>Context limits kill productivity. Agents forget important details, you lose momentum choosing what to include, and conversations die after 50 messages. LETHE reads everything but forgets what doesn't matter.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Smart Context Filtering:</strong> Automatically compresses verbose chat into information-dense summaries while preserving every critical detail.
        </div>
        <div class="feature-item">
          <strong>Zero Manual Decisions:</strong> Stop choosing what context to include. Agents access unlimited conversation history automatically.
        </div>
        <div class="feature-item">
          <strong>Intelligent Compression:</strong> Rewrites long messages into tight summaries that maintain full accuracy and meaning.
        </div>
      </div>
      <p>Teams recover 90% of time spent on context management while sessions stretch to 300+ messages without drift or performance loss.</p>
      <div class="project-cta">
        <a href="https://github.com/sibyllinesoft/lethe" class="btn-unified btn-primary">
          <span class="btn-inner">
            View on GitHub
            <i data-lucide="github"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Product Conclave -->
<div class="project-brochure" id="conclave-product">
  <div class="project-visual">
    <h1>CONCLAVE</h1>
  </div>
  <div class="project-content">
    <h3>AI-Powered Workflow Planning Through Expert Debate</h3>
    <div class="project-pitch">
      <p><strong>Plans that survive first contact.</strong></p>
      <p>Single-perspective planning misses risks and dependencies. CONCLAVE runs structured debates between 3-4 expert personas who analyze requirements from different angles—technical, business, ops, security—then converge on executable plans.</p>
      <div class="project-features">
        <div class="feature-item">
          <strong>Expert AI Debate:</strong> Planning personas challenge each other through structured rounds, surfacing blind spots that single-agent planning typically misses.
        </div>
        <div class="feature-item">
          <strong>Executable Output:</strong> Structured XML workflows with task dependencies, risk registers, and timeline estimates ready for immediate implementation.
        </div>
        <div class="feature-item">
          <strong>Codebase-Aware Planning:</strong> Analyzes existing patterns and architecture to create plans that leverage what's already built and avoid conflicts.
        </div>
      </div>
      <p>Project managers cut planning time by 80% while identifying 3x more risks and dependencies. Seamless MCP integration with Claude Desktop—no setup complexity required.</p>
      <div class="project-cta">
        <a href="javascript:void(0)" class="btn-unified btn-primary" data-contact-type="contact" data-subject-type="waitlist" data-custom-body="I'm interested in becoming a tester for this product. Please let me know about testing opportunities.">
          <span class="btn-inner">
            Expert AI Planning
            <i data-lucide="mail"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>


