// Transformer-Inspired Neural Network Animation
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
    
    // Morse code messages (funny AI-related)
    this.morseMessages = [
      "AI OVERLORDS COMING SOON", // ... longer pause ... 
      "COFFEE FIRST THEN WORLD DOMINATION",
      "HUMANS ARE DEBUGGING FEATURES",
      "STILL LEARNING TO FOLD LAUNDRY"
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
    this.resize();
    this.createTransformerStructure();
    this.createConnections();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    this.width = rect.width;
    this.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }
  
  createTransformerStructure() {
    this.layers = [];
    const layerCount = 24; // Even more layers for much closer vertical spacing
    const totalWidth = this.width * 0.95; // Wider
    const totalHeight = this.height * 0.95; // Taller
    const cylinderRadius = totalHeight * 0.35; // Radius for cylindrical distribution
    
    // Generate smooth elliptical distribution with 24 layers for closer spacing
    const layerTypes = [];
    for (let i = 0; i < layerCount; i++) {
      const progress = i / (layerCount - 1); // 0 to 1
      
      // Smooth elliptical node distribution - more pinched ends, less taper
      const ellipticalFactor = Math.pow(Math.sin(progress * Math.PI), 0.6); // More pinched ends
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
          orbitRadius: 4 + Math.random() * 8,
          orbitSpeed: 0.03 + Math.random() * 0.08,
          orbitOffset: Math.random() * Math.PI * 2,
          // Visual properties based on layer type
          radius: this.getNodeSize(layerType.size),
          activity: Math.random(),
          baseActivity: Math.random() * 0.6 + 0.1, // Broader range, darker minimum (was 0.4 + 0.3)
          // Gentle pulsing properties for star field effect
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.2 + Math.random() * 0.5, // Slower pulsing (was 0.4 + 0.8)
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
    
    // Create more regular, structured connections with transparency
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];
        
        let shouldConnect = false;
        let connectionStrength = 0.15;
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
          const connectionId = `${i}-${j}`;
          this.connections.push({
            from: i,
            to: j,
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
  
  updateNodes() {
    this.time += 0.032; // Double the time progression for faster deformation
    this.rotation += 0.00225; // Halved rotation speed
    
    this.nodes.forEach((node, index) => {
      // Enhanced orbital drift for more organic movement
      const orbitAngle = this.time * node.orbitSpeed + node.orbitOffset;
      const driftX = Math.cos(orbitAngle) * node.orbitRadius * 0.15; // More drift
      const driftY = Math.sin(orbitAngle) * node.orbitRadius * 0.1;
      
      // Gentler, smoother mesh deformation for cleaner elliptical appearance
      const deformX1 = Math.sin(this.time * 0.3 + node.baseY * 0.008) * 8; // Much gentler
      const deformX2 = Math.cos(this.time * 0.2 + node.baseZ * 0.005) * 6; // Smoother
      const deformY1 = Math.cos(this.time * 0.25 + node.baseX * 0.007) * 10; // Moderate
      const deformY2 = Math.sin(this.time * 0.4 + (node.layerIndex * 0.3)) * 5; // Gentle
      
      // Subtle turbulent warping for organic feel without messiness
      const turbulenceX = Math.sin(this.time * 0.15 + node.cylinderAngle * 2) * 4; // Much subtler
      const turbulenceY = Math.cos(this.time * 0.18 + node.cylinderAngle * 1.8) * 6; // Smoother
      
      // Remove chaotic deformation for cleaner appearance
      
      // Combine smoother deformations
      const totalDeformX = deformX1 + deformX2 + turbulenceX;
      const totalDeformY = deformY1 + deformY2 + turbulenceY;
      
      // Cylindrical rotation with elliptical bulge in middle
      const currentAngle = node.cylinderAngle + this.rotation;
      
      // Create moderate elliptical bulge - less taper, more pinched ends
      const layerProgress = node.layerIndex / (this.layers.length - 1); // 0 to 1
      const bulgeFactor = 1.0 + 0.4 * Math.pow(Math.sin(layerProgress * Math.PI), 0.7); // Reduced taper, pinched ends
      const effectiveRadius = node.cylinderRadius * bulgeFactor;
      
      // Calculate 3D position on rotating elliptical cylinder
      const cylinderY = Math.cos(currentAngle) * effectiveRadius;
      const cylinderZ = Math.sin(currentAngle) * effectiveRadius;
      
      // Apply perspective projection
      const perspective = 1 + (cylinderZ * 0.0005); // Front nodes slightly larger
      const depthAlpha = 0.1 + (0.9 * (cylinderZ + effectiveRadius) / (2 * effectiveRadius)); // Broader range, darker minimum
      
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
    
    // Much more frequent pulses - even faster timing
    if (now - connection.lastActivation > 800 + Math.random() * 1200) { // Reduced from 2000-5000ms to 800-2000ms
      // Generate random color personality for this pulse
      const colorPersonality = this.generatePulseColor();
      
      this.pulses.push({
        connectionIndex,
        progress: 0,
        speed: 0.6, // Reduced speed by 50% for slower pulse movement
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
      pulse.progress += pulse.speed * 0.016;
      
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
            speed: completedPulse.speed, // Consistent speed - no variation
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
    
    // Much slower decay for very long lingering afterglow on edges
    for (const [id, glow] of this.connectionGlow.entries()) {
      this.connectionGlow.set(id, Math.max(0, glow - 0.001)); // Much slower decay for very long afterglow (was 0.002)
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw connections - extremely subtle, minimal visibility
    this.connections.forEach((connection, index) => {
      const nodeA = this.nodes[connection.from];
      const nodeB = this.nodes[connection.to];
      const glow = this.connectionGlow.get(connection.id) || 0;
      
      // Only draw connections with substantial glow
      if (glow > 0.1) {
        // Calculate depth-based thickness - closer edges are thicker
        const avgDepthFactor = ((nodeA.depthFactor || 0.5) + (nodeB.depthFactor || 0.5)) / 2;
        const baseLineWidth = connection.type === 'intra' ? 0.8 : 0.4;
        const depthLineWidth = baseLineWidth * (0.3 + avgDepthFactor * 1.0); // Even thinner
        
        // More colorful glowing connection with purplish-blue afterglow
        const glowAlpha = glow * 0.14; // Reduced to 70% of 0.2 = 0.14
        this.ctx.strokeStyle = `rgba(150, 130, 220, ${glowAlpha})`; // Purplish-blue afterglow
        this.ctx.lineWidth = depthLineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(nodeA.x, nodeA.y);
        this.ctx.lineTo(nodeB.x, nodeB.y);
        this.ctx.stroke();
        
        // Bright center line with enhanced purplish color for active connections
        if (glow > 0.6) {
          this.ctx.strokeStyle = `rgba(180, 150, 240, ${(glow - 0.6) * 0.7})`; // Purplish center
          this.ctx.lineWidth = depthLineWidth * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(nodeA.x, nodeA.y);
          this.ctx.lineTo(nodeB.x, nodeB.y);
          this.ctx.stroke();
        }
      }
    });
    
    // Draw pulses with light blue colors and glow trails
    this.pulses.forEach(pulse => {
      const connection = this.connections[pulse.connectionIndex];
      const nodeA = this.nodes[connection.from];
      const nodeB = this.nodes[connection.to];
      
      const x = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
      const y = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;
      
      const alpha = Math.sin(pulse.progress * Math.PI) * pulse.intensity;
      
      // Get pulse color with fallback to original blue
      const pulseColor = pulse.color || { r: 100, g: 140, b: 200 };
      const { r, g, b } = pulseColor;
      
      // Draw much longer and more lingering glow trail behind the pulse
      const trailLength = 60; // Doubled from 30 for twice as long trails
      for (let i = 0; i < trailLength; i++) {
        const trailProgress = Math.max(0, pulse.progress - (i * 0.0075)); // Half the spacing for twice as long trail
        if (trailProgress > 0) {
          const trailX = nodeA.x + (nodeB.x - nodeA.x) * trailProgress;
          const trailY = nodeA.y + (nodeB.y - nodeA.y) * trailProgress;
          const trailAlpha = alpha * (1 - i / trailLength) * 0.45; // Reduced to 75% of 0.6 = 0.45
          
          // Larger trail points that fade more gradually
          const trailRadius = 3 - (i * 0.15); // Slower size reduction for longer visible trail
          
          this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha})`;
          this.ctx.beginPath();
          this.ctx.arc(trailX, trailY, Math.max(0.5, trailRadius), 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
      
      // Main pulse with enhanced glow using custom color - reduced to 75% opacity
      this.ctx.shadowColor = `rgba(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)}, ${0.4 * 0.75})`;
      this.ctx.shadowBlur = 12;
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Bright center with color variation - reduced to 75% opacity
      this.ctx.shadowBlur = 6;
      this.ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 55)}, ${alpha * 0.9 * 0.75})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
    
    // Draw nodes with layer-specific styling, depth scaling, and depth-based alpha
    this.nodes.forEach(node => {
      const baseAlpha = Math.max(0.4, Math.min(1, node.activity));
      const depthAlpha = node.depthAlpha || 1.0;
      const finalAlpha = baseAlpha * depthAlpha;
      const color = node.color;
      const nodeRadius = node.currentRadius || node.radius;
      
      // Main node with depth-based size and transparency
      this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${finalAlpha})`;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Subtle inner highlight for active nodes
      if (node.activity > 0.6) {
        const highlightAlpha = (node.activity - 0.6) * 0.8 * depthAlpha;
        this.ctx.fillStyle = `rgba(${Math.min(255, color.r + 60)}, ${Math.min(255, color.g + 60)}, ${Math.min(255, color.b + 60)}, ${highlightAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, nodeRadius * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      }
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
    this.updateNodes();
    this.updatePulses();
    
    // Get current morse code state
    const morseState = this.getMorseForCurrentTime();
    
    // Pulse system - faster and more frequent synchronized bursts
    const shouldCreatePulse = Math.random() < 0.001; // Increased from 0.0002 - 5x more frequent
    let morseBoost = false;
    
    // Check for morse code transmission with compressed timing
    if (morseState && morseState.morse) {
      const symbolIndex = Math.floor(morseState.progress * morseState.morse.length);
      const symbol = morseState.morse[symbolIndex];
      
      if (symbol === '.') {
        morseBoost = Math.random() < 0.015; // Increased from 0.003 - 5x more frequent
      } else if (symbol === '-') {
        morseBoost = Math.random() < 0.0075; // Increased from 0.0015 - 5x more frequent
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
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('neural-network');
  let started = false;
  let network = null;

  // Wait until the canvas has a real, non-zero layout size
  const startNetwork = () => {
    if (started) return;

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
  
  // Enhanced possibility cards with progressive disclosure
  const possibilityCards = document.querySelectorAll('.possibility-card');
  
  possibilityCards.forEach(card => {
    // Add subtle animation delays for staggered loading
    const index = Array.from(possibilityCards).indexOf(card);
    card.style.animationDelay = `${index * 100}ms`;
    
    // Enhanced hover behavior with data visualization updates
    card.addEventListener('mouseenter', () => {
      // Trigger visualization animations
      const vizElements = card.querySelectorAll('.step-visual.processed, .point.active, .milestone.active');
      vizElements.forEach(el => {
        el.style.animationDuration = '1s';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset animation timing
      const vizElements = card.querySelectorAll('.step-visual.processed, .point.active, .milestone.active');
      vizElements.forEach(el => {
        el.style.animationDuration = '2s';
      });
    });
  });
  
  // Premium Text Animation Handler
  function initPremiumTextAnimations() {
    // Performance optimization: remove will-change after animations complete
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.hero-title, .banner-text');
      animatedElements.forEach(el => {
        el.style.willChange = 'auto';
      });
    }, 4000); // After all animations should be complete
  }
  
  // Initialize premium text animations
  initPremiumTextAnimations();
  
});
