// pathml.js - Maximum-likelihood path tracing and covariance propagation
// Implements deterministic path following with confidence tube computation

import { drift, sigmaMat, trustRegionClamp, getArchetypePolicy } from './process.js';
import { evalMPoint } from './embedding.js';

/**
 * Compute acceptance proxy for trust-region updates
 * @param {number} stepSize - actual step size taken
 * @param {number} sigma - noise scale
 * @returns {number} acceptance proxy in [0,1]
 */
function computeAcceptanceProxy(stepSize, sigma) {
    if (sigma < 1e-12) return 1.0;
    return 1 / (1 + Math.exp(-(stepSize / (sigma + 1e-6))));
}

/**
 * Compute Jacobian of drift field at a point (for covariance propagation)
 * @param {Array} s - position [x, y]
 * @param {Object} landscapeCfg - landscape configuration
 * @param {Object} knobs - policy parameters
 * @param {number} eps - finite difference step size
 * @returns {Array} 2x2 Jacobian matrix [[∂v₁/∂x₁, ∂v₁/∂x₂], [∂v₂/∂x₁, ∂v₂/∂x₂]]
 */
function computeDriftJacobian(s, landscapeCfg, knobs, eps = 1e-6) {
    const [x, y] = s;
    
    // Central differences for Jacobian
    const v_center = drift(s, landscapeCfg, knobs);
    
    const v_dx = drift([x + eps, y], landscapeCfg, knobs);
    const v_dy = drift([x, y + eps], landscapeCfg, knobs);
    
    const dvdx = [(v_dx[0] - v_center[0]) / eps, (v_dx[1] - v_center[1]) / eps];
    const dvdy = [(v_dy[0] - v_center[0]) / eps, (v_dy[1] - v_center[1]) / eps];
    
    return [
        [dvdx[0], dvdy[0]],  // [∂v₁/∂x₁, ∂v₁/∂x₂]
        [dvdx[1], dvdy[1]]   // [∂v₂/∂x₁, ∂v₂/∂x₂]
    ];
}

/**
 * Matrix multiplication for 2x2 matrices
 * @param {Array} A - 2x2 matrix
 * @param {Array} B - 2x2 matrix
 * @returns {Array} A * B
 */
