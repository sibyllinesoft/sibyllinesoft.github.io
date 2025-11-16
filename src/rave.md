---
eleventyNavigation:
  key: RAVE
  parent: Products
  order: 1
layout: simple.njk
title: "RAVE – Reproducible AI Virtual Environments"
description: "Provision isolated, production-ready development clouds with GitLab, JetStream, PostgreSQL, Redis, Mattermost, and Penpot already wired together."
enableModals: true
stylesheets:
  - "/styles/valknut.css"
scripts:
  - "/js/rave-oscilloscope.js"
  - "/js/modals.js"
openGraph:
  title: "RAVE – Reproducible AI Virtual Environments"
  description: "Spin up complete, policy-enforced development stacks for every customer in minutes with the RAVE CLI."
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
    "description": "Private preview CLI"
  "sameAs": "https://github.com/sibyllinesoft/rave"
---

<!-- Hidden data for rotating banners -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">Company clouds in minutes</div>
      <div class="subtitle">Provision GitLab, JetStream, PostgreSQL, Redis, Penpot, and Mattermost per customer with one CLI.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Sealed multi-tenant environments</div>
      <div class="subtitle">Unique port ranges, baked SSH keys, and Age-managed secrets keep tenants isolated.</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Agent-native operations</div>
      <div class="subtitle">NATS JetStream, Mattermost, and GitLab telemetry give agents a command deck on day one.</div>
   </div>
</div>
{% set heroLogo = '/img/logos/rave-raido.svg' %}
{% set heroLogoAlt = 'RAVE Raido Glyph' %}
{% set heroLogoHeight = '96px' %}
{% set heroTitle = 'Reproducible AI Virtual Environments' %}
{% set heroSubtitle -%}
<div class="rotating-banners">
   <div class="banner-container">
      <span class="banner-text" data-text="Spin up GitLab, CI, JetStream, Postgres, Redis, and chat already wired together">Spin up GitLab, CI, JetStream, Postgres, Redis, and chat already wired together</span>
   </div>
   <div class="banner-container">
      <span class="banner-text" data-text="Give every customer an identical, policy-enforced development cloud">Give every customer an identical, policy-enforced development cloud</span>
   </div>
</div>
{%- endset %}
<div class="hero-container">
   <canvas id="rave-oscilloscope" class="neural-background" aria-hidden="true"></canvas>
   {% include "components/hero-content.njk" %}
