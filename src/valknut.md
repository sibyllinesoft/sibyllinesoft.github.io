---
eleventyNavigation:
  key: Valknut
  parent: Products
  order: 4
layout: simple.njk
title: "Valknut: Static Analysis Engine for AI-Guided Refactoring"
description: "Stop AI agents hunting blindly. Precise problem roadmaps with 0-1 urgency scores guide agents to highest-impact issues first."
---

<!-- Hidden data for rotating banners - customize this for Valknut -->
<div class="hero-data" style="display: none;">
  <div class="title-subtitle-group" data-group-index="0">
    <div class="title">Static Analysis That Guides, Not Just Reports</div>
    <div class="subtitle">Turn code complexity into a precise refactoring roadmap</div>
    <div class="subtitle">Give AI agents the intelligence to fix what matters most</div>
    <div class="subtitle">Find systemic issues, not just surface-level code smells</div>
  </div>
  <div class="title-subtitle-group" data-group-index="1">
    <div class="title">Stop AI Agents From Hunting Blindly</div>
    <div class="subtitle">AI-native analysis with 0-1 urgency scores for high-impact refactoring</div>
    <div class="subtitle">From thousands of files to a prioritized list of actionable insights</div>
    <div class="subtitle">Integrated with Claude Code and other agents via MCP</div>
  </div>
</div>

<div class="hero-container">
  <canvas id="neural-network" class="neural-background"></canvas>
  <div class="hero-content">
    <div class="hero-title-container">
      <img src="/img/logos/valknut-large.webp" alt="Valknut Logo" class="hero-logo" style="height: 52px;">
      <h1 class="hero-title normal" style="will-change: auto;">Valknut</h1>
    </div>
    <div class="rotating-banners">
      <!-- This will be populated by the script using the hero-data above -->
    </div>
  </div>
</div>

<hr class="hero-divider">

<style>
/* Valknut-specific hero styling to match homepage */
.hero-container {
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.neural-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.6;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  padding: var(--space-3xl) var(--space-xl);
  margin: 0 50px;
}

.main {
  padding-top: 0;
}

.hero-divider {
  margin-top: 0;
  margin-bottom: 40px; /* 50% of the original 80px bottom margin */
}
</style>

