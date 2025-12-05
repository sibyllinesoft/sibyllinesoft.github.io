---
eleventyNavigation:
  key: Lens
  parent: Products
  order: 1
layout: simple.njk
permalink: "/products/lens/"
stylesheets:
  - "/styles/components/project-hero.css"
  - "/styles/pages/lens.css"
title: "Lens: Production-Ready Code Search with 24.4% Better Relevance"
description: "Code search that actually understands your code. Three-stage intelligence with sub-millisecond response times."
---

# Lens: Production-Ready Code Search

<div class="project-hero">
  <div class="project-hero-visual">
    <i data-lucide="search" class="hero-icon"></i>
    <div class="project-codename">Codename: LENS</div>
    <div class="project-status">Production Ready</div>
  </div>
  <div class="project-hero-content">
    <h2>Production-Ready Code Search with 24.4% Better Relevance</h2>
    <p class="hero-tagline"><strong>Code search that actually understands your code.</strong></p>
    <p>Traditional search tools miss the mark—text search is fast but doesn't understand structure, while semantic search is smart but too slow. LENS combines all approaches in a three-stage pipeline delivering 0.779 nDCG@10 with sub-millisecond response times.</p>
  </div>
</div>

## Core Features

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="layers"></i>
    </div>
    <h3>Three-Stage Intelligence</h3>
    <p>Lexical + Symbol + Semantic layers work together—fuzzy text search, AST understanding, and natural language queries.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="zap"></i>
    </div>
    <h3>Sub-Millisecond Speed</h3>
    <p>P95 response times under 0.1ms while delivering 88.9% recall at 50 results through optimized indexing.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="server"></i>
    </div>
    <h3>Enterprise-Grade Systems</h3>
    <p>Witness set mining, query-DAG optimization, and tenant economics with mathematical rigor.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="plug"></i>
    </div>
    <h3>MCP Integration</h3>
    <p>Native Model Context Protocol support for direct AI assistant integration with structured search capabilities.</p>
  </div>
</div>

## Performance Metrics

<div class="metrics-section">
  <div class="metric-item">
    <div class="metric-number">24.4%</div>
    <div class="metric-label">Better Relevance vs Traditional Tools</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">0.779</div>
    <div class="metric-label">nDCG@10 Score</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">0.1ms</div>
    <div class="metric-label">P95 Response Time</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">88.9%</div>
    <div class="metric-label">Recall at 50 Results</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">98%</div>
    <div class="metric-label">Code Search Time Reduction</div>
  </div>
</div>

## How It Works

### Three-Stage Search Pipeline

1. **Lexical Layer**: Fast fuzzy text search for exact matches and typo tolerance
2. **Symbol Layer**: AST-based understanding of code structure and relationships
3. **Semantic Layer**: Natural language understanding for conceptual queries

### Optimized for Large Codebases

LENS is designed to handle enterprise-scale repositories with mathematical precision:

- **Witness Set Mining**: Identifies representative code samples for faster indexing
- **Query-DAG Optimization**: Eliminates redundant searches through intelligent caching
- **Tenant Economics**: Multi-tenant architecture with resource isolation

### MCP Integration

Native support for the Model Context Protocol means AI assistants can:
- Query code directly with natural language
- Receive structured search results
- Maintain context across multiple searches
- Integrate seamlessly with existing workflows

## Use Cases

<div class="use-case-list">
  <div class="use-case-item">
    <h4>Legacy Code Navigation</h4>
    <p>Find function definitions, usage patterns, and dependencies in unfamiliar codebases</p>
  </div>
  
  <div class="use-case-item">
    <h4>Refactoring Support</h4>
    <p>Identify all code paths affected by changes before making modifications</p>
  </div>
  
  <div class="use-case-item">
    <h4>Code Review</h4>
    <p>Quickly understand context and related code during review processes</p>
  </div>
  
  <div class="use-case-item">
    <h4>AI-Assisted Development</h4>
    <p>Enable AI coding assistants to understand your codebase structure and patterns</p>
  </div>
</div>

## Getting Started

<div class="getting-started-section">
  <div class="install-instructions">
    <h3>Installation</h3>
    <pre><code># Install from GitHub
git clone https://github.com/sibyllinesoft/lens
cd lens
npm install

# Start the search server
npm start</code></pre>
  </div>
  
  <div class="quick-start">
    <h3>Quick Start</h3>
    <ol>
      <li>Index your codebase: <code>lens index /path/to/repo</code></li>
      <li>Start the server: <code>lens server</code></li>
      <li>Search with natural language: <code>lens search "authentication logic"</code></li>
      <li>Use MCP integration with Claude Code for AI-assisted search</li>
    </ol>
  </div>
</div>

## Benefits

Development teams using LENS report:

- **98% reduction** in code search time
- **24.4% better relevance** than traditional tools
- **Seamless AI integration** through MCP protocol
- **Enterprise-scale performance** with sub-millisecond response times

Perfect for large codebases where finding the right code quickly makes the difference between productive development and frustrating searches.

{% set primary = {
  "href": "https://github.com/sibyllinesoft/lens",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% set secondary = {
  "href": "/products",
  "label": "View All Products",
  "icon": "arrow-left"
} %}
{% include "components/cta-buttons.njk" %}
