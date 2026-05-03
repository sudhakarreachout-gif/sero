import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.05, max: 0.15 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          startValue: "random" as const,
          destroy: "none" as const,
        },
      },
      size: {
        value: { min: 1, max: 4 },
      },
      move: {
        enable: true,
        direction: "top" as const,
        speed: 0.6,
        random: true,
        straight: false,
        outModes: {
          default: "out" as const,
        },
      },
      shadow: {
        enable: true,
        color: { value: "#cccccc" },
        blur: 5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    background: {
      color: "transparent",
    },
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="pointer-events-none"
    />
  );
}
