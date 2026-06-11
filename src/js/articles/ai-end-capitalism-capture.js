(() => {
  const panel = document.querySelector('[data-ai-capture-model]');
  if (!panel || typeof Plotly === 'undefined') return;

  const chart = panel.querySelector('#ai-capture-revenue-chart');
  const summary = panel.querySelector('[data-ai-summary]');
  const aiEli5 = panel.querySelector('[data-ai-eli5]');
  const scenarioButtons = [...panel.querySelectorAll('[data-ai-scenario]')];
  const controls = {
    globalAiValue: panel.querySelector('[data-ai-control="globalAiValue"]'),
    globalCapture: panel.querySelector('[data-ai-control="globalCapture"]'),
    protectionism: panel.querySelector('[data-ai-control="protectionism"]'),
    margin: panel.querySelector('[data-ai-control="margin"]'),
    govCapture: panel.querySelector('[data-ai-control="govCapture"]')
  };
  const outputs = {
    globalAiValue: panel.querySelector('[data-ai-output="globalAiValue"]'),
    globalCapture: panel.querySelector('[data-ai-output="globalCapture"]'),
    protectionism: panel.querySelector('[data-ai-output="protectionism"]'),
    margin: panel.querySelector('[data-ai-output="margin"]'),
    govCapture: panel.querySelector('[data-ai-output="govCapture"]')
  };

  const aiScenarios = {
    pessimistic: {
      label: 'Pessimistic',
      globalAiValue: 1.5,
      globalCapture: 12,
      margin: 32,
      govCapture: 19,
      protectionism: false,
      eli5: 'Pessimistic: AI helps in narrow places, but the economy absorbs it slowly. This is the Acemoglu-style world: useful task-level productivity gains, but only a modest measured GDP lift over the next decade. U.S. firms win a modest foreign share, and margins look like Alphabet-scale big tech under heavy AI capex rather than monopoly software.'
    },
    conservative: {
      label: 'Conservative',
      globalAiValue: 4.9,
      globalCapture: 20,
      margin: 35,
      govCapture: 19,
      protectionism: true,
      eli5: 'Conservative: AI becomes a large but not magical 2030-scale economic sector, roughly in line with IDC-style estimates of AI reaching the mid-single digits of global GDP. The U.S. protects its domestic market, competes for part of the rest of the world, and margins look like AWS: profitable, but still infrastructure-heavy.'
    },
    optimistic: {
      label: 'Optimistic',
      globalAiValue: 10.0,
      globalCapture: 35,
      margin: 46,
      govCapture: 19,
      protectionism: true,
      eli5: 'Optimistic: AI becomes a broad economy-wide productivity boom close to Goldman\'s 7% global GDP lift case. U.S. firms capture a large share and margins look like Microsoft-scale platform software despite the infrastructure buildout. This is aggressive, but no longer assumes PwC\'s most expansive 2035 upside as the default.'
    }
  };

  const usDomesticShare = (1.30 / 4.90 + 7.00 / 10.00) / 2;
  const usPopulation = 343_000_000;
  const usLaborForce = 170_000_000;
  let activeAiScenario = 'conservative';

  function baselineRescueRevenue() {
    const revenue2026 = 5.6;
    const revenue2036 = 8.3;
    const debt2036 = 56.0;
    const deficit2036 = 3.1;
    const revenueGrowth = (revenue2036 / revenue2026) ** (1 / 10) - 1;
    return Math.max(0, deficit2036 - debt2036 * revenueGrowth);
  }

  let rescueRevenue = window.currentFiscalRescueRevenue ?? baselineRescueRevenue();

  function formatTrillions(value) {
    return `$${value.toFixed(2)}T`;
  }

  function formatSignedTrillions(value) {
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${formatTrillions(Math.abs(value))}`;
  }

  function formatDollars(value) {
    return `$${Math.round(value).toLocaleString('en-US')}`;
  }

  function summaryCard(label, value, formatter, suffix = '/yr') {
    return `<div class="fit-card"><strong>${label}</strong><span>${formatter(value)}${suffix}</span></div>`;
  }

  function computePublicRevenue(assumptions) {
    const domesticPool = assumptions.globalAiValue * usDomesticShare;
    const foreignPool = Math.max(0, assumptions.globalAiValue - domesticPool);
    const domesticCapture = assumptions.protectionism ? 1 : assumptions.globalCapture;
    const capturedAiValue = domesticPool * domesticCapture + foreignPool * assumptions.globalCapture;
    const profits = capturedAiValue * assumptions.margin;
    const publicRevenue = profits * assumptions.govCapture;
    return { domesticPool, foreignPool, capturedAiValue, profits, publicRevenue };
  }

  function render() {
    const assumptions = {
      globalAiValue: Number(controls.globalAiValue.value),
      globalCapture: Number(controls.globalCapture.value) / 100,
      protectionism: controls.protectionism.checked,
      margin: Number(controls.margin.value) / 100,
      govCapture: Number(controls.govCapture.value) / 100
    };

    outputs.globalAiValue.value = `$${Number(controls.globalAiValue.value).toFixed(1)}T`;
    outputs.globalCapture.value = `${controls.globalCapture.value}%`;
    outputs.protectionism.value = assumptions.protectionism ? 'on' : 'off';
    outputs.margin.value = `${controls.margin.value}%`;
    outputs.govCapture.value = `${controls.govCapture.value}%`;

    const modeled = computePublicRevenue(assumptions);
    const publicRevenue = modeled.publicRevenue;
    const rescueDelta = publicRevenue - rescueRevenue;
    const aiSpendPerCapita = (modeled.capturedAiValue * 1_000_000_000_000) / usPopulation;
    const aiSpendPerWorker = (modeled.capturedAiValue * 1_000_000_000_000) / usLaborForce;
    aiEli5.innerHTML = `<strong>Plain-English assumption</strong><span>${aiScenarios[activeAiScenario].eli5}</span>`;

    summary.innerHTML = [
      summaryCard('Rescue revenue line', rescueRevenue, formatTrillions),
      summaryCard('Modeled public revenue', publicRevenue, formatTrillions),
      summaryCard('AI spend per capita', aiSpendPerCapita, formatDollars, '/person/yr'),
      summaryCard('AI spend per worker', aiSpendPerWorker, formatDollars, '/worker/yr'),
      summaryCard('U.S.-captured AI value', modeled.capturedAiValue, formatTrillions),
      summaryCard('AI corporate profits', modeled.profits, formatTrillions)
    ].join('');

    const traces = [
      {
        x: [publicRevenue],
        y: ['Public revenue'],
        type: 'bar',
        orientation: 'h',
        name: 'Annual public revenue from AI profits',
        xaxis: 'x',
        yaxis: 'y',
        marker: { color: '#3498db' },
        text: [`${formatTrillions(publicRevenue)}/yr (${formatSignedTrillions(rescueDelta)} vs rescue)`],
        textposition: 'inside',
        insidetextanchor: 'end',
        textfont: { color: '#f5f5f5' },
        cliponaxis: false,
        hoverinfo: 'skip',
        showlegend: false
      },
      {
        x: [aiSpendPerCapita],
        y: ['Per capita'],
        type: 'bar',
        orientation: 'h',
        name: 'AI spend per U.S. resident',
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: '#2ecc71' },
        text: [`${formatDollars(aiSpendPerCapita)}/person/yr`],
        textposition: 'inside',
        insidetextanchor: 'end',
        textfont: { color: '#f5f5f5' },
        cliponaxis: false,
        hoverinfo: 'skip',
        showlegend: false
      },
      {
        x: [aiSpendPerWorker],
        y: ['Per worker'],
        type: 'bar',
        orientation: 'h',
        name: 'AI spend per U.S. worker',
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: '#9b59b6' },
        text: [`${formatDollars(aiSpendPerWorker)}/worker/yr`],
        textposition: 'inside',
        insidetextanchor: 'end',
        textfont: { color: '#f5f5f5' },
        cliponaxis: false,
        hoverinfo: 'skip',
        showlegend: false
      }
    ];

    const layout = {
      title: {
        text: 'AI Capture: Public Revenue and Implied Spend',
        font: { color: '#f5f5f5', size: 18 }
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#d4d4d8' },
      margin: { l: 116, r: 96, t: 56, b: 38 },
      height: 340,
      xaxis: {
        domain: [0, 1],
        anchor: 'y',
        tickprefix: '$',
        ticksuffix: 'T',
        range: [0, Math.max(rescueRevenue * 1.25, publicRevenue * 1.45, 0.25)],
        gridcolor: 'rgba(255,255,255,0.10)',
        zerolinecolor: 'rgba(255,255,255,0.18)'
      },
      yaxis: {
        domain: [0.60, 1],
        anchor: 'x',
        automargin: true,
        gridcolor: 'rgba(255,255,255,0)',
        zerolinecolor: 'rgba(255,255,255,0)'
      },
      xaxis2: {
        domain: [0, 1],
        anchor: 'y2',
        tickprefix: '$',
        range: [0, Math.max(aiSpendPerCapita * 1.45, aiSpendPerWorker * 1.45, 1000)],
        gridcolor: 'rgba(255,255,255,0.10)',
        zerolinecolor: 'rgba(255,255,255,0.18)'
      },
      yaxis2: {
        domain: [0, 0.42],
        anchor: 'x2',
        automargin: true,
        gridcolor: 'rgba(255,255,255,0)',
        zerolinecolor: 'rgba(255,255,255,0)'
      },
      shapes: [
        {
          type: 'line',
          xref: 'x',
          x0: rescueRevenue,
          x1: rescueRevenue,
          yref: 'paper',
          y0: 0.60,
          y1: 1,
          line: { color: '#f39c12', width: 2, dash: 'dash' }
        }
      ],
      annotations: [
        {
          xref: 'x',
          x: rescueRevenue,
          yref: 'paper',
          y: 1,
          xanchor: 'right',
          yanchor: 'bottom',
          xshift: -6,
          text: `rescue revenue: ${formatTrillions(rescueRevenue)}/yr`,
          showarrow: false,
          font: { color: '#f5f5f5', size: 12 },
          bgcolor: 'rgba(31, 41, 51, 0.85)',
          bordercolor: 'rgba(255,255,255,0.16)',
          borderpad: 4
        }
      ],
      hovermode: false
    };

    Plotly.react(chart, traces, layout, { responsive: true, displayModeBar: false });
  }

  Object.values(controls).forEach((control) => {
    control.addEventListener('input', render);
    control.addEventListener('change', render);
  });
  scenarioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeAiScenario = button.dataset.aiScenario;
      const scenario = aiScenarios[activeAiScenario];
      controls.globalAiValue.value = scenario.globalAiValue;
      controls.globalCapture.value = scenario.globalCapture;
      controls.protectionism.checked = scenario.protectionism;
      controls.margin.value = scenario.margin;
      controls.govCapture.value = scenario.govCapture;
      scenarioButtons.forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
      render();
    });
  });
  window.addEventListener('fiscal-rescue-revenue-updated', (event) => {
    rescueRevenue = event.detail.rescueRevenue;
    render();
  });
  render();
})();
