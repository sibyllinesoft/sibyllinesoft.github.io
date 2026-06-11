---
eleventyNavigation:
  key: RAVE
  parent: Products
  order: 1
layout: simple.njk
permalink: "/products/rave/"
title: "RAVE – Managed Development Environments"
description: "Stop spending weeks on environment setup. We provision and maintain GitLab, CI/CD, databases, messaging, and design tools—you get system access and focus on shipping."
enableModals: true
stylesheets:
  - "/styles/components/modal.css"
  - "/styles/components/service-cards.css"
  - "/styles/components/section-layouts.css"
  - "/styles/components/product-features.css"
  - "/styles/valknut.css"
scripts:
  - "/js/rave-oscilloscope.js"
  - "/js/modals.js"
openGraph:
  title: "RAVE – Managed Development Environments"
  description: "We provision and maintain your complete dev stack—GitLab, CI/CD, databases, chat, and design tools. You get system access and focus on building."
  type: website
  image: "/img/optimized/product-rave.webp"
jsonLD:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "RAVE"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Cross-platform"
  "offers":
    "@type": "Offer"
    "price": "0"
    "priceCurrency": "USD"
    "description": "Managed development environment"
  "sameAs": "https://github.com/sibyllinesoft/rave"
---

<!-- Hidden data for rotating banners -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Your Dev Stack, Fully Managed</div>
      <div class="subtitle">GitLab, CI/CD, databases, messaging, and design tools—we set it up and keep it running.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Focus on Building, Not Infrastructure</div>
      <div class="subtitle">Full system access when you need it. Managed operations so you don't have to think about it.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Agent-Ready from Day One</div>
      <div class="subtitle">NATS JetStream, Mattermost, and GitLab telemetry give your agents a command deck immediately.</div>
   </div>
</div>
{% set heroLogo = '/img/logos/raido.webp' %}
{% set heroLogoAlt = 'RAVE Raido Glyph' %}
{% set heroLogoHeight = '96px' %}
{% set heroTitle = 'Managed Development Environments' %}
{% set heroSubtitle -%}
<div class="rotating-banners">
   <div class="banner-container">
      <span class="banner-text" data-text="GitLab, CI, databases, messaging, and design tools—already wired together">GitLab, CI, databases, messaging, and design tools—already wired together</span>
   </div>
   <div class="banner-container">
      <span class="banner-text" data-text="We handle the infrastructure so you can focus on shipping">We handle the infrastructure so you can focus on shipping</span>
   </div>
</div>
{%- endset %}
<div class="hero-container rave-hero">
   <canvas id="rave-oscilloscope" class="neural-background" aria-hidden="true"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
