---
eleventyNavigation:
  key: Home
  order: 1
layout: simple.njk
enableModals: true
stylesheets:
  - "/styles/pages/home.css"
  - "/styles/pages/home-inline.css"
scripts:
  - "/js/pages/home.js"
  - "/js/modals.js"
---

<!-- Hidden data for rotating banners - read by JavaScript -->
<div class="hero-data" style="display: none;">
  <div class="title-subtitle-group" data-group-index="0">
    <div class="title">Autonomous Agents Without the Risk</div>
    <div class="subtitle">Zero trust. Post-quantum crypto. Heavy isolation.</div>
    <div class="subtitle">Every agent action sandboxed, encrypted, and auditable.</div>
  </div>
  <div class="title-subtitle-group" data-group-index="1">
    <div class="title">Autonomous Agents Without the Risk</div>
    <div class="subtitle">Built on the standards your organization already runs.</div>
    <div class="subtitle">Envoy. OPA/Rego. Grafana. Day-one integration.</div>
  </div>
</div>

{% set heroLogo = '/img/logo.svg' %}
{% set heroLogoAlt = 'Sibylline Software Logo' %}
{% set heroTitle = 'Autonomous Agents Without the Risk' %}
{% set heroSubtitle %}

  <div class="rotating-banners">
  </div>
{% endset %}
<div class="hero-container">
  <canvas id="neural-network" class="neural-background"></canvas>
  {% include "components/hero-content.njk" %}
</div>

<hr class="hero-divider">

<div class="centered-section">
<h3>Your employees are already running autonomous agents. <em>The only question is whether they're doing it safely.</em></h3>
<div class="hero-cta">
  <a href="/products/" class="btn-primary"><span class="btn-inner">Learn About Smith<i data-lucide="arrow-right"></i></span></a>
  <a href="javascript:void(0)" class="btn-secondary" data-contact-type="contact" data-subject-type="strategy"><span class="btn-inner">Talk to Us <i data-lucide="mail"></i></span></a>
</div>
<p><strong>One in five organizations deployed OpenClaw without IT approval.</strong> Over a third of skills in its marketplace have security vulnerabilities. 40,000 exposed instances on the public internet. 1.5 million leaked API keys. Banning autonomous agents doesn't work&mdash;49% of employees use AI tools their company hasn't sanctioned. The only viable strategy is giving them an agent that's built to be governed.</p>
<p><strong>Smith is a modular autonomous agent framework built on zero trust architecture with post-quantum cryptography.</strong> It delivers the autonomous capabilities your teams want with the security, observability, and policy controls your organization requires. Smith comes pre-configured with best-in-class development tools including <a href="/products/arbiter/">Arbiter</a> and <a href="/products/valknut/">Valknut</a>, and integrates into the infrastructure you already run.</p>
<p><strong>Same agent. Different scales.</strong> Whether you're an individual who wants a secure agent that just works, a startup that needs to move fast without creating security debt, or an enterprise that demands full policy enforcement and compliance&mdash;Smith is one platform with the dials to match.</p>
</div>

<div class="content-section">

## One Agent. Any Scale.

<div class="services-grid">
<div class="service-card" data-service="training">
<h3><i data-lucide="graduation-cap"></i> Individuals</h3>
<div class="service-summary">
<p><strong>Set up in minutes, not days.</strong> Smith's agentic installer handles the hard parts so you get a secure autonomous agent without the configuration minefield.</p>
</div>
<div class="service-details">
<p><strong>The typical OpenClaw setup is a maze of YAML, env files, and exposed ports.</strong> Smith's installer asks what you need, configures zero trust networking, sets up encrypted credential storage, and gives you a working agent in minutes. No plaintext API keys. No exposed ports. No "why is my agent on Shodan" surprises.</p>
<p>Smith comes pre-configured with state-of-the-art development tools so you can start building immediately:</p>
<ul class="bullet-box">
<li><a href="/products/arbiter/">Arbiter</a> compiles your specs into working software with tests that keep your agents on rails</li>
<li><a href="/products/valknut/">Valknut</a> tames agent-induced technical debt before it compounds</li>
<li>Built-in skills and workflows for coding, task automation, and real-world integrations</li>
</ul>

