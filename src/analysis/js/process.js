// process.js - SDE drift and diffusion for 2D code embedding
// Implements controlled stochastic walk with trust-region constraints

import { evalMPoint } from './embedding.js';

// Process parameters (correspond to previous sim-core constants)
export const PROCESS_DEFAULTS = {
    // Improvement dynamics - rebalanced to ensure positive progress
    a1: 1.2,        // Fix effectiveness coefficient (increased)
    a2: 0.08,       // Collateral damage coefficient (reduced)
    b: 2.0,         // Diminishing returns parameter (reduced for stronger gradients)
    
    // Human quality factors
    kappa1: 0.4,    // Human effect on noise reduction
    kappa2: 0.5,    // Human effect on collateral reduction (increased)
    
    // Reviewer dynamics
    sigma_r: 0.35,  // Base reviewer noise
    tau: 0.4,       // Diversity reduction with strong priors
    
    // Diffusion parameters
    sigma0: 0.4,    // Base noise level (s0 from original)
    sigmaParallel: 1.0,   // Noise parallel to gradient
    sigmaPerp: 0.3,       // Noise perpendicular to gradient
    
    // Trust region bounds
    deltaMin: 0.01,
    deltaMax: 2.0
};

/**
 * Compute effective prior quality (rho_eff)
 * @param {number} rho - model prior quality [0,1]
 * @param {number} H - human prior quality [0,1]
 * @returns {number} effective prior quality
 */
export function rhoEff(rho, H) {
    return 1 - (1 - rho) * (1 - H);
}

/**
 * Compute effective number of candidates (K_eff)
 * @param {number} K - base candidates
 * @param {number} N - number of reviewers
 * @param {number} Kr - reviewer proposals (0 or 1)
 * @param {number} H - human prior quality [0,1]
 * @param {number} tau - diversity reduction parameter
 * @returns {number} effective candidates
 */
export function Keffective(K, N, Kr, H, tau = PROCESS_DEFAULTS.tau) {
    const Kprime = K + N * Kr;
    return 1 + (Kprime - 1) * (1 - tau * H);
}

/**
 * Compute effective number of reviewers (N_eff)
 * @param {number} N - number of reviewers
 * @param {number} gamma - reviewer correlation [0,1]
 * @returns {number} effective reviewers
 */
export function Neffective(N, gamma) {
    if (N === 0) return 0;
    return N / (1 + (N - 1) * gamma);
}

/**
 * Compute selection quantile from effective candidates (z_K)
 * @param {number} Keff - effective number of candidates
 * @returns {number} selection quantile (inverse normal CDF)
 */
export function zFromK(Keff) {
    if (Keff <= 1) return 0;
    
    // Approximation for Φ^(-1)(1 - 1/K_eff) when K_eff > 1
    const p = 1 - 1 / Keff;
    
    // Simple normal quantile approximation
    if (p >= 0.5) {
        const t = Math.sqrt(-2 * Math.log(1 - p));
        return t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / 
               (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t);
    } else {
        const t = Math.sqrt(-2 * Math.log(p));
        return -(t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / 
                (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t));
    }
}

/**
 * Compute drift vector v(s) at a point
 * @param {Array} s - current position [x, y]
 * @param {Object} landscapeCfg - landscape configuration
 * @param {Object} knobs - policy parameters {H, rho, delta, K, N, gamma, Kr}
 * @param {Object} processParams - process parameters (optional)
 * @returns {Array} drift vector [vx, vy]
 */
export function drift(s, landscapeCfg, knobs, processParams = PROCESS_DEFAULTS) {
    const { M, grad } = evalMPoint(s, landscapeCfg);
    const gradNorm = Math.sqrt(grad[0]*grad[0] + grad[1]*grad[1]);
    
    
    // Avoid division by zero
    if (gradNorm < 1e-12) {
        return [0, 0];
    }
    
    const gradDir = [-grad[0] / gradNorm, -grad[1] / gradNorm]; // -∇M direction
    
    // Compute process parameters
    const rho_eff = rhoEff(knobs.rho, knobs.H);
    const Keff = Keffective(knobs.K, knobs.N, knobs.Kr, knobs.H);
    const Neff = Neffective(knobs.N, knobs.gamma);
    const zK = zFromK(Keff);
    
    // Base progress term with diminishing returns: a1 * ρ_eff * δ * g(||∇M||)
    const g_grad = gradNorm / (gradNorm + processParams.b); // g(r) = r/(r+b)
    const baseProgress = processParams.a1 * rho_eff * knobs.delta * g_grad;
    
    // Collateral damage: a2 * (1 - κ₂H) * δ
    const collateral = processParams.a2 * (1 - processParams.kappa2 * knobs.H) * knobs.delta;
    
    // Net progress (clamped to non-negative)
    const netProgress = Math.max(0, baseProgress - collateral);
    
    // Compute diffusion terms for selection lift
    const sigmaDelta2 = Math.pow(
        processParams.sigma0 * (1 - processParams.kappa1 * knobs.H) * knobs.delta * 
        Math.sqrt(g_grad), 2
    );
    
    const sigmaTot2 = sigmaDelta2 + (Neff > 0 ? processParams.sigma_r * processParams.sigma_r / Neff : 0);
    
    // Selection lift: η_t * (σ_Δ²/σ_tot) * z_K
    const selectionLift = (sigmaTot2 > 0) ? (sigmaDelta2 / sigmaTot2) * zK : 0;
    
    // Total drift magnitude
    const driftMagnitude = netProgress + selectionLift;
    
    // Apply trust-region clamp
    const clampedMagnitude = Math.min(driftMagnitude, knobs.delta);
    
    return [
        clampedMagnitude * gradDir[0],
        clampedMagnitude * gradDir[1]
    ];
}