<div class="centered-section">
<h3>We provision and maintain your complete dev environment. You get system access and focus on shipping.</h3>
   {% set primary = {
  "href": "javascript:void(0)",
  "label": "Get a Managed Environment",
  "icon": "mail",
  "contactType": "contact",
  "subjectType": "rave-waitlist",
  "customBody": "I'm interested in a managed RAVE environment. Please share next steps for getting access."
} %}
{% set secondary = {
  "href": "https://github.com/sibyllinesoft/rave",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% include "components/cta-buttons.njk" %}
   <p><strong>Environment setup is where velocity goes to die.</strong> Every new project means another week configuring GitLab, wiring up OAuth, debugging SSL certificates, and praying staging matches production. Your team should be shipping features, not fighting infrastructure.</p>
   <p><strong>RAVE is a co-managed development environment.</strong> We provision and maintain a complete stack—GitLab with CI runners, NATS JetStream, PostgreSQL, Redis, Penpot, and Mattermost—already integrated, already secured, already observable. You get full system access to customize what you need. We handle the operational burden so you don't have to think about it.</p>
</div>

   <div class="content-section">
      <div class="section-header">
         <h2>Everything you need, nothing to configure</h2>
         <p class="lead">Version control, CI/CD, messaging, databases, design tools, and observability—already integrated so you can start building immediately.</p>
      </div>
   <div class="services-grid">
         <div class="service-card" data-service="company-stack">
            <h3><i data-lucide="boxes"></i> Stop Wiring Services Together</h3>
            <div class="service-summary">
               <p><strong>Your team shouldn't spend the first week configuring OAuth.</strong> RAVE ships GitLab, JetStream, PostgreSQL, Redis, Penpot, and Mattermost already talking to each other.</p>
            </div>
            <div class="service-details">
               <p><strong>Environment setup is pure toil.</strong> Every hour spent debugging SSL certificates or chasing down connection strings is an hour not spent shipping features. We eliminate that entire category of work.</p>
               <ul class="bullet-box">
                  <li>GitLab with CI runners and OAuth redirect URIs baked in</li>
                  <li>NATS JetStream for event streaming and agent signaling</li>
                  <li>PostgreSQL + dual Redis instances ready for your app</li>
                  <li>Penpot + Mattermost wired into GitLab for design and chat</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="co-managed">
            <h3><i data-lucide="shield-check"></i> Co-Managed Access</h3>
            <div class="service-summary">
               <p><strong>Full system access when you need it.</strong> Tweak configurations, add services, customize workflows—we handle the maintenance and keep everything running.</p>
            </div>
            <div class="service-details">
               <p><strong>Your environment, our operations.</strong> You get SSH access and can modify anything you need. We handle updates, monitoring, backups, and keeping the lights on so you can focus on your actual work.</p>
               <ul class="bullet-box">
                  <li>Full SSH and system access to your environment</li>
                  <li>We handle updates, security patches, and maintenance</li>
                  <li>Monitoring and alerting included</li>
                  <li>Customize anything—add services, change configs, extend the stack</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="agent-native">
            <h3><i data-lucide="bot"></i> Agent-Ready from Day One</h3>
            <div class="service-summary">
               <p><strong>Your agents can't automate what they can't observe.</strong> RAVE gives them JetStream events, structured logs, and Mattermost channels from first boot.</p>
            </div>
            <div class="service-details">
               <p><strong>Agent-native means agents can actually operate.</strong> They can tail logs, respond to events, and coordinate through chat—without you building any of that infrastructure first.</p>
               <ul class="bullet-box">
                  <li>Structured logs accessible via CLI and API</li>
                  <li>JetStream topics for workflow automation and telemetry</li>
                  <li>Mattermost rooms for agent command and control</li>
                  <li>GitLab webhooks and CI integration out of the box</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <h2>Full control when you need it</h2>
         <p class="lead">SSH into your environment, customize configurations, add services—it's your stack. We just keep it running.</p>
      </div>
<pre>
<code>
# SSH into your environment
ssh yourenv.rave.sibylline.dev
</code>
</pre>
<h2>All services pre-configured with single sign on</h2>
      <ul>
         <li><strong>Full system access:</strong> SSH access to your environment with sudo privileges. Install packages, modify configs, add services.</li>
         <li><strong>Custom domains:</strong> Your environment runs on a dedicated subdomain. Bring your own domain if you prefer.</li>
         <li><strong>SSO everywhere:</strong> GitLab OAuth flows through to Penpot, Mattermost, and every service in the stack. Add a user once, they can log into everything.</li>
      </ul>
   </div>

   <div class="content-section">
      <div class="section-header">
         <h2>Secure by default, monitored 24/7</h2>
      </div>
      <div class="services-grid">
         <div class="service-card" data-service="secrets">
            <h3><i data-lucide="key-round"></i> Secrets That Can't Leak</h3>
            <div class="service-summary">
               <p><strong>Every credential is encrypted at rest.</strong> Age + SOPS protect your secrets, and the system enforces it—not your memory.</p>
            </div>
            <div class="service-details">
               <p><strong>Security through architecture, not discipline.</strong> Secrets are encrypted before anything runs. No plaintext credentials in config files, no accidental exposure.</p>
               <ul>
                  <li>All secrets encrypted with Age before deployment</li>
                  <li>Automatic secret rotation support</li>
                  <li>No plaintext credentials anywhere in the stack</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="oauth">
            <h3><i data-lucide="fingerprint"></i> One Login, Everywhere</h3>
            <div class="service-summary">
               <p><strong>Stop managing five different user databases.</strong> GitLab OAuth flows through to Penpot, Mattermost, and every service automatically.</p>
            </div>
            <div class="service-details">
               <p><strong>Identity is solved on day one.</strong> Add a user to GitLab and they can log into everything. No manual provisioning, no password sprawl, no "which account is this again?"</p>
               <ul>
                  <li>Single sign-on across GitLab, Mattermost, and Penpot</li>
                  <li>Add team members once, access everywhere</li>
                  <li>Role-based access control through GitLab groups</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="health">
            <h3><i data-lucide="heart-pulse"></i> We Keep the Lights On</h3>
            <div class="service-summary">
               <p><strong>Monitoring and maintenance included.</strong> We watch your environment 24/7 and handle issues before they impact your work.</p>
            </div>
            <div class="service-details">
               <p><strong>Focus on building, not operations.</strong> Health checks, log aggregation, and alerting are built in. When something needs attention, we handle it.</p>
               <ul>
                  <li>24/7 health monitoring across all services</li>
                  <li>Proactive maintenance and security updates</li>
                  <li>Incident response—we fix problems, you stay productive</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <h2>A complete development platform</h2>
         <p class="lead">Version control, CI/CD, messaging, design, databases, and caching—the stack you'd build yourself, minus the months of integration work.</p>
      </div>
      <div class="services-grid">
         <div class="service-card" data-service="core-services">
            <h3><i data-lucide="server"></i> Production-Tested Stack</h3>
            <div class="service-summary">
               <p><strong>This is the stack that works.</strong> We've run this configuration in production. Services are chosen because they integrate well and scale predictably.</p>
            </div>
            <div class="service-details">
               <p><strong>Everything you need to ship software.</strong> No hunting for compatible versions, no debugging integration issues, no "why doesn't this talk to that."</p>
               <ul>
                  <li>GitLab with runners and CI pipelines</li>
                  <li>NATS JetStream message bus</li>
                  <li>PostgreSQL primary database</li>
                  <li>Redis (GitLab) + Redis (application cache)</li>
                  <li>nginx reverse proxy with SSL termination</li>
                  <li>Penpot for design collaboration</li>
                  <li>Mattermost for chat and agent control</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="isolation">
            <h3><i data-lucide="lock"></i> Your Own Isolated Environment</h3>
            <div class="service-summary">
               <p><strong>Dedicated resources, not shared infrastructure.</strong> Your environment is yours alone—isolated network, dedicated credentials, encrypted secrets.</p>
            </div>
            <div class="service-details">
               <p><strong>No noisy neighbors, no shared risk.</strong> Your data stays in your environment. Your workloads don't compete with anyone else's.</p>
               <ul>
                  <li>Dedicated compute and storage resources</li>
                  <li>Isolated network with your own firewall rules</li>
                  <li>Your own SSL certificates and domains</li>
                  <li>Encrypted secrets that only you can access</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="automation">
            <h3><i data-lucide="settings-2"></i> Customize Everything</h3>
            <div class="service-summary">
               <p><strong>It's your environment—make it yours.</strong> Add services, change configs, install packages. Full system access means no artificial limits.</p>
            </div>
            <div class="service-details">
               <p><strong>Opinionated defaults, no lock-in.</strong> The base configuration works out of the box, but you can modify anything. We'll help you get custom setups working.</p>
               <ul>
                  <li>Install any packages or services you need</li>
                  <li>Modify configurations to match your workflow</li>
                  <li>Add custom health checks and monitoring</li>
                  <li>We'll help with complex customizations</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <h2>Teams that want to build, not babysit infrastructure</h2>
      </div>
      <div class="services-grid">
         <div class="service-card" data-service="use-cases">
            <h3><i data-lucide="briefcase"></i> Perfect For</h3>
            <div class="service-summary">
               <p><strong>Anyone tired of spending weeks on environment setup.</strong> Startups, indie hackers, small teams—anyone who'd rather ship features than fight DevOps.</p>
            </div>
            <div class="service-details">
               <p><strong>Get back to building.</strong> RAVE is for teams that want enterprise-grade infrastructure without hiring a DevOps team to maintain it.</p>
               <ul>
                  <li><strong>Startups:</strong> Production-ready infrastructure from day one</li>
                  <li><strong>Small teams:</strong> Enterprise tools without enterprise overhead</li>
                  <li><strong>AI-native development:</strong> Agent-ready infrastructure with events and observability built in</li>
                  <li><strong>Side projects:</strong> Professional tooling without the setup time</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
         <div class="service-card" data-service="security">
            <h3><i data-lucide="shield"></i> Security Without the Headache</h3>
            <div class="service-summary">
               <p><strong>The secure path is the only path.</strong> SSL everywhere, encrypted secrets, SSO across all services—security best practices are the default.</p>
            </div>
            <div class="service-details">
               <p><strong>Security isn't a checklist, it's architecture.</strong> We handle the security configuration so you don't have to become a security expert to ship safely.</p>
               <ul>
                  <li>SSL everywhere with automatic certificate management</li>
                  <li>GitLab OAuth enforced across the entire stack</li>
                  <li>SSH key-only access—no passwords</li>
                  <li>Secrets encrypted at rest</li>
                  <li>Regular security updates applied automatically</li>
               </ul>
            </div>
            <div class="click-hint">Click to expand</div>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">Documentation</span>
         <h2>Everything lives in the repo</h2>
      </div>
      <ul>
         <li><a href="https://github.com/sibyllinesoft/rave/tree/main/cli" rel="noopener" target="_blank">CLI documentation</a> — install instructions, command reference, and mandatory workflow.</li>
         <li><a href="https://github.com/sibyllinesoft/rave/blob/main/docs/SERVICES-OVERVIEW.md" rel="noopener" target="_blank">VM architecture overview</a> — service graph, port maps, and dependency notes.</li>
         <li><a href="https://github.com/sibyllinesoft/rave/tree/main/docs" rel="noopener" target="_blank">Security &amp; audit reports</a> — historical reports plus deployment status tracking.</li>
         <li><a href="https://github.com/sibyllinesoft/rave/blob/main/docs/README.md" rel="noopener" target="_blank">Divio-style documentation hub</a> — tutorials, how-tos, references, and explanations with migration checklists.</li>
      </ul>
   </div>

<div class="centered-section">
   <h2>Ready to Focus on Building Instead of Infrastructure?</h2>
   <p>Get a complete, managed development environment. We handle the setup and maintenance—you ship features.</p>
   {% set primary = {
  "href": "javascript:void(0)",
  "label": "Get a Managed Environment",
  "icon": "mail",
  "contactType": "contact",
  "subjectType": "rave-waitlist",
  "customBody": "I'm interested in a managed RAVE environment. Please share next steps for getting access."
} %}
{% set secondary = {
  "href": "https://github.com/sibyllinesoft/rave",
  "label": "View on GitHub",
  "icon": "github"
} %}
{% include "components/cta-buttons.njk" %}
</div>
