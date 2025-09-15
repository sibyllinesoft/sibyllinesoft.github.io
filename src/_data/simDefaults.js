// simDefaults.js - Default constants and presets for LLM codegen optimizer
// Centralized configuration for the stochastic process simulation

export default {
  // Core mathematical constants
  constants: {
    // Improvement dynamics
    a1: 0.9,      // Fix effectiveness coefficient
    a2: 0.15,     // Collateral damage coefficient
    s0: 0.4,      // Base noise level
    b: 4.0,       // Diminishing returns parameter
    
    // Human quality factors
    kappa1: 0.4,  // Human effect on noise reduction
    kappa2: 0.3,  // Human effect on collateral reduction
    
    // Reviewer dynamics
    sigma_r: 0.35, // Base reviewer noise
    tau: 0.4,      // Diversity reduction with strong priors
    
    // Trust region parameters
    alpha: 1.3,    // Step size increase multiplier
    beta: 0.7,     // Step size decrease multiplier
    Astar: [0.2, 0.4], // Target acceptance band
    
    // System constraints
    mu0: 12,       // Default initial defect mass
    Tmax: 200,     // Maximum simulation steps
    delta_min: 0.01, // Minimum edit radius
    delta_max: 2.0   // Maximum edit radius
  },

  // Default simulation settings
  defaultSettings: {
    // Core strategy
    policy: 'trust-region',
    
    // Quality parameters
    H: 0.6,        // Human prior quality (0-1)
    rho: 0.75,     // Model prior quality (0-1)
    r: 0.8,        // Oracle resolution (0-1)
    
    // Optimization parameters
    delta0: 0.2,   // Initial edit radius
    decay: 0.98,   // Decay rate for policies that use it
    
    // Team composition
    K: 5,          // Number of candidates
    N: 3,          // Number of reviewers
    gamma: 0.2,    // Reviewer correlation (0-1)
    Kr: 1,         // Reviewer proposals (0 or 1)
    
    // Success criteria
    target_reliability: 0.95, // Target pass probability
    mu0: 12,       // Initial difficulty/defect mass
    
    // Trust region specific
    alpha: 1.3,    // Expansion factor
    beta: 0.7,     // Contraction factor
    A_lo: 0.2,     // Lower acceptance threshold
    A_hi: 0.4      // Upper acceptance threshold
  },

  // Predefined strategy presets
  presets: {
    'noob-vibe': {
      name: 'Noob Vibe',
      description: 'Conservative approach for beginners - small steps, minimal complexity',
      policy: 'vibe',
      settings: {
        H: 0.2,
        rho: 0.5,
        r: 0.6,
        delta0: 0.05,
        decay: 0.995,
        K: 1,
        N: 0,
        gamma: 0,
        Kr: 0,
        target_reliability: 0.9,
        mu0: 8
      },
      expectedOutcome: 'Slow but steady progress, minimal risk of regression'
    },

    'principal-tr': {
      name: 'Principal + Trust Region',
      description: 'Senior engineer with strong context and adaptive optimization',
      policy: 'trust-region',
      settings: {
        H: 0.7,
        rho: 0.8,
        r: 0.85,
        delta0: 0.25,
        K: 6,
        N: 4,
        gamma: 0.25,
        Kr: 1,
        target_reliability: 0.95,
        mu0: 15,
        alpha: 1.4,
        beta: 0.6,
        A_lo: 0.25,
        A_hi: 0.45
      },
      expectedOutcome: 'Fast convergence with intelligent adaptation to complexity'
    },

    'planner-spec': {
      name: 'Planner/Spec-First',
      description: 'Specification-first approach with extended planning phase',
      policy: 'planner',
      settings: {
        H: 0.3,         // Starts low, builds up
        rho: 0.75,
        r: 0.4,         // Starts low, builds up
        delta0: 0.4,
        decay: 0.975,
        K: 5,
        N: 3,
        gamma: 0.3,
        Kr: 1,
        target_reliability: 0.95,
        mu0: 18,
        // Planner-specific
        Tp: 30,         // Planning phase duration
        dH: 0.015,      // Human quality improvement per step
        dr: 0.012       // Oracle resolution improvement per step
      },
      expectedOutcome: 'Invests early in specification quality, then accelerates'
    }
  },

  // Scenario configurations for different use cases
  scenarios: {
    'legacy-refactor': {
      name: 'Legacy Code Refactoring',
      description: 'High initial complexity, conservative approach needed',
      baseSettings: {
        mu0: 25,
        target_reliability: 0.98,
        r: 0.6,  // Lower oracle resolution due to complex legacy interactions
        H: 0.4   // Moderate human understanding of legacy system
      }
    },

    'greenfield': {
      name: 'Greenfield Development',
      description: 'New project with high developer control',
      baseSettings: {
        mu0: 6,
        target_reliability: 0.9,
        r: 0.9,  // High oracle resolution in clean codebase
        H: 0.8   // High human control in new project
      }
    },

    'critical-system': {
      name: 'Critical System',
      description: 'High reliability requirements, extensive review process',
      baseSettings: {
        mu0: 20,
        target_reliability: 0.999,
        N: 6,    // Many reviewers
        gamma: 0.1, // Low correlation (diverse team)
        Kr: 1    // Reviewers contribute proposals
      }
    },

    'rapid-prototype': {
      name: 'Rapid Prototyping',
      description: 'Speed over perfection, acceptable risk tolerance',
      baseSettings: {
        mu0: 10,
        target_reliability: 0.8,
        delta0: 0.5,  // Larger steps
        K: 8,    // Many candidates for speed
        N: 1     // Minimal review overhead
      }
    }
  },

  // Parameter bounds and constraints
  parameterBounds: {
    H: { min: 0, max: 1, step: 0.01, default: 0.6 },
    rho: { min: 0, max: 1, step: 0.01, default: 0.75 },
    r: { min: 0, max: 1, step: 0.01, default: 0.8 },
    delta0: { min: 0.01, max: 2, step: 0.01, default: 0.2 },
    decay: { min: 0.9, max: 1, step: 0.001, default: 0.98 },
    K: { min: 1, max: 12, step: 1, default: 5 },
    N: { min: 0, max: 8, step: 1, default: 3 },
    gamma: { min: 0, max: 0.9, step: 0.01, default: 0.2 },
    Kr: { min: 0, max: 1, step: 1, default: 1 },
    target_reliability: { min: 0.5, max: 0.99, step: 0.01, default: 0.95 },
    mu0: { min: 2, max: 40, step: 1, default: 12 },
    alpha: { min: 1.1, max: 2.0, step: 0.1, default: 1.3 },
    beta: { min: 0.3, max: 0.9, step: 0.1, default: 0.7 },
    A_lo: { min: 0.1, max: 0.3, step: 0.01, default: 0.2 },
    A_hi: { min: 0.3, max: 0.6, step: 0.01, default: 0.4 }
  },

  // Tooltips and explanations
  tooltips: {
    policy: 'Optimization strategy: Vibe (simple), Planner (spec-first), Trust Region (adaptive)',
    H: 'Human prior quality: How well the initial context/specification captures requirements',
    rho: 'Model prior quality: Base skill level of the LLM at generating useful proposals',
    r: 'Oracle resolution: Fraction of defect types the testing/review process can detect',
    delta0: 'Edit radius: Size of changes attempted per move (larger = more aggressive)',
    decay: 'Per-move multiplier for edit radius in decay-based policies',
    K: 'Number of candidate solutions generated per move',
    N: 'Number of human reviewers evaluating proposals',
    gamma: 'Reviewer correlation: How similar reviewer opinions tend to be (0=independent, 1=identical)',
    Kr: 'Whether reviewers can propose their own solutions (0=no, 1=yes)',
    target_reliability: 'Stop when pass probability reaches this threshold',
    mu0: 'Initial defect mass: Complexity/difficulty of the problem',
    alpha: 'Trust region expansion factor when acceptance is high',
    beta: 'Trust region contraction factor when acceptance is low',
    A_lo: 'Lower bound of target acceptance band',
    A_hi: 'Upper bound of target acceptance band'
  },

  // Performance expectations
  performanceTargets: {
    updateLatency: 50,  // Max milliseconds for plot updates
    maxSimulationSteps: 200,
    minPlotUpdateInterval: 100  // Debounce interval
  }
};