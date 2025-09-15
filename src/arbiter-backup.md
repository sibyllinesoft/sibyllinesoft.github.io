---
eleventyNavigation:
  key: Arbiter
  parent: Products
  order: 3
layout: simple.njk
title: "Arbiter: Complete Software Development Specification Service"
description: "From requirements to running code. Mathematical specifications become executable contracts with CUE language precision."
enableModals: true
stylesheets:
  - "/styles/valknut.css"
scripts:
  - "/js/valknut-banners.js"
---

<!-- Hidden data for rotating banners - customize this for Arbiter -->
<div class="hero-data" style="display: none;">
   <div class="title-subtitle-group" data-group-index="0">
      <div class="title">From requirements to running code with mathematical precision</div>
      <div class="subtitle">CUE Language Specifications Become Executable Contracts</div>
   </div>
   <div class="title-subtitle-group" data-group-index="1">
      <div class="title">Stop building the wrong thing</div>
      <div class="subtitle">Mathematical specifications eliminate ambiguity and drift</div>
   </div>
   <div class="title-subtitle-group" data-group-index="2">
      <div class="title">Specifications that validate themselves</div>
      <div class="subtitle">From CUE schemas to fully functional software with guaranteed compliance</div>
   </div>
</div>
<div class="hero-container">
   <canvas id="neural-network" class="neural-background"></canvas>
   <div class="hero-content">
      <div class="hero-title-container">
         <img src="/img/logos/arbiter-large.png" alt="Arbiter Logo" class="hero-logo" style="height: 72px;">
         <h1 class="hero-title">From requirements to running code with mathematical precision</h1>
      </div>
      <div class="rotating-banners">
         <div class="banner-container">
            <span class="banner-text" data-text="Mathematical specifications eliminate ambiguity and drift">Mathematical specifications eliminate ambiguity and drift</span>
         </div>
         <div class="banner-container">
            <span class="banner-text" data-text="From CUE schemas to fully functional software with guaranteed compliance">From CUE schemas to fully functional software with guaranteed compliance</span>
         </div>
      </div>
   </div>
</div>
<hr class="hero-divider">
<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script src="/js/trefoil-animation.js"></script>

<div class="centered-section">
   <p><strong>You start with great intentions.</strong> Business requirements are clear, stakeholders are aligned, and your development team is ready to build. Fast forward six months and you're delivering software that doesn't match what anyone actually needed. Requirements have drifted, specifications are out of date, and you're spending more time fixing misunderstandings than shipping features. <strong>Traditional specification approaches fail because they can't keep up with reality.</strong></p>
   
   <p>You might try to solve this with more meetings, detailed documentation, or rigid change control processes, but now your team is drowning in bureaucracy while your competitors ship faster. <strong>The answer isn't more process overhead—it's better specifications that evolve with your understanding.</strong></p>
   
   <p>I know what you're thinking: why not just be more careful with requirements gathering? You might have had success with detailed specs on smaller projects, but don't let that mislead you. <strong>Traditional specification approaches don't scale with system complexity.</strong> Once your system passes a certain threshold of interdependence, manual specification tracking becomes impossible and drift inevitable.</p>
</div>