</div>
<hr class="hero-divider">
   <div class="centered-section">
      <p><strong>RAVE builds complete company development environments from a single CLI invocation.</strong> Each VM ships with GitLab (plus CI runners), NATS JetStream, PostgreSQL, Redis, Penpot, and Mattermost already wired together with GitLab OAuth. Instead of weeks of "works on my machine" triage, teams type <code>rave vm create acme-corp</code> and get a production-grade stack with certificates staged, secrets injected, and agent access pre-configured.</p>
      <p>All lifecycle actions happen through the CLI—direct hypervisor access is intentionally forbidden so every change stays reproducible. Secrets are encrypted with Age/SOPS, port ranges and network namespaces isolate tenants, and built-in health checks plus log tailing keep ops frictionless.</p>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">Foundational Stack</span>
         <h2>Spin up entire companies, not just VMs</h2>
         <p class="lead">RAVE provisions a company’s whole tool suite—version control, messaging, design, data, and observability—so agents and humans land in a ready-made command center.</p>
      </div>
   <div class="services-grid">
         <div class="service-card">
            <h3>Complete company stack</h3>
            <div class="service-summary">
               <p>GitLab, JetStream, PostgreSQL, Redis, Penpot, and Mattermost arrive together with shared OAuth, SSL, and CI already synchronized.</p>
            </div>
            <div class="service-details">
               <p>Everything agents and engineers need is staged in one shot so onboarding is instant.</p>
               <ul class="bullet-box">
                  <li>GitLab with CI runners and baked OAuth redirect URIs</li>
                  <li>NATS JetStream for event streaming and agent signaling</li>
                  <li>PostgreSQL + dual Redis instances for app + GitLab caching</li>
                  <li>Penpot + Mattermost wired into GitLab for design + chat</li>
               </ul>
            </div>
         </div>
         <div class="service-card">
            <h3>Deterministic multi-tenancy</h3>
            <div class="service-summary">
               <p>Each customer cloud gets its own port ranges, SSH keys, and Age-encrypted secrets so drift is impossible.</p>
            </div>
            <div class="service-details">
               <p>The CLI is the only entry point, ensuring every change is reproducible and auditable.</p>
               <ul class="bullet-box">
                  <li>8100+/8110+ port bands per tenant</li>
                  <li>Age keypairs stored via <code>rave secrets init</code> &amp; <code>.sops.yaml</code></li>
                  <li>Network namespaces plus baked SSH keypairs</li>
                  <li>Secrets rehydrated with <code>rave secrets install &lt;company&gt;</code></li>
               </ul>
            </div>
         </div>
         <div class="service-card">
            <h3>Agent-native operations</h3>
            <div class="service-summary">
               <p>Agents monitor and act through NATS JetStream, <code>rave vm logs</code>, and Mattermost channels tied back to GitLab.</p>
            </div>
            <div class="service-details">
               <p>Operations stay reproducible because clouds only respond to CLI-driven workflows.</p>
               <ul class="bullet-box">
                  <li>CLI-only lifecycle ensures reproducibility</li>
                  <li><code>rave vm logs &lt;company&gt; nginx --follow</code> for live tails</li>
                  <li>JetStream topics for workflow automation + telemetry</li>
                  <li>Mattermost rooms for agent command/control</li>
               </ul>
            </div>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">CLI Flow</span>
         <h2>Everything happens through the RAVE CLI</h2>
         <p class="lead">Direct QEMU access is forbidden on purpose—the CLI is the only supported interface so every VM is reproducible, auditable, and scripted.</p>
      </div>
<pre><code># Install and expose the CLI
cd cli && pip install -r requirements.txt
export PATH="$PATH:$(pwd)"

# Create and start a company environment
rave vm create acme-corp --profile development --keypair ~/.ssh/id_ed25519 --skip-build
rave vm start acme-corp
rave vm ssh acme-corp