<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<script>
// Trefoil animation for Valknut hero banner
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('neural-network');
  if (!canvas) return;

  // Renderer - size to hero container, not viewport
  const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  
  const container = document.querySelector('.hero-container');
  function resizeRenderer() {
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }
  
  // Scene & camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(0, 0, 2.75); // Zoomed out slightly to 2.75

  // Trefoil torus knot curve T(2,3)
  class TrefoilTorusCurve extends THREE.Curve {
    constructor(R=1.7, r=0.52){ super(); this.R = R; this.r = r; }
    getPoint(t, target=new THREE.Vector3()){
      const phi = t * Math.PI * 2.0;
      const rad = this.R + this.r * Math.cos(3*phi);
      target.set(rad*Math.cos(2*phi), rad*Math.sin(2*phi), this.r*Math.sin(3*phi));
      return target.multiplyScalar(0.40);
    }
  }
  const curve = new TrefoilTorusCurve();

  // Build the tube grid just to get a regular vertex lattice on the surface
  const tubularSegments = 360;   // segments along the knot
  const radialSegments  = 18;    // segments around circumference
  const tubeRadius      = 0.16;
  const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, true);
  tubeGeo.rotateY(Math.PI/(radialSegments*2)); // move seam out of view

  // Extract grid vertex positions
  const posAttr = tubeGeo.getAttribute('position');
  const ringSize = radialSegments + 1;
  const rings = tubularSegments + 1;
  const totalVerts = rings * ringSize;

  // --- Build edge line segments with per-vertex colors ---
  // We'll add segments along u (rings) and along v (around circumference)
  const segmentsU = tubularSegments * ringSize;
  const segmentsV = tubularSegments * radialSegments;
  const totalSegs = segmentsU + segmentsV;

  const linePositions = new Float32Array(totalSegs * 2 * 3);
  const lineColors    = new Float32Array(totalSegs * 2 * 3);
  const lineUs        = new Float32Array(totalSegs * 2); // param u per vertex for animation

  let ptr = 0;
  function copyVertex(index, uNorm){
    linePositions[ptr*3+0] = posAttr.getX(index);
    linePositions[ptr*3+1] = posAttr.getY(index);
    linePositions[ptr*3+2] = posAttr.getZ(index);
    // initial color mid-gray
    lineColors[ptr*3+0] = 0.5;
    lineColors[ptr*3+1] = 0.5;
    lineColors[ptr*3+2] = 0.5;
    lineUs[ptr] = uNorm;
    ptr++;
  }

  // Segments along u (connect ring i to i+1, same radial j)
  for(let i=0;i<tubularSegments;i++){
    const u0 = i / tubularSegments;
    const u1 = (i+1) / tubularSegments;
    for(let j=0;j<ringSize;j++){
      const idx0 = i*ringSize + j;
      const idx1 = (i+1)*ringSize + j;
      copyVertex(idx0, u0);
      copyVertex(idx1, u1);
    }
  }
  // Segments along v (connect j to j+1 within each ring i)
  for(let i=0;i<tubularSegments;i++){
    const u = i / tubularSegments;
    for(let j=0;j<radialSegments;j++){
      const idx0 = i*ringSize + j;
      const idx1 = i*ringSize + (j+1);
      copyVertex(idx0, u);
      copyVertex(idx1, u);
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3));

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.25 // Reduced opacity for backdrop effect
  });
  const edges = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(edges);

  // --- Build vertex points for visual pips at lattice vertices ---
  const pointsPositions = new Float32Array(totalVerts * 3);
  const pointsColors    = new Float32Array(totalVerts * 3);
  const pointsUs        = new Float32Array(totalVerts);

  let pptr = 0;
  for(let i=0;i<rings;i++){
    const u = i / tubularSegments; // note tubularSegments for normalization; last ring == 1
    for(let j=0;j<ringSize;j++){
      const idx = i*ringSize + j;
      pointsPositions[pptr*3+0] = posAttr.getX(idx);
      pointsPositions[pptr*3+1] = posAttr.getY(idx);
      pointsPositions[pptr*3+2] = posAttr.getZ(idx);
      pointsColors[pptr*3+0] = 0.5;
      pointsColors[pptr*3+1] = 0.5;
      pointsColors[pptr*3+2] = 0.5;
      pointsUs[pptr] = Math.min(1.0, u); // clamp final duplicate
      pptr++;
    }
  }

  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));
  ptsGeo.setAttribute('color',    new THREE.BufferAttribute(pointsColors, 3));
  const ptsMat = new THREE.PointsMaterial({
    vertexColors: true,
    size: 2.0,           // px
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.25 // Reduced opacity for backdrop effect
  });
  const vertices = new THREE.Points(ptsGeo, ptsMat);
  scene.add(vertices);

  // --- Animate wave brightness along u ---
  const waves = 3;          // number of wave fronts
  const sigma = 0.025;      // width of each wave
  const speed = 0.12;       // revolutions per second
  const baseGray = 0.5;     // ~128
  function brightnessAt(u, t){
    let b = 0.0;
    for(let k=0;k<waves;k++){
      const center = (k / waves + speed * t) % 1;
      let d = Math.abs(u - center);
      d = Math.min(d, 1 - d); // circular distance
      b += Math.exp(-0.5 * (d*d) / (sigma*sigma));
    }
    // normalize gently; cap at 1
    return Math.min(1.0, b);
  }
  function applyColorMix(arr, idx, bright){
    // mix(baseGray -> white) by 'bright'
    const c = baseGray * (1.0 - bright) + 1.0 * bright;
    arr[idx*3+0] = c; arr[idx*3+1] = c; arr[idx*3+2] = c;
  }

  const clock = new THREE.Clock();
  function tick(){
    const t = clock.getElapsedTime();

    // Rotate as a whole
    edges.rotation.set(0, t*0.28, 0);
    vertices.rotation.copy(edges.rotation);

    // Update line colors
    const lc = lineGeo.getAttribute('color');
    for(let i=0;i<lineUs.length;i++){
      const bright = brightnessAt(lineUs[i], t);
      applyColorMix(lc.array, i, bright);
    }
    lc.needsUpdate = true;

    // Update point colors
    const pc = ptsGeo.getAttribute('color');
    for(let i=0;i<pointsUs.length;i++){
      const bright = brightnessAt(pointsUs[i], t);
      applyColorMix(pc.array, i, bright);
    }
    pc.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  // Initialize and start
  resizeRenderer();
  tick();

  // Resize handler
  window.addEventListener('resize', resizeRenderer);
});
</script>

