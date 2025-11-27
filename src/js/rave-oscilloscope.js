(function () {
  const TAU = Math.PI * 2;
  const BASE_DIMENSION = 600;
  const CONFIG = {
    samples: 960,
    tauMs: 120,
    blurPx: 0.0,
    lineWidth: 1.5,
    trailStrength: 1.0,
    trailSpacing: 1.0,
    radiusPx: 160,
    amplitudePx: 80,
    phi: 0.2,
    signalPreset: 'beats',
    signalFreq: 0.5,
    distributed: true,
    lobes: 6,
    freqSpread: 0.6,
    phaseJitter: 1.2,
    usePalette: true,
    colors: ['#A64DFF', '#00FF9D', '#F3C623'],
    paletteRotate: 0.5,
    paletteSharpness: 0.15,
    hueSpeed: 100,
    angleHueMix: 180,
    hueResp: 30,
    satBase: 1.0,
    valBase: 0.10,
    satResp: 0.05,
    valResp: 0.05
  };

  const paletteSampler = createPaletteSampler(CONFIG.colors, CONFIG.paletteRotate, CONFIG.paletteSharpness);
  const baseSignal = createBaseSignal(CONFIG.signalPreset, CONFIG.signalFreq);
  const trailWeights = createTrailWeights(CONFIG.trailStrength);

  function init() {
    const canvas = document.getElementById('rave-oscilloscope');
    if (!canvas || canvas.dataset.initialized) return;
    canvas.dataset.initialized = 'true';

    const viewCtx = canvas.getContext('2d', { alpha: true });
    const persist = document.createElement('canvas');
    const tmp = document.createElement('canvas');
    const persistCtx = persist.getContext('2d', { alpha: true });
    const tmpCtx = tmp.getContext('2d', { alpha: true });

    // Size to hero container, not canvas element (like trefoil animation)
    const container = document.querySelector('.hero-container');

    const state = {
      width: container ? container.clientWidth : 720,
      height: container ? container.clientHeight : 720,
      dpr: Math.min(2, window.devicePixelRatio || 1),
      sampleCount: CONFIG.samples,
      angles: new Float32Array(CONFIG.samples)
    };
    fillAngles(state.angles);
    let angleTables = createAngleTables(state.sampleCount, CONFIG.lobes, CONFIG.freqSpread, CONFIG.phaseJitter);

    let raf = 0;
    let last = performance.now();
    const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let prefersReduced = mediaQuery ? mediaQuery.matches : false;

    if (mediaQuery) {
      const onChange = (event) => {
        prefersReduced = event.matches;
        if (!prefersReduced && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', onChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(onChange);
      }
    }

    // Use ResizeObserver on container, not canvas
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(handleResize)
      : null;

    if (resizeObserver && container) {
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    handleResize();

    function handleResize() {
      // Size to hero container like trefoil animation
      const rect = container ? container.getBoundingClientRect() : canvas.getBoundingClientRect();
      state.width = Math.max(320, rect.width || state.width);
      state.height = Math.max(280, rect.height || state.height);
      state.dpr = Math.min(2, window.devicePixelRatio || 1);

      resizeCanvas(canvas, viewCtx, state.width, state.height, state.dpr);
      resizeCanvas(persist, persistCtx, state.width, state.height, state.dpr);
      resizeCanvas(tmp, tmpCtx, state.width, state.height, state.dpr);
      clearCanvas(persistCtx);
      clearCanvas(tmpCtx);
      rebuildSamples();
    }

    function rebuildSamples() {
      const minDim = Math.min(state.width, state.height);
      const scale = clamp(minDim / 520, 0.8, 1.6);
      const target = Math.max(240, Math.round(CONFIG.samples * scale));
      if (target !== state.sampleCount) {
        state.sampleCount = target;
        state.angles = new Float32Array(target);
        fillAngles(state.angles);
        angleTables = createAngleTables(target, CONFIG.lobes, CONFIG.freqSpread, CONFIG.phaseJitter);
      }
    }

    function frame(now) {
      const dt = Math.min(0.08, Math.max(0, now - last) / 1000);
      last = now;

      const width = state.width;
      const height = state.height;
      const minDim = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = clamp(minDim / BASE_DIMENSION, 0.5, 1.6);
      const radius = CONFIG.radiusPx * scale;
      const amplitude = CONFIG.amplitudePx * scale;
      const lineWidth = CONFIG.lineWidth * clamp(minDim / BASE_DIMENSION, 0.75, 1.35);
      const spacing = CONFIG.trailSpacing * clamp(minDim / BASE_DIMENSION, 0.8, 1.3);

      const tauSeconds = Math.max(0.05, CONFIG.tauMs) / 1000;
      const gamma = Math.exp(-dt / tauSeconds);

      persistCtx.save();
      persistCtx.globalCompositeOperation = 'destination-out';
      persistCtx.globalAlpha = 1 - gamma;
      persistCtx.fillRect(0, 0, width, height);
      persistCtx.restore();

      persistCtx.save();
      persistCtx.globalCompositeOperation = 'lighter';
      persistCtx.lineWidth = lineWidth;
      persistCtx.lineCap = 'round';
      persistCtx.lineJoin = 'round';

      const timeSec = now / 1000;
      const sampleCount = state.sampleCount;
      const angles = state.angles;

      for (let i = 0; i < sampleCount; i++) {
        const u = i / sampleCount;
        const theta = angles[i];
        const value = CONFIG.distributed
          ? distributedSample(i, u, timeSec)
          : baseSignal(timeSec + CONFIG.phi * u);

        const nextIndex = (i + 1) % sampleCount;
        const nextU = nextIndex / sampleCount;
        const nextTheta = angles[nextIndex];
        const nextValue = CONFIG.distributed
          ? distributedSample(nextIndex, nextU, timeSec)
          : baseSignal(timeSec + CONFIG.phi * nextU);

        const currentRadius = Math.max(1, radius + amplitude * value);
        const nextRadius = Math.max(1, radius + amplitude * nextValue);

        const cx = centerX + currentRadius * Math.cos(theta);
        const cy = centerY + currentRadius * Math.sin(theta);
        const nx = centerX + nextRadius * Math.cos(nextTheta);
        const ny = centerY + nextRadius * Math.sin(nextTheta);

        const rgb = colorForValue(u, value, timeSec);
        persistCtx.strokeStyle = rgbToCss(rgb, 0.96);
        persistCtx.beginPath();
        persistCtx.moveTo(cx, cy);
        persistCtx.lineTo(nx, ny);
        persistCtx.stroke();

        if (trailWeights.primary > 0.001) {
          const tangentX = -Math.sin(theta);
          const tangentY = Math.cos(theta);
          for (let k = 0; k < trailWeights.values.length; k++) {
            const w = trailWeights.values[k];
            if (w <= 0) continue;
            const offset = (k + 1) * spacing;
            persistCtx.strokeStyle = rgbToCss(rgb, 0.45 * w);
            persistCtx.beginPath();
            persistCtx.moveTo(cx - tangentX * offset, cy - tangentY * offset);
            persistCtx.lineTo(nx - tangentX * offset, ny - tangentY * offset);
            persistCtx.stroke();
          }
        }
      }

      persistCtx.restore();

      if (CONFIG.blurPx > 0.05) {
        withIdentity(tmpCtx, () => {
          tmpCtx.clearRect(0, 0, tmp.width, tmp.height);
          tmpCtx.filter = `blur(${CONFIG.blurPx * state.dpr}px)`;
          tmpCtx.drawImage(persist, 0, 0);
          tmpCtx.filter = 'none';
        });
        withIdentity(persistCtx, () => {
          persistCtx.globalCompositeOperation = 'lighter';
          persistCtx.globalAlpha = 0.7;
          persistCtx.drawImage(tmp, 0, 0);
          persistCtx.globalAlpha = 1;
        });
      }

      withIdentity(viewCtx, () => {
        viewCtx.clearRect(0, 0, canvas.width, canvas.height);
        viewCtx.drawImage(persist, 0, 0);
      });

      if (!prefersReduced) {
        raf = requestAnimationFrame(frame);
      }
    }

    function distributedSample(index, u, timeSec) {
      const freqMul = angleTables.freqMul[index];
      const phase = angleTables.phaseOff[index];
      const effectiveTime = timeSec + CONFIG.phi * u;
      const freq = Math.max(0.02, CONFIG.signalFreq * freqMul);
      return Math.sin(TAU * freq * effectiveTime + phase);
    }

    function colorForValue(u, value, timeSec) {
      if (CONFIG.usePalette) {
        const base = paletteSampler(u, timeSec);
        const sat = clamp01(CONFIG.satBase + CONFIG.satResp * Math.abs(value));
        const val = clamp01(CONFIG.valBase + CONFIG.valResp * Math.abs(value));
        const gray = (base[0] + base[1] + base[2]) / 3;
        const tinted = [
          gray + (base[0] - gray) * sat,
          gray + (base[1] - gray) * sat,
          gray + (base[2] - gray) * sat
        ];
        return [tinted[0] * val, tinted[1] * val, tinted[2] * val];
      }
      const hue = (CONFIG.hueSpeed * timeSec) + (CONFIG.angleHueMix * u) + (CONFIG.hueResp * value);
      const sat = clamp01(CONFIG.satBase + CONFIG.satResp * Math.abs(value));
      const val = clamp01(CONFIG.valBase + CONFIG.valResp * Math.abs(value));
      return hsvToRgb(hue, sat, val);
    }

    if (prefersReduced) {
      frame(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!prefersReduced && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
  }

  function resizeCanvas(canvas, ctx, width, height, dpr) {
    canvas.width = Math.max(2, Math.floor(width * dpr));
    canvas.height = Math.max(2, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function withIdentity(ctx, fn) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    try {
      fn();
    } finally {
      ctx.restore();
    }
  }

  function clearCanvas(ctx) {
    withIdentity(ctx, () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
  }

  function createTrailWeights(strength) {
    const primary = clamp01(strength);
    return {
      primary,
      values: [primary * 0.6, primary * 0.3, primary * 0.12]
    };
  }

  function createAngleTables(count, lobes, spread, jitter) {
    const freqMul = new Float32Array(count);
    const phaseOff = new Float32Array(count);
    const rand = (i) => {
      const x = Math.sin(1000 + i * 1.234567) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < count; i++) {
      const u = i / count;
      const lobed = Math.sin(TAU * lobes * u);
      freqMul[i] = Math.max(0.05, 1 + spread * lobed);
      phaseOff[i] = (rand(i) - 0.5) * 2 * jitter;
    }
    return { freqMul, phaseOff };
  }

  function createBaseSignal(preset, freq) {
    switch (preset) {
      case 'simple':
        return (t) => Math.sin(TAU * freq * t);
      case 'fm':
        return (t) => Math.sin(TAU * freq * t + 1.2 * Math.sin(TAU * 0.33 * t));
      case 'beats':
        return (t) => 0.6 * Math.sin(TAU * (freq - 0.15) * t) + 0.6 * Math.sin(TAU * (freq + 0.15) * t);
      case 'chords':
      default:
        return (t) => {
          const a = 0.6 * Math.sin(TAU * freq * t);
          const b = 0.35 * Math.sin(TAU * freq * 1.618 * t + 0.7);
          const c = 0.25 * Math.sin(TAU * freq * 2.0 * t + 1.1);
          return a + b + c;
        };
    }
  }

  function createPaletteSampler(colors, rotate, sharpness) {
    const rgb = colors.map(hexToRgb01);
    return (u, time) => {
      const rot = (rotate * time) % 1;
      const uu = (u + rot + 1) % 1;
      const anchors = [0, 1 / 3, 2 / 3];
      const width = 0.333 * (1 - 0.85 * sharpness) + 0.06;

      const weights = anchors.map((anchor) => {
        const dist = Math.min(Math.abs(uu - anchor), 1 - Math.abs(uu - anchor));
        const t = clamp01(1 - dist / width);
        return t * t * (3 - 2 * t);
      });
      const sum = weights.reduce((acc, val) => acc + val, 1e-6);
      const normalized = weights.map((w) => w / sum);

      const color = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        color[0] += normalized[i] * rgb[i][0];
        color[1] += normalized[i] * rgb[i][1];
        color[2] += normalized[i] * rgb[i][2];
      }
      return color;
    };
  }

  function fillAngles(buffer) {
    const len = buffer.length;
    for (let i = 0; i < len; i++) {
      buffer[i] = (i / len) * TAU;
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function clamp01(value) {
    return clamp(value, 0, 1);
  }

  function hexToRgb01(hex) {
    const clean = hex.replace('#', '');
    const value = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
    const r = parseInt(value.slice(0, 2), 16) / 255;
    const g = parseInt(value.slice(2, 4), 16) / 255;
    const b = parseInt(value.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  function rgbToCss([r, g, b], alpha = 1) {
    const R = Math.round(255 * clamp01(r));
    const G = Math.round(255 * clamp01(g));
    const B = Math.round(255 * clamp01(b));
    return `rgba(${R}, ${G}, ${B}, ${alpha})`;
  }

  function hsvToRgb(h, s, v) {
    h = ((h % 360) + 360) % 360;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let rp = 0, gp = 0, bp = 0;

    if (h < 60) [rp, gp, bp] = [c, x, 0];
    else if (h < 120) [rp, gp, bp] = [x, c, 0];
    else if (h < 180) [rp, gp, bp] = [0, c, x];
    else if (h < 240) [rp, gp, bp] = [0, x, c];
    else if (h < 300) [rp, gp, bp] = [x, 0, c];
    else [rp, gp, bp] = [c, 0, x];

    return [rp + m, gp + m, bp + m];
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