<div class="content-section">
   <h2>Why Traditional Specifications Fail</h2>
   <div class="services-grid">
      <div class="service-card" data-service="drift">
         <h3><i data-lucide="trending-down"></i> Requirements Drift</h3>
         <div class="service-summary">
            <p><strong>Business needs evolve but specifications lag behind.</strong> Teams build against outdated requirements while stakeholders assume changes were incorporated.</p>
         </div>
         <div class="service-details">
            <p><strong>Your team is building against ghost requirements.</strong> What started as a simple e-commerce API has evolved into a complex omnichannel platform, but the original specification still talks about "products" and "orders" without considering inventory management, multi-warehouse fulfillment, or dynamic pricing.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"We spent three months building a user authentication system based on the original specification that called for 'simple login functionality.' Meanwhile, the business team had already committed to enterprise customers expecting SAML SSO, multi-tenant isolation, and audit logging.</p>
                  
                  <p>When we discovered the mismatch during security review, we had to rebuild the entire auth system. The original specification was technically correct but completely obsolete. No one had updated it because everyone assumed someone else was tracking the evolving requirements.</p>
                  
                  <p>The worst part? This wasn't malicious or careless—it was inevitable. Requirements evolve faster than documentation can be updated, especially when different stakeholders have different understandings of what was 'agreed upon.'"</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Senior Developer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      
      <div class="service-card" data-service="ambiguity">
         <h3><i data-lucide="help-circle"></i> Interpretation Ambiguity</h3>
         <div class="service-summary">
            <p><strong>Natural language specifications create multiple valid interpretations.</strong> Each team member builds different mental models from the same documentation.</p>
         </div>
         <div class="service-details">
            <p><strong>Your specification says "validate user input" but doesn't define validation rules.</strong> Frontend validates email format, backend checks for SQL injection, and business logic assumes phone number formatting—but none of these assumptions are documented or coordinated.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"The specification said our API should 'handle product pricing flexibly to support various business models.' Seemed clear enough.</p>
                  
                  <p>The frontend team interpreted this as simple percentage discounts. The backend team built support for tiered pricing, bulk discounts, and promotional codes. The payment integration team assumed dynamic pricing with real-time adjustment. The business team wanted subscription models, usage-based billing, and promotional campaigns.</p>
                  
                  <p>Each interpretation was reasonable given the specification language. But when we tried to integrate, nothing aligned. We had four different pricing models that couldn't work together, and no way to determine which interpretation was 'correct' because the specification was ambiguous by design.</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Technical Lead
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      
      <div class="service-card" data-service="validation">
         <h3><i data-lucide="x-circle"></i> No Validation Mechanism</h3>
         <div class="service-summary">
            <p><strong>No way to verify implementation compliance automatically.</strong> Bugs and requirement mismatches are discovered only through manual testing or production incidents.</p>
         </div>
         <div class="service-details">
            <p><strong>You can't prove your code matches your specifications.</strong> Manual testing catches obvious failures, but subtle requirement violations compound over time until the system behavior diverges significantly from business intent.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"Our specification required 'secure data handling with encryption at rest and in transit.' The implementation passed security review and functioned correctly in production for months.</p>
                  
                  <p>During a compliance audit, we discovered that while database encryption was active and HTTPS was enforced, temporary files created during data processing were being written to disk unencrypted. The logging system was also storing sensitive data in plaintext.</p>
                  
                  <p>The specification was satisfied in the most literal sense, but violated in spirit. There was no automated way to verify comprehensive compliance, and manual review couldn't catch every edge case. We only discovered the issue when external auditors used specialized tools to scan for unencrypted data patterns."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Security Engineer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
   </div>
</div>

<div class="centered-section">
   <p>Here's the solution: specifications that can validate themselves. That's where Arbiter comes in. <strong>Arbiter transforms business requirements into mathematical specifications using the CUE language, then generates fully functional software that's guaranteed to comply with those specifications.</strong> No drift, no ambiguity, no manual validation—just executable contracts that ensure your implementation matches your intent.</p>
   
   <p>Under the hood, Arbiter leverages the mathematical foundations of the CUE language to provide formal verification capabilities. We're talking about type systems with gradual constraint refinement, unification-based validation with automatic consistency checking, and composable specification modules that can be reused across different parts of your system. <strong>Arbiter doesn't just generate code—it generates provably correct code that maintains compliance over time.</strong></p>
   
   <p>The magic happens through CUE's unique approach to configuration and validation. Unlike traditional specification languages, CUE treats your requirements as mathematical constraints that can be composed, refined, and validated automatically. <strong>When requirements change, Arbiter regenerates your implementation to maintain mathematical consistency with your updated specifications.</strong> This isn't your grandfather's code generator—it's a specification-driven development platform that bridges business requirements with mathematical precision.</p>
   
   <p><strong>Arbiter also accelerates compliance and regulatory requirements.</strong> Traditional compliance checking is manual, error-prone, and expensive. Arbiter embeds compliance rules directly into your specifications, generating software that's compliant by construction rather than verification.</p>
