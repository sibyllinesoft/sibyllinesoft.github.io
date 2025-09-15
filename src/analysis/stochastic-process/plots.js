// plots.js - Plotly visualization system for LLM codegen optimization
// Creates interactive plots for convergence, speed-quality, false-pass, reviewer ROI, and oracle calibration

import { runSim, CONSTANTS } from './sim-core.js';
import { createPolicy, PRESETS } from './sim-policies.js';

// Color schemes for consistent visualization
const COLORS = {
    primary: '#3B82F6',
    secondary: '#10B981', 
    tertiary: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    teal: '#06B6D4',
    policies: {
        vibe: '#EF4444',
        planner: '#10B981',
        'trust-region': '#3B82F6'
    },
    heatmap: ['#1E3A8A', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
};

// 1. Convergence Plot
export function createConvergencePlot(simResult, settings) {
    const traces = [];
    
    // Main convergence line (mu_t)
    traces.push({
        x: simResult.t,
        y: simResult.mu,
        type: 'scatter',
        mode: 'lines',
        name: 'Defect Mass (μ)',
        line: { color: COLORS.primary, width: 3 },
        yaxis: 'y'
    });
    
    // Pass probability line
    traces.push({
        x: simResult.t,
        y: simResult.P_pass,
        type: 'scatter',
        mode: 'lines',
        name: 'Pass Probability',
        line: { color: COLORS.secondary, width: 2 },
        yaxis: 'y2'
    });
    
    // Target line
    if (settings.target_reliability) {
        traces.push({
            x: simResult.t,
            y: Array(simResult.t.length).fill(settings.target_reliability),
            type: 'scatter',
            mode: 'lines',
            name: `Target (${settings.target_reliability.toFixed(2)})`,
            line: { color: COLORS.danger, width: 1, dash: 'dash' },
            yaxis: 'y2'
        });
        
        // Find first time target is reached
        const targetIndex = simResult.P_pass.findIndex(p => p >= settings.target_reliability);
        if (targetIndex >= 0) {
            traces.push({
                x: [simResult.t[targetIndex], simResult.t[targetIndex]],
                y: [0, Math.max(...simResult.mu)],
                type: 'scatter',
                mode: 'lines',
                name: `Target Reached (t=${simResult.t[targetIndex]})`,
                line: { color: COLORS.danger, width: 2, dash: 'dot' },
                yaxis: 'y',
                showlegend: true
            });
        }
    }
    
    const layout = {
        title: 'Convergence: Defect Mass & Pass Probability vs Time',
        xaxis: { 
            title: 'Move (t)',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis: { 
            title: 'Defect Mass (μ)', 
            side: 'left',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis2: {
            title: 'Pass Probability',
            side: 'right',
            overlaying: 'y',
            range: [0, 1],
            gridcolor: 'rgba(128,128,128,0.1)'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12 },
        legend: { x: 0.7, y: 0.95 }
    };
    
    return { traces, layout };
}

// 2. Speed-Quality Frontier
export function createSpeedQualityPlot(currentSettings) {
    const traces = [];
    const policies = ['vibe', 'planner', 'trust-region'];
    const Ks = [1, 2, 4, 6, 8];
    const Ns = [0, 1, 2, 3, 4];
    
    for (const policyName of policies) {
        const policyTrace = {
            x: [],
            y: [],
            text: [],
            type: 'scatter',
            mode: 'markers',
            name: policyName,
            marker: {
                color: COLORS.policies[policyName],
                size: [],
                sizemode: 'diameter',
                sizeref: 0.1,
                symbol: []
            }
        };
        
        for (const K of Ks) {
            for (const N of Ns) {
                // Create policy with current settings but vary K, N
                const policyParams = { ...currentSettings, K, N };
                const policy = createPolicy(policyName, policyParams);
                
                const initialState = {
                    mu: currentSettings.mu0 || 12,
                    target_reliability: currentSettings.target_reliability || 0.95
                };
                
                const simResult = runSim(initialState, policy, 150);
                
                // Find time to reach target
                const targetIndex = simResult.P_pass.findIndex(p => p >= initialState.target_reliability);
                const timeToTarget = targetIndex >= 0 ? simResult.t[targetIndex] : 150;
                
                // Calculate residual unobserved defects at stop
                const finalMu = simResult.mu[simResult.mu.length - 1];
                const r = currentSettings.r || 0.8;
                const residualUnobserved = (1 - r) * finalMu;
                
                policyTrace.x.push(timeToTarget);
                policyTrace.y.push(residualUnobserved);
                policyTrace.text.push(`Policy: ${policyName}<br>K: ${K}<br>N: ${N}<br>Time: ${timeToTarget}<br>Residual: ${residualUnobserved.toFixed(3)}`);
                policyTrace.marker.size.push(K * 3 + 5); // Size represents K
                policyTrace.marker.symbol.push(N === 0 ? 'circle' : N <= 2 ? 'square' : 'diamond'); // Symbol represents N
            }
        }
        
        traces.push(policyTrace);
    }
    
    const layout = {
        title: 'Speed-Quality Frontier: Time vs Residual Risk',
        xaxis: { 
            title: 'Moves to Target Reliability',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis: { 
            title: 'Residual Unobserved Defects',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12 },
        legend: { x: 0.7, y: 0.95 }
    };
    
    return { traces, layout };
}

// 3. False-Pass Heatmap
export function createFalsePassHeatmap(currentSettings) {
    const rValues = [];
    const HValues = [];
    const zValues = [];
    
    // Create grid
    for (let i = 0; i <= 20; i++) {
        rValues.push(0.3 + (0.7 * i / 20)); // r from 0.3 to 1.0
    }
    
    for (let j = 0; j <= 20; j++) {
        HValues.push(0.1 + (0.8 * j / 20)); // H from 0.1 to 0.9
    }
    
    // Calculate false-pass probability for each (r, H) combination
    for (let j = 0; j < HValues.length; j++) {
        const row = [];
        for (let i = 0; i < rValues.length; i++) {
            const r = rValues[i];
            const H = HValues[j];
            
            // Run simulation with these settings
            const policyParams = { ...currentSettings, r, H };
            const policy = createPolicy(currentSettings.policy || 'trust-region', policyParams);
            
            const initialState = {
                mu: currentSettings.mu0 || 12,
                target_reliability: currentSettings.target_reliability || 0.95
            };
            
            const simResult = runSim(initialState, policy, 100);
            
            // Find stopping point
            const targetIndex = simResult.P_pass.findIndex(p => p >= initialState.target_reliability);
            const stopIndex = targetIndex >= 0 ? targetIndex : simResult.P_pass.length - 1;
            
            const falseProbAtStop = simResult.P_false[stopIndex] || 0;
            row.push(falseProbAtStop);
        }
        zValues.push(row);
    }
    
    const traces = [{
        z: zValues,
        x: rValues,
        y: HValues,
        type: 'heatmap',
        colorscale: [
            [0, '#1E3A8A'],
            [0.2, '#3B82F6'],
            [0.4, '#06B6D4'],
            [0.6, '#10B981'],
            [0.8, '#F59E0B'],
            [1, '#EF4444']
        ],
        showscale: true,
        colorbar: {
            title: 'False Pass<br>Probability',
            titleside: 'right'
        }
    }];
    
    const layout = {
        title: 'False-Pass Risk Heatmap: Oracle Resolution vs Human Prior',
        xaxis: { 
            title: 'Oracle Resolution (r)',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis: { 
            title: 'Human Prior Quality (H)',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12 }
    };
    
    return { traces, layout };
}

// 4. Reviewer ROI
export function createReviewerROIPlot(currentSettings) {
    const traces = [];
    const NValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const gammaValues = [0.0, 0.3, 0.6, 0.9];
    
    for (const gamma of gammaValues) {
        const timeTrace = {
            x: NValues,
            y: [],
            name: `Time to Pass (γ=${gamma})`,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: COLORS.policies.vibe, width: 2 },
            yaxis: 'y'
        };
        
        const deltaTrace = {
            x: NValues,
            y: [],
            name: `Per-Move Δμ (γ=${gamma})`,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: COLORS.policies.planner, width: 2, dash: 'dash' },
            yaxis: 'y2'
        };
        
        for (const N of NValues) {
            const policyParams = { ...currentSettings, N, gamma };
            const policy = createPolicy(currentSettings.policy || 'trust-region', policyParams);
            
            const initialState = {
                mu: currentSettings.mu0 || 12,
                target_reliability: currentSettings.target_reliability || 0.95
            };
            
            const simResult = runSim(initialState, policy, 150);
            
            // Time to pass
            const targetIndex = simResult.P_pass.findIndex(p => p >= initialState.target_reliability);
            const timeToPass = targetIndex >= 0 ? simResult.t[targetIndex] : 150;
            timeTrace.y.push(timeToPass);
            
            // Average per-move improvement
            const totalImprovement = initialState.mu - simResult.mu[simResult.mu.length - 1];
            const avgDeltaMu = totalImprovement / simResult.t.length;
            deltaTrace.y.push(avgDeltaMu);
        }
        
        traces.push(timeTrace);
        traces.push(deltaTrace);
    }
    
    const layout = {
        title: 'Reviewer ROI: Impact of Team Size and Correlation',
        xaxis: { 
            title: 'Number of Reviewers (N)',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis: { 
            title: 'Time to Pass',
            side: 'left',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis2: {
            title: 'Average Δμ per Move',
            side: 'right',
            overlaying: 'y',
            gridcolor: 'rgba(128,128,128,0.1)'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12 },
        legend: { x: 0.02, y: 0.98 }
    };
    
    return { traces, layout };
}

// 5. Oracle Calibration
export function createOracleCalibrationPlot(simResult, currentSettings) {
    const traces = [];
    
    // Get final state
    const finalIndex = simResult.t.length - 1;
    const finalMu = simResult.mu[finalIndex];
    const r = currentSettings.r || 0.8;
    
    // Pass probability (what oracle reports)
    const observedPassProb = Math.exp(-r * finalMu);
    
    // True pass probability (actual reality)
    const truePassProb = Math.exp(-finalMu);
    
    // False pass probability
    const falsePassProb = observedPassProb > 0 ? (1 - Math.exp(-(1 - r) * finalMu)) : 0;
    
    // Create calibration curve showing oracle vs reality
    const muRange = [];
    const oracleProbs = [];
    const trueProbs = [];
    
    for (let mu = 0; mu <= finalMu * 2; mu += finalMu * 2 / 50) {
        muRange.push(mu);
        oracleProbs.push(Math.exp(-r * mu));
        trueProbs.push(Math.exp(-mu));
    }
    
    traces.push({
        x: muRange,
        y: oracleProbs,
        type: 'scatter',
        mode: 'lines',
        name: `Oracle View (r=${r.toFixed(2)})`,
        line: { color: COLORS.primary, width: 3 }
    });
    
    traces.push({
        x: muRange,
        y: trueProbs,
        type: 'scatter',
        mode: 'lines',
        name: 'True Reality',
        line: { color: COLORS.secondary, width: 2, dash: 'dash' }
    });
    
    // Mark current position
    traces.push({
        x: [finalMu],
        y: [observedPassProb],
        type: 'scatter',
        mode: 'markers',
        name: 'Current State (Oracle)',
        marker: { color: COLORS.primary, size: 12, symbol: 'circle' }
    });
    
    traces.push({
        x: [finalMu],
        y: [truePassProb],
        type: 'scatter',
        mode: 'markers',
        name: 'Current State (Reality)',
        marker: { color: COLORS.danger, size: 12, symbol: 'x' }
    });
    
    const layout = {
        title: 'Oracle Calibration: Aliasing vs True Risk',
        xaxis: { 
            title: 'Defect Mass (μ)',
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        yaxis: { 
            title: 'Pass Probability',
            range: [0, 1],
            gridcolor: 'rgba(128,128,128,0.2)'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12 },
        legend: { x: 0.6, y: 0.95 },
        annotations: [{
            x: finalMu,
            y: 0.5,
            text: `Aliasing Risk:<br>${(falsePassProb * 100).toFixed(1)}%`,
            showarrow: true,
            arrowhead: 2,
            arrowcolor: COLORS.danger,
            font: { color: COLORS.danger, size: 11 },
            bgcolor: 'rgba(255,255,255,0.8)',
            bordercolor: COLORS.danger,
            borderwidth: 1
        }]
    };
    
    return { traces, layout };
}

// Plot rendering functions
export function renderPlot(containerId, plotData) {
    const { traces, layout } = plotData;
    
    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d'],
        scrollZoom: true
    };
    
    // Check if Plotly is available
    if (typeof Plotly !== 'undefined') {
        Plotly.newPlot(containerId, traces, layout, config);
    } else {
        console.error('Plotly not loaded');
        document.getElementById(containerId).innerHTML = '<div class="error">Plotly library not loaded</div>';
    }
}

// Batch update all plots
export function updateAllPlots(currentSettings) {
    // Run simulation with current settings
    const policy = createPolicy(currentSettings.policy || 'trust-region', currentSettings);
    const initialState = {
        mu: currentSettings.mu0 || 12,
        target_reliability: currentSettings.target_reliability || 0.95
    };
    
    const simResult = runSim(initialState, policy, 150);
    
    // Update each plot
    const plots = [
        { id: 'convergence-plot', creator: createConvergencePlot, args: [simResult, currentSettings] },
        { id: 'speed-quality-plot', creator: createSpeedQualityPlot, args: [currentSettings] },
        { id: 'false-pass-plot', creator: createFalsePassHeatmap, args: [currentSettings] },
        { id: 'reviewer-roi-plot', creator: createReviewerROIPlot, args: [currentSettings] },
        { id: 'oracle-calibration-plot', creator: createOracleCalibrationPlot, args: [simResult, currentSettings] }
    ];
    
    plots.forEach(plot => {
        try {
            const plotData = plot.creator(...plot.args);
            renderPlot(plot.id, plotData);
        } catch (error) {
            console.error(`Error updating ${plot.id}:`, error);
        }
    });
}