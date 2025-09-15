// embedding.js - 2D embedding landscape and gradient computation
// Implements smooth potential M(s) with RBF GP-style mean and analytical gradients

// Default parameters for the embedding landscape
export const EMBEDDING_DEFAULTS = {
    // RBF kernel parameters
    lengthScale: 2.0,        // ℓ - smoothness parameter
    numCenters: 20,          // Q - density of RBF centers
    biasWeight: 0.6,         // α - bias magnitude
    alignment: 0.6,          // A ∈ [-1,1] - bias alignment (toward/away from s*)
    
    // Grid parameters
    gridSize: 60,            // Grid resolution
    xRange: [-5, 5],         // X coordinate bounds
    yRange: [-5, 5],         // Y coordinate bounds
    
    // Target location
    sStar: [3, 2],          // s* - "correct solution" location
    
    // Adversarial bump parameters
    hasAdversarialBump: false,
    bumpStrength: -0.5,
    bumpRadius: 1.0
};

// Predefined landscape presets
export const LANDSCAPE_PRESETS = {
    'crud-aligned': {
        lengthScale: 2.0,
        alignment: 0.6,
        numCenters: 20,
        biasWeight: 0.6,
        hasAdversarialBump: false,
        description: 'Familiar domain knowledge guides toward solution'
    },
    
    'neutral': {
        lengthScale: 1.5,
        alignment: 0.0,
        numCenters: 15,
        biasWeight: 0.3,
        hasAdversarialBump: false,
        description: 'Minimal prior bias, exploration required'
    },
    
    'adversarial': {
        lengthScale: 0.9,
        alignment: -0.6,
        numCenters: 10,
        biasWeight: 0.4,
        hasAdversarialBump: true,
        description: 'Novel domain with misleading initial direction'
    }
};

/**
 * Generate random RBF centers for the landscape
 * @param {number} Q - number of centers
 * @param {Array} xRange - [min, max] for x coordinates
 * @param {Array} yRange - [min, max] for y coordinates
 * @param {number} seed - random seed for reproducibility
 * @returns {Array} array of [x, y] center coordinates
 */
function generateRBFCenters(Q, xRange, yRange, seed = 42) {
    // Simple seeded random number generator
    let rng = seed;
    const random = () => {
        rng = (rng * 9301 + 49297) % 233280;
        return rng / 233280;
    };
    
    const centers = [];
    for (let i = 0; i < Q; i++) {
        const x = xRange[0] + random() * (xRange[1] - xRange[0]);
        const y = yRange[0] + random() * (yRange[1] - yRange[0]);
        centers.push([x, y]);
    }
    
    return centers;
}

/**
 * Generate random weights for RBF centers
 * @param {number} Q - number of centers
 * @param {number} seed - random seed for reproducibility
 * @returns {Array} array of weights
 */
function generateRBFWeights(Q, seed = 123) {
    let rng = seed;
    const random = () => {
        rng = (rng * 9301 + 49297) % 233280;
        return rng / 233280;
    };
    
    const weights = [];
    for (let i = 0; i < Q; i++) {
        // Generate weights in range [-1, 1] with bias toward positive
        weights.push((random() - 0.3) * 2);
    }
    
    return weights;
}

/**
 * Create landscape configuration from parameters
 * @param {Object} params - landscape parameters
 * @returns {Object} configuration object with centers, weights, bias vector
 */
