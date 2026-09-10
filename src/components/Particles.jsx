import { useEffect, useRef } from "react";
import gsap from "gsap";

const PARTICLE_TYPES = ["heart", "petal", "star", "dot"];

function createParticle(type) {
  const el = document.createElement("div");
  el.className = `particle particle--${type}`;
  return el;
}

export default function Particles({ intensity = "low", className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = intensity === "high" ? 24 : intensity === "medium" ? 16 : 10;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const type = PARTICLE_TYPES[i % PARTICLE_TYPES.length];
      const particle = createParticle(type);
      container.appendChild(particle);
      particles.push(particle);

      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        scale: 0.3 + Math.random() * 0.7,
        opacity: 0.15 + Math.random() * 0.35,
      });

      gsap.to(particle, {
        y: `-=${30 + Math.random() * 60}`,
        x: `+=${-20 + Math.random() * 40}`,
        rotation: -30 + Math.random() * 60,
        duration: 4 + Math.random() * 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`particles ${className}`}
      aria-hidden="true"
    />
  );
}
