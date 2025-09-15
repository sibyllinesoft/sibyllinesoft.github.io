// sampler.js - Euler-Maruyama sampling for stochastic path fans
// Optional module for drawing sample paths around the ML trajectory

import { drift, sigmaMat, trustRegionClamp, getArchetypePolicy } from './process.js';

/**
 * Seeded random number generator for reproducible sampling
 * @param {number} seed - initial seed
 * @returns {Function} random number generator
 */
function seedRandom(seed) {
    let rng = seed;
    return () => {
        rng = (rng * 9301 + 49297) % 233280;
        return rng / 233280;
    };
}

/**
 * Box-Muller transform for Gaussian random numbers
 * @param {Function} uniform - uniform random number generator
 * @returns {Function} Gaussian random number generator
 */
function gaussianRandom(uniform) {
    let hasSpare = false;
    let spare = 0;
    
    return () => {
        if (hasSpare) {
            hasSpare = false;
            return spare;
        }
        
        hasSpare = true;
        
        const u1 = uniform();
        const u2 = uniform();
        
        const mag = Math.sqrt(-2 * Math.log(u1));
        spare = mag * Math.cos(2 * Math.PI * u2);
        
        return mag * Math.sin(2 * Math.PI * u2);
    };
}

/**
 * Generate 2D Gaussian random vector with given covariance
 * @param {Array} Sigma - 2x2 covariance matrix
 * @param {Function} randn - standard Gaussian generator
 * @returns {Array} [x, y] correlated Gaussian vector
 */
function multivariateGaussian(Sigma, randn) {
    // Cholesky decomposition of 2x2 matrix: Σ = L L^T
    const a = Math.sqrt(Sigma[0][0]);
    const b = Sigma[0][1] / a;
    const c = Math.sqrt(Sigma[1][1] - b*b);
    
    // Generate independent standard Gaussians
    const z1 = randn();
    const z2 = randn();
    
    // Transform: x = L * z
    return [
        a * z1,
        b * z1 + c * z2
    ];
}

/**
 * Sample paths using Euler-Maruyama method
 * @param {Array} s0 - initial position [x, y]
 * @param {number} T - number of time steps
 * @param {number} R - number of sample paths
 * @param {Object} landscapeCfg - landscape configuration
 * @param {string|Function} policy - archetype name or custom policy function
 * @param {number} seed - random seed for reproducibility
 * @param {Object} options - sampling options
 * @returns {Array} array of R sample paths, each containing step objects
 */
export function samplePaths(s0, T, R, landscapeCfg, policy, seed = 42, options = {}) {
    const opts = {
        clampSteps: true,        // Apply trust-region clamping to total step
        storeDiagnostics: false, // Store extra diagnostic info per step
        ...options
    };
    
    const paths = [];
    
    for (let r = 0; r < R; r++) {
        const uniform = seedRandom(seed + r * 1000); // Different seed per path
        const randn = gaussianRandom(uniform);
        
        let s = [...s0];
        let state = { delta: 0.2 }; // Initial state
        
        const path = [];
        
        for (let t = 0; t < T; t++) {
            // Get policy parameters
            let knobs;
            if (typeof policy === 'string') {
                knobs = getArchetypePolicy(policy, t, state);
            } else {
                knobs = policy(t, state, s);
            }
            
            // Compute drift and diffusion
            const v = drift(s, landscapeCfg, knobs);
            const Sigma = sigmaMat(s, landscapeCfg, knobs);
            
            // Generate noise
            const xi = multivariateGaussian(Sigma, randn);
            
            // Euler-Maruyama step: s_{t+1} = s_t + v(s_t) + Σ(s_t) * ξ_t
            let step = [v[0] + xi[0], v[1] + xi[1]];
            
            // Apply trust-region constraint to total step if requested
            if (opts.clampSteps) {
                step = trustRegionClamp(step, knobs.delta);
            }
            
            // Store step information
            const stepInfo = {
                t,
                x: s[0],
                y: s[1],
                step: [...step],
                drift: [...v],
                noise: [...xi],
                delta: knobs.delta
            };
            
            if (opts.storeDiagnostics) {
                stepInfo.knobs = {...knobs};
                stepInfo.Sigma = [Sigma[0].slice(), Sigma[1].slice()];
            }
            
            path.push(stepInfo);
            
            // Take step
            s[0] += step[0];
            s[1] += step[1];
            
            // Update state
            state.delta = knobs.delta;
            // Note: We don't update acceptance proxy here since it requires the deterministic component
        }
        
        paths.push(path);
    }
    
    return paths;
}

