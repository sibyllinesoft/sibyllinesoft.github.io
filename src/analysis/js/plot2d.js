// plot2d.js - 2D embedding visualization with Plotly
// Handles contour plots, quiver fields, ML paths, and confidence ellipses

import { createGrids, evalMGrid } from './embedding.js';
import { traceML, getConfidenceEllipse } from './pathml.js';
import { samplePaths, pathsToPlotlyTraces, thinPaths } from './sampler.js';

/**
 * Create contour plot trace for the landscape
 * @param {Object} landscapeCfg - landscape configuration
 * @returns {Object} Plotly contour trace
 */
export function createContourTrace(landscapeCfg) {
    const { X, Y } = createGrids(landscapeCfg);
    const { Z } = evalMGrid(landscapeCfg, X, Y);
    
    return {
        x: X[0], // x coordinates (first row)
        y: Y.map(row => row[0]), // y coordinates (first column)
        z: Z,
        type: 'contour',
        colorscale: 'Viridis',
        showscale: true,
        colorbar: {
            title: 'M(s)',
            titleside: 'right',
            len: 0.7
        },
        contours: {
            coloring: 'fill'
        },
        hovertemplate: 'x: %{x:.2f}<br>y: %{y:.2f}<br>M(s): %{z:.3f}<extra></extra>',
        name: 'Landscape'
    };
}

/**
 * Create quiver plot trace for the vector field
 * @param {Object} landscapeCfg - landscape configuration
 * @param {Object} options - quiver options {subsample, scale}
 * @returns {Array} array of line traces representing arrows
 */
export function createQuiverTraces(landscapeCfg, options = {}) {
    const opts = {
        subsample: 6,  // Show every 6th arrow
        scale: 0.1,    // Arrow scaling factor
        color: 'white',
        opacity: 0.8,
        ...options
    };
    
    const { X, Y } = createGrids(landscapeCfg);
    const { dZdx, dZdy } = evalMGrid(landscapeCfg, X, Y);
    
    const traces = [];
    
    // Subsample grid for arrow display
    for (let i = 0; i < X.length; i += opts.subsample) {
        for (let j = 0; j < X[0].length; j += opts.subsample) {
            const x = X[i][j];
            const y = Y[i][j];
            
            // Gradient direction (we want -∇M for descent)
            const dx = -dZdx[i][j];
            const dy = -dZdy[i][j];
            
            // Normalize and scale
            const norm = Math.sqrt(dx*dx + dy*dy);
            if (norm < 1e-6) continue;
            
            const arrowDx = (dx / norm) * opts.scale;
            const arrowDy = (dy / norm) * opts.scale;
            
            // Create arrow as line trace
            traces.push({
                x: [x, x + arrowDx],
                y: [y, y + arrowDy],
                mode: 'lines',
                type: 'scatter',
                line: {
                    color: opts.color,
                    width: 1
                },
                opacity: opts.opacity,
                showlegend: false,
                hoverinfo: 'skip'
            });
        }
    }
    
    return traces;
}

/**
 * Create ML path trace
 * @param {Array} path - path from traceML
 * @param {Object} options - styling options
 * @returns {Object} Plotly scatter trace
 */
export function createPathTrace(path, options = {}) {
    const opts = {
        color: '#ff6b35',
        width: 4,
        name: 'ML Path',
        showMarkers: true,
        ...options
    };
    
    if (path.length === 0) {
        return {
            x: [], y: [], type: 'scatter', mode: 'lines',
            name: opts.name, showlegend: true
        };
    }
    
    const x = path.map(step => step.x);
    const y = path.map(step => step.y);
    
    // Add final position
    const lastStep = path[path.length - 1];
    x.push(lastStep.x + lastStep.step[0]);
    y.push(lastStep.y + lastStep.step[1]);
    
    return {
        x,
        y,
        mode: opts.showMarkers ? 'lines+markers' : 'lines',
        type: 'scatter',
        line: {
            color: opts.color,
            width: opts.width
        },
        marker: opts.showMarkers ? {
            size: 6,
            color: opts.color,
            symbol: 'circle'
        } : undefined,
        name: opts.name,
        showlegend: true,
        hovertemplate: 't: %{pointNumber}<br>x: %{x:.3f}<br>y: %{y:.3f}<extra></extra>'
    };
}

