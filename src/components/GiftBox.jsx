import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

const GiftBox = forwardRef(function GiftBox(
  { variant = "hero", onOpenComplete },
  ref
) {
  const boxRef = useRef(null);
  const lidRef = useRef(null);
  const ribbonRef = useRef(null);
  const glowRef = useRef(null);
  const confettiRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      const tl = gsap.timeline({
        onComplete: onOpenComplete,
      });

      tl.to(boxRef.current, {
        rotation: -3,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      })
        .to(
          ribbonRef.current,
          { scaleY: 1.15, duration: 0.3, ease: "power2.out" },
          "-=0.3"
        )
        .to(lidRef.current, {
          rotationX: -110,
          y: -20,
          duration: 0.9,
          ease: "power3.inOut",
          transformOrigin: "center bottom",
        })
        .to(
          glowRef.current,
          { opacity: 1, scale: 1.4, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .to(confettiRef.current, { opacity: 1, duration: 0.5 }, "-=0.4");

      spawnConfetti(confettiRef.current);
    },
  }));

  return (
    <div
      className={`gift-box gift-box--${variant}`}
      ref={boxRef}
      style={{ perspective: "800px" }}
    >
      <div className="gift-box__glow" ref={glowRef} />
      <div className="gift-box__body">
        <div className="gift-box__lid" ref={lidRef}>
          <div className="gift-box__lid-top" />
          <div className="gift-box__bow" />
        </div>
        <div className="gift-box__ribbon-v" ref={ribbonRef} />
        <div className="gift-box__ribbon-h" />
        <div className="gift-box__base" />
        {variant === "final" && (
          <div className="gift-box__music-note" aria-hidden="true">
            ♫
          </div>
        )}
      </div>
      <div className="gift-box__confetti" ref={confettiRef} aria-hidden="true" />
    </div>
  );
});

function spawnConfetti(container) {
  if (!container) return;
  container.innerHTML = "";

  const shapes = ["heart", "petal", "star", "paper"];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement("span");
    piece.className = `confetti-piece confetti-piece--${shapes[i % shapes.length]}`;
    container.appendChild(piece);

    gsap.fromTo(
      piece,
      {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360,
      },
      {
        x: (Math.random() - 0.5) * 160,
        y: -80 - Math.random() * 120,
        opacity: 1,
        scale: 0.4 + Math.random() * 0.6,
        rotation: Math.random() * 720,
        duration: 1.2 + Math.random() * 0.8,
        ease: "power2.out",
        delay: Math.random() * 0.3,
        onComplete: () => {
          gsap.to(piece, {
            y: "+=60",
            opacity: 0,
            duration: 1.5,
            ease: "power1.in",
          });
        },
      }
    );
  }
}

export default GiftBox;
