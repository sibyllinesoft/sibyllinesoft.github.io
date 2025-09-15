---
eleventyNavigation:
  key: Lens
  parent: Products
  order: 1
layout: simple.njk
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

<div class="cta-section">
  <a href="https://github.com/sibyllinesoft/lens" class="btn-unified btn-primary">
    <span class="btn-inner">
      View on GitHub
      <i data-lucide="github"></i>
    </span>
  </a>
  <a href="/products" class="btn-unified btn-secondary">
    <span class="btn-inner">
      View All Products
      <i data-lucide="arrow-left"></i>
    </span>
  </a>
</div>

<style>
.project-hero {
  display: flex;
  background: linear-gradient(135deg, var(--color-surface-50) 0%, var(--color-background) 100%);
  border: 1px solid var(--color-border-light-50);
  border-radius: var(--radius-lg);
  margin: var(--space-2xl) 0 var(--space-4xl) 0;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.project-hero-visual {
  flex: 0 0 35%;
  background: linear-gradient(rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.15)), url('/img/optimized/product-lens.webp');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl);
  text-align: center;
}

.hero-icon {
  width: 5rem;
  height: 5rem;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.4));
}

.project-codename {
  color: var(--color-accent);
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.project-status {
  color: var(--color-text-light);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.project-hero-content {
  flex: 1;
  padding: var(--space-3xl);
}

.project-hero-content h2 {
  margin-top: 0;
  margin-bottom: var(--space-lg);
  color: var(--color-text);
  font-size: var(--text-3xl);
  font-weight: 700;
}

.hero-tagline {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin: var(--space-3xl) 0;
}

.feature-card {
  background: var(--color-surface-50);
  border: 1px solid var(--color-border-light-50);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.feature-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-lg);
}

.feature-icon i {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-accent);
}

.feature-card h3 {
  color: var(--color-text);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.metrics-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-xl);
  margin: var(--space-3xl) 0;
  padding: var(--space-2xl);
  background: var(--color-graphite-900);
  border-radius: var(--radius-lg);
}

.metric-item {
  text-align: center;
}

.metric-number {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--color-text-light);
  font-weight: 500;
}

.use-case-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin: var(--space-2xl) 0;
}

.use-case-item {
  background: var(--color-background);
  border-left: 3px solid var(--color-accent);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
}

.use-case-item h4 {
  color: var(--color-text);
  font-weight: 600;
  margin-bottom: var(--space-sm);
}

.getting-started-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  margin: var(--space-3xl) 0;
}

.install-instructions, .quick-start {
  background: var(--color-surface-50);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light-50);
}

.install-instructions h3, .quick-start h3 {
  color: var(--color-text);
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.install-instructions pre {
  background: var(--color-graphite-900);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.install-instructions code {
  color: var(--color-text-light);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.quick-start ol {
  color: var(--color-text-light);
  line-height: var(--leading-relaxed);
}

.quick-start code {
  background: var(--color-graphite-800);
  color: var(--color-accent);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.cta-section {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: var(--space-4xl) 0;
}

.cta-section .btn-unified {
  flex: 0 1 auto;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-hero {
    flex-direction: column;
  }
  
  .project-hero-visual {
    flex: none;
    padding: var(--space-2xl);
  }
  
  .hero-icon {
    width: 4rem;
    height: 4rem;
  }
  
  .project-hero-content {
    padding: var(--space-2xl);
  }
  
  .project-hero-content h2 {
    font-size: var(--text-2xl);
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .metrics-section {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    padding: var(--space-lg);
  }
  
  .getting-started-section {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    flex-direction: column;
  }
  
  .cta-section .btn-unified {
    width: 100%;
    margin: 0;
  }
}
</style>