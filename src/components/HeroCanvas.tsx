import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 120;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/assets/hero-seq/frame${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          imagesRef.current = loadedImages;
          renderFrame(0);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number) => {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, Math.floor(index)));
    if (safeIndex === lastFrameRef.current) return;
    
    const img = imagesRef.current[safeIndex];
    if (!img || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d', { alpha: false });
    if (!ctx) return;

    const canvas = canvasRef.current;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    lastFrameRef.current = safeIndex;
  };

  // Scroll Trigger
  useEffect(() => {
    if (images.length === 0) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        renderFrame(lastFrameRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 1. Entrance Timeline for Navigation
    gsap.to("#main-nav", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });

    // 2. Word-by-word reveal timeline (paused)
    const entranceTl = gsap.timeline({ paused: true });
    
    entranceTl
      .fromTo(canvasRef.current,
        { filter: "blur(0px) brightness(1)" },
        { filter: "blur(12px) brightness(0.6)", duration: 1.5, ease: "power2.out" },
        0
      )
      .fromTo(".hero-word", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "expo.out" 
        },
        0
      )
      .fromTo(".hero-word-italic", 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "expo.out" 
        }, 
        "-=0.55"
      )
      .fromTo("#hero-subtitle", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
        "-=0.2"
      )
      .fromTo("#hero-tagline", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
        "-=0.8"
      )
      .fromTo("#hero-ctas", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "+=0.2"
      );

    // 3. Looping Steam Animation
    const steamTl = gsap.timeline({ repeat: -1, paused: true });
    steamTl.to(".steam-particle", {
      y: -60,
      x: "random(-20, 20)",
      opacity: (i) => [0, 0.4, 0][i],
      duration: "random(2, 4)",
      stagger: {
        each: 0.5,
        repeat: -1
      },
      ease: "power1.out"
    });

    let animationPlayed = false;

    // 4. Main Scroll Sequence
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "+=5000",
        pin: true,
        scrub: 1.5, // Buttery smoothness
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (frameCount - 1));
          renderFrame(frame);
          
          // Trigger word entrance at climax
          if (self.progress > 0.88) {
            if (!animationPlayed) {
              entranceTl.play();
              animationPlayed = true;
            }
          } else if (self.progress < 0.80) {
            if (animationPlayed) {
              entranceTl.reverse();
              animationPlayed = false;
            }
          }

          // Trigger steam
          if (self.progress > 0.92) {
            steamTl.play();
            gsap.to(".steam-particle", { opacity: 0.3, duration: 0.5 });
          } else {
            steamTl.pause();
            gsap.to(".steam-particle", { opacity: 0, duration: 0.5 });
          }
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      heroTl.kill();
      entranceTl.kill();
      steamTl.kill();
    };
  }, [images]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        width={window.innerWidth * window.devicePixelRatio}
        height={window.innerHeight * window.devicePixelRatio}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C110A]/40 via-transparent to-[#1C110A]/60" />
    </div>
  );
}