/**
 * Compute diffusion matrix Σ(s) at a point
 * @param {Array} s - current position [x, y]
 * @param {Object} landscapeCfg - landscape configuration
 * @param {Object} knobs - policy parameters {H, rho, delta, K, N, gamma, Kr}
 * @param {Object} processParams - process parameters (optional)
 * @returns {Array} 2x2 diffusion matrix [[σxx, σxy], [σyx, σyy]]
 */
export function sigmaMat(s, landscapeCfg, knobs, processParams = PROCESS_DEFAULTS) {
    const { M, grad } = evalMPoint(s, landscapeCfg);
    const gradNorm = Math.sqrt(grad[0]*grad[0] + grad[1]*grad[1]);
    
    // Base diffusion scale
    const g_grad = gradNorm / (gradNorm + processParams.b);
    const Neff = Neffective(knobs.N, knobs.gamma);
    
    const baseSigma = processParams.sigma0 * (1 - processParams.kappa1 * knobs.H) * 
                     knobs.delta * Math.sqrt(g_grad) / Math.sqrt(1 + Neff);
    
    if (gradNorm < 1e-12 || baseSigma < 1e-12) {
        // Return isotropic small noise when gradient is zero
        const smallNoise = 1e-3;
        return [[smallNoise, 0], [0, smallNoise]];
    }
    
    // Compute rotation matrix to align with gradient
    const cosTheta = -grad[0] / gradNorm; // cos(θ) where θ is angle of -∇M
    const sinTheta = -grad[1] / gradNorm; // sin(θ)
    
    // Diagonal matrix in aligned coordinates
    const sigmaParallel = baseSigma * processParams.sigmaParallel;
    const sigmaPerp = baseSigma * processParams.sigmaPerp;
    
    // Rotate back to original coordinates: R * D * R^T
    // where R = [[cos, -sin], [sin, cos]] and D = [[σ∥, 0], [0, σ⊥]]
    const sigma11 = cosTheta*cosTheta * sigmaParallel*sigmaParallel + 
                    sinTheta*sinTheta * sigmaPerp*sigmaPerp;
    const sigma12 = cosTheta*sinTheta * (sigmaParallel*sigmaParallel - sigmaPerp*sigmaPerp);
    const sigma22 = sinTheta*sinTheta * sigmaParallel*sigmaParallel + 
                    cosTheta*cosTheta * sigmaPerp*sigmaPerp;
    
    return [[sigma11, sigma12], [sigma12, sigma22]];
}

/**
 * Apply trust-region constraint to step
 * @param {Array} step - proposed step [dx, dy]
 * @param {number} delta - trust-region radius
 * @returns {Array} constrained step
 */
export function trustRegionClamp(step, delta) {
    const stepNorm = Math.sqrt(step[0]*step[0] + step[1]*step[1]);
    
    if (stepNorm <= delta) {
        return step;
    }
    
    // Scale down to trust-region boundary
    const scale = delta / stepNorm;
    return [step[0] * scale, step[1] * scale];
}

