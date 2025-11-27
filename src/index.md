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
    <div class="title">Slash Your SaaS Bill by 90%</div>
    <div class="subtitle">We provide AI integrated development workspaces for less than a dollar a day</div>
    <div class="subtitle">Our co-management model gives all the power of self hosting with the convenience of SaaS</div>
  </div>
  <div class="title-subtitle-group" data-group-index="1">
    <div class="title">10x Your Company's Velocity</div>
    <div class="subtitle">We automate the drudgery so your team can focus on the hard stuff</div>
    <div class="subtitle">Stop sweating your prompts, our agents understand your business out of the box</div>
  </div>
</div>

{% set heroLogo = '/img/logo.svg' %}
{% set heroLogoAlt = 'Sibylline Software Logo' %}
{% set heroTitle = 'The AI Dev Stack That Actually Ships' %}
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
<h3>Open source workspaces with everything you need for world class developer experience, pre-wired with single sign-on and AI automation, <em>all for less than your monthly Slack bill.</em></h3>
<div class="hero-cta">
  <a href="/products/" class="btn-primary"><span class="btn-inner">Products<i data-lucide="arrow-right"></i></span></a>
  <a href="javascript:void(0)" class="btn-secondary" data-contact-type="contact" data-subject-type="strategy"><span class="btn-inner">Talk Strategy <i data-lucide="mail"></i></span></a>
</div>

Improvements in developer experience are like compounding interest. Each minute saved is a minute that can be re-invested in building your product. Great developer experience lets you respond to feedback from customers faster and build new features at a rate that competitors can't match.

It can be hard to invest in developer experience when users are demanding features and investors are demanding growth. We want to help. That's why we offer pre-configured workspaces and best in class open source tooling.

Amazing developer experience doesn't just come from better tools, it comes from better systems, and the ideal system is different for every team. That's why our tools are designed to fit into your workflows and adapt to your needs. Unlike our competitors, we will and we'll help you use them to automate your business.
</div>

<div class="content-section">

## One Stack From Sandbox to Hyperscale

<div class="services-grid">
<div class="service-card" data-service="training">
<h3><i data-lucide="graduation-cap"></i> Individuals</h3>
<div class="service-summary">
<p><strong>Take the guesswork out of AI.</strong> Skip the research rabbit hole, spin up a professional grade development environment in minutes.</p>
</div>
<div class="service-details">
<p><strong>AI is going to transform the labor market.</strong> The people who thrive will be the ones who've mastered the skill of applying AI to real world problems. Are you ready?</p>
<p>Unlike vibe coding tools that focus on simplifying the process of creating demos in toy environments, our software integrates into the tools used to build real software and deploys into real enviroments.</p>
<ul class="bullet-box">
<li><a href="/rave/">Rave</a> is a complete AI development environment, designed for maximum productivity and preconfigured with best in class tools</li>
<li><a href="/arbiter/">Arbiter</a> compiles your specs into working software with tests that keep your agents on rails</li>
<li>Smith lets you orchestrate agent swarms to implement and test work in parallel</li>
<li><a href="/valknut/">Valknut</a> tames agent induced technical debt</li>
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
<p><strong>Turbo-charge your velocity while slashing your SaaS bill.</strong> Our co-managed AI workspaces give you the simplicity of SaaS with the cost and control of self-hosting.</p>
</div>
<div class="service-details">
<p><strong>The startups that win ship fast.</strong> Our tools let you build at the speed of ideation with simple ops and consistent environments, so your engineers can focus on building product rather than debugging configs.</p>
<p>Unlike vibe coding tools that silo your AI interactions and saddle you with tech debt, our tools are designed to let you build robust systems collaborativelly.</p>
<ul class="bullet-box">
<li><a href="/rave/">Rave</a> is a complete AI development environment, designed for maximum productivity and preconfigured with best in class tools</li>
<li><a href="/arbiter/">Arbiter</a> compiles your specs into working software with tests that keep your agents on rails</li>
<li>Smith lets you orchestrate agent swarms to implement and test work in parallel</li>
<li><a href="/valknut/">Valknut</a> tames agent induced technical debt</li>
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
<p><strong>Make AI the engine of your enterprise.</strong> Our agents respond to business events in realtime, obey policy and build conformant, reliable systems.</p>
</div>
<div class="service-details">
<p><strong>The enterprises that win get the most out of their employees.</strong> Our tools are designed to make it easy for non-technical users to build products and automations that can be deployed to production without a complete rewrite.</p>
<p>Our systems can be adapted to enforce compliance with your conventions, tools and infrastructure, so the vibes always stay good.</p>
<ul class="bullet-box">
<li><a href="/rave/">Rave</a> is a complete AI development environment, designed for maximum productivity and preconfigured with best in class tools</li>
<li>Smith orchestrates agents in response to events anywhere in your organization, with centralized policy management, full auditing and multi-layer sandboxing</li>
<li><a href="/arbiter/">Arbiter</a> ensures agents write compliant code that integrates with your existing systems</li>
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
<h2>Integration and Process are the keys to AI success</h2>
<p>AI is like a rocket ready to carry your business to the next frontier, but with great power comes great responsbility. Launching a rocket without a stable foundation and careful targetting is likely to be counterproductive at best and actively harmful at worst, and adopting AI is no different.<strong>Good information architecture is the foundation for your business takeoff.</strong></p>
<p>We recognize that not everyone has the resources to integrate AI effectively. Thats why our systems take the guesswork out of AI integration. We back them up with support, and we're happy to offer consultations and education. <strong>A few hours of our time will save you weeks of pain.</strong></p>
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
<li>Implementation sprints drop Rave/Smith into your repo, ship automations, and leave behind production runbooks.</li>
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
<h2>Your AI vision will determine your success.</h2>
<p>You just saw how we pair software with embedded experts—this is where it becomes your advantage. If your leadership can't articulate where AI earns or saves the next dollar, every tool purchase turns into shelfware.</p>
<p>Our discovery engagements force that clarity. We map your customer journeys, score back-office workflows, and identify the handful of loops where agents, automations, and humans can work in lockstep. Then we turn those ideas into Arbiter specs, Smith playbooks, and Valknut guardrails so value shows up in production, not pitch decks.</p>
<p>The companies that win don't dabble—they commit to an AI vision, broadcast it, and back it with systems that compound every quarter. Ready to make that happen?</p>
</div>

<div class="discovery-cta">
  <a class="btn-unified btn-primary" href="javascript:void(0)" data-contact-type="contact" data-subject-type="discovery">
    <span class="btn-inner">Start Your Discovery Process <i data-lucide="arrow-right"></i></span>
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

_Where ambitious ideas meet intelligent execution._
