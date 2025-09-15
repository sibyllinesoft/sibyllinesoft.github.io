// sim-core.js - Pure analytic engine for LLM codegen stochastic process optimization
// No DOM dependencies - pure mathematical functions

// Constants for mathematical functions
const CONSTANTS = {
    a1: 0.9,
    a2: 0.15,
    s0: 0.4,
    b: 4.0,
    kappa1: 0.4,
    kappa2: 0.3,
    sigma_r: 0.35,
    tau: 0.4,
    alpha: 1.3,
    beta: 0.7,
    Astar: [0.2, 0.4],
    mu0: 12,
    Tmax: 200,
    delta_min: 0.01,
    delta_max: 2.0
};

// Utility functions
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// Inverse normal CDF approximation (Beasley-Springer-Moro algorithm)
function invPhi(p) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    if (p === 0.5) return 0;
    
    // Use Acklam's inverse normal CDF approximation
    const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, 
               -2.759285104469687e+02, 1.383577518672690e+02, 
               -3.066479806614716e+01, 2.506628277459239e+00];
    
    const b = [0, -5.447609879822406e+01, 1.615858368580409e+02,
               -1.556989798598866e+02, 6.680131188771972e+01,
               -1.328068155288572e+01];
               
    const c = [0, -7.784894002430293e-03, -3.223964580411365e-01,
               -2.400758277161838e+00, -2.549732539343734e+00,
               4.374664141464968e+00, 2.938163982698783e+00];
               
    const d = [0, 7.784695709041462e-03, 3.224671290700398e-01,
               2.445134137142996e+00, 3.754408661907416e+00];

    let q = Math.min(p, 1 - p);
    let sign = p < 0.5 ? -1 : 1;
    
    if (q > 0.425) {
        let r = 0.5 - q;
        let r2 = r * r;
        let r3 = r * r2;
        let r4 = r2 * r2;
        let r5 = r * r4;
        let r6 = r2 * r4;
        
        let numerator = r * (((((a[6] * r6 + a[5]) * r5 + a[4]) * r4 + a[3]) * r3 + a[2]) * r2 + a[1]) * r + a[0];
        let denominator = ((((((b[5] * r6 + b[4]) * r5 + b[3]) * r4 + b[2]) * r3 + b[1]) * r2 + b[0]) * r + 1);
        return sign * numerator / denominator;
    } else {
        let r = Math.sqrt(-Math.log(q));
        if (r <= 5.0) {
            r -= 1.6;
            let r2 = r * r;
            let r3 = r * r2;
            let r4 = r2 * r2;
            
            let numerator = ((((c[4] * r4 + c[3]) * r3 + c[2]) * r2 + c[1]) * r + c[0]);
            let denominator = ((((d[4] * r4 + d[3]) * r3 + d[2]) * r2 + d[1]) * r + 1);
            return sign * numerator / denominator;
        } else {
            r -= 5.0;
            let r2 = r * r;
            let r3 = r * r2;
            let r4 = r2 * r2;
            
            let numerator = ((((c[4] * r4 + c[3]) * r3 + c[2]) * r2 + c[1]) * r + c[0]);
            let denominator = ((((d[4] * r4 + d[3]) * r3 + d[2]) * r2 + d[1]) * r + 1);
            return sign * numerator / denominator;
        }
    }
}

// Core mathematical functions
export function rhoEff(rho, H) {
    return 1 - (1 - rho) * (1 - H);
}

export function muDelta(mu, rhoEff, H, delta, params = CONSTANTS) {
    const { a1, a2, b, kappa2 } = params;
    return a1 * rhoEff * delta * (mu / (mu + b)) - a2 * (1 - kappa2 * H) * delta;
}

export function sigmaDelta(mu, H, delta, params = CONSTANTS) {
    const { s0, b, kappa1 } = params;
    return s0 * (1 - kappa1 * H) * delta * Math.sqrt(mu / (mu + b));
}

export function N_eff(N, gamma) {
    return N / (1 + (N - 1) * gamma);
}

export function K_eff(K, N, Kr, H, params = CONSTANTS) {
    const { tau } = params;
    const Kprime = K + N * Kr;
    return 1 + (Kprime - 1) * (1 - tau * H);
}

export function z_from_K(K_eff) {
    if (K_eff <= 1) return 0;
    return invPhi(1 - 1 / K_eff);
}

export function delta_selected(mu, rhoEff, H, delta, K, N, Kr, gamma, params = CONSTANTS) {
    const muD = muDelta(mu, rhoEff, H, delta, params);
    const sigmaD = sigmaDelta(mu, H, delta, params);
    const Neff = N_eff(N, gamma);
    const sigmaTot = Math.sqrt(sigmaD * sigmaD + params.sigma_r * params.sigma_r / Math.max(Neff, 1e-6));
    const Keff = K_eff(K, N, Kr, H, params);
    const zK = z_from_K(Keff);
    
    const EDeltaMax = muD + (sigmaD * sigmaD / Math.max(sigmaTot, 1e-6)) * zK;
    
    return {
        EDeltaMax: Math.max(EDeltaMax, 0),
        sigmaTot,
        Keff,
        muD,
        sigmaD
    };
}

export function step(mu_t, schedule, t, params = CONSTANTS) {
    const { delta, K, N, Kr, gamma, r, H, rho } = schedule;
    
    const rho_eff = rhoEff(rho, H);
    const result = delta_selected(mu_t, rho_eff, H, delta, K, N, Kr, gamma, params);
    
    const mu_next = Math.max(mu_t - result.EDeltaMax, 0);
    const P_pass = Math.exp(-r * mu_next);
    const P_false = mu_next > 0 ? (1 - Math.exp(-(1 - r) * mu_next)) : 0;
    
    // Acceptance proxy for trust region
    const acceptanceProxy = sigmoid(result.EDeltaMax / (result.sigmaTot + 1e-6));
    
    return {
        mu_next,
        P_pass,
        P_false,
        acceptanceProxy,
        EDeltaMax: result.EDeltaMax,
        sigmaTot: result.sigmaTot,
        Keff: result.Keff,
        rho_eff
    };
}

export function runSim(initialState, policyFunc, T, params = CONSTANTS) {
    let state = { ...initialState };
    const results = {
        t: [],
        mu: [],
        P_pass: [],
        P_false: [],
        delta: [],
        K: [],
        N: [],
        H: [],
        r: [],
        acceptanceProxy: [],
        EDeltaMax: [],
        sigmaTot: []
    };
    
    for (let t = 0; t < T; t++) {
        // Get schedule from policy
        const schedule = policyFunc(t, state);
        
        // Run one step
        const stepResult = step(state.mu, schedule, t, params);
        
        // Store results
        results.t.push(t);
        results.mu.push(state.mu);
        results.P_pass.push(stepResult.P_pass);
        results.P_false.push(stepResult.P_false);
        results.delta.push(schedule.delta);
        results.K.push(schedule.K);
        results.N.push(schedule.N);
        results.H.push(schedule.H);
        results.r.push(schedule.r);
        results.acceptanceProxy.push(stepResult.acceptanceProxy);
        results.EDeltaMax.push(stepResult.EDeltaMax);
        results.sigmaTot.push(stepResult.sigmaTot);
        
        // Update state
        state.mu = stepResult.mu_next;
        state.delta = schedule.delta;
        state.H = schedule.H;
        state.r = schedule.r;
        
        // Stop if target reliability reached
        if (stepResult.P_pass >= state.target_reliability) {
            break;
        }
    }
    
    return results;
}

// Export constants for use by other modules
export { CONSTANTS };