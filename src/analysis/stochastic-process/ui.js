// ui.js - UI controls and state management for LLM codegen optimization simulator
// Handles user interactions, state updates, and debounced plot updates

import { CONSTANTS } from './sim-core.js';
import { PRESETS, getPreset } from './sim-policies.js';
import { updateAllPlots } from './plots.js';

// Global state management
let currentSettings = {
    policy: 'vibe',
    H: 0.3,
    rho: 0.6,
    r: 0.7,
    delta0: 0.1,
    decay: 0.99,
    K: 2,
    N: 0,
    gamma: 0.0,
    Kr: 0,
    target_reliability: 0.9,
    mu0: 8,
    alpha: 1.3,
    beta: 0.7,
    A_lo: 0.2,
    A_hi: 0.4
};

let updateTimeout = null;
const DEBOUNCE_MS = 100;

// Initialize UI when DOM is ready
export function initializeUI() {
    console.log('Initializing LLM Codegen Optimizer UI...');
    
    // Set up all control event listeners
    setupPolicyControls();
    setupParameterControls();
    setupPresetButtons();
    setupAdvancedControls();
    
    // Load initial state from URL hash if present
    loadStateFromURL();
    
    // Update UI to match current settings
    updateUIFromSettings();
    
    // Initial plot render
    debouncedUpdate();
    
    console.log('UI initialization complete');
}

// Debounced update function
function debouncedUpdate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    
    updateTimeout = setTimeout(() => {
        try {
            updateAllPlots(currentSettings);
            updateURLFromSettings();
        } catch (error) {
            console.error('Error updating plots:', error);
            showError('Error updating simulation. Please check your settings.');
        }
    }, DEBOUNCE_MS);
}

// Policy control setup
function setupPolicyControls() {
    const policySelect = document.getElementById('policy-select');
    if (policySelect) {
        policySelect.addEventListener('change', (e) => {
            currentSettings.policy = e.target.value;
            updateUIFromSettings();
            debouncedUpdate();
        });
    }
}

// Parameter controls setup
function setupParameterControls() {
    const controls = [
        { id: 'human-prior', key: 'H', min: 0, max: 1, step: 0.01 },
        { id: 'model-prior', key: 'rho', min: 0, max: 1, step: 0.01 },
        { id: 'oracle-resolution', key: 'r', min: 0, max: 1, step: 0.01 },
        { id: 'edit-radius', key: 'delta0', min: 0.01, max: 2, step: 0.01 },
        { id: 'decay-rate', key: 'decay', min: 0.9, max: 1, step: 0.001 },
        { id: 'candidates', key: 'K', min: 1, max: 12, step: 1 },
        { id: 'reviewers', key: 'N', min: 0, max: 8, step: 1 },
        { id: 'correlation', key: 'gamma', min: 0, max: 0.9, step: 0.01 },
        { id: 'reviewer-proposals', key: 'Kr', min: 0, max: 1, step: 1 },
        { id: 'target-reliability', key: 'target_reliability', min: 0.5, max: 0.99, step: 0.01 },
        { id: 'difficulty', key: 'mu0', min: 2, max: 40, step: 1 }
    ];
    
    controls.forEach(control => {
        const element = document.getElementById(control.id);
        const valueDisplay = document.getElementById(`${control.id}-value`);
        
        if (element) {
            // Set initial values and constraints
            element.min = control.min;
            element.max = control.max;
            element.step = control.step;
            element.value = currentSettings[control.key];
            
            if (valueDisplay) {
                valueDisplay.textContent = formatValue(currentSettings[control.key], control.step);
            }
            
            element.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                currentSettings[control.key] = value;
                
                if (valueDisplay) {
                    valueDisplay.textContent = formatValue(value, control.step);
                }
                
                debouncedUpdate();
            });
        }
    });
}

// Advanced controls (Trust Region parameters)
function setupAdvancedControls() {
    const advancedControls = [
        { id: 'tr-alpha', key: 'alpha', min: 1.1, max: 2.0, step: 0.1 },
        { id: 'tr-beta', key: 'beta', min: 0.3, max: 0.9, step: 0.1 },
        { id: 'tr-a-low', key: 'A_lo', min: 0.1, max: 0.3, step: 0.01 },
        { id: 'tr-a-high', key: 'A_hi', min: 0.3, max: 0.6, step: 0.01 }
    ];
    
    advancedControls.forEach(control => {
        const element = document.getElementById(control.id);
        const valueDisplay = document.getElementById(`${control.id}-value`);
        
        if (element) {
            element.min = control.min;
            element.max = control.max;
            element.step = control.step;
            element.value = currentSettings[control.key];
            
            if (valueDisplay) {
                valueDisplay.textContent = formatValue(currentSettings[control.key], control.step);
            }
            
            element.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                currentSettings[control.key] = value;
                
                if (valueDisplay) {
                    valueDisplay.textContent = formatValue(value, control.step);
                }
                
                debouncedUpdate();
            });
        }
    });
    
    // Advanced controls toggle
    const toggleButton = document.getElementById('toggle-advanced');
    const advancedPanel = document.getElementById('advanced-controls');
    
    if (toggleButton && advancedPanel) {
        toggleButton.addEventListener('click', () => {
            const isHidden = advancedPanel.style.display === 'none';
            advancedPanel.style.display = isHidden ? 'block' : 'none';
            toggleButton.textContent = isHidden ? 'Hide Advanced' : 'Show Advanced';
        });
    }
}