/**
 * Create confidence ellipse traces
 * @param {Array} path - path from traceML with covariance info
 * @param {Object} options - ellipse options
 * @returns {Array} array of ellipse traces
 */
export function createEllipseTraces(path, options = {}) {
    const opts = {
        sigmaLevel: 1,
        color: 'rgba(255, 107, 53, 0.3)',
        strokeColor: '#ff6b35',
        strokeWidth: 1,
        subsample: 5, // Show every 5th ellipse
        ...options
    };
    
    const traces = [];
    
    for (let i = 0; i < path.length; i += opts.subsample) {
        const ellipse = getConfidenceEllipse(path[i], opts.sigmaLevel);
        if (!ellipse) continue;
        
        // Generate ellipse points
        const numPoints = 30;
        const theta = Array.from({length: numPoints + 1}, (_, i) => 
            2 * Math.PI * i / numPoints);
        
        const x = [];
        const y = [];
        
        const cosAngle = Math.cos(ellipse.angle * Math.PI / 180);
        const sinAngle = Math.sin(ellipse.angle * Math.PI / 180);
        
        for (const t of theta) {
            // Ellipse in standard position
            const ex = ellipse.a * Math.cos(t);
            const ey = ellipse.b * Math.sin(t);
            
            // Rotate and translate
            const rx = cosAngle * ex - sinAngle * ey + ellipse.cx;
            const ry = sinAngle * ex + cosAngle * ey + ellipse.cy;
            
            x.push(rx);
            y.push(ry);
        }
        
        traces.push({
            x,
            y,
            mode: 'lines',
            type: 'scatter',
            fill: 'toself',
            fillcolor: opts.color,
            line: {
                color: opts.strokeColor,
                width: opts.strokeWidth
            },
            showlegend: i === 0,
            name: i === 0 ? `${opts.sigmaLevel}σ Confidence` : undefined,
            hoverinfo: 'skip'
        });
    }
    
    return traces;
}

/**
 * Create target marker trace
 * @param {Array} sStar - target position [x, y]
 * @param {Object} options - marker options
 * @returns {Object} Plotly scatter trace
 */
export function createTargetTrace(sStar, options = {}) {
    const opts = {
        color: '#e74c3c',
        size: 12,
        symbol: 'star',
        name: 'Target (s*)',
        ...options
    };
    
    return {
        x: [sStar[0]],
        y: [sStar[1]],
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: opts.size,
            color: opts.color,
            symbol: opts.symbol,
            line: {
                width: 2,
                color: 'white'
            }
        },
        name: opts.name,
        showlegend: true,
        hovertemplate: 'Target<br>x: %{x:.2f}<br>y: %{y:.2f}<extra></extra>'
    };
}

/**
 * Create start marker trace
 * @param {Array} s0 - start position [x, y]
 * @param {Object} options - marker options
 * @returns {Object} Plotly scatter trace
 */
export function createStartTrace(s0, options = {}) {
    const opts = {
        color: '#2ecc71',
        size: 10,
        symbol: 'circle',
        name: 'Start (s₀)',
        ...options
    };
    
    return {
        x: [s0[0]],
        y: [s0[1]],
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: opts.size,
            color: opts.color,
            symbol: opts.symbol,
            line: {
                width: 2,
                color: 'white'
            }
        },
        name: opts.name,
        showlegend: true,
        hovertemplate: 'Start<br>x: %{x:.2f}<br>y: %{y:.2f}<extra></extra>'
    };
}

/**
 * Create auxiliary plot traces (step size, distance, etc.)
 * @param {Array} path - path from traceML
 * @returns {Object} traces for auxiliary plots
 */
