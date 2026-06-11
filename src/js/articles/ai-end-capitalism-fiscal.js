(() => {
  const panel = document.querySelector('[data-fiscal-chart]');
  if (!panel || typeof Plotly === 'undefined') return;

  const revenueInterestChart = panel.querySelector('#net-interest-revenue-chart');
  const debtChart = panel.querySelector('#debt-chart');
  const note = panel.querySelector('[data-scenario-note]');
  const eli5 = panel.querySelector('[data-eli5]');
  const fitSummary = panel.querySelector('[data-fit-summary]');
  const burdenSummary = panel.querySelector('[data-burden-summary]');
  const buttons = [...panel.querySelectorAll('[data-scenario]')];
  const revenueMeanInput = panel.querySelector('[data-control="revenueMean"]');
  const rateMeanInput = panel.querySelector('[data-control="rateMean"]');
  const primaryDeficitInput = panel.querySelector('[data-control="primaryDeficit"]');
  const revenueSigmaInput = panel.querySelector('[data-control="revenueSigma"]');
  const rateSigmaInput = panel.querySelector('[data-control="rateSigma"]');
  const revenueMeanOutput = panel.querySelector('[data-output="revenueMean"]');
  const rateMeanOutput = panel.querySelector('[data-output="rateMean"]');
  const primaryDeficitOutput = panel.querySelector('[data-output="primaryDeficit"]');
  const revenueSigmaOutput = panel.querySelector('[data-output="revenueSigma"]');
  const rateSigmaOutput = panel.querySelector('[data-output="rateSigma"]');

  const years = Array.from({ length: 32 }, (_, index) => 2025 + index);
  const simulationCount = 500;

  const cbo = {
    revenue: [
      [2025, 5.236],
      [2026, 5.6],
      [2027, 5.9],
      [2028, 6.1],
      [2036, 8.3],
      [2046, 12.4],
      [2056, 18.0]
    ],
    debt: [
      [2025, 31.0],
      [2026, 32.1],
      [2036, 56.0],
      [2046, 97.6],
      [2056, 167.5]
    ],
    deficit: [
      [2025, 1.8],
      [2026, 1.9],
      [2036, 3.1],
      [2046, 5.2],
      [2056, 8.7]
    ],
    interest: [
      [2025, 0.970],
      [2026, 1.0],
      [2036, 2.1],
      [2046, 3.9],
      [2056, 6.6]
    ]
  };

  const scenarios = {
    official: {
      label: 'CBO-centered prior',
      seed: 1101,
      revenueGrowthShift: 0,
      rateShift: 0,
      primaryDeficitMultiplier: 1,
      eli5Title: 'Plain-English assumption',
      eli5: 'This is the boring-but-important case. The economy keeps growing at a modest nominal pace, tax revenue rises with wages, profits, inflation, and bracket creep, and interest rates settle into a world that is higher than the 2010s but not a panic. Congress still runs primary deficits, so debt keeps rising even without a crisis.',
      note: 'CBO-centered prior: year-over-year revenue growth is centered on the CBO revenue path, while effective interest rates are centered on the CBO-implied net-interest/debt path.'
    },
    optimistic: {
      label: 'Growth-biased prior',
      seed: 2202,
      revenueGrowthShift: 0.0035,
      rateShift: -0.0025,
      primaryDeficitMultiplier: 0.85,
      eli5Title: 'Plain-English assumption',
      eli5: 'This is the “growth bails us out somewhat” case. AI/productivity makes workers and firms more productive, taxable wages and profits come in stronger, and markets are less worried about lending to the Treasury. Faster growth also makes the deficit easier to manage, so the model assumes somewhat smaller non-interest deficits.',
      note: 'Growth-biased prior: revenue growth is biased upward and interest rates/primary deficits downward, reflecting productivity-upside sensitivity where faster productivity growth raises GDP and lowers debt pressure.'
    },
    pessimistic: {
      label: 'Rate-stress prior',
      seed: 3303,
      revenueGrowthShift: -0.0025,
      rateShift: 0.006,
      primaryDeficitMultiplier: 1.12,
      eli5Title: 'Plain-English assumption',
      eli5: 'This is the “fiscal squeeze gets worse” case. Growth disappoints, tax receipts lag, temporary tax cuts or spending programs are extended, and investors demand a higher return to hold Treasuries. The government borrows more at higher rates, so interest payments compound faster and leave less revenue for everything else.',
      note: 'Rate-stress prior: revenue growth is biased lower and interest rates/primary deficits higher, reflecting downside fiscal-risk framing where debt rises faster if tariff revenue falls and temporary policies are extended.'
    }
  };

  let activeScenario = 'official';

  function interpolate(points, year) {
    const sorted = [...points].sort((a, b) => a[0] - b[0]);
    if (year <= sorted[0][0]) return sorted[0][1];
    if (year >= sorted[sorted.length - 1][0]) return sorted[sorted.length - 1][1];

    for (let index = 0; index < sorted.length - 1; index++) {
      const [startYear, startValue] = sorted[index];
      const [endYear, endValue] = sorted[index + 1];
      if (year >= startYear && year <= endYear) {
        const span = endYear - startYear;
        const progress = (year - startYear) / span;
        return startValue + (endValue - startValue) * progress;
      }
    }

    return sorted[sorted.length - 1][1];
  }

  function getBaselineSeries(points) {
    return years.map((year) => interpolate(points, year));
  }

  function mulberry32(seed) {
    return function random() {
      let value = seed += 0x6D2B79F5;
      value = Math.imul(value ^ value >>> 15, value | 1);
      value ^= value + Math.imul(value ^ value >>> 7, value | 61);
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
  }

  function normal(random) {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = Math.max(random(), Number.EPSILON);
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  function percentile(values, probability) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (sorted.length - 1) * probability;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  }

  function summarize(paths) {
    return years.map((_, yearIndex) => {
      const values = paths.map((path) => path[yearIndex]);
      return {
        p10: percentile(values, 0.10),
        p50: percentile(values, 0.50),
        p90: percentile(values, 0.90)
      };
    });
  }

  function simulate(scenario, assumptions) {
    const baselineRevenue = getBaselineSeries(cbo.revenue);
    const baselineDebt = getBaselineSeries(cbo.debt);
    const baselineDeficit = getBaselineSeries(cbo.deficit);
    const baselineInterest = getBaselineSeries(cbo.interest);
    const baselineRevenueGrowth = baselineRevenue.map((value, index) => {
      if (index === 0) return 0;
      return value / baselineRevenue[index - 1] - 1;
    });
    const baselineRate = baselineInterest.map((value, index) => {
      const priorDebt = index === 0 ? baselineDebt[index] : baselineDebt[index - 1];
      return value / priorDebt;
    });
    const baselinePrimaryDeficit = baselineDeficit.map((value, index) => {
      return Math.max(0, value - baselineInterest[index]) * assumptions.primaryDeficitMultiplier;
    });

    const revenuePaths = [];
    const interestPaths = [];
    const netRevenueAfterInterestPaths = [];
    const debtPaths = [];
    const rescueRevenueValues = [];
    const rescueYearIndex = years.indexOf(2036);
    const rescueStartIndex = years.indexOf(2026);

    for (let simulation = 0; simulation < simulationCount; simulation++) {
      const random = mulberry32(
        scenario.seed +
        simulation * 7919 +
        Math.round(assumptions.revenueSigma * 10000) * 17 +
        Math.round(assumptions.rateSigma * 10000) * 31 +
        Math.round(assumptions.revenueGrowthShift * 10000) * 43 +
        Math.round(assumptions.rateShift * 10000) * 59
      );
      const revenuePath = [baselineRevenue[0]];
      const interestPath = [baselineInterest[0]];
      const debtPath = [baselineDebt[0]];

      for (let index = 1; index < years.length; index++) {
        const revenueGrowth = Math.max(
          -0.08,
          baselineRevenueGrowth[index] + assumptions.revenueGrowthShift + normal(random) * assumptions.revenueSigma
        );
        const rate = Math.max(
          0.005,
          baselineRate[index] + assumptions.rateShift + normal(random) * assumptions.rateSigma
        );
        const priorDebt = debtPath[index - 1];
        const netInterest = priorDebt * rate;
        const primaryDeficit = baselinePrimaryDeficit[index];

        revenuePath.push(revenuePath[index - 1] * (1 + revenueGrowth));
        interestPath.push(netInterest);
        debtPath.push(priorDebt + primaryDeficit + netInterest);
      }

      revenuePaths.push(revenuePath);
      interestPaths.push(interestPath);
      netRevenueAfterInterestPaths.push(revenuePath.map((revenue, index) => revenue - interestPath[index]));
      debtPaths.push(debtPath);

      if (rescueYearIndex > 0 && rescueStartIndex >= 0) {
        const rescueSpan = years[rescueYearIndex] - years[rescueStartIndex];
        const revenueGrowth = (revenuePath[rescueYearIndex] / revenuePath[rescueStartIndex]) ** (1 / rescueSpan) - 1;
        const priorDebt = debtPath[rescueYearIndex - 1];
        const actualDeficit = debtPath[rescueYearIndex] - priorDebt;
        rescueRevenueValues.push(Math.max(0, actualDeficit - priorDebt * revenueGrowth));
      }
    }

    return {
      revenue: summarize(revenuePaths),
      interest: summarize(interestPaths),
      netRevenueAfterInterest: summarize(netRevenueAfterInterestPaths),
      debt: summarize(debtPaths),
      rescueRevenue: {
        p10: percentile(rescueRevenueValues, 0.10),
        p50: percentile(rescueRevenueValues, 0.50),
        p90: percentile(rescueRevenueValues, 0.90)
      }
    };
  }

  function formatTrillions(value) {
    return `$${value.toFixed(2)}T`;
  }

  function medianSeries(summary) {
    return summary.map((point) => point.p50);
  }

  function fitExponentialGrowth(values) {
    const points = values
      .map((value, index) => ({ x: index, y: value }))
      .filter((point) => point.y > 0);

    if (points.length < 2) return null;

    const meanX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
    const meanLogY = points.reduce((sum, point) => sum + Math.log(point.y), 0) / points.length;
    const numerator = points.reduce((sum, point) => sum + (point.x - meanX) * (Math.log(point.y) - meanLogY), 0);
    const denominator = points.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
    if (denominator === 0) return null;

    const slope = numerator / denominator;
    return Math.exp(slope) - 1;
  }

  function formatGrowthRate(rate) {
    if (rate === null || !Number.isFinite(rate)) return 'n/a';
    return `${rate >= 0 ? '+' : ''}${(rate * 100).toFixed(1)}%/yr`;
  }

  function updateFitSummary(simulation) {
    const fits = [
      ['Federal revenue', simulation.revenue],
      ['Net interest', simulation.interest],
      ['Revenue after interest', simulation.netRevenueAfterInterest],
      ['Federal debt', simulation.debt]
    ];

    fitSummary.innerHTML = fits.map(([label, summary]) => {
      const rate = fitExponentialGrowth(medianSeries(summary));
      return `<div class="fit-card"><strong>${label}</strong><span>exp. fit ${formatGrowthRate(rate)}</span></div>`;
    }).join('');
  }

  function firstCrossingYear(ratios, threshold) {
    const index = ratios.findIndex((ratio) => ratio >= threshold);
    return index === -1 ? null : years[index];
  }

  function updateBurdenSummary(simulation) {
    const revenue = medianSeries(simulation.revenue);
    const interest = medianSeries(simulation.interest);
    const ratios = interest.map((value, index) => value / revenue[index]);
    const thresholds = [
      {
        level: 0.20,
        label: '20% of revenue',
        meaning: 'The budget is already paying a major program-sized bill before buying any current services.'
      },
      {
        level: 0.25,
        label: '25% of revenue',
        meaning: 'One dollar in four goes to interest. This is where tax hikes, cuts, or inflation pressure get harder to avoid.'
      },
      {
        level: 0.30,
        label: '30% of revenue',
        meaning: 'Debt service starts dominating fiscal politics; normal budget fights happen under a much tighter ceiling.'
      },
      {
        level: 0.35,
        label: '35% of revenue',
        meaning: 'This is a stress regime: the government needs unusually good growth, restraint, or financial repression to keep control.'
      }
    ];

    burdenSummary.innerHTML = thresholds.map((threshold) => {
      const year = firstCrossingYear(ratios, threshold.level);
      const timeframe = year === null ? 'not by 2056' : year <= 2030 ? `${year} (near term)` : year <= 2036 ? `${year} (medium term)` : `${year} (longer term)`;
      return `<div class="burden-card"><strong>${threshold.label}</strong><span>${timeframe}</span><em>${threshold.meaning}</em></div>`;
    }).join('');
  }

  function bandTraces(name, summary, color) {
    const p10 = summary.map((point) => point.p10);
    const p50 = summary.map((point) => point.p50);
    const p90 = summary.map((point) => point.p90);
    return [
      {
        x: years,
        y: p90,
        name: `${name} p90`,
        type: 'scatter',
        mode: 'lines',
        line: { width: 0 },
        hoverinfo: 'skip',
        showlegend: false
      },
      {
        x: years,
        y: p10,
        name: `${name} 80% prior interval`,
        type: 'scatter',
        mode: 'lines',
        line: { width: 0 },
        fill: 'tonexty',
        fillcolor: color.band,
        hoverinfo: 'skip'
      },
      {
        x: years,
        y: p50,
        name: `${name} median`,
        type: 'scatter',
        mode: 'lines',
        line: { color: color.line, width: 2, dash: 'dash' },
        customdata: p50.map(formatTrillions),
        hoverinfo: 'skip'
      }
    ];
  }

  function baseLayout(title) {
    return {
      title: {
        text: title,
        font: { color: '#f5f5f5', size: 18 }
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#d4d4d8' },
      margin: { l: 62, r: 20, t: 58, b: 74 },
      xaxis: {
        title: 'Fiscal year',
        gridcolor: 'rgba(255,255,255,0.10)',
        zerolinecolor: 'rgba(255,255,255,0.18)'
      },
      yaxis: {
        title: 'Trillions of dollars',
        tickprefix: '$',
        ticksuffix: 'T',
        gridcolor: 'rgba(255,255,255,0.10)',
        zerolinecolor: 'rgba(255,255,255,0.18)'
      },
      legend: {
        orientation: 'h',
        x: 0,
        y: -0.22,
        font: { color: '#d4d4d8' }
      },
      hovermode: false
    };
  }

  function render() {
    const scenario = scenarios[activeScenario];
    const assumptions = {
      revenueGrowthShift: Number(revenueMeanInput.value) / 100,
      rateShift: Number(rateMeanInput.value) / 100,
      primaryDeficitMultiplier: Number(primaryDeficitInput.value),
      revenueSigma: Number(revenueSigmaInput.value) / 100,
      rateSigma: Number(rateSigmaInput.value) / 100
    };
    const simulation = simulate(scenario, assumptions);

    revenueMeanOutput.value = `${Number(revenueMeanInput.value) >= 0 ? '+' : ''}${Number(revenueMeanInput.value).toFixed(1)}pp`;
    rateMeanOutput.value = `${Number(rateMeanInput.value) >= 0 ? '+' : ''}${Number(rateMeanInput.value).toFixed(1)}pp`;
    primaryDeficitOutput.value = `${Number(primaryDeficitInput.value).toFixed(2)}x`;
    revenueSigmaOutput.value = `${revenueSigmaInput.value}pp`;
    rateSigmaOutput.value = `${rateSigmaInput.value}pp`;
    eli5.innerHTML = `<strong>${scenario.eli5Title}</strong><span>${scenario.eli5}</span>`;
    note.textContent = scenario.note;
    updateFitSummary(simulation);
    updateBurdenSummary(simulation);
    window.currentFiscalRescueRevenue = simulation.rescueRevenue.p50;
    window.dispatchEvent(new CustomEvent('fiscal-rescue-revenue-updated', {
      detail: {
        rescueRevenue: simulation.rescueRevenue.p50,
        scenario: scenario.label
      }
    }));

    const traces = [
      ...bandTraces('Federal revenue', simulation.revenue, { line: '#2ecc71', band: 'rgba(46, 204, 113, 0.16)' }),
      ...bandTraces('Net interest', simulation.interest, { line: '#e74c3c', band: 'rgba(231, 76, 60, 0.16)' }),
      ...bandTraces('Revenue after interest', simulation.netRevenueAfterInterest, { line: '#3498db', band: 'rgba(52, 152, 219, 0.14)' })
    ];

    Plotly.react(revenueInterestChart, traces, baseLayout(`${scenario.label}: revenue and interest priors`), {
      responsive: true,
      displayModeBar: false
    });

    Plotly.react(
      debtChart,
      bandTraces('Federal debt', simulation.debt, { line: '#f39c12', band: 'rgba(243, 156, 18, 0.18)' }),
      baseLayout(`${scenario.label}: debt prior`),
      { responsive: true, displayModeBar: false }
    );
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      activeScenario = button.dataset.scenario;
      const scenario = scenarios[activeScenario];
      revenueMeanInput.value = (scenario.revenueGrowthShift * 100).toFixed(1);
      rateMeanInput.value = (scenario.rateShift * 100).toFixed(1);
      primaryDeficitInput.value = scenario.primaryDeficitMultiplier.toFixed(2);
      buttons.forEach((candidate) => candidate.classList.toggle('is-active', candidate === button));
      render();
    });
  });

  revenueMeanInput.addEventListener('input', render);
  rateMeanInput.addEventListener('input', render);
  primaryDeficitInput.addEventListener('input', render);
  revenueSigmaInput.addEventListener('input', render);
  rateSigmaInput.addEventListener('input', render);
  render();
})();
