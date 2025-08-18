---
eleventyNavigation:
  key: About
  order: 4
layout: simple.njk
---

# About Nathan Rice

<!-- About - Open Book Style -->
<div class="about-brochure">
  <div class="about-visual">
    <i data-lucide="cpu" class="about-icon"></i>
    <div class="about-image-placeholder">Nathan Rice<br>Founder & AI Architect</div>
  </div>
  <div class="about-content">
    <h2>Two Decades of AI Innovation</h2>
    <div class="about-pitch">
      <p><strong>The Journey:</strong> My fascination with machine learning began during the Netflix Prize in 2007—a pivotal moment that sparked a lifelong passion for extracting insights from data. Since then, I've dedicated myself to understanding how intelligent systems can amplify human capabilities and create new possibilities.</p>
      
      <p><strong>The Experience:</strong> Over the years, I've built a reputation for designing and building powerful data-driven applications that help entrepreneurs and growing companies unlock their potential. My sweet spot? Helping startups figure out how to leverage their data to build amazing apps, and increasingly, how to harness AI to enable entirely new types of programs.</p>
      
      <div class="about-expertise">
        <div class="expertise-item">
          <strong>Deep Technical Expertise:</strong> Nearly two decades of machine learning experience, from the early days of collaborative filtering to today's large language models and agentic systems.
        </div>
        <div class="expertise-item">
          <strong>Startup Sensibility:</strong> I understand the unique pressures of growing companies—the need to move fast, validate quickly, and build for scale without over-engineering.
        </div>
        <div class="expertise-item">
          <strong>Practical AI Implementation:</strong> Not just theoretical knowledge, but real-world experience building systems that work, scale, and deliver measurable value.
        </div>
        <div class="expertise-item">
          <strong>Creative Problem Solving:</strong> My artistic background brings a different perspective to technical challenges, often leading to innovative solutions others might miss.
        </div>
      </div>
      
      <p class="about-philosophy"><strong>My Philosophy:</strong> The best AI systems don't replace human intelligence—they amplify it. Whether you're a founder with a vision, a startup ready to scale, or an established company looking to stay ahead, I'm here to help you discover what becomes possible when you combine your domain expertise with intelligent systems.</p>
      
      <div class="about-cta">
        <a href="#" data-contact-type="contact" data-subject-type="general" data-custom-body="I'm interested in discussing how AI could transform my business. Here's what I'm working on..." class="btn-primary"><span class="btn-inner">Start a Conversation <i data-lucide="mail"></i></span></a>
      </div>
    </div>
  </div>
</div>

<style>
/* About Brochure - Open Book Style */
.about-brochure {
  display: flex;
  background: var(--color-surface-50);
  border: 1px solid var(--color-border-light-50);
  border-radius: var(--radius-lg);
  margin: var(--space-3xl) 0;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.about-brochure:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent);
}

.about-visual {
  flex: 0 0 40%;
  background: var(--color-graphite-700);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl) var(--space-2xl);
  position: relative;
  background-size: cover;
  background-position: 70% center;
  background-blend-mode: overlay;
  text-align: center;
  background-image: linear-gradient(rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.3)), url('/img/photo.png');
}

.about-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-accent);
  margin-bottom: var(--space-lg);
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.4));
}

.about-image-placeholder {
  color: var(--color-text-light);
  font-size: var(--text-lg);
  font-weight: 600;
  text-align: center;
  line-height: var(--leading-tight);
}

.about-content {
  flex: 1;
  padding: var(--space-3xl);
}

.about-content h2 {
  margin-top: 0;
  margin-bottom: var(--space-lg);
  color: var(--color-text);
  font-size: var(--text-3xl);
  font-weight: 700;
}

.about-pitch {
  color: var(--color-text-light);
  line-height: var(--leading-relaxed);
}

.about-pitch p {
  margin-bottom: var(--space-lg);
}

.about-pitch strong {
  color: var(--color-text);
  font-weight: 600;
}

.about-expertise {
  margin: var(--space-2xl) 0;
  background: var(--color-background);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  border-left: 3px solid var(--color-accent);
}

.expertise-item {
  margin-bottom: var(--space-lg);
  padding-left: var(--space-md);
}

.expertise-item:last-child {
  margin-bottom: 0;
}

.expertise-item strong {
  color: var(--color-accent);
  font-weight: 600;
  display: block;
  margin-bottom: var(--space-xs);
}

.about-philosophy {
  color: var(--color-text);
  font-weight: 500;
  font-style: italic;
  margin-bottom: var(--space-lg);
  font-size: var(--text-lg);
}

.about-cta {
  margin-top: var(--space-lg);
  text-align: center;
}

.btn-primary {
  position: relative;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--text-base);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  overflow: hidden;
  color: white;
  background: linear-gradient(
    to right, 
    var(--color-accent) 20%, 
    var(--color-accent) 35%, 
    rgba(115, 125, 247, 1) 42%, 
    rgba(130, 140, 248, 1) 50%, 
    rgba(115, 125, 247, 1) 58%, 
    var(--color-accent) 65%, 
    var(--color-accent) 100%
  );
  background-size: 200% auto;
  animation: tagShine 6s linear infinite;
}

.btn-primary .btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  margin: 2px;
  background: var(--color-accent);
  border-radius: calc(var(--radius-lg) - 1px);
  color: white;
  width: 100%;
  height: 100%;
}

.btn-primary .btn-inner .lucide {
  color: rgba(180, 220, 255, 0.9);
  width: 1em;
  height: 1em;
}

@keyframes tagShine {
  from {
    background-position: -200% center;
  }
  to {
    background-position: 200% center;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-brochure {
    flex-direction: column;
  }
  
  .about-visual {
    flex: none;
    padding: var(--space-2xl);
  }
  
  .about-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .about-content {
    padding: var(--space-2xl);
  }
  
  .about-content h2 {
    font-size: var(--text-2xl);
  }
  
  .about-expertise {
    padding: var(--space-lg);
  }
}
</style>