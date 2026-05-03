import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function OceanParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassCount = 30;

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = containerRef.current.querySelectorAll('.parallax-layer');
    
    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '0.5');
        const movement = -(depth * 500); // Adjust for intensity

        gsap.to(layer, {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=4000",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: glassCount }).map((_, i) => {
        const id = i + 1;
        // Randomize positions for a natural scattered look
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const depth = 0.2 + Math.random() * 0.8; // 0.2 to 1.0
        const scale = 0.5 + Math.random() * 0.5;
        const rotate = Math.random() * 360;

        return (
          <img
            key={id}
            src={`/assets/ocean/glass${id}.png`}
            className="parallax-layer absolute w-32 md:w-48 opacity-60"
            data-depth={depth}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              filter: `blur(${Math.max(0, (1 - depth) * 4)}px)`, // Deeper items are blurrier
            }}
            alt=""
          />
        );
      })}
    </div>
  );
}