function matmul2x2(A, B) {
    return [
        [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
        [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
    ];
}

/**
 * Matrix addition for 2x2 matrices
 * @param {Array} A - 2x2 matrix
 * @param {Array} B - 2x2 matrix
 * @returns {Array} A + B
 */
function matadd2x2(A, B) {
    return [
        [A[0][0] + B[0][0], A[0][1] + B[0][1]],
        [A[1][0] + B[1][0], A[1][1] + B[1][1]]
    ];
}

/**
 * Compute eigenvalues of 2x2 symmetric matrix (for ellipse axes)
 * @param {Array} P - 2x2 symmetric covariance matrix
 * @returns {Object} {lambda1, lambda2, v1, v2} eigenvalues and eigenvectors
 */
function eigen2x2Symmetric(P) {
    const trace = P[0][0] + P[1][1];
    const det = P[0][0] * P[1][1] - P[0][1] * P[1][0];
    const discriminant = Math.sqrt(trace*trace - 4*det);
    
    const lambda1 = (trace + discriminant) / 2;
    const lambda2 = (trace - discriminant) / 2;
    
    // Eigenvectors (for symmetric matrix)
    let v1, v2;
    if (Math.abs(P[0][1]) > 1e-12) {
        v1 = [P[0][1], lambda1 - P[0][0]];
        v2 = [P[0][1], lambda2 - P[0][0]];
    } else {
        v1 = [1, 0];
        v2 = [0, 1];
    }
    
    // Normalize eigenvectors
    const norm1 = Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
    const norm2 = Math.sqrt(v2[0]*v2[0] + v2[1]*v2[1]);
    
    return {
        lambda1: Math.max(0, lambda1), // Ensure non-negative
        lambda2: Math.max(0, lambda2),
        v1: [v1[0]/norm1, v1[1]/norm1],
        v2: [v2[0]/norm2, v2[1]/norm2]
    };
}

/**
 * Trace maximum-likelihood path through the landscape
 * @param {Array} s0 - initial position [x, y]
 * @param {number} T - maximum number of steps
 * @param {Object} landscapeCfg - landscape configuration
 * @param {string|Function} policy - archetype name or custom policy function
 * @param {Object} options - {propagateCovariance: boolean, stopAtTarget: boolean}
 * @returns {Array} array of step objects with path history
 */
export function traceML(s0, T, landscapeCfg, policy, options = {}) {
    const opts = {
        propagateCovariance: true,
        stopAtTarget: false,
        targetThreshold: 0.1,
        ...options
    };
    
    let s = [...s0];
    let state = { delta: 0.2 }; // Initial state for trust-region
    
    // Initialize covariance (small initial uncertainty)
    let P = [[0.01, 0], [0, 0.01]];
    
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
        
        
        // Apply trust-region constraint
        const step = trustRegionClamp(v, knobs.delta);
        
        // Compute acceptance proxy for next iteration
        const sigmaNorm = Math.sqrt(Sigma[0][0] + Sigma[1][1]);
        const acceptanceProxy = computeAcceptanceProxy(
            Math.sqrt(step[0]*step[0] + step[1]*step[1]), 
            sigmaNorm
        );
        
        // Evaluate landscape at current point
        const { M, grad } = evalMPoint(s, landscapeCfg);
        const gradNorm = Math.sqrt(grad[0]*grad[0] + grad[1]*grad[1]);
        
        // Distance to target
        const distToTarget = Math.sqrt(
            (s[0] - landscapeCfg.sStar[0])**2 + 
            (s[1] - landscapeCfg.sStar[1])**2
        );
        
        // Store step information
        const stepInfo = {
            t,
            x: s[0],
            y: s[1],
            step: [...step],
            delta: knobs.delta,
            grad: [...grad],
            gradNorm,
            acceptanceProxy,
            M,
            distToTarget,
            knobs: {...knobs}
        };
        
        // Add covariance information if requested
        if (opts.propagateCovariance) {
            const eig = eigen2x2Symmetric(P);
            stepInfo.P = [P[0].slice(), P[1].slice()]; // Deep copy
            stepInfo.eigenvalues = [eig.lambda1, eig.lambda2];
            stepInfo.eigenvectors = [eig.v1.slice(), eig.v2.slice()];
        }
        
        path.push(stepInfo);
        
        // Check stopping criteria
        if (opts.stopAtTarget && distToTarget < opts.targetThreshold) {
            break;
        }
        
        // Take step
        s[0] += step[0];
        s[1] += step[1];
        
        // Update state for next iteration
        state.delta = knobs.delta;
        state.acceptanceProxy = acceptanceProxy;
        
        // Propagate covariance: P_{t+1} = A_t P_t A_t^T + Σ_t Σ_t^T
        if (opts.propagateCovariance && t < T - 1) {
            const A = computeDriftJacobian(s, landscapeCfg, knobs);
            
            // Add identity: A = I + ∇v
            A[0][0] += 1;
            A[1][1] += 1;
            
            // Compute A * P * A^T
            const AP = matmul2x2(A, P);
            const APAT = matmul2x2(AP, [[A[0][0], A[1][0]], [A[0][1], A[1][1]]]); // A^T
            
            // Compute Σ Σ^T (noise covariance)
            const SigmaT = [[Sigma[0][0], Sigma[1][0]], [Sigma[0][1], Sigma[1][1]]];
            const noiseCov = matmul2x2(Sigma, SigmaT);
            
            // Update covariance
            P = matadd2x2(APAT, noiseCov);
            
            // Add small regularization to prevent singular covariance
            P[0][0] += 1e-6;
            P[1][1] += 1e-6;
        }
    }
    
    return path;
}

/**
 * Compute distance to target (s*) throughout path
 * @param {Array} path - path from traceML
 * @param {Array} sStar - target position [x, y]
 * @returns {Array} distances at each time step
 */
export function distanceToStar(path, sStar) {
    return path.map(step => Math.sqrt(
        (step.x - sStar[0])**2 + (step.y - sStar[1])**2
    ));
}

/**
 * Compute log-likelihood of the traced path
 * @param {Array} path - path from traceML
 * @returns {number} total log-likelihood of the path
 */
export function computePathLogLikelihood(path) {
    let logLikelihood = 0;
    
    for (let i = 1; i < path.length; i++) {
        const prev = path[i-1];
        const curr = path[i];
        
        // Actual step taken
        const actualStep = [curr.x - prev.x, curr.y - prev.y];
        
        // Expected step (drift)
        const expectedStep = prev.step;
        
        // Residual
        const residual = [
            actualStep[0] - expectedStep[0],
            actualStep[1] - expectedStep[1]
        ];
        
        // For ML path, residual should be zero (no noise)
        // Log-likelihood contribution: -0.5 * residual^T * Σ^(-1) * residual
        // For ML path this is maximized (residual = 0)
        const residualNorm2 = residual[0]*residual[0] + residual[1]*residual[1];
        
        // Add small penalty for non-zero residuals (numerical errors)
        logLikelihood -= 0.5 * residualNorm2 * 1000; // High penalty for deviations
    }
    
    return logLikelihood;
}

/**
 * Extract confidence ellipse parameters for plotting
 * @param {Object} stepInfo - step from traceML with covariance info
 * @param {number} sigmaLevel - confidence level (1 for 1σ, 2 for 2σ, etc.)
 * @returns {Object} {cx, cy, a, b, angle} ellipse parameters
 */
export function getConfidenceEllipse(stepInfo, sigmaLevel = 1) {
    if (!stepInfo.P || !stepInfo.eigenvalues) {
        return null;
    }
    
    const [lambda1, lambda2] = stepInfo.eigenvalues;
    const [v1, v2] = stepInfo.eigenvectors;
    
    // Semi-axes lengths (scaled by confidence level)
    const a = sigmaLevel * Math.sqrt(lambda1);
    const b = sigmaLevel * Math.sqrt(lambda2);
    
    // Angle of major axis
    const angle = Math.atan2(v1[1], v1[0]) * 180 / Math.PI;
    
    return {
        cx: stepInfo.x,
        cy: stepInfo.y,
        a,
        b,
        angle
    };
}