// Preset buttons setup
function setupPresetButtons() {
    Object.keys(PRESETS).forEach(presetName => {
        const button = document.getElementById(`preset-${presetName}`);
        if (button) {
            button.addEventListener('click', () => {
                applyPreset(presetName);
            });
        }
    });
    
    // Save/Load state buttons
    const copySettingsBtn = document.getElementById('copy-settings');
    const loadSettingsBtn = document.getElementById('load-settings');
    
    if (copySettingsBtn) {
        copySettingsBtn.addEventListener('click', copySettingsToClipboard);
    }
    
    if (loadSettingsBtn) {
        loadSettingsBtn.addEventListener('click', loadSettingsFromInput);
    }
}

// Apply preset configuration
function applyPreset(presetName) {
    try {
        const preset = getPreset(presetName);
        
        // Update settings
        currentSettings.policy = preset.policy;
        Object.assign(currentSettings, preset.params);
        
        // Update UI
        updateUIFromSettings();
        debouncedUpdate();
        
        showMessage(`Applied preset: ${presetName} - ${preset.description}`);
    } catch (error) {
        console.error(`Error applying preset ${presetName}:`, error);
        showError(`Failed to apply preset: ${presetName}`);
    }
}

// Update UI elements to match current settings
function updateUIFromSettings() {
    // Update policy select
    const policySelect = document.getElementById('policy-select');
    if (policySelect) {
        policySelect.value = currentSettings.policy;
    }
    
    // Update all parameter controls
    Object.keys(currentSettings).forEach(key => {
        const element = document.getElementById(getControlId(key));
        const valueDisplay = document.getElementById(`${getControlId(key)}-value`);
        
        if (element && element.type === 'range') {
            element.value = currentSettings[key];
            if (valueDisplay) {
                const step = parseFloat(element.step);
                valueDisplay.textContent = formatValue(currentSettings[key], step);
            }
        }
    });
}

// Map settings keys to control IDs
function getControlId(key) {
    const mapping = {
        H: 'human-prior',
        rho: 'model-prior',
        r: 'oracle-resolution',
        delta0: 'edit-radius',
        decay: 'decay-rate',
        K: 'candidates',
        N: 'reviewers',
        gamma: 'correlation',
        Kr: 'reviewer-proposals',
        target_reliability: 'target-reliability',
        mu0: 'difficulty',
        alpha: 'tr-alpha',
        beta: 'tr-beta',
        A_lo: 'tr-a-low',
        A_hi: 'tr-a-high'
    };
    
    return mapping[key] || key;
}

// Format values for display
function formatValue(value, step) {
    if (step >= 1) {
        return Math.round(value).toString();
    } else if (step >= 0.01) {
        return value.toFixed(2);
    } else {
        return value.toFixed(3);
    }
}

// Copy current settings to clipboard
function copySettingsToClipboard() {
    try {
        const settingsJSON = JSON.stringify(currentSettings, null, 2);
        navigator.clipboard.writeText(settingsJSON).then(() => {
            showMessage('Settings copied to clipboard!');
        }).catch((error) => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = settingsJSON;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showMessage('Settings copied to clipboard!');
        });
    } catch (error) {
        console.error('Error copying settings:', error);
        showError('Failed to copy settings');
    }
}

// Load settings from user input
function loadSettingsFromInput() {
    const input = prompt('Paste settings JSON:');
    if (input) {
        try {
            const newSettings = JSON.parse(input);
            
            // Validate settings
            if (typeof newSettings === 'object' && newSettings !== null) {
                currentSettings = { ...currentSettings, ...newSettings };
                updateUIFromSettings();
                debouncedUpdate();
                showMessage('Settings loaded successfully!');
            } else {
                showError('Invalid settings format');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            showError('Failed to parse settings JSON');
        }
    }
}

// URL state management
function updateURLFromSettings() {
    const hash = encodeURIComponent(JSON.stringify(currentSettings));
    window.history.replaceState(null, null, `#${hash}`);
}

function loadStateFromURL() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        try {
            const decodedSettings = JSON.parse(decodeURIComponent(hash));
            currentSettings = { ...currentSettings, ...decodedSettings };
        } catch (error) {
            console.warn('Could not load settings from URL:', error);
        }
    }
}

// Message display functions
function showMessage(message) {
    const messageDiv = document.getElementById('message-display');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'message success';
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 3000);
    } else {
        console.log('Message:', message);
    }
}

function showError(message) {
    const messageDiv = document.getElementById('message-display');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'message error';
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    } else {
        console.error('Error:', message);
    }
}

// Export current settings for external access
export function getCurrentSettings() {
    return { ...currentSettings };
}

// Update settings programmatically
export function updateSettings(newSettings) {
    currentSettings = { ...currentSettings, ...newSettings };
    updateUIFromSettings();
    debouncedUpdate();
}

// Show/hide assumptions panel
export function toggleAssumptions() {
    const panel = document.getElementById('assumptions-panel');
    const button = document.getElementById('toggle-assumptions');
    
    if (panel && button) {
        const isHidden = panel.style.display === 'none';
        panel.style.display = isHidden ? 'block' : 'none';
        button.textContent = isHidden ? 'Hide Assumptions' : 'Show Assumptions';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUI);
} else {
    initializeUI();
}