<p class="valknut-hero-description">AI agents waste time hunting for refactoring opportunities across codebases. VALKNUT creates precise problem roadmaps—agents focus on highest-impact issues first instead of wandering randomly.</p>

<div class="project-hero" style="display: none;">
  <div class="project-hero-visual">
    <i data-lucide="layers" class="hero-icon"></i>
    <div class="project-codename">Codename: VALKNUT</div>
    <div class="project-status">Production Ready</div>
  </div>
  <div class="project-hero-content">
    <h2>Static Analysis Engine for AI-Guided Refactoring</h2>
    <p class="hero-tagline"><strong>Stop AI agents hunting blindly.</strong></p>
    <p>AI agents waste time hunting for refactoring opportunities across codebases. VALKNUT creates precise problem roadmaps with 0-1 urgency scores—agents focus on highest-impact issues first instead of wandering randomly.</p>
  </div>
</div>

## Core Features

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="target"></i>
    </div>
    <h3>Precise Problem Ranking</h3>
    <p>Deterministic complexity, duplication, and dependency metrics generate refactoring urgency scores without runtime profiling.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="bot"></i>
    </div>
    <h3>AI Agent Integration</h3>
    <p>Purpose-built MCP server lets Claude Code and other AI tools query problematic code automatically and focus efficiently.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="network"></i>
    </div>
    <h3>Systemic Refactoring Intelligence</h3>
    <p>Identifies Impact Packs and circular dependencies that should be tackled together—prevents isolated changes that miss systemic issues.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">
      <i data-lucide="languages"></i>
    </div>
    <h3>Multi-Language Support</h3>
    <p>Comprehensive analysis for Python, TypeScript, JavaScript, and Rust with language-specific optimization patterns.</p>
  </div>
</div>

## The AI Agent Problem

Current AI-guided refactoring approaches are inefficient:

<div class="problem-section">
  <div class="problem-item">
    <h4>Random Code Wandering</h4>
    <p>AI agents explore codebases without clear direction, wasting time on low-impact areas while missing critical problems.</p>
  </div>
  
  <div class="problem-item">
    <h4>Isolated Refactoring</h4>
    <p>Agents make piecemeal changes without understanding systemic relationships, creating inconsistencies and technical debt.</p>
  </div>
  
  <div class="problem-item">
    <h4>No Prioritization</h4>
    <p>Without urgency scoring, agents can't distinguish between minor style issues and critical architectural problems.</p>
  </div>
  
  <div class="problem-item">
    <h4>Context Overload</h4>
    <p>Agents get overwhelmed by large codebases and struggle to identify the most impactful areas for improvement.</p>
  </div>
</div>

## How VALKNUT Works

### Static Analysis Engine

VALKNUT performs comprehensive static analysis to create detailed problem maps:

<div class="analysis-features">
  <div class="analysis-item">
    <h4>Complexity Analysis</h4>
    <p>Cyclomatic complexity, cognitive load, and nesting depth metrics identify overly complex functions and methods.</p>
  </div>
  
  <div class="analysis-item">
    <h4>Duplication Detection</h4>
    <p>Semantic code similarity analysis finds duplicated logic patterns that should be consolidated.</p>
  </div>
  
  <div class="analysis-item">
    <h4>Dependency Mapping</h4>
    <p>Circular dependencies, tight coupling, and architectural violations are identified and prioritized.</p>
  </div>
  
  <div class="analysis-item">
    <h4>Impact Assessment</h4>
    <p>Change impact analysis determines which modifications will have the highest positive effect on codebase health.</p>
  </div>
</div>

### Urgency Scoring Algorithm

VALKNUT uses a sophisticated scoring system to prioritize refactoring opportunities:

<div class="scoring-section">
  <div class="score-component">
    <h4>Technical Debt Score (0-1)</h4>
    <p>Combines complexity metrics, code smells, and maintainability indicators into a unified debt measure.</p>
  </div>
  
  <div class="score-component">
    <h4>Impact Multiplier</h4>
    <p>High-visibility code (frequently changed, central to architecture) gets higher priority scores.</p>
  </div>
  
  <div class="score-component">
    <h4>Effort Estimation</h4>
    <p>Balances potential improvement against estimated refactoring effort for optimal ROI.</p>
  </div>
  
  <div class="score-component">
    <h4>Systemic Risk</h4>
    <p>Code that affects multiple systems or has many dependencies receives appropriate urgency weighting.</p>
  </div>
</div>

## Performance Metrics

<div class="metrics-section">
  <div class="metric-item">
    <div class="metric-number">75%</div>
    <div class="metric-label">More Efficient AI-Guided Refactoring</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">4</div>
    <div class="metric-label">Languages Supported</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">90%</div>
    <div class="metric-label">Reduction in Random Code Exploration</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">100%</div>
    <div class="metric-label">MCP Integration Support</div>
  </div>
  
  <div class="metric-item">
    <div class="metric-number">0.1s</div>
    <div class="metric-label">Average Analysis Time per File</div>
  </div>
</div>

## Language-Specific Analysis

### Python Analysis

<div class="language-features">
  <div class="language-item">
    <h4>PEP 8 Compliance</h4>
    <p>Identifies style violations and suggests automated fixes for better code consistency.</p>
  </div>
  
  <div class="language-item">
    <h4>Type Hint Analysis</h4>
    <p>Detects missing type hints and suggests improvements for better code reliability.</p>
  </div>
  
  <div class="language-item">
    <h4>Import Optimization</h4>
    <p>Finds unused imports, circular import issues, and suggests better module organization.</p>
  </div>
  
  <div class="language-item">
    <h4>Performance Patterns</h4>
    <p>Identifies common performance anti-patterns like inefficient loops and unnecessary computations.</p>
  </div>
</div>

### TypeScript/JavaScript Analysis

<div class="language-features">
  <div class="language-item">
    <h4>Type Safety Issues</h4>
    <p>Identifies `any` types, implicit type coercion, and opportunities for stronger typing.</p>
  </div>
  
  <div class="language-item">
    <h4>Modern Pattern Adoption</h4>
    <p>Suggests updates to modern ES6+ patterns, async/await usage, and functional programming opportunities.</p>
  </div>
  
  <div class="language-item">
    <h4>Bundle Size Impact</h4>
    <p>Analyzes import patterns and suggests optimizations to reduce bundle sizes.</p>
  </div>
  
  <div class="language-item">
    <h4>React/Vue Patterns</h4>
    <p>Framework-specific analysis for hooks usage, component optimization, and state management patterns.</p>
  </div>
</div>

### Rust Analysis

<div class="language-features">
  <div class="language-item">
    <h4>Memory Safety Patterns</h4>
    <p>Identifies opportunities to leverage Rust's ownership system more effectively.</p>
  </div>
  
  <div class="language-item">
    <h4>Performance Optimization</h4>
    <p>Suggests zero-cost abstractions and compile-time optimizations for better performance.</p>
  </div>
  
  <div class="language-item">
    <h4>Error Handling</h4>
    <p>Analyzes Result and Option usage patterns for more idiomatic error handling.</p>
  </div>
  
  <div class="language-item">
    <h4>Concurrency Patterns</h4>
    <p>Identifies opportunities for better async/await usage and parallel processing.</p>
  </div>