</div>

<div class="content-section">
   <h2>Three Levels of Specification: From Validation to Full Generation</h2>
   <div class="services-grid">
      <div class="service-card" data-service="schema-validation">
         <h3><i data-lucide="shield-check"></i> Schema Validation</h3>
         <div class="service-summary">
            <p><strong>CUE schemas provide mathematical precision for data validation.</strong> Eliminate ambiguity with executable specifications that verify compliance automatically.</p>
         </div>
         <div class="service-details">
            <h4>Example CUE Schema:</h4>

```cue
#User: {
    id: string & =~"^[a-z0-9-]+$" & len(id) > 0
    email: string & =~"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    age: int & >= 13 & <= 120
    role: "admin" | "user" | "moderator"
    
    // Conditional constraints based on role
    if role == "admin" {
        permissions: [...string] & len(permissions) > 0
        adminLevel: int & >= 1 & <= 5
    }
    
    // Cross-field validation
    if age < 18 {
        parentalConsent: true
    }
}
```

            <p>Your validation logic becomes mathematically precise, eliminating the guesswork and ensuring consistent behavior across all system components.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I can define exactly what valid data looks like instead of hoping my validation catches edge cases."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Backend Developer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      
      <div class="service-card" data-service="api-contracts">
         <h3><i data-lucide="link"></i> API Contract Generation</h3>
         <div class="service-summary">
            <p><strong>Complete API implementations from CUE specifications.</strong> Generate OpenAPI schemas, validation middleware, and client SDKs with mathematical guarantees.</p>
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
                  <p>"My API documentation, validation, and implementation are always in sync because they're generated from the same source."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> API Developer
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
      
      <div class="service-card" data-service="full-system">
         <h3><i data-lucide="layers"></i> Full System Generation</h3>
         <div class="service-summary">
            <p><strong>Complete application generation from business specifications.</strong> Database schemas, business logic, UI components, and deployment configs—all mathematically consistent.</p>
         </div>
         <div class="service-details">
            <h4>Example System Specification:</h4>

```cue
#ECommerceSystem: {
    // Core business entities
    entities: {
        products: #Product
        orders: #Order  
        customers: #Customer
        inventory: #Inventory
    }
    
    // Business workflows
    workflows: {
        orderProcessing: {
            steps: [
                "validateCustomer",
                "checkInventory", 
                "calculatePricing",
                "processPayment",
                "updateInventory",
                "sendConfirmation"
            ]
            constraints: [
                "inventory must be reserved before payment",
                "failed payments must release inventory",
                "all steps must be auditable"
            ]
        }
    }
    
    // Infrastructure requirements
    infrastructure: {
        database: "postgresql"
        caching: "redis"
        messaging: "rabbitmq"
        deployment: "kubernetes"
    }
}
```
            <p>Complete systems generated with mathematical consistency across all components, ensuring business logic alignment from database to user interface.</p>
            
            <div class="project-features">
               <div class="feature-item" style="font-size: 0.765em;">
                  <p>"I get a complete, working system that's guaranteed to implement my business requirements correctly."</p>
                  
                  <p style="text-align: right; margin-top: 1rem; font-style: italic;">
                     <i data-lucide="user"></i> Product Manager
                  </p>
               </div>
            </div>
         </div>
         <div class="click-hint">Click to expand</div>
      </div>
   </div>
</div>

