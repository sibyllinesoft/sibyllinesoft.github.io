(function(){
  const canvas = document.getElementById('neural-network');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d', { alpha: true });

  // Trail buffers
  const trailBlue = document.createElement('canvas');
  const trailRed  = document.createElement('canvas');
  const tctxBlue  = trailBlue.getContext('2d', { alpha: true });
  const tctxRed   = trailRed.getContext('2d',  { alpha: true });

  // Config
  const CONFIG = {
    circleBaseRadius: 64,
    strokeWidth: 1.6,
    baseAlpha: 0.045,
    highlightAlpha: 0.36,
    glow: 8,
    expandMs: 1600,
    holdMs:   200,
    contractMs: 1200,
    channels: {
      blue: { hue: 210, sat: 0.5, light: 0.66, trailDecay: 0.75 },
      red:  { hue:   8,  sat: 0.5, light: 0.60, trailDecay: 0.75 }
    },
    globalOpacity: 0.5,
    effects: { hueDrift: true, subRipples: true },
    params: {
      hueDriftDeg: 20,
      hueDriftHz: 0.094,
      rippleAmpPx: 0.9,
      rippleHz: 0.9
    }
  };

  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let width=0, height=0, tStart=performance.now();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const bw = Math.floor(width*dpr), bh = Math.floor(height*dpr);
    for (const c of [canvas, trailBlue, trailRed]){ c.width = bw; c.height = bh; }
    for (const c of [ctx, tctxBlue, tctxRed]){ c.setTransform(dpr,0,0,dpr,0,0); }
    for (const cctx of [ctx, tctxBlue, tctxRed]){
      cctx.save(); cctx.setTransform(1,0,0,1,0,0); cctx.clearRect(0,0,bw,bh); cctx.restore();
    }
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  const TAU=Math.PI*2, DEG=Math.PI/180;
  const easeOutSine = x => Math.sin((x*Math.PI)/2);
  const easeInOutSine = x => -(Math.cos(Math.PI*x)-1)/2;
  const hsl = (h,s,l,a=1)=>`hsla(${h.toFixed(1)} ${(s*100).toFixed(1)}% ${(l*100).toFixed(1)}% / ${a})`;
  const lerp = (a,b,t)=> a + (b-a)*t;

  function nodeCenters(cx, cy, R){
    const pts=[{x:cx,y:cy, ring:0}];
    for(let k=0;k<6;k++){ const a=k*60*DEG; pts.push({x:cx+R*Math.cos(a), y:cy+R*Math.sin(a), ring:1}); }
    for(let k=0;k<6;k++){ const a=(30+k*60)*DEG; pts.push({x:cx+2*R*Math.cos(a), y:cy+2*R*Math.sin(a), ring:2}); }
    return pts;
  }

  const totalCycle = () => (CONFIG.expandMs + CONFIG.holdMs + CONFIG.contractMs);
  function channelPhase(nowMs, shiftMs){
    const eMs=CONFIG.expandMs, hMs=CONFIG.holdMs, cMs=CONFIG.contractMs;
    const T = eMs + hMs + cMs;
    const t = ((nowMs + shiftMs) % T + T) % T;
    if (t <= eMs)           return { mode:'expand',  k: easeOutSine(t/eMs), m:0, T };
    if (t <= eMs + hMs)     return { mode:'hold',    k: 1,                 m:0, T };
    const tt = (t - eMs - hMs)/cMs; return { mode:'contract', k:1, m: easeInOutSine(tt), T };
  }

  function ringLightness(baseL, ring){ return (ring===2) ? Math.max(0, baseL*0.75) : baseL; }

  function renderRings(targetCtx, centers, R, channelCfg, phase, cx, cy){
    let { hue, sat, light } = channelCfg;
    if (CONFIG.effects.hueDrift){ const drift = CONFIG.params.hueDriftDeg * Math.sin((performance.now()/1000)*CONFIG.params.hueDriftHz*TAU); hue=(hue+drift+360)%360; }

    const innerR = R*1.02;
    const rings=[0,1,2];

    for(const ring of rings){
      const alphaK = phase.mode==='expand' ? phase.k : (phase.mode==='hold' ? 1 : (1-Math.pow(Math.min(1,phase.m*2),3)));
      const aStroke = CONFIG.baseAlpha + CONFIG.highlightAlpha * alphaK;
      const intensity = Math.max(phase.k||0, alphaK);

      targetCtx.save();
      targetCtx.globalAlpha = CONFIG.globalOpacity;
      targetCtx.lineWidth = CONFIG.strokeWidth * (1.03 + 0.1*intensity);

      for (const p of centers){ if(p.ring!==ring) continue;
        const targetR = (ring===0?innerR:(ring===1?R:2*R));
        let cxp, cyp, rad;
        if (ring===0){ cxp=cx; cyp=cy; rad=innerR; }
        else if (phase.mode!=='contract'){ cxp=p.x; cyp=p.y; rad=lerp(0,targetR,phase.k); }
        else { cxp=lerp(p.x,cx,phase.m); cyp=lerp(p.y,cy,phase.m); rad=lerp(targetR,innerR,phase.m); }

        if (CONFIG.effects.subRipples){
          const w = CONFIG.params.rippleAmpPx * Math.sin((performance.now()/1000)*CONFIG.params.rippleHz*TAU + (ring+1));
          rad = Math.max(0, rad + w);
        }

        const ringL = ringLightness(light, ring);
        targetCtx.strokeStyle = hsl(hue, sat, ringL, Math.min(1, aStroke));
        targetCtx.shadowColor = hsl(hue, sat, Math.max(0, ringL - 0.06), 0.1*intensity);
        targetCtx.shadowBlur = CONFIG.glow * (0.4 + 0.4*intensity);

        // Draw afterimages first (2 copies at smaller sizes)
        for (let afterimage = 0; afterimage < 2; afterimage++) {
          const afterRad = rad * (0.85 - afterimage * 0.15);
          const afterAlpha = 0.3 - afterimage * 0.15;
          
          targetCtx.beginPath();
          targetCtx.arc(cxp, cyp, afterRad, 0, TAU);
          
          // Create radial gradient for afterimage fill
          const afterGradient = targetCtx.createRadialGradient(cxp, cyp, 0, cxp, cyp, afterRad);
          afterGradient.addColorStop(0, hsl(hue, sat, ringL, 0.08 * afterAlpha));
          afterGradient.addColorStop(0.7, hsl(hue, sat, ringL, 0.05 * afterAlpha));
          afterGradient.addColorStop(1, hsl(hue, sat, ringL, 0));
          targetCtx.fillStyle = afterGradient;
          targetCtx.fill();
          
          targetCtx.strokeStyle = hsl(hue, sat, ringL, Math.min(1, aStroke * afterAlpha));
          targetCtx.stroke();
        }
        
        // Draw main circle
        targetCtx.beginPath();
        targetCtx.arc(cxp, cyp, rad, 0, TAU);
        
        // Create radial gradient for main circle fill
        const gradient = targetCtx.createRadialGradient(cxp, cyp, 0, cxp, cyp, rad);
        gradient.addColorStop(0, hsl(hue, sat, ringL, 0.08));
        gradient.addColorStop(0.7, hsl(hue, sat, ringL, 0.05));
        gradient.addColorStop(1, hsl(hue, sat, ringL, 0));
        targetCtx.fillStyle = gradient;
        targetCtx.fill();
        
        // Then stroke the border
        targetCtx.strokeStyle = hsl(hue, sat, ringL, Math.min(1, aStroke));
        targetCtx.stroke();
      }
      targetCtx.restore();
    }
  }

  function draw(now){
    const elapsed = now - tStart;
    { const bw = Math.floor(width*dpr), bh = Math.floor(height*dpr); ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,bw,bh); ctx.restore(); }
    const minDim=Math.min(width,height);
    const R=Math.max(22,Math.min(CONFIG.circleBaseRadius,minDim*0.12));
    const cx=width/2,cy=height/2; const centers=nodeCenters(cx,cy,R);

    const baseShift=totalCycle()/2;
    const phaseBlue=channelPhase(elapsed,0);
    const phaseRed =channelPhase(elapsed,baseShift);

    tctxBlue.save();
    tctxBlue.fillStyle = `rgba(0,0,0,${1-CONFIG.channels.blue.trailDecay})`;
    tctxBlue.globalCompositeOperation = 'destination-out';
    { const bw = Math.floor(width*dpr), bh = Math.floor(height*dpr); tctxBlue.setTransform(1,0,0,1,0,0); tctxBlue.fillRect(0,0,bw,bh); tctxBlue.setTransform(dpr,0,0,dpr,0,0); }
    tctxBlue.restore();
    renderRings(tctxBlue, centers, R, CONFIG.channels.blue, phaseBlue, cx, cy);

    tctxRed.save();
    tctxRed.fillStyle = `rgba(0,0,0,${1-CONFIG.channels.red.trailDecay})`;
    tctxRed.globalCompositeOperation = 'destination-out';
    { const bw = Math.floor(width*dpr), bh = Math.floor(height*dpr); tctxRed.setTransform(1,0,0,1,0,0); tctxRed.fillRect(0,0,bw,bh); tctxRed.setTransform(dpr,0,0,dpr,0,0); }
    tctxRed.restore();
    renderRings(tctxRed, centers, R, CONFIG.channels.red, phaseRed, cx, cy);

    const bw = Math.floor(width*dpr), bh = Math.floor(height*dpr);
    ctx.save();
    ctx.globalCompositeOperation='source-over';
    ctx.drawImage(trailBlue,0,0,bw,bh,0,0,width,height);
    ctx.globalCompositeOperation='lighter';
    ctx.drawImage(trailRed,0,0,bw,bh,0,0,width,height);
    ctx.restore();

    if(!prefersReduced) requestAnimationFrame(draw);
  }
  if(prefersReduced){ draw(performance.now()); } else { requestAnimationFrame(draw); }

  window.ArbiterAnimation = {
    setAlpha:(a)=>{ CONFIG.globalOpacity = Math.max(0, Math.min(1, a)); },
    getAlpha:()=>CONFIG.globalOpacity
  };
})();