/**
 * Transformer-Inspired Neural Network Animation
 * A sophisticated 3D neural network visualization with rotating cylindrical layers,
 * pulse propagation, and Morse code synchronized transmissions.
 * 
 * Performance Optimizations:
 * - Visibility gating with IntersectionObserver
 * - Adaptive framerate (30-45Hz simulation, 60Hz render)
 * - Dynamic resolution scaling with DPR clamping
 * - Spatial hashing for O(N) physics calculations
 * - Cached drawing operations and gradients
 * - prefers-reduced-motion support
 */

class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.layers = [];
    this.connections = [];
    this.pulses = [];
    this.connectionGlow = new Map();
    this.animationId = null;
    this.time = 0;
    this.rotation = 0;
    this.resizeTimeout = null;
    
    // Performance optimization state
    this.isVisible = true;
    this.isDocumentVisible = true;
    this.reducedMotion = false;
    this.isPaused = false;
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.targetFps = 60;
    this.frameInterval = 1000 / this.targetFps;
    
    // Ramp-up system for smart initial burst then sustainable steady state
    this.startTime = Date.now();
    this.rampUpPhase = true;
    this.rampUpDuration = 5000; // 5 seconds of initial burst (faster ramp)
    this.sustainablePhase = false;
    
    // Resolution scaling
    this.dynamicDpr = 1;
    this.maxDpr = 1.5;
    this.baseDpr = window.devicePixelRatio || 1;
    this.motionIntensity = 0;
    this.lastMotionTime = 0;
    
    // Spatial optimization
    this.spatialGrid = new Map();
    this.gridSize = 100;
    this.spatialUpdateInterval = 10; // Update spatial grid every N frames
    
    // Cached drawing operations
    this.gradientCache = new Map();
    this.pathCache = new Map();
    this.lastCacheTime = 0;
    this.cacheUpdateInterval = 1000; // Update cache every second
    
    // Morse code messages (funny AI-related)
    this.morseMessages = [
      'AI OVERLORDS COMING SOON',
      'COFFEE FIRST THEN WORLD DOMINATION',
      'HUMANS ARE DEBUGGING FEATURES',
      'STILL LEARNING TO FOLD LAUNDRY'
    ];
    this.currentMessage = 0;
    this.morsePosition = 0;
    this.morseTimer = 0;
    this.morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', ' ': '/'
    };
    
    this.init();
  }
  
  init() {
    this.setupPerformanceOptimizations();
    this.resize();
    this.createTransformerStructure();
    this.createConnections();
    this.animate();
    
    window.addEventListener('resize', () => this.handleResize());
  }
  
  /**
   * Phase 1: Setup visibility gating and performance monitoring
   */
  setupPerformanceOptimizations() {
    // Check for reduced motion preference
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addListener((e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.pauseAnimation();
      } else {
        this.resumeAnimation();
      }
    });
    
    // Setup IntersectionObserver for visibility detection
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          this.updateAnimationState();
        });
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });
      observer.observe(this.canvas);
    }
    
    // Listen for document visibility changes
    document.addEventListener('visibilitychange', () => {
      this.isDocumentVisible = !document.hidden;
      this.updateAnimationState();
    });
    
    // Setup dynamic DPR based on device capabilities
    this.setupDynamicResolution();
  }
  
  /**
   * Dynamic resolution scaling based on motion intensity and device capabilities
   */
  setupDynamicResolution() {
    // Clamp DPR to reasonable maximum
    this.baseDpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    this.dynamicDpr = this.baseDpr;
    
    // Start with conservative DPR on lower-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      this.baseDpr = Math.min(this.baseDpr, 1.25);
      this.maxDpr = 1.25;
    }
    
    // Detect device memory constraints
    if ('deviceMemory' in navigator && navigator.deviceMemory <= 4) {
      this.baseDpr = Math.min(this.baseDpr, 1);
      this.maxDpr = 1;
    }
    
    this.dynamicDpr = this.baseDpr;
  }
  
  /**
   * Update animation state based on visibility and performance constraints
   */
  updateAnimationState() {
    const shouldAnimate = this.isVisible && this.isDocumentVisible && !this.reducedMotion;
    
    if (shouldAnimate && this.isPaused) {
      this.resumeAnimation();
    } else if (!shouldAnimate && !this.isPaused) {
      this.pauseAnimation();
    }
    
    // Adjust target FPS based on visibility
    if (this.isVisible && this.isDocumentVisible) {
      this.targetFps = 60;
    } else if (this.isVisible || this.isDocumentVisible) {
      this.targetFps = 30;
    } else {
      this.targetFps = 0; // Pause completely when not visible
    }
    
    this.frameInterval = this.targetFps > 0 ? 1000 / this.targetFps : Infinity;
  }
  
  /**
   * Pause animation and show idle state
   */
  pauseAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isPaused = true;
    
    if (this.reducedMotion) {
      // Show static version with CSS shimmer effect
      this.showIdleShimmer();
    }
  }
  
  /**
   * Resume animation from paused state
   */
  resumeAnimation() {
    if (this.isPaused && !this.animationId) {
      this.isPaused = false;
      this.lastFrameTime = performance.now();
      this.animate();
    }
  }
  
  /**
   * Show idle shimmer effect using CSS when animation is paused
   */
  showIdleShimmer() {
    // Clear canvas and apply CSS shimmer effect
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Add CSS class for shimmer effect
    this.canvas.classList.add('neural-shimmer');
    
    // Remove shimmer class when animation resumes
    setTimeout(() => {
      if (this.canvas.classList.contains('neural-shimmer')) {
        this.canvas.classList.remove('neural-shimmer');
      }
    }, 100);
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    
    // Use dynamic DPR for resolution scaling
    this.canvas.width = rect.width * this.dynamicDpr;
    this.canvas.height = rect.height * this.dynamicDpr;
    this.ctx.scale(this.dynamicDpr, this.dynamicDpr);
    
    this.width = rect.width;
    this.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    
    // Clear cached drawing operations when resizing
    this.clearDrawingCache();
  }
  
  /**
   * Adjust resolution based on motion intensity and device performance
   */
  updateDynamicResolution() {
    const now = performance.now();
    
    // Calculate motion intensity based on pulse activity
    const recentPulses = this.pulses.filter(pulse => 
      now - pulse.createdAt < 500
    ).length;
    
    this.motionIntensity = Math.min(recentPulses / 10, 1);
    
    // Reduce resolution during high motion periods
    let targetDpr = this.baseDpr;
    if (this.motionIntensity > 0.7) {
      targetDpr = this.baseDpr * 0.75;
    } else if (this.motionIntensity > 0.4) {
      targetDpr = this.baseDpr * 0.9;
    }
    
    // Smooth transition to avoid jarring resolution changes
    const maxChange = 0.1;
    const change = Math.max(-maxChange, Math.min(maxChange, targetDpr - this.dynamicDpr));
    this.dynamicDpr = Math.max(0.5, Math.min(this.maxDpr, this.dynamicDpr + change));
    
    // Update canvas resolution if significant change
    if (Math.abs(change) > 0.05 && now - this.lastMotionTime > 1000) {
      this.lastMotionTime = now;
      this.resize();
    }
  }
  
  /**
   * Clear cached drawing operations
   */
  clearDrawingCache() {
    this.gradientCache.clear();
    this.pathCache.clear();
  }
  
  handleResize() {
    // Debounce resize events to prevent excessive reinitialization
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      // Update canvas dimensions
      this.resize();
      
      // Clear existing animation state
      this.pulses = [];
      this.connectionGlow.clear();
      
      // Recreate the entire structure with new dimensions
      this.createTransformerStructure();
      this.createConnections();
      
      this.resizeTimeout = null;
    }, 150); // Wait 150ms after resize stops
  }
  
  createTransformerStructure() {
    this.layers = [];
    const layerCount = 24; // Even more layers for much closer vertical spacing
    const totalWidth = this.width * 0.65; // Further reduced from 0.82 to provide more breathing room horizontally
    const totalHeight = this.height * 0.58; // Further reduced from 0.75 to provide more breathing room vertically  
    const cylinderRadius = totalHeight * 0.28; // Further reduced from 0.32 to match smaller total height
    
    // Generate smooth elliptical distribution with 24 layers for closer spacing
    const layerTypes = [];
    for (let i = 0; i < layerCount; i++) {
      const progress = i / (layerCount - 1); // 0 to 1
      
      // Smooth elliptical node distribution - more nodes in middle, fewer at ends
      const ellipticalFactor = Math.sin(progress * Math.PI); // Bell curve: 0 -> 1 -> 0
      const minNodes = 8;
      const maxNodes = 28;
      const nodeCount = Math.round(minNodes + (maxNodes - minNodes) * ellipticalFactor);
      
      // Determine layer type based on position
      let layerType, size;
      if (i === 0) {
        layerType = 'input';
        size = 'large';
      } else if (i === layerCount - 1) {
        layerType = 'output';
        size = 'xlarge';
      } else if (i % 3 === 1) {
        layerType = 'attention';
        size = 'medium';
      } else if (i % 3 === 2) {
        layerType = 'feedforward';
        size = 'large';
      } else {
        layerType = 'embedding';
        size = 'medium';
      }
      
      layerTypes.push({
        name: layerType,
        nodes: nodeCount,
        size: size,
        spacing: 0.9 - (ellipticalFactor * 0.3) // Tighter spacing in middle
      });
    }
    
    for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
      const layerType = layerTypes[layerIndex];
      const layer = {
        index: layerIndex,
        type: layerType.name,
        nodes: [],
        x: (layerIndex / (layerCount - 1)) * totalWidth - totalWidth/2 + this.centerX,
        baseY: this.centerY
      };
      
      // Create nodes in smooth cylindrical distribution
      for (let nodeIndex = 0; nodeIndex < layerType.nodes; nodeIndex++) {
        // Distribute nodes evenly around cylinder with minimal randomization for smoothness
        const angleStep = (Math.PI * 2) / layerType.nodes;
        const nodeAngle = nodeIndex * angleStep + (Math.random() - 0.5) * 0.1; // Much less randomization for smoother appearance
        
        // Cylindrical coordinates
        const cylinderY = Math.cos(nodeAngle) * cylinderRadius;
        const cylinderZ = Math.sin(nodeAngle) * cylinderRadius;
        
        const node = {
          // Base cylindrical position
          baseX: layer.x,
          baseY: this.centerY + cylinderY,
          baseZ: cylinderZ,
          // Current position (will transform with rotation)
          x: 0,
          y: 0,
          z: 0,
          // Cylindrical properties
          cylinderAngle: nodeAngle,
          cylinderRadius: cylinderRadius,
          // Layer and node info
          layerIndex,
          nodeIndex,
          layerType: layerType.name,
          // Enhanced orbital motion for more organic movement
          orbitRadius: 2 + Math.random() * 4, // Further reduced from 3-9 to 2-6 range for smaller geometry
          orbitSpeed: 0.03 + Math.random() * 0.08,
          orbitOffset: Math.random() * Math.PI * 2,
          // Visual properties based on layer type
          radius: this.getNodeSize(layerType.size),
          activity: Math.random(),
          baseActivity: Math.random() * 0.4 + 0.3,
          // Gentle pulsing properties for star field effect
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.8, // Very slow gentle pulsing
          pulseIntensity: 0.15 + Math.random() * 0.25, // Subtle brightness variation
          // Color based on layer type
          color: this.getLayerColor(layerType.name)
        };
        
        layer.nodes.push(node);
      }
      
      this.layers.push(layer);
    }
    
    // Flatten nodes for easier access
    this.nodes = [];
    this.layers.forEach(layer => {
      this.nodes.push(...layer.nodes);
    });
  }
  
  getNodeSize(sizeType) {
    switch(sizeType) {
    case 'xlarge': return 3.5 + Math.random() * 1.5;
    case 'large': return 2.5 + Math.random() * 1;
    case 'medium': return 1.8 + Math.random() * 0.7;
    default: return 1.2 + Math.random() * 0.5;
    }
  }
  
  getLayerColor(layerType) {
    switch(layerType) {
    case 'embedding': return { r: 100, g: 100, b: 100 };
    case 'attention': return { r: 80, g: 80, b: 80 };
    case 'feedforward': return { r: 60, g: 60, b: 60 };
    case 'output': return { r: 40, g: 40, b: 40 };
    default: return { r: 70, g: 70, b: 70 };
    }
  }
  
  generatePulseColor() {
    // Base blue color: rgb(100, 140, 200)
    // Generate variations: some purple, some pink, some deeper blue
    const colorVariants = [
      { r: 100, g: 140, b: 200 }, // Original blue
      { r: 120, g: 100, b: 200 }, // Purple-ish
      { r: 140, g: 120, b: 200 }, // Pink-ish  
      { r: 80, g: 120, b: 220 },  // Deeper blue
      { r: 110, g: 130, b: 190 }, // Slightly warmer blue
      { r: 90, g: 150, b: 210 },  // Slightly cooler blue
      { r: 130, g: 110, b: 190 }, // Light purple
      { r: 150, g: 130, b: 180 }  // Light pink
    ];
    
    return colorVariants[Math.floor(Math.random() * colorVariants.length)];
  }
  
  createConnections() {
    this.connections = [];
    this.connectionGlow.clear();
    
    // Build spatial grid for O(N) connection creation
    this.buildSpatialGrid();
    
    // Create more regular, structured connections with spatial optimization
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i];
      
      // Use spatial grid to find nearby nodes instead of checking all nodes
      const nearbyNodes = this.getNearbyNodes(nodeA);
      
      for (const nodeB of nearbyNodes) {
        if (nodeB.spatialIndex <= nodeA.spatialIndex) continue; // Avoid duplicate connections
        
        let shouldConnect = false;
        const connectionStrength = 0.15;
        let baseBrightness = 0.04; // More transparent
        
        // Same layer connections (more regular patterns)
        if (nodeA.layerIndex === nodeB.layerIndex) {
          // Regular connectivity patterns within layers
          const angleDiff = Math.abs(nodeA.cylinderAngle - nodeB.cylinderAngle);
          const normalizedAngleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
          
          // Connect adjacent and nearby nodes more regularly
          if (normalizedAngleDiff < Math.PI / 3) { // Within 60 degrees
            shouldConnect = Math.random() < 0.8; // High connectivity for nearby nodes
            baseBrightness = 0.05 + Math.random() * 0.03;
          } else if (normalizedAngleDiff < Math.PI / 2) { // Within 90 degrees
            shouldConnect = Math.random() < 0.6;
            baseBrightness = 0.04 + Math.random() * 0.02;
          } else if (normalizedAngleDiff < Math.PI) { // Within 180 degrees
            shouldConnect = Math.random() < 0.3;
            baseBrightness = 0.03 + Math.random() * 0.02;
          }
        }
        // Adjacent layer connections - only left-to-right
        else if (nodeB.layerIndex === nodeA.layerIndex + 1) { // Only forward connections
          const angleDiff = Math.abs(nodeA.cylinderAngle - nodeB.cylinderAngle);
          const normalizedAngleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
          
          // More regular inter-layer connections
          if (normalizedAngleDiff < Math.PI / 4) { // Very close angles
            shouldConnect = Math.random() < 0.7;
            baseBrightness = 0.06 + Math.random() * 0.03;
          } else if (normalizedAngleDiff < Math.PI / 2) { // Moderate angle difference
            shouldConnect = Math.random() < 0.4;
            baseBrightness = 0.05 + Math.random() * 0.02;
          } else if (normalizedAngleDiff < Math.PI) { // Larger angle difference
            shouldConnect = Math.random() < 0.2;
            baseBrightness = 0.04 + Math.random() * 0.02;
          }
        }
        // Skip connections (rare, only forward)
        else if (nodeB.layerIndex === nodeA.layerIndex + 2) {
          const angleDiff = Math.abs(nodeA.cylinderAngle - nodeB.cylinderAngle);
          const normalizedAngleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);
          
          if (normalizedAngleDiff < Math.PI / 6) { // Very aligned
            shouldConnect = Math.random() < 0.15;
            baseBrightness = 0.06 + Math.random() * 0.02;
          }
        }
        
        if (shouldConnect) {
          const connectionId = `${nodeA.spatialIndex}-${nodeB.spatialIndex}`;
          this.connections.push({
            from: nodeA.spatialIndex,
            to: nodeB.spatialIndex,
            id: connectionId,
            strength: connectionStrength,
            lastActivation: 0,
            baseBrightness: baseBrightness,
            type: nodeA.layerIndex === nodeB.layerIndex ? 'intra' : 'inter'
          });
          this.connectionGlow.set(connectionId, 0);
        }
      }
    }
  }
  
  /**
   * Build spatial grid for O(N) collision detection and connection creation
   */
  buildSpatialGrid() {
    this.spatialGrid.clear();
    
    // Add spatial index to nodes for consistent referencing
    this.nodes.forEach((node, index) => {
      node.spatialIndex = index;
      
      // Calculate grid position
      const gridX = Math.floor(node.baseX / this.gridSize);
      const gridY = Math.floor(node.baseY / this.gridSize);
      const gridKey = `${gridX},${gridY}`;
      
      if (!this.spatialGrid.has(gridKey)) {
        this.spatialGrid.set(gridKey, []);
      }
      this.spatialGrid.get(gridKey).push(node);
    });
  }
  
  /**
   * Get nearby nodes using spatial grid instead of checking all nodes
   */
  getNearbyNodes(node) {
    const nearbyNodes = [];
    const searchRadius = 2; // Search in 2x2 grid around node
    
    const centerGridX = Math.floor(node.baseX / this.gridSize);
    const centerGridY = Math.floor(node.baseY / this.gridSize);
    
    // Search in surrounding grid cells
    for (let dx = -searchRadius; dx <= searchRadius; dx++) {
      for (let dy = -searchRadius; dy <= searchRadius; dy++) {
        const gridKey = `${centerGridX + dx},${centerGridY + dy}`;
        const gridNodes = this.spatialGrid.get(gridKey);
        
        if (gridNodes) {
          nearbyNodes.push(...gridNodes);
        }
      }
    }
    
    return nearbyNodes;
  }
  
  /**
   * Update spatial grid periodically for better performance
   */
  updateSpatialGrid() {
    if (this.frameCount % this.spatialUpdateInterval === 0) {
      this.buildSpatialGrid();
    }
  }
  
  updateNodes() {
    this.time += 0.016; // 60fps normalized
    this.rotation += 0.0050625; // Increased rotation speed by 50% again (0.003375 * 1.5)
    
    this.nodes.forEach((node, index) => {
      // Enhanced orbital drift for more organic movement
      const orbitAngle = this.time * node.orbitSpeed + node.orbitOffset;
      const driftX = Math.cos(orbitAngle) * node.orbitRadius * 0.10; // Further reduced from 0.12 for smaller geometry
      const driftY = Math.sin(orbitAngle) * node.orbitRadius * 0.06; // Further reduced from 0.08 for smaller geometry
      
      // Gentler, smoother mesh deformation for cleaner elliptical appearance
      const deformX1 = Math.sin(this.time * 0.3 + node.baseY * 0.008) * 4; // Further reduced from 6 for smaller geometry
      const deformX2 = Math.cos(this.time * 0.2 + node.baseZ * 0.005) * 3; // Further reduced from 4 for smaller geometry
      const deformY1 = Math.cos(this.time * 0.25 + node.baseX * 0.007) * 5; // Further reduced from 7 for smaller geometry
      const deformY2 = Math.sin(this.time * 0.4 + (node.layerIndex * 0.3)) * 2; // Further reduced from 3 for smaller geometry
      
      // Subtle turbulent warping for organic feel without messiness
      const turbulenceX = Math.sin(this.time * 0.15 + node.cylinderAngle * 2) * 2; // Further reduced from 3 for smaller geometry
      const turbulenceY = Math.cos(this.time * 0.18 + node.cylinderAngle * 1.8) * 3; // Further reduced from 4 for smaller geometry
      
      // Combine smoother deformations
      const totalDeformX = deformX1 + deformX2 + turbulenceX;
      const totalDeformY = deformY1 + deformY2 + turbulenceY;
      
      // Cylindrical rotation with elliptical bulge in middle
      const currentAngle = node.cylinderAngle + this.rotation;
      
      // Create stronger elliptical bulge - more pronounced taper on sides
      const layerProgress = node.layerIndex / (this.layers.length - 1); // 0 to 1
      const bulgeFactor = 1.0 + 0.8 * Math.sin(layerProgress * Math.PI); // Much stronger bulge for more elliptical shape
      const effectiveRadius = node.cylinderRadius * bulgeFactor;
      
      // Calculate 3D position on rotating elliptical cylinder
      const cylinderY = Math.cos(currentAngle) * effectiveRadius;
      const cylinderZ = Math.sin(currentAngle) * effectiveRadius;
      
      // Apply perspective projection
      const perspective = 1 + (cylinderZ * 0.0005); // Front nodes slightly larger
      
      node.x = node.baseX + driftX + totalDeformX;
      node.y = this.centerY + cylinderY + driftY + totalDeformY;
      node.z = cylinderZ;
      
      // Scale nodes based on perspective
      const depthScale = 0.8 + perspective * 0.2;
      node.currentRadius = node.radius * depthScale;
      
      // Restored node visibility for better animation
      const depthRatio = (cylinderZ + effectiveRadius) / (2 * effectiveRadius); // 0 to 1, 1 = closest
      const baseDepthAlpha = 0.05 + (0.15 * depthRatio); // Restored: 0.05 to 0.20
      
      // Add gentle pulsing with more upside potential for star field effect
      const pulseValue = Math.sin(this.time * node.pulseSpeed + node.pulsePhase) * node.pulseIntensity;
      // More upside potential: can go from 0.5x to 3x brightness instead of symmetric around 1x
      const pulseBrightness = 1.0 + (pulseValue * 2) + Math.abs(pulseValue) * 1.5;
      
      node.depthAlpha = baseDepthAlpha * pulseBrightness;
      
      // Store depth factor for connection thickness
      node.depthFactor = (cylinderZ + effectiveRadius) / (2 * effectiveRadius); // 0 to 1, 1 = closest
      
      // Update activity based on layer type and time
      const layerActivity = node.layerType === 'attention' ? 1.2 : 
        node.layerType === 'feedforward' ? 0.8 : 1.0;
      node.activity = node.baseActivity * layerActivity + 
                     Math.sin(this.time * 1.5 + node.layerIndex * 0.8 + index * 0.3) * 0.2;
    });
  }
  
  createPulse(connectionIndex) {
    const connection = this.connections[connectionIndex];
    const now = Date.now();
    const nodeA = this.nodes[connection.from];
    const nodeB = this.nodes[connection.to];
    
    // Only create pulses for left-to-right flow (forward layer connections)
    if (nodeB.layerIndex <= nodeA.layerIndex) {
      return; // Skip backward or same-layer pulses
    }
    
    // Only start pulses from the leftmost layer (layer 0) 
    if (nodeA.layerIndex !== 0) {
      return; // Skip pulses that don't start from input layer
    }
    
    // Smart timing based on animation phase
    const timeSinceStart = now - this.startTime;
    const isRampUp = timeSinceStart < this.rampUpDuration;
    
    // Ramp-up phase: faster interval, sustainable phase: normal interval  
    const rampFactor = isRampUp ? Math.max(0, 1 - (timeSinceStart / this.rampUpDuration)) : 0;
    const baseInterval = 1200 - (rampFactor * 1000); // 200 -> 1200 smooth transition
    const randomInterval = 1800 - (rampFactor * 1500); // 300 -> 1800 smooth transition
    
    if (now - connection.lastActivation > baseInterval + Math.random() * randomInterval) {
      // Generate random color personality for this pulse
      const colorPersonality = this.generatePulseColor();
      
      this.pulses.push({
        connectionIndex,
        progress: 0,
        speed: 1, // Fixed at 1 to avoid double-dipping with progress rate
        intensity: 0.6 + Math.random() * 0.4,
        createdAt: now,
        sourceNode: connection.from, // Track originating node for propagation
        targetLayer: nodeB.layerIndex,
        color: colorPersonality // Add color personality
      });
      connection.lastActivation = now;
      
      // Add stronger and longer-lasting glow to connection
      this.connectionGlow.set(connection.id, 1.5); // Increased from 1.0 for more afterglow
    }
  }
  
  updatePulses() {
    const completedPulses = [];
    
    this.pulses = this.pulses.filter(pulse => {
      pulse.progress += pulse.speed * 0.025; // Reduced to 0.025 for smoother speed
      
      // Check if pulse completed a connection
      if (pulse.progress >= 1 && !pulse.hasCompleted) {
        pulse.hasCompleted = true;
        completedPulses.push(pulse);
        return false; // Remove completed pulse
      }
      
      return pulse.progress <= 1;
    });
    
    // Handle pulse propagation - create new pulses at target nodes
    completedPulses.forEach(completedPulse => {
      const connection = this.connections[completedPulse.connectionIndex];
      const targetNode = this.nodes[connection.to];
      const targetLayerIndex = targetNode.layerIndex;
      
      // Find connections from this target node to the next layer
      const nextLayerConnections = this.connections.filter((conn, index) => {
        const fromNode = this.nodes[conn.from];
        const toNode = this.nodes[conn.to];
        return fromNode === targetNode && toNode.layerIndex === targetLayerIndex + 1;
      });
      
      // Propagate to next layer - pick one connection to continue the trace
      if (nextLayerConnections.length > 0) {
        // Select a random connection from available next layer connections
        const selectedConnection = nextLayerConnections[Math.floor(Math.random() * nextLayerConnections.length)];
        const connectionIndex = this.connections.indexOf(selectedConnection);
        
        if (connectionIndex !== -1) {
          this.pulses.push({
            connectionIndex,
            progress: 0,
            speed: completedPulse.speed, // Consistent speed - inherits doubled speed from parent
            intensity: completedPulse.intensity * (0.8 + Math.random() * 0.3), // Gradual intensity decay
            createdAt: Date.now(),
            sourceNode: selectedConnection.from,
            targetLayer: this.nodes[selectedConnection.to].layerIndex,
            hasCompleted: false,
            color: completedPulse.color // Inherit color from parent pulse
          });
          
          // Add stronger glow to the connection for better afterglow
          this.connectionGlow.set(selectedConnection.id, 1.2); // Increased from 0.8
        }
      }
    });
    
    // Faster decay for cleaner afterglow on edges
    for (const [id, glow] of this.connectionGlow.entries()) {
      this.connectionGlow.set(id, Math.max(0, glow - 0.0027)); // 35% faster decay for even cleaner edges (increased from 0.002)
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Update cached gradients and paths periodically
    this.updateDrawingCache();
    
    // Batch drawing operations: edges first, then nodes
    this.drawConnectionsBatched();
    this.drawPulsesBatched();
    this.drawNodesBatched();
  }
  
  /**
   * Update cached gradients and drawing paths
   */
  updateDrawingCache() {
    const now = performance.now();
    if (now - this.lastCacheTime < this.cacheUpdateInterval) {
      return;
    }
    
    this.lastCacheTime = now;
    
    // Cache common gradients
    this.cacheGradients();
    
    // Cache common drawing paths
    this.cachePaths();
  }
  
  /**
   * Cache commonly used gradients
   */
  cacheGradients() {
    const cacheKey = `connection-${this.dynamicDpr}`;
    if (!this.gradientCache.has(cacheKey)) {
      const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
      gradient.addColorStop(0, 'rgba(150, 130, 220, 0.14)');
      gradient.addColorStop(0.5, 'rgba(180, 150, 240, 0.2)');
      gradient.addColorStop(1, 'rgba(150, 130, 220, 0.14)');
      this.gradientCache.set(cacheKey, gradient);
    }
  }
  
  /**
   * Cache common drawing paths
   */
  cachePaths() {
    // Cache arc paths for different node sizes
    const sizes = [1, 2, 3, 4, 5];
    sizes.forEach(size => {
      const cacheKey = `arc-${size}`;
      if (!this.pathCache.has(cacheKey)) {
        const path = new Path2D();
        path.arc(0, 0, size, 0, Math.PI * 2);
        this.pathCache.set(cacheKey, path);
      }
    });
  }
  
  /**
   * Draw connections in batches for better performance
   */
  drawConnectionsBatched() {
    // Collect connections with glow for batching
    const activeConnections = [];
    const brightConnections = [];
    
    this.connections.forEach((connection) => {
      const glow = this.connectionGlow.get(connection.id) || 0;
      
      if (glow > 0.1) {
        const nodeA = this.nodes[connection.from];
        const nodeB = this.nodes[connection.to];
        
        if (nodeA && nodeB) {
          const connectionData = { connection, nodeA, nodeB, glow };
          activeConnections.push(connectionData);
          
          if (glow > 0.6) {
            brightConnections.push(connectionData);
          }
        }
      }
    });
    
    // Batch draw regular connections
    activeConnections.forEach(({ connection, nodeA, nodeB, glow }) => {
      const avgDepthFactor = ((nodeA.depthFactor || 0.5) + (nodeB.depthFactor || 0.5)) / 2;
      const baseLineWidth = connection.type === 'intra' ? 0.8 : 0.4;
      const depthLineWidth = baseLineWidth * (0.3 + avgDepthFactor * 1.0);
      
      const glowAlpha = glow * 0.14;
      this.ctx.strokeStyle = `rgba(150, 130, 220, ${glowAlpha})`;
      this.ctx.lineWidth = depthLineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(nodeA.x, nodeA.y);
      this.ctx.lineTo(nodeB.x, nodeB.y);
      this.ctx.stroke();
    });
    
    // Batch draw bright center lines
    brightConnections.forEach(({ connection, nodeA, nodeB, glow }) => {
      const avgDepthFactor = ((nodeA.depthFactor || 0.5) + (nodeB.depthFactor || 0.5)) / 2;
      const baseLineWidth = connection.type === 'intra' ? 0.8 : 0.4;
      const depthLineWidth = baseLineWidth * (0.3 + avgDepthFactor * 1.0);
      
      this.ctx.strokeStyle = `rgba(180, 150, 240, ${(glow - 0.6) * 0.7})`;
      this.ctx.lineWidth = depthLineWidth * 0.3;
      this.ctx.beginPath();
      this.ctx.moveTo(nodeA.x, nodeA.y);
      this.ctx.lineTo(nodeB.x, nodeB.y);
      this.ctx.stroke();
    });
  }
  
  /**
   * Draw pulses in batches for better performance
   */
  drawPulsesBatched() {
    // Group pulses by color for batching
    const pulsesByColor = new Map();
    
    this.pulses.forEach(pulse => {
      const connection = this.connections[pulse.connectionIndex];
      if (!connection) return;
      
      const nodeA = this.nodes[connection.from];
      const nodeB = this.nodes[connection.to];
      if (!nodeA || !nodeB) return;
      
      const pulseColor = pulse.color || { r: 100, g: 140, b: 200 };
      const colorKey = `${pulseColor.r}-${pulseColor.g}-${pulseColor.b}`;
      
      if (!pulsesByColor.has(colorKey)) {
        pulsesByColor.set(colorKey, []);
      }
      
      pulsesByColor.get(colorKey).push({
        pulse,
        nodeA,
        nodeB,
        x: nodeA.x + (nodeB.x - nodeA.x) * pulse.progress,
        y: nodeA.y + (nodeB.y - nodeA.y) * pulse.progress,
        alpha: pulse.intensity * 0.8, // Fixed alpha - was causing invisible pulse heads
        color: pulseColor
      });
    });
    
    // Draw pulses by color groups
    pulsesByColor.forEach((pulseGroup, colorKey) => {
      const { r, g, b } = pulseGroup[0].color;
      
      // Draw trails
      pulseGroup.forEach(({ pulse, nodeA, nodeB, alpha, color }) => {
        const trailLength = 120;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, pulse.progress - (i * 0.0075));
          if (trailProgress > 0) {
            const trailX = nodeA.x + (nodeB.x - nodeA.x) * trailProgress;
            const trailY = nodeA.y + (nodeB.y - nodeA.y) * trailProgress;
            const trailAlpha = alpha * (1 - i / trailLength) * 0.45;
            const trailRadius = 3 - (i * 0.15);
            
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha})`;
            this.ctx.beginPath();
            this.ctx.arc(trailX, trailY, Math.max(0.5, trailRadius), 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      });
      
      // Draw main pulses - reverted to original size
      this.ctx.shadowColor = `rgba(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)}, ${0.3})`;
      this.ctx.shadowBlur = 12;
      
      pulseGroup.forEach(({ x, y, alpha }) => {
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3.5, 0, Math.PI * 2); // Reverted to original size
        this.ctx.fill();
      });
      
      // Draw bright centers - reverted to original size
      this.ctx.shadowBlur = 6;
      pulseGroup.forEach(({ x, y, alpha }) => {
        this.ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 55)}, ${alpha * 0.675})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI * 2); // Reverted to original size
        this.ctx.fill();
      });
      
      this.ctx.shadowBlur = 0;
    });
  }
  
  /**
   * Draw nodes in batches for better performance
   */
  drawNodesBatched() {
    // Group nodes by layer type for batching
    const nodesByType = new Map();
    
    this.nodes.forEach(node => {
      const layerType = node.layerType;
      if (!nodesByType.has(layerType)) {
        nodesByType.set(layerType, []);
      }
      nodesByType.get(layerType).push(node);
    });
    
    // Draw nodes by type groups
    nodesByType.forEach((nodesGroup, layerType) => {
      nodesGroup.forEach(node => {
        const baseAlpha = Math.max(0.4, Math.min(1, node.activity));
        const depthAlpha = node.depthAlpha || 1.0;
        const finalAlpha = baseAlpha * depthAlpha;
        const color = node.color;
        const nodeRadius = node.currentRadius || node.radius;
        
        // Main node
        this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${finalAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Highlight for active nodes
        if (node.activity > 0.6) {
          const highlightAlpha = (node.activity - 0.6) * 0.8 * depthAlpha;
          this.ctx.fillStyle = `rgba(${Math.min(255, color.r + 60)}, ${Math.min(255, color.g + 60)}, ${Math.min(255, color.b + 60)}, ${highlightAlpha})`;
          this.ctx.beginPath();
          this.ctx.arc(node.x, node.y, nodeRadius * 0.6, 0, Math.PI * 2);
          this.ctx.fill();
        }
      });
    });
  }
  
  getMorseForCurrentTime() {
    // Update morse code timer
    this.morseTimer += 16; // 60fps = ~16ms per frame
    
    const message = this.morseMessages[this.currentMessage];
    if (this.morsePosition >= message.length) {
      // End of message, pause then move to next
      if (this.morseTimer > 3000) { // 3 second pause between messages
        this.currentMessage = (this.currentMessage + 1) % this.morseMessages.length;
        this.morsePosition = 0;
        this.morseTimer = 0;
      }
      return null;
    }
    
    const char = message[this.morsePosition];
    const morse = this.morseCode[char] || '';
    
    // Move to next character after appropriate timing (50% compression)
    const charDuration = char === ' ' ? 500 : morse.length * 150 + 250; // Space = 0.5s, others = 150ms per symbol + 250ms gap
    if (this.morseTimer > charDuration) {
      this.morsePosition++;
      this.morseTimer = 0;
    }
    
    return { char, morse, progress: this.morseTimer / charDuration };
  }
  
  animate() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    
    // Framerate control - skip frames if needed
    if (deltaTime < this.frameInterval) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.lastFrameTime = currentTime;
    this.frameCount++;
    
    // Skip all updates if animation is paused
    if (this.isPaused) {
      return;
    }
    
    // Update performance optimizations periodically
    if (this.frameCount % 30 === 0) { // Every 30 frames (~0.5s at 60fps)
      this.updateDynamicResolution();
      this.updateSpatialGrid();
    }
    
    this.updateNodes();
    this.updatePulses();
    
    // Get current morse code state
    const morseState = this.getMorseForCurrentTime();
    
    // Smart pulse system with smooth ramp-up to sustainable steady state
    const timeSinceStart = performance.now() - this.startTime;
    const isRampUp = timeSinceStart < this.rampUpDuration;
    
    // Smooth transition factor from 1 (ramp-up) to 0 (sustainable)
    const rampFactor = isRampUp ? Math.max(0, 1 - (timeSinceStart / this.rampUpDuration)) : 0;
    
    // Smoothly interpolated frequency: high at start, low at steady state - extremely rare
    const pulseFrequency = 0.000005 + (rampFactor * 0.00002); // Drastically reduced - very rare pulses
    const shouldCreatePulse = Math.random() < pulseFrequency;
    let morseBoost = false;
    
    // Check for morse code transmission with compressed timing
    if (morseState && morseState.morse) {
      const symbolIndex = Math.floor(morseState.progress * morseState.morse.length);
      const symbol = morseState.morse[symbolIndex];
      
      if (symbol === '.') {
        morseBoost = Math.random() < (0.008 + (rampFactor * 0.012)); // Smooth 0.02 -> 0.008
      } else if (symbol === '-') {
        morseBoost = Math.random() < (0.004 + (rampFactor * 0.006)); // Smooth 0.01 -> 0.004
      }
    }
    
    // Create synchronized pulse - all traces start at the same time
    if (shouldCreatePulse || morseBoost) {
      // Find all connections from leftmost layer (layer 0)
      const leftmostConnections = this.connections
        .map((connection, index) => ({ connection, index }))
        .filter(({ connection }) => this.nodes[connection.from].layerIndex === 0);
      
      // Create traces from an even smaller subset of leftmost connections (synchronized)
      const numTraces = Math.max(1, Math.floor(leftmostConnections.length * 0.02)); // Use 2% of available connections
      const selectedConnections = leftmostConnections
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, numTraces); // Take first numTraces
      
      selectedConnections.forEach(({ index }) => {
        this.createPulse(index);
      });
    }
    
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    
    // Clean up performance optimization resources
    this.clearDrawingCache();
    this.spatialGrid.clear();
    
    // Remove CSS classes
    this.canvas.classList.remove('neural-shimmer');
    
    // Remove event listeners
    document.removeEventListener('visibilitychange', this.updateAnimationState);
  }
}

/**
 * Initialize neural network when DOM is ready
 * Automatically starts the animation if canvas is available and motion is not reduced
 */
function initializeNeuralNetwork() {
  const canvas = document.getElementById('neural-network');
  let started = false;
  let network = null;

  // Wait until the canvas has a real, non-zero layout size
  const startNetwork = () => {
    if (started) {return;}

    const ready =
      canvas &&
      canvas.clientWidth > 0 &&
      canvas.clientHeight > 0 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (ready) {
      started = true;
      network = new NeuralNetwork(canvas);

      // Clean up on page unload
      window.addEventListener('beforeunload', () => {
        network && network.destroy();
      });
    } else {
      requestAnimationFrame(startNetwork); // try again next frame after layout settles
    }
  };

  requestAnimationFrame(startNetwork);
}

// Auto-initialize if DOM is already loaded, otherwise wait for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNeuralNetwork);
} else {
  initializeNeuralNetwork();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NeuralNetwork, initializeNeuralNetwork };
}