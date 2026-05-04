import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

const HeroCanvas = React.memo(function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const bitmapCacheRef = useRef<ImageBitmap[]>([]);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 150;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const dimensionsRef = useRef({ width: 0, height: 0, drawX: 0, drawY: 0, drawWidth: 0, drawHeight: 0 });

  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let isMounted = true;

    const loadFrame = async (i: number) => {
      if (!isMounted) return;
      const img = new Image();
      img.src = `/assets/hero-seq-small/frame${i}.jpg`;
      try {
        await img.decode();
        if (!isMounted) return;
        imagesRef.current[i - 1] = img;

        // Pre-create GPU bitmap immediately after decode
        const bitmap = await createImageBitmap(img);
        if (!isMounted) return;
        bitmapCacheRef.current[i - 1] = bitmap;

        if (i === 1) {
          if (!ctxRef.current && canvasRef.current) {
            ctxRef.current = canvasRef.current.getContext('2d', { alpha: false });
          }
          setFirstFrameLoaded(true);
          // Small delay to ensure dimensions are ready
          setTimeout(() => renderFrame(0), 10);
        }
      } catch (err) {
        console.error(`Failed to load frame ${i}:`, err);
      }
    };

    const loadAll = async () => {
      // First 40 frames in parallel — covers fast early scrolls
      await Promise.all(Array.from({ length: 40 }, (_, i) => loadFrame(i + 1)));
      if (!isMounted) return;
      // BACKGROUND BATCH: Load remaining frames in parallel chunks of 30
      const remaining = Array.from({ length: frameCount - 40 }, (_, i) => i + 41);
      for (let i = 0; i < remaining.length; i += 30) {
        if (!isMounted) break;
        await Promise.all(remaining.slice(i, i + 30).map(loadFrame));
      }

      if (isMounted) setImages([...imagesRef.current]);
    };

    loadAll();
    return () => { isMounted = false; };
  }, []);

  const renderFrame = (index: number) => {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
    if (safeIndex === lastFrameRef.current) return;

    const ctx = ctxRef.current;
    if (!ctx || !canvasRef.current) return;

    const bitmap = bitmapCacheRef.current[safeIndex];
    if (bitmap) {
      const { drawX, drawY, drawWidth, drawHeight } = dimensionsRef.current;
      ctx.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight);
      lastFrameRef.current = safeIndex;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = Math.min(window.devicePixelRatio, 2);
        const width = window.innerWidth * dpr;
        const height = window.innerHeight * dpr;
        
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        if (ctxRef.current) {
          ctxRef.current.imageSmoothingEnabled = true;
          ctxRef.current.imageSmoothingQuality = 'high';
        }

        const img = imagesRef.current[0] || { width: 1920, height: 1080 };
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        
        let dWidth, dHeight, dX, dY;
        if (imgRatio > canvasRatio) {
          dHeight = height;
          dWidth = height * imgRatio;
          dX = (width - dWidth) / 2;
          dY = 0;
        } else {
          dWidth = width;
          dHeight = width / imgRatio;
          dX = 0;
          dY = (height - dHeight) / 2;
        }

        dimensionsRef.current = { width, height, drawX: dX, drawY: dY, drawWidth: dWidth, drawHeight: dHeight };
        renderFrame(lastFrameRef.current === -1 ? 0 : lastFrameRef.current);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const entranceTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    entranceTl.current = tl;
    
    tl.fromTo(canvasRef.current,
        { filter: "blur(0px) brightness(1)" },
        { filter: "blur(8px) brightness(0.6)", duration: 1.2, ease: "power2.out" },
        0
      )
      .fromTo("#main-nav",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.2
      )
      .fromTo(".hero-word", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "expo.out" 
        },
        0.1
      )
      .fromTo(".hero-word-italic", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "expo.out" 
        }, 
        "-=0.4"
      )
      .fromTo("#hero-subtitle", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.2"
      )
      .fromTo("#hero-tagline", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.6"
      )
      .fromTo("#hero-ctas", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 
        "-=0.4"
      );

    gsap.set([".hero-word", ".hero-word-italic", "#hero-subtitle", "#hero-tagline", "#hero-ctas", "#main-nav"], { opacity: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Start scroll animation once we have at least the first 30 frames
    if (images.filter(Boolean).length < 30) return;

    renderFrame(0);

    let animationPlayed = false;
    const playhead = { frame: 0 };
    
    const heroTl = gsap.to(playhead, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          // Trigger text animation only for the final frames (starting around frame 133)
          if (self.progress > 0.88) {
            if (!animationPlayed) {
              entranceTl.current?.play();
              animationPlayed = true;
            }
          } else if (self.progress < 0.82) {
            if (animationPlayed) {
              entranceTl.current?.reverse();
              animationPlayed = false;
            }
          }
        }
      },
      onUpdate: () => {
        const targetFrame = Math.floor(playhead.frame);
        if (targetFrame !== lastFrameRef.current) {
          renderFrame(playhead.frame);
        }
      }
    });

    return () => {
      heroTl.kill();
    };
  }, [images]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        width={window.innerWidth * window.devicePixelRatio}
        height={window.innerHeight * window.devicePixelRatio}
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ 
          backgroundImage: 'url(/assets/hero-seq-small/frame1.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: firstFrameLoaded ? 1 : 0,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C110A]/40 via-transparent to-[#1C110A]/60" />
    </div>
  );
});

export default HeroCanvas;