<div class="centered-section">
   <h2>Ready to Build What You Actually Need?</h2>
   <div class="cta-section">
   <a href="https://github.com/sibyllinesoft/arbiter" class="btn-unified btn-primary">
   <span class="btn-inner">
   View on GitHub
   <i data-lucide="github"></i>
   </span>
   </a>
   <a href="javascript:void(0)" class="btn-unified btn-secondary" data-contact-type="contact" data-subject-type="waitlist" data-custom-body="I'm interested in becoming a tester for Arbiter. Please let me know about testing opportunities.">
   <span class="btn-inner">
   Join Private Testing
   <i data-lucide="mail"></i>
   </span>
   </a>
   <a href="/products" class="btn-unified btn-secondary">
   <span class="btn-inner">
   View All Products
   <i data-lucide="arrow-left"></i>
   </span>
   </a>
</div>
</div>

<div class="content-section">
   <h2>Quick Start</h2>
   
   ```bash
   # Node.js/npm
   npm install -g @sibylline/arbiter
   
   # Cargo (Rust)
   cargo install arbiter-spec
   
   # From Source
   git clone https://github.com/sibyllinesoft/arbiter
   cd arbiter
   npm install && npm run build
   ```

   <h3>Initialize Your First Project:</h3>

   ```bash
   # Create new project
   arbiter init my-project
   cd my-project
   
   # Define your requirements
   arbiter scaffold --type api
   
   # Generate specifications
   arbiter spec generate
   ```

   <h3>Basic Usage:</h3>

   ```bash
   # Validate CUE specifications
   arbiter validate ./specs
   
   # Generate code from specifications
   arbiter generate --target typescript --output ./generated
   
   # Continuous validation during development
   arbiter watch ./specs --auto-generate
   ```

</div>

<div>
   <h2>Command Line Reference</h2>

   ```bash
   # Main specification commands
   arbiter spec [SUBCOMMAND] [OPTIONS]
   
   # Code generation
   arbiter generate [OPTIONS]
   
   # Validation and testing
   arbiter validate [SPEC_PATH] [OPTIONS]
   
   # Project scaffolding
   arbiter init <PROJECT_NAME> [OPTIONS]
   arbiter scaffold --type [api|webapp|microservice] [OPTIONS]
   
   # Development workflow
   arbiter watch [SPEC_PATH] [OPTIONS]
   arbiter serve [OPTIONS]
   ```

   <h3>Specification Commands</h3>
   
   | Command | Description | Options |
   |---------|-------------|---------|
   | `spec generate` | Generate CUE specifications from requirements | `--input`, `--output`, `--format` |
   | `spec validate` | Validate CUE specification consistency | `--strict`, `--show-warnings` |
   | `spec merge` | Merge multiple specification files | `--output`, `--resolve-conflicts` |
   | `spec diff` | Compare specification versions | `--show-changes`, `--format` |
   
   <h3>Generation Commands</h3>
   
   | Command | Description | Options |
   |---------|-------------|---------|
   | `generate code` | Generate implementation code | `--target`, `--template`, `--output` |
   | `generate docs` | Generate API documentation | `--format`, `--include-examples` |
   | `generate tests` | Generate test suites | `--coverage`, `--test-framework` |
   | `generate infra` | Generate infrastructure configs | `--platform`, `--environment` |

   <h3>Supported Targets</h3>
   
   | Target | Languages | Frameworks |
   |--------|-----------|------------|
   | `typescript` | TypeScript, JavaScript | Express, Fastify, Next.js |
   | `python` | Python | FastAPI, Django, Flask |
   | `rust` | Rust | Axum, Actix, Warp |
   | `go` | Go | Gin, Echo, Chi |
   | `csharp` | C# | ASP.NET Core, Minimal APIs |

   <h3>Development Workflow</h3>

   ```bash
   # Start development server with auto-reload
   arbiter serve --watch --port 3000
   
   # Continuous validation and generation
   arbiter watch ./specs \
     --auto-generate \
     --target typescript \
     --output ./src/generated
   
   # Validate against running system
   arbiter validate ./specs \
     --against-runtime \
     --endpoint http://localhost:3000
   ```
   
   | Exit Code | Description |
   |-----------|-------------|
   | `0` | Operation successful |
   | `1` | Specification validation failed |
   | `2` | Code generation error |
   | `3` | Runtime validation failed |
</div>