</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual planet">
<div class="orbit-ring"></div>
<i></i>
</div>
</div>

<div class="service-card" data-service="startup">
<h3><i data-lucide="zap"></i> Startups</h3>
<div class="service-summary">
<p><strong>One agent. Full stack. Rock solid.</strong> A single hardened agent with state-of-the-art coding tools and core automations, built to move fast without creating security debt.</p>
</div>
<div class="service-details">
<p><strong>The breach that kills a startup isn't the one you see coming.</strong> Smith ships with best-in-class coding capabilities, task automation, and workflow integration out of the box. Every action runs through zero trust verification and encrypted channels. You get startup speed with hardened security&mdash;because security debt compounds faster than technical debt.</p>
<ul class="bullet-box">
<li><a href="/products/arbiter/">Arbiter</a> compiles your specs into working software with tests that keep your agents on rails</li>
<li><a href="/products/valknut/">Valknut</a> tames agent-induced technical debt before it compounds</li>
<li>Smith orchestrates agent swarms to implement and test work in parallel</li>
<li>Encrypted credential management, sandboxed execution, and audit logging from day one</li>
</ul>
</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual solar">
<div class="star"></div>
<b></b><b></b><b></b><b></b>
</div>
</div>

<div class="service-card" data-service="enterprise">
<h3><i data-lucide="building"></i> Enterprise</h3>
<div class="service-summary">
<p><strong>Your policies. Your compliance. Full visibility.</strong> Everything in Smith, plus the OPA/Rego policy enforcement, Envoy mesh integration, and Grafana observability your security team demands.</p>
</div>
<div class="service-details">
<p><strong>Smith integrates into the governance infrastructure you've already built and audited.</strong> Write agent policies in OPA/Rego. Route traffic through your Envoy mesh. Stream every agent action to your Grafana and SignOz dashboards. RBAC, SSO, and full audit logging are built in&mdash;not bolted on.</p>
<p>Your CISO signs off on day one because there's nothing new to certify:</p>
<ul class="bullet-box">
<li>OPA/Rego policy enforcement for fine-grained agent governance</li>
<li>Envoy service mesh integration for zero trust network control</li>
<li>Full observability through Grafana and SignOz&mdash;the dashboards your team already uses</li>
<li>Centralized multi-user management with RBAC, SSO, and complete audit trails</li>
</ul>
</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual galaxy">
<object type="image/svg+xml" data="/img/svg/galaxy.svg" class="galaxy-svg" width="492" height="252" aria-label="Enhanced spiral galaxy with glow effects"></object>
<div class="glass-overlay"></div>
</div>
</div>
</div>
</div>

<div class="content-section">
<h2>Security that works with you, not against you</h2>
<p><strong>Most enterprise security tools demand a rip-and-replace.</strong> Smith doesn't. It plugs into the infrastructure your team has already built, audited, and certified. Your Envoy mesh handles routing. Your OPA policies enforce governance. Your Grafana dashboards provide visibility. Smith just makes them work for autonomous agents.</p>
<p><strong>Only 6% of organizations have an advanced AI security strategy.</strong> Smith closes that gap on day one&mdash;not by adding another tool to manage, but by extending the tools you already trust. That means shorter procurement cycles, no new infrastructure to certify, and a security team that's an ally instead of a blocker.</p>
</div>

<div class="content-section">

## Why Trust Us With Your AI Strategy

