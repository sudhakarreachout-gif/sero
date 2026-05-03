import { useEffect, useRef } from 'react';

export default function CocktailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw three layered sine waves
      const waves = [
        { amp: 28, freq: 0.008, speed: 0.018, color: 'rgba(193, 80, 58, 0.18)', yOff: h * 0.42 },
        { amp: 22, freq: 0.011, speed: 0.025, color: 'rgba(185, 115, 67, 0.22)', yOff: h * 0.52 },
        { amp: 18, freq: 0.014, speed: 0.032, color: 'rgba(28, 17, 10, 0.14)', yOff: h * 0.62 },
      ];

      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, wave.yOff);

        for (let x = 0; x <= w; x += 2) {
          const y = wave.yOff + Math.sin(x * wave.freq + t * wave.speed * 60) * wave.amp;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      // Floating orbs
      const orbs = [
        { cx: w * 0.15, cy: h * 0.3, r: 80, color: 'rgba(193, 80, 58, 0.06)' },
        { cx: w * 0.8, cy: h * 0.25, r: 120, color: 'rgba(185, 115, 67, 0.07)' },
        { cx: w * 0.5, cy: h * 0.7, r: 60, color: 'rgba(245, 236, 215, 0.05)' },
      ];

      for (const orb of orbs) {
        const drift = Math.sin(t * 0.4 + orb.cx) * 12;
        const grad = ctx.createRadialGradient(orb.cx, orb.cy + drift, 0, orb.cx, orb.cy + drift, orb.r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(orb.cx, orb.cy + drift, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      id="cocktail-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