# Operational telemetry
rave vm logs acme-corp nginx --follow
</code></pre>
      <ul>
         <li><strong>Secrets pipeline:</strong> <code>rave secrets init</code> generates the Age key, injects it into <code>.sops.yaml</code>, and opens <code>config/secrets.yaml</code> for editing; <code>rave secrets diff</code> shows every file that will be written.</li>
         <li><strong>Credential refresh:</strong> <code>rave secrets install &lt;company&gt;</code> rehydrates rotated credentials into running VMs, while <code>SOPS_AGE_KEY_FILE</code> guards the private key.</li>
         <li><strong>OAuth setup:</strong> The CLI prints redirect URIs and syncs client secrets into GitLab via <code>services.rave.gitlab.oauth</code>.</li>
      </ul>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">Isolation &amp; Health</span>
         <h2>Guardrails are baked in before the VM boots</h2>
         <p class="lead">Secrets, identity, and health automation are first-class features—not TODOs left to humans.</p>
      </div>
      <div class="services-grid">
         <div class="service-card">
            <h3>Secrets lifecycle</h3>
            <p>Age + SOPS protect every credential. The CLI won’t build until <code>config/secrets.yaml</code> is encrypted and <code>~/.config/sops/age/keys.txt</code> exists.</p>
            <ul>
               <li>CLI scaffolds keys and enforces encryption before builds</li>
               <li>Secrets embedded automatically during VM creation</li>
               <li>Dry-run diffs via <code>rave secrets diff</code> prevent surprises</li>
            </ul>
         </div>
         <div class="service-card">
            <h3>OAuth &amp; identity</h3>
            <p>GitLab OAuth powers Penpot, Mattermost, and GitLab itself. Docs in <code>docs/oidc-setup.md</code> cover end-to-end Google/GitHub setup, and the CLI prints all redirect URIs.</p>
            <ul>
               <li><code>rave user add</code> + <code>rave user bulk-add</code> keep metadata aligned</li>
               <li>Client secrets synced into <code>/run/secrets/gitlab</code></li>
               <li>Mattermost + Penpot inherit GitLab OAuth automatically</li>
            </ul>
         </div>
         <div class="service-card">
            <h3>Health automation</h3>
            <p><code>scripts/health_checks/</code> plus <code>rave vm logs</code> provide turnkey monitoring. JetStream topics expose service events so agents can raise incidents without human babysitting.</p>
            <ul>
               <li>Structured log tails for nginx, GitLab, and custom services</li>
               <li>Health scripts cover ingress, CI, database, and chat services</li>
               <li>JetStream broadcasts support automated remediation</li>
            </ul>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">Stack Blueprint</span>
         <h2>Architecture map for every tenant VM</h2>
         <p class="lead">RAVE standardizes the same components for each tenant so debugging one VM teaches you how to fix them all.</p>
      </div>
      <div class="services-grid">
         <div class="service-card">
            <h3>Core services</h3>
            <ul>
               <li>GitLab with runners + CI pipelines</li>
               <li>NATS JetStream message bus</li>
               <li>PostgreSQL primary database</li>
               <li>Redis (GitLab) + Redis (application cache)</li>
               <li>nginx reverse proxy with SSL termination</li>
               <li>Penpot for design collaboration</li>
               <li>Mattermost for chat &amp; agent control</li>
            </ul>
         </div>
         <div class="service-card">
            <h3>Isolation primitives</h3>
            <ul>
               <li>Deterministic port ranges per tenant (8100+/8110+ bands)</li>
               <li>Dedicated SSH keypair baked into each VM</li>
               <li>Network namespaces + firewall templates from <code>nixos/configs/</code></li>
               <li>Encrypted secrets shipped via <code>rave secrets install</code></li>
            </ul>
         </div>
         <div class="service-card">
            <h3>Automation hooks</h3>
            <ul>
               <li><code>services/</code> and <code>nixos/modules/</code> expose override points</li>
               <li><code>build-scripts/</code> and <code>demo-scripts/</code> orchestrate profiles</li>
               <li><code>docs/oidc-setup.md</code> + <code>docs/SERVICES-OVERVIEW.md</code> document topology</li>
               <li><code>scripts/health_checks/</code> codify readiness probes</li>
            </ul>
         </div>
      </div>
   </div>

   <div class="content-section">
      <div class="section-header">
         <span class="kicker">Adoption Patterns</span>
         <h2>Where RAVE delivers leverage</h2>
      </div>
      <div class="services-grid">
         <div class="service-card">
            <h3>Use cases</h3>
            <ul>
               <li>Agencies &amp; consultancies: isolated stacks per client</li>
               <li>Multi-tenant SaaS: customer-specific dev/staging clouds</li>
               <li>Team management: department or program-specific sandboxes</li>
               <li>Training &amp; education: standardized curricula environments</li>
               <li>Demo &amp; sales: spin up full customer replicas in under 10 minutes</li>
            </ul>
         </div>
         <div class="service-card">
            <h3>Security guarantees</h3>
            <ul>
               <li>Self-signed SSL for development with upgrade path to issued certs</li>
               <li>GitLab OAuth enforced across Penpot + Mattermost</li>
               <li>SSH key-only access; no passwords, no ad-hoc logins</li>
               <li>Encrypted secrets management before any build begins</li>
               <li>Isolated network namespaces to prevent lateral movement</li>
            </ul>
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
   <p>Ready to stop wasting weeks on environment setup? Join the private preview and get policy-enforced company clouds that agents can operate immediately.</p>
   <div class="project-cta">
      <a href="javascript:void(0)" class="btn-unified btn-primary" data-contact-type="contact" data-subject-type="rave-waitlist" data-custom-body="I'm interested in helping test RAVE. Please share next steps for getting access.">
         <span class="btn-inner">
            Join the RAVE preview
            <i data-lucide="mail"></i>
         </span>
      </a>
   </div>
</div>