/**
 * Extract path trajectories for plotting
 * @param {Array} paths - array of sample paths from samplePaths
 * @returns {Object} {xs, ys} arrays of path coordinates
 */
export function extractTrajectories(paths) {
    const xs = [];
    const ys = [];
    
    for (const path of paths) {
        const pathX = [];
        const pathY = [];
        
        for (const step of path) {
            pathX.push(step.x);
            pathY.push(step.y);
        }
        
        // Add final position
        if (path.length > 0) {
            const lastStep = path[path.length - 1];
            pathX.push(lastStep.x + lastStep.step[0]);
            pathY.push(lastStep.y + lastStep.step[1]);
        }
        
        xs.push(pathX);
        ys.push(pathY);
    }
    
    return { xs, ys };
}

/**
 * Compute sample statistics at each time step
 * @param {Array} paths - array of sample paths
 * @returns {Array} array of statistics objects per time step
 */
export function computePathStatistics(paths) {
    if (paths.length === 0) return [];
    
    const T = paths[0].length;
    const R = paths.length;
    const stats = [];
    
    for (let t = 0; t < T; t++) {
        // Collect positions at time t across all samples
        const positions = paths.map(path => [path[t].x, path[t].y]);
        
        // Compute sample mean
        const meanX = positions.reduce((sum, pos) => sum + pos[0], 0) / R;
        const meanY = positions.reduce((sum, pos) => sum + pos[1], 0) / R;
        
        // Compute sample covariance
        let cov00 = 0, cov01 = 0, cov11 = 0;
        for (const pos of positions) {
            const dx = pos[0] - meanX;
            const dy = pos[1] - meanY;
            cov00 += dx * dx;
            cov01 += dx * dy;
            cov11 += dy * dy;
        }
        
        cov00 /= (R - 1);
        cov01 /= (R - 1);
        cov11 /= (R - 1);
        
        // Compute quantiles for confidence bands
        const xSorted = positions.map(p => p[0]).sort((a, b) => a - b);
        const ySorted = positions.map(p => p[1]).sort((a, b) => a - b);
        
        const q05 = Math.floor(0.05 * R);
        const q25 = Math.floor(0.25 * R);
        const q75 = Math.floor(0.75 * R);
        const q95 = Math.floor(0.95 * R);
        
        stats.push({
            t,
            mean: [meanX, meanY],
            covariance: [[cov00, cov01], [cov01, cov11]],
            quantiles: {
                x: {
                    p05: xSorted[q05],
                    p25: xSorted[q25],
                    p75: xSorted[q75],
                    p95: xSorted[q95]
                },
                y: {
                    p05: ySorted[q05],
                    p25: ySorted[q25],
                    p75: ySorted[q75],
                    p95: ySorted[q95]
                }
            }
        });
    }
    
    return stats;
}

/**
 * Thin out paths for efficient plotting (keep every Nth point)
 * @param {Array} paths - sample paths
 * @param {number} factor - thinning factor (keep every factor-th point)
 * @returns {Array} thinned paths
 */
export function thinPaths(paths, factor = 2) {
    return paths.map(path => 
        path.filter((step, i) => i % factor === 0 || i === path.length - 1)
    );
}

/**
 * Convert paths to format suitable for Plotly
 * @param {Array} paths - sample paths
 * @param {Object} options - plotting options
 * @returns {Array} array of Plotly trace objects
 */
export function pathsToPlotlyTraces(paths, options = {}) {
    const opts = {
        opacity: 0.3,
        color: 'rgba(100, 149, 237, 0.3)',
        showlegend: false,
        name: 'Sample Paths',
        ...options
    };
    
    const { xs, ys } = extractTrajectories(paths);
    
    const traces = [];
    
    for (let i = 0; i < xs.length; i++) {
        traces.push({
            x: xs[i],
            y: ys[i],
            mode: 'lines',
            type: 'scatter',
            line: {
                color: opts.color,
                width: 1
            },
            opacity: opts.opacity,
            showlegend: i === 0 ? opts.showlegend : false,
            name: i === 0 ? opts.name : undefined,
            hoverinfo: 'skip'
        });
    }
    
    return traces;
}