export function createAuxiliaryTraces(path) {
    const t = path.map(step => step.t);
    
    return {
        stepSize: {
            x: t,
            y: path.map(step => Math.sqrt(step.step[0]**2 + step.step[1]**2)),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Step Size',
            line: { color: '#3498db' }
        },
        
        acceptanceProxy: {
            x: t,
            y: path.map(step => step.acceptanceProxy || 0),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Acceptance',
            line: { color: '#9b59b6' }
        },
        
        distanceToTarget: {
            x: t,
            y: path.map(step => step.distToTarget),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Distance to Target',
            line: { color: '#e67e22' }
        },
        
        gradientNorm: {
            x: t,
            y: path.map(step => step.gradNorm),
            mode: 'lines+markers',
            type: 'scatter',
            name: 'Gradient Norm',
            line: { color: '#1abc9c' }
        }
    };
}

/**
 * Create complete 2D visualization
 * @param {Object} landscapeCfg - landscape configuration
 * @param {Array} s0 - start position
 * @param {string} archetype - archetype name
 * @param {Object} options - visualization options
 * @returns {Object} {traces, layout} for Plotly
 */
export function create2DVisualization(landscapeCfg, s0, archetype, options = {}) {
    const opts = {
        T: 20,
        showQuiver: true,
        showEllipses: true,
        showSampling: false,
        numSamples: 10,
        ...options
    };
    
    // Trace ML path
    const path = traceML(s0, opts.T, landscapeCfg, archetype, {
        propagateCovariance: opts.showEllipses,
        stopAtTarget: true
    });
    
    const traces = [];
    
    // 1. Landscape contour
    traces.push(createContourTrace(landscapeCfg));
    
    // 2. Vector field (optional)
    if (opts.showQuiver) {
        traces.push(...createQuiverTraces(landscapeCfg));
    }
    
    // 3. Sample paths (optional)
    if (opts.showSampling && opts.numSamples > 0) {
        const samplePath = samplePaths(
            s0, opts.T, opts.numSamples, 
            landscapeCfg, archetype, 42
        );
        const thinnedPaths = thinPaths(samplePath, 2);
        traces.push(...pathsToPlotlyTraces(thinnedPaths));
    }
    
    // 4. ML path
    traces.push(createPathTrace(path));
    
    // 5. Confidence ellipses (optional)
    if (opts.showEllipses && path.length > 0) {
        traces.push(...createEllipseTraces(path));
    }
    
    // 6. Start and target markers
    traces.push(createStartTrace(s0));
    traces.push(createTargetTrace(landscapeCfg.sStar));
    
    const layout = {
        title: `2D Code Embedding Explorer - ${archetype}`,
        xaxis: {
            title: 'x',
            range: landscapeCfg.xRange,
            constrain: 'domain'
        },
        yaxis: {
            title: 'y',
            range: landscapeCfg.yRange,
            scaleanchor: 'x',
            scaleratio: 1
        },
        width: 900,
        height: 800,
        showlegend: true,
        legend: {
            x: 1,
            y: 1,
            xanchor: 'left',
            bgcolor: 'rgba(255,255,255,0.8)'
        },
        hovermode: 'closest'
    };
    
    return { traces, layout, path };
}

/**
 * Update visualization traces without full recomputation
 * @param {string} plotId - DOM element ID of the plot
 * @param {Object} newConfig - updated configuration
 */
export function updateVisualization(plotId, newConfig) {
    const { traces, layout } = create2DVisualization(
        newConfig.landscapeCfg, 
        newConfig.s0, 
        newConfig.archetype, 
        newConfig.options
    );
    
    Plotly.react(plotId, traces, layout);
}

/**
 * Create layout for auxiliary plots
 * @param {string} title - plot title
 * @param {string} yaxis - y-axis label
 * @returns {Object} Plotly layout
 */
export function createAuxLayout(title, yaxis) {
    return {
        title,
        xaxis: { title: 'Time Step' },
        yaxis: { title: yaxis },
        width: 300,
        height: 200,
        margin: { l: 50, r: 10, t: 30, b: 40 },
        showlegend: false
    };
}