export function makePrior(params = {}) {
    const config = { ...EMBEDDING_DEFAULTS, ...params };
    
    // Generate RBF centers
    const centers = generateRBFCenters(
        config.numCenters,
        config.xRange,
        config.yRange
    );
    
    // Generate RBF weights
    const weights = generateRBFWeights(config.numCenters);
    
    // Compute bias vector based on alignment
    // b = A * (s* - s_bias) where s_bias is some reference point
    const sBias = [0, 0]; // Reference point (origin)
    const biasDirection = [
        config.sStar[0] - sBias[0],
        config.sStar[1] - sBias[1]
    ];
    
    // Normalize and scale by alignment so that -∇M always points toward target
    const biasNorm = Math.sqrt(biasDirection[0]**2 + biasDirection[1]**2);
    // For positive alignment: bias creates low potential at target so -∇M points toward it
    // For negative alignment (adversarial): bias creates high potential at target so -∇M points toward it
    const biasVector = [
        -Math.abs(config.alignment) * biasDirection[0] / biasNorm,  // Always negative to ensure -∇M → target
        -Math.abs(config.alignment) * biasDirection[1] / biasNorm   // Always negative to ensure -∇M → target
    ];
    
    return {
        ...config,
        centers,
        weights,
        biasVector,
        biasPoint: sBias
    };
}

/**
 * Evaluate the landscape potential M(s) and its gradients over a grid
 * @param {Object} cfg - configuration from makePrior
 * @param {Array} X - 2D array of x coordinates
 * @param {Array} Y - 2D array of y coordinates  
 * @returns {Object} {Z, dZdx, dZdy} - potential and gradient grids
 */
export function evalMGrid(cfg, X, Y) {
    const rows = X.length;
    const cols = X[0].length;
    
    // Initialize output arrays
    const Z = Array(rows).fill().map(() => Array(cols).fill(0));
    const dZdx = Array(rows).fill().map(() => Array(cols).fill(0));
    const dZdy = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Precompute constants
    const invLengthScale2 = 1 / (2 * cfg.lengthScale * cfg.lengthScale);
    
    // Vectorized computation over grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = X[i][j];
            const y = Y[i][j];
            const s = [x, y];
            
            // Bias term: α * b^T * (s - s_b)
            const biasContrib = cfg.biasWeight * (
                cfg.biasVector[0] * (x - cfg.biasPoint[0]) +
                cfg.biasVector[1] * (y - cfg.biasPoint[1])
            );
            
            // Bias gradient contribution
            let dBiasdx = cfg.biasWeight * cfg.biasVector[0];
            let dBiasdy = cfg.biasWeight * cfg.biasVector[1];
            
            // RBF sum: Σ w_i * exp(-||s - μ_i||² / (2ℓ²))
            let rbfSum = 0;
            let dRBFdx = 0;
            let dRBFdy = 0;
            
            for (let k = 0; k < cfg.centers.length; k++) {
                const mu = cfg.centers[k];
                const w = cfg.weights[k];
                
                // Squared distance
                const dx = x - mu[0];
                const dy = y - mu[1];
                const dist2 = dx*dx + dy*dy;
                
                // RBF kernel
                const kernel = Math.exp(-dist2 * invLengthScale2);
                rbfSum += w * kernel;
                
                // RBF gradient: w * exp(...) * (-2/2ℓ²) * (s - μ)
                const gradFactor = -w * kernel * invLengthScale2 * 2;
                dRBFdx += gradFactor * dx;
                dRBFdy += gradFactor * dy;
            }
            
            // Adversarial bump near s* if enabled
            let bumpContrib = 0;
            let dBumpdx = 0;
            let dBumpdy = 0;
            
            if (cfg.hasAdversarialBump) {
                const dxStar = x - cfg.sStar[0];
                const dyStar = y - cfg.sStar[1];
                const distToStar2 = dxStar*dxStar + dyStar*dyStar;
                
                if (distToStar2 < cfg.bumpRadius*cfg.bumpRadius) {
                    const bumpKernel = Math.exp(-distToStar2 / (2 * 0.5*0.5)); // Fixed width
                    bumpContrib = cfg.bumpStrength * bumpKernel;
                    
                    const bumpGradFactor = -cfg.bumpStrength * bumpKernel / (2 * 0.5*0.5);
                    dBumpdx = bumpGradFactor * dxStar;
                    dBumpdy = bumpGradFactor * dyStar;
                }
            }
            
            // Total potential and gradients
            Z[i][j] = biasContrib + rbfSum + bumpContrib;
            dZdx[i][j] = dBiasdx + dRBFdx + dBumpdx;
            dZdy[i][j] = dBiasdy + dRBFdy + dBumpdy;
        }
    }
    
    return { Z, dZdx, dZdy };
}

