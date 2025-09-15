// sim-policies.js - Policy schedules for LLM codegen optimization
// Implements vibe, planner, and trust-region strategies

import { CONSTANTS } from './sim-core.js';

// Vibe policy: fixed small delta, small K, N=0, greedy accept
export function vibeSchedule(t, state, params = {}) {
    const defaults = {
        delta: 0.1,
        K: 2,
        N: 0,
        Kr: 0,
        gamma: 0.0,
        r: 0.7,
        H: 0.3,
        rho: 0.6,
        decay: 0.99
    };
    
    const settings = { ...defaults, ...params };
    
    return {
        delta: settings.delta * Math.pow(settings.decay, t),
        K: settings.K,
        N: settings.N,
        Kr: settings.Kr,
        gamma: settings.gamma,
        r: settings.r,
        H: settings.H,
        rho: settings.rho
    };
}

// Planner/spec-first policy: boost H and r early, then moderate delta with decay
export function plannerSchedule(t, state, params = {}) {
    const defaults = {
        delta0: 0.3,
        K: 4,
        N: 2,
        Kr: 1,
        gamma: 0.3,
        r0: 0.5,
        H0: 0.4,
        rho: 0.7,
        Tp: 20,  // planning phase duration
        dH: 0.02, // H increment per step
        dr: 0.01, // r increment per step
        decay: 0.98
    };
    
    const settings = { ...defaults, ...params };
    
    let H = settings.H0;
    let r = settings.r0;
    let delta = settings.delta0;
    
    // Planning phase: increase H and r
    if (t <= settings.Tp) {
        H = Math.min(0.95, settings.H0 + settings.dH * t);
        r = Math.min(0.95, settings.r0 + settings.dr * t);
        delta = settings.delta0;
    } else {
        // After planning: use final H, r and decay delta
        H = Math.min(0.95, settings.H0 + settings.dH * settings.Tp);
        r = Math.min(0.95, settings.r0 + settings.dr * settings.Tp);
        delta = settings.delta0 * Math.pow(settings.decay, t - settings.Tp);
    }
    
    return {
        delta,
        K: settings.K,
        N: settings.N,
        Kr: settings.Kr,
        gamma: settings.gamma,
        r,
        H,
        rho: settings.rho
    };
}

// Trust region policy: adaptive delta based on acceptance proxy
export function trSchedule(t, state, params = {}) {
    const defaults = {
        delta0: 0.2,
        K: 5,
        N: 3,
        Kr: 1,
        gamma: 0.2,
        r: 0.8,
        H: 0.6,
        rho: 0.75,
        alpha: 1.3,
        beta: 0.7,
        A_lo: 0.2,
        A_hi: 0.4,
        delta_min: 0.01,
        delta_max: 1.0
    };
    
    const settings = { ...defaults, ...params };
    
    // Initialize delta on first step
    if (!state.delta) {
        state.delta = settings.delta0;
    }
    
    let delta = state.delta;
    
    // Trust region adaptation based on previous step's acceptance proxy
    if (t > 0 && state.lastAcceptanceProxy !== undefined) {
        const A = state.lastAcceptanceProxy;
        
        if (A > settings.A_hi) {
            // High acceptance - increase step size
            delta *= settings.alpha;
        } else if (A < settings.A_lo) {
            // Low acceptance - decrease step size
            delta *= settings.beta;
        }
        // If A_lo <= A <= A_hi, keep delta unchanged
        
        // Clamp delta to bounds
        delta = Math.max(settings.delta_min, Math.min(settings.delta_max, delta));
    }
    
    return {
        delta,
        K: settings.K,
        N: settings.N,
        Kr: settings.Kr,
        gamma: settings.gamma,
        r: settings.r,
        H: settings.H,
        rho: settings.rho
    };
}

// Policy factory function
export function createPolicy(policyName, customParams = {}) {
    switch (policyName) {
        case 'vibe':
            return (t, state) => vibeSchedule(t, state, customParams);
        case 'planner':
            return (t, state) => plannerSchedule(t, state, customParams);
        case 'trust-region':
        case 'tr':
            return (t, state) => trSchedule(t, state, customParams);
        default:
            throw new Error(`Unknown policy: ${policyName}`);
    }
}

// Preset configurations
export const PRESETS = {
    'noob-vibe': {
        policy: 'vibe',
        params: {
            delta: 0.05,
            K: 1,
            N: 0,
            Kr: 0,
            gamma: 0,
            r: 0.6,
            H: 0.2,
            rho: 0.5,
            decay: 0.995
        },
        description: 'Conservative approach for beginners'
    },
    
    'principal-tr': {
        policy: 'trust-region',
        params: {
            delta0: 0.25,
            K: 6,
            N: 4,
            Kr: 1,
            gamma: 0.25,
            r: 0.85,
            H: 0.7,
            rho: 0.8,
            alpha: 1.4,
            beta: 0.6,
            A_lo: 0.25,
            A_hi: 0.45
        },
        description: 'Principal engineer with strong context and adaptive optimization'
    },
    
    'planner-spec': {
        policy: 'planner',
        params: {
            delta0: 0.4,
            K: 5,
            N: 3,
            Kr: 1,
            gamma: 0.3,
            r0: 0.4,
            H0: 0.3,
            rho: 0.75,
            Tp: 30,
            dH: 0.015,
            dr: 0.012,
            decay: 0.975
        },
        description: 'Spec-first approach with extended planning phase'
    }
};

// Utility function to get preset
export function getPreset(presetName) {
    if (!PRESETS[presetName]) {
        throw new Error(`Unknown preset: ${presetName}`);
    }
    return PRESETS[presetName];
}