// Agent archetype policies (return {delta, K, N, gamma, Kr, H, rho})
export const ARCHETYPES = {
    'noob-vibe': {
        name: 'Noob Vibe Coder',
        description: 'Small fixed steps, minimal complexity, low prior quality',
        deltaFixed: 0.4,  // Increased for visibility - still small steps for 10-50 cycles
        K: 1,
        N: 0,
        gamma: 0,
        Kr: 0,
        H: 0.1,  // Very low human prior - more susceptible to model bias
        rho: 0.3, // Lower model prior - less effective
        calibration: 0.3, // c - miscalibration (overconfident)
        useTrustRegion: false
    },
    
    'expert-vibe': {
        name: 'Expert Vibe Coder',
        description: 'Decaying steps with trust-region, mid-high prior quality',
        deltaBase: 0.8,  // Larger steps for 2-10 cycles
        decay: 0.92,     // Faster decay to finish in fewer steps
        K: 2,
        N: 1,
        gamma: 0.1,
        Kr: 0,
        H: 0.75,  // High human prior - less susceptible to model bias
        rho: 0.85, // High model prior quality  
        calibration: 0.85, // well-calibrated
        useTrustRegion: true,
        trustRegionBand: [0.2, 0.4]
    },
    
    'noob-autonomous': {
        name: 'Noob Autonomous Engineer',
        description: 'Overconfident early steps, multiple candidates and reviewers',
        deltaBase: 1.2,  // Large steps for 2-6 cycles
        decay: 0.85,     // Faster decay
        K: 4,  // More candidates due to AI tools
        N: 2,  // Multiple AI reviewers
        gamma: 0.3,  // Less correlated AI opinions  
        Kr: 1,
        H: 0.15,  // Low human expertise, but less susceptible to bias than vibe coders
        rho: 0.5, // Moderate model prior
        calibration: 0.1, // severely miscalibrated - dangerous!
        useTrustRegion: false
    },
    
    'expert-autonomous': {
        name: 'Expert Autonomous Engineer',
        description: 'Planning phase then large adaptive steps',
        planningPhase: 2, // Short planning for 1-3 cycles total
        deltaBase: 1.8,   // Very large steps for 1-3 cycles
        planningDelta: 0.3,  // Moderate planning steps
        K: 3,  // AI-assisted candidate generation
        N: 2,  // AI reviewers
        gamma: 0.1,  // Low correlation - diverse AI opinions
        Kr: 1,
        H: 0.6, // starts high due to expertise, builds up
        rho: 0.95, // Excellent model prior quality
        calibration: 0.95, // Near-perfect calibration
        useTrustRegion: true,
        trustRegionBand: [0.25, 0.45],
        HGrowthRate: 0.1, // Fast H growth during planning
        rGrowthRate: 0.05  // dr per planning step
    }
};

/**
 * Get policy parameters for archetype at time t
 * @param {string} archetype - archetype name
 * @param {number} t - time step
 * @param {Object} state - current state {acceptance_proxy?, ...}
 * @returns {Object} policy parameters {delta, K, N, gamma, Kr, H, rho}
 */
export function getArchetypePolicy(archetype, t, state = {}) {
    const arch = ARCHETYPES[archetype];
    if (!arch) {
        throw new Error(`Unknown archetype: ${archetype}`);
    }
    
    let policy = {
        K: arch.K,
        N: arch.N,
        gamma: arch.gamma,
        Kr: arch.Kr,
        H: arch.H,
        rho: arch.rho
    };
    
    // Handle delta computation based on archetype
    if (arch.deltaFixed !== undefined) {
        // Fixed delta (noob-vibe)
        policy.delta = arch.deltaFixed;
    } else if (arch.useTrustRegion && state.acceptanceProxy !== undefined) {
        // Trust-region adaptive delta
        const [A_lo, A_hi] = arch.trustRegionBand;
        const acceptance = state.acceptanceProxy;
        
        let deltaNew = state.delta || arch.deltaBase;
        
        if (acceptance > A_hi) {
            // Expand trust region
            deltaNew *= 1.3; // α
        } else if (acceptance < A_lo) {
            // Contract trust region
            deltaNew *= 0.7; // β
        }
        
        policy.delta = Math.max(PROCESS_DEFAULTS.deltaMin, 
                               Math.min(PROCESS_DEFAULTS.deltaMax, deltaNew));
    } else {
        // Decaying delta
        const baseDecay = Math.pow(arch.decay || 0.98, t);
        policy.delta = (arch.deltaBase || 0.3) * baseDecay;
    }
    
    // Handle expert-autonomous planning phase
    if (archetype === 'expert-autonomous' && t < arch.planningPhase) {
        policy.delta = arch.planningDelta;
        policy.H = arch.H + arch.HGrowthRate * t;
        // Could also grow oracle resolution r here if tracked
    }
    
    // Apply miscalibration to delta
    if (arch.calibration !== undefined) {
        const trueShrinkage = 1.0; // Assume we know the true shrinkage
        const perceivedShrinkage = arch.calibration * trueShrinkage + 
                                  (1 - arch.calibration) * (trueShrinkage * 1.5); // overestimate
        policy.delta *= perceivedShrinkage;
    }
    
    return policy;
}