/**
 * Create coordinate grids for evaluation
 * @param {Object} cfg - configuration with xRange, yRange, gridSize
 * @returns {Object} {X, Y} - coordinate grids
 */
export function createGrids(cfg) {
    const { xRange, yRange, gridSize } = cfg;
    
    const xVals = [];
    const yVals = [];
    
    for (let i = 0; i < gridSize; i++) {
        xVals.push(xRange[0] + (i / (gridSize - 1)) * (xRange[1] - xRange[0]));
        yVals.push(yRange[0] + (i / (gridSize - 1)) * (yRange[1] - yRange[0]));
    }
    
    const X = [];
    const Y = [];
    
    for (let i = 0; i < gridSize; i++) {
        const xRow = [];
        const yRow = [];
        for (let j = 0; j < gridSize; j++) {
            xRow.push(xVals[j]);
            yRow.push(yVals[i]);
        }
        X.push(xRow);
        Y.push(yRow);
    }
    
    return { X, Y };
}

/**
 * Evaluate landscape at a single point
 * @param {Array} s - [x, y] coordinate
 * @param {Object} cfg - configuration from makePrior
 * @returns {Object} {M, grad} - potential value and gradient vector
 */
export function evalMPoint(s, cfg) {
    const [x, y] = s;
    
    // Bias term
    const biasContrib = cfg.biasWeight * (
        cfg.biasVector[0] * (x - cfg.biasPoint[0]) +
        cfg.biasVector[1] * (y - cfg.biasPoint[1])
    );
    
    const dBiasdx = cfg.biasWeight * cfg.biasVector[0];
    const dBiasdy = cfg.biasWeight * cfg.biasVector[1];
    
    // RBF sum
    let rbfSum = 0;
    let dRBFdx = 0;
    let dRBFdy = 0;
    
    const invLengthScale2 = 1 / (2 * cfg.lengthScale * cfg.lengthScale);
    
    for (let k = 0; k < cfg.centers.length; k++) {
        const mu = cfg.centers[k];
        const w = cfg.weights[k];
        
        const dx = x - mu[0];
        const dy = y - mu[1];
        const dist2 = dx*dx + dy*dy;
        
        const kernel = Math.exp(-dist2 * invLengthScale2);
        rbfSum += w * kernel;
        
        const gradFactor = -w * kernel * invLengthScale2 * 2;
        dRBFdx += gradFactor * dx;
        dRBFdy += gradFactor * dy;
    }
    
    // Adversarial bump
    let bumpContrib = 0;
    let dBumpdx = 0;
    let dBumpdy = 0;
    
    if (cfg.hasAdversarialBump) {
        const dxStar = x - cfg.sStar[0];
        const dyStar = y - cfg.sStar[1];
        const distToStar2 = dxStar*dxStar + dyStar*dyStar;
        
        if (distToStar2 < cfg.bumpRadius*cfg.bumpRadius) {
            const bumpKernel = Math.exp(-distToStar2 / (2 * 0.5*0.5));
            bumpContrib = cfg.bumpStrength * bumpKernel;
            
            const bumpGradFactor = -cfg.bumpStrength * bumpKernel / (2 * 0.5*0.5);
            dBumpdx = bumpGradFactor * dxStar;
            dBumpdy = bumpGradFactor * dyStar;
        }
    }
    
    const M = biasContrib + rbfSum + bumpContrib;
    const grad = [dBiasdx + dRBFdx + dBumpdx, dBiasdy + dRBFdy + dBumpdy];
    
    return { M, grad };
}