<div class="services-grid">
<div class="service-card" data-service="agentic">
<h3><i data-lucide="bot"></i> We Build Systems, Not Software</h3>
<div class="service-summary">
<p><strong>We pair our stack with embedded consultants</strong> to stand up composable, reliable systems that run safely at scale.</p>
</div>
<div class="service-details">
<p><strong>The difference:</strong> anyone can wrap an API; we design the operating model around it. Every engagement starts with value mapping workshops that surface the exact workflows where AI agents can remove toil or unlock revenue.</p>
<ul class="bullet-box">
<li>Blueprint sessions translate messy processes into Arbiter specs, policy rails and measurable success criteria.</li>
<li>Implementation sprints deploy Smith into your infrastructure, ship automations, and leave behind production runbooks.</li>
<li>Reliability reviews harden agents with evaluation harnesses, incident drills and compliance gates tailored to your org.</li>
</ul>
<p><strong>What this proves:</strong> we don’t hand over tooling and wish you luck; we co-own the outcomes until autonomous systems are delivering the business value we scoped.</p>
</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual">
<div class="autonomous-network">
<div class="network-node central">
<div class="pulse-ring"></div>
<div class="node-core"></div>
</div>
<div class="network-node satellite" style="top: 25%; left: 75%;">
<div class="node-core"></div>
<div class="connection-line" style="transform-origin: center bottom; transform: rotate(-135deg);"></div>
</div>
<div class="network-node satellite" style="top: 75%; left: 75%;">
<div class="node-core"></div>
<div class="connection-line" style="transform-origin: center bottom; transform: rotate(-45deg);"></div>
</div>
<div class="network-node satellite" style="top: 75%; left: 25%;">
<div class="node-core"></div>
<div class="connection-line" style="transform-origin: center bottom; transform: rotate(45deg);"></div>
</div>
<div class="network-node satellite" style="top: 25%; left: 25%;">
<div class="node-core"></div>
<div class="connection-line" style="transform-origin: center bottom; transform: rotate(135deg);"></div>
</div>
<div class="data-flow">
<div class="flow-particle" style="animation-delay: 0s;"></div>
<div class="flow-particle" style="animation-delay: 1s;"></div>
<div class="flow-particle" style="animation-delay: 2s;"></div>
</div>
</div>
</div>
</div>

<div class="service-card" data-service="predictive">
<h3><i data-lucide="trending-up"></i> Deployed in Fortune 500, government, and military</h3>
<div class="service-summary">
<p><strong>High-stakes domains taught us to lead with value.</strong> Our consulting layers prove impact before we deploy agents at scale.</p>
</div>
<div class="service-details">
<p><strong>You get seasoned operators:</strong> the teams that shipped AI for regulated industries now blueprint your telemetry, incentives, and governance so the software stack lands cleanly.</p>
<ul class="bullet-box">
<li>Value engineering playbooks quantify ROI upfront, with dashboards that reflect the CFO’s language.</li>
<li>Executive enablement keeps legal, compliance and business stakeholders aligned on policy boundaries.</li>
<li>Acceleration pods pair your SMEs with our architects to ship one lighthouse project that other teams can copy.</li>
</ul>
<p><strong>The outcome:</strong> you know which AI initiatives pay for themselves, you have proof in production, and your internal teams inherit the patterns instead of vendor lock‑in.</p>
</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual">
<div class="learning-evolution">
<div class="brain-container">
<div class="brain-hemisphere left">
<div class="neural-pathway"></div>
<div class="neural-pathway"></div>
<div class="neural-pathway"></div>
</div>
<div class="brain-hemisphere right">
<div class="neural-pathway"></div>
<div class="neural-pathway"></div>
<div class="neural-pathway"></div>
</div>
<div class="learning-pulse"></div>
</div>
<div class="data-absorption">
<div class="data-point incoming" style="animation-delay: 0s;"></div>
<div class="data-point incoming" style="animation-delay: 0.3s;"></div>
<div class="data-point incoming" style="animation-delay: 0.6s;"></div>
<div class="data-point incoming" style="animation-delay: 0.9s;"></div>
</div>
<div class="improvement-chart">
<div class="chart-bar" style="height: 20%; animation-delay: 0.2s;"></div>
<div class="chart-bar" style="height: 40%; animation-delay: 0.4s;"></div>
<div class="chart-bar" style="height: 65%; animation-delay: 0.6s;"></div>
<div class="chart-bar" style="height: 85%; animation-delay: 0.8s;"></div>
<div class="chart-bar" style="height: 100%; animation-delay: 1s;"></div>
</div>
</div>
</div>
</div>