</div>

## MCP Integration

### Claude Code Integration

VALKNUT provides seamless integration with Claude Code through the Model Context Protocol:

<div class="integration-details">
  <div class="integration-feature">
    <h4>Problem Query Interface</h4>
    <p>Claude Code can query specific types of problems: "Show me the most complex functions" or "Find circular dependencies"</p>
  </div>
  
  <div class="integration-feature">
    <h4>Contextual Recommendations</h4>
    <p>Provides targeted refactoring suggestions based on the current code context and development goals</p>
  </div>
  
  <div class="integration-feature">
    <h4>Impact Packs</h4>
    <p>Groups related problems that should be addressed together for maximum refactoring effectiveness</p>
  </div>
  
  <div class="integration-feature">
    <h4>Progress Tracking</h4>
    <p>Tracks refactoring progress and measures improvements in code quality metrics over time</p>
  </div>
</div>

## Use Cases

<div class="use-case-list">
  <div class="use-case-item">
    <h4>Legacy Code Modernization</h4>
    <p>Systematically identify and prioritize technical debt in legacy codebases for efficient modernization</p>
  </div>
  
  <div class="use-case-item">
    <h4>AI-Guided Refactoring</h4>
    <p>Direct AI coding assistants to the most impactful refactoring opportunities instead of random exploration</p>
  </div>
  
  <div class="use-case-item">
    <h4>Code Review Enhancement</h4>
    <p>Provide quantitative metrics and prioritization for code review processes and technical discussions</p>
  </div>
  
  <div class="use-case-item">
    <h4>Architecture Evolution</h4>
    <p>Identify architectural problems and dependencies that need to be addressed for system evolution</p>
  </div>
</div>

## Getting Started

<div class="getting-started-section">
  <div class="install-instructions">
    <h3>Installation</h3>
    <pre><code># Install from GitHub
git clone https://github.com/sibyllinesoft/valknut
cd valknut
npm install

# Initialize analysis
valknut init</code></pre>
  </div>
  
  <div class="quick-start">
    <h3>Quick Start</h3>
    <ol>
      <li>Analyze codebase: <code>valknut analyze /path/to/code</code></li>
      <li>Start MCP server: <code>valknut serve</code></li>
      <li>Connect Claude Code to MCP server</li>
      <li>Query problems: "Show me the highest priority refactoring targets"</li>
    </ol>
  </div>
</div>

### Example Analysis Output

```json
{
  "problems": [
    {
      "type": "complexity",
      "urgency": 0.87,
      "file": "src/auth/validator.ts",
      "function": "validateUserPermissions",
      "metrics": {
        "cyclomatic": 23,
        "cognitive": 31,
        "lines": 157
      },
      "suggestion": "Extract permission checking logic into separate functions"
    }
  ],
  "impact_packs": [
    {
      "name": "Authentication Refactor",
      "urgency": 0.82,
      "problems": ["auth/validator.ts:12", "auth/middleware.ts:45"],
      "benefit": "Reduces complexity and improves testability"
    }
  ]
}
```

## Benefits

Engineering teams using VALKNUT report:

- **75% more efficient** AI-guided refactoring through targeted problem identification
- **90% reduction** in random code exploration by AI agents
- **Systematic approach** to technical debt reduction with clear prioritization
- **Multi-language support** for diverse technology stacks
- **MCP integration** enabling seamless AI assistant workflows

Perfect for teams working with legacy code, implementing AI-assisted development workflows, or systematically improving code quality across large repositories.

<div class="cta-section">
  <a href="https://github.com/sibyllinesoft/valknut" class="btn-unified btn-primary">
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