<div class="service-card" data-service="strategic">
<h3><i data-lucide="target"></i> We've Been Doing This Since 2007</h3>
<div class="service-summary">
<p><strong>From collaborative filtering to autonomous agents,</strong> we know which ideas survive hype cycles and how to operationalize them.</p>
</div>
<div class="service-details">
<p><strong>Why experience matters:</strong> we’ve watched trends boom and bust, so our advisory work focuses on durable capabilities—customer insight loops, spec discipline, and trustable automation.</p>
<ul class="bullet-box">
<li>Roadmapping engagements connect your corporate strategy to an adoption sequence aligned with data readiness.</li>
<li>Governance frameworks embed Arbiter, Valknut, and Smith into your SDLC without slowing product teams down.</li>
<li>Mentorship programs train your leads to run AI initiatives using the same scorecards we use internally.</li>
</ul>
<p><strong>What this means for you:</strong> we show up as partners, not just platform vendors—sharing the hard-won playbooks that keep AI transformations aligned with real business leverage.</p>
</div>
<div class="click-hint">Click to expand</div>
<div class="service-visual">
<div class="strategic-roadmap">
<div class="roadmap-timeline">
<div class="milestone-marker completed">
<div class="milestone-dot"></div>
<div class="milestone-label">Concept</div>
</div>
<div class="milestone-marker completed">
<div class="milestone-dot"></div>
<div class="milestone-label">Design</div>
</div>
<div class="milestone-marker active">
<div class="milestone-dot pulsing"></div>
<div class="milestone-label">Deploy</div>
</div>
<div class="milestone-marker">
<div class="milestone-dot"></div>
<div class="milestone-label">Scale</div>
</div>
<div class="progress-line-bg"></div>
<div class="progress-line-fill"></div>
</div>
<div class="impact-visualization">
<div class="roi-curve">
<div class="curve-point" style="left: 10%; bottom: 20%;"></div>
<div class="curve-point" style="left: 30%; bottom: 40%;"></div>
<div class="curve-point active" style="left: 50%; bottom: 65%;"></div>
<div class="curve-point" style="left: 70%; bottom: 85%;"></div>
<div class="curve-point" style="left: 90%; bottom: 95%;"></div>
<div class="roi-line"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<div class="content-section">
<h2>Your people already want autonomous agents. Give them a safe way to use them.</h2>
<p>Shadow AI isn't a future risk&mdash;it's happening now. 49% of employees use AI tools their company hasn't sanctioned. The organizations that thrive won't be the ones that ban autonomous agents. They'll be the ones that channel that demand into a platform with real security, real governance, and real observability.</p>
<p>Smith gives your teams the autonomous capabilities they've been cobbling together with OpenClaw and duct tape&mdash;wrapped in the zero trust architecture, post-quantum cryptography, and policy enforcement that your security team can actually sign off on.</p>
<p><strong>The agentic AI security model you build in the next 30 days determines whether you capture productivity gains or become the next breach disclosure.</strong></p>
</div>

<div class="discovery-cta">
  <a class="btn-unified btn-primary" href="javascript:void(0)" data-contact-type="contact" data-subject-type="discovery">
    <span class="btn-inner">Deploy Smith Securely <i data-lucide="arrow-right"></i></span>
  </a>
</div>

</div>

<section class="home-articles" markdown="0">
  <h2>From Our Blog: Systems That Scale. Workflows That Work.</h2>
  <p>Deep dives on building agents that don't break.</p>

  {% if collections.articles.length > 0 %}

  {% set recentArticles %}
  <div class="recent-articles">
    {% for article in collections.articles | head(3) %}
      {% include "components/article-card.njk" %}
    {% endfor %}
  </div>
  {% endset %}

  {{ recentArticles | safe }}

  <p class="home-articles-link"><a href="/articles/">View all articles <i data-lucide="arrow-right"></i></a></p>
  {% endif %}
</section>

_Autonomous power. Zero trust security. Your infrastructure._
