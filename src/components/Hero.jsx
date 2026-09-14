import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "../data/siteConfig";
import GiftBox from "./GiftBox";
import Particles from "./Particles";
import PortraitPhoto from "./PortraitPhoto";

export default function Hero({ onGiftOpened, onFirstInteraction }) {
  const sectionRef = useRef(null);
  const giftRef = useRef(null);
  const revealRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__portrait-ring", {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero__beat", {
        y: 12,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.45,
      });
      gsap.from(".hero__greeting", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".hero__message", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(".hero__sub", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(".hero__gift-wrap", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.1,
      });
      gsap.from(".hero__open-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5,
      });

      gsap.to(".hero__gift-wrap", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOpenGift = () => {
    if (opening || opened) return;
    onFirstInteraction?.();
    setOpening(true);

    gsap.to(".hero__open-btn", {
      opacity: 0,
      y: 10,
      duration: 0.4,
      onComplete: () => setOpening(true),
    });

    giftRef.current?.open();
  };

  const handleOpenComplete = () => {
    setOpened(true);

    gsap.set(revealRef.current, { display: "flex" });
    gsap.from(".hero__reveal-title", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".hero__reveal-sub", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.to(".hero__gift-wrap", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.in",
    });

    gsap.to(revealRef.current, {
      opacity: 0,
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(revealRef.current, { display: "none" });
      },
    });

    setTimeout(() => {
      setScrollEnabled(true);
      onGiftOpened?.();
    }, 1800);
  };

  return (
    <section
      className={`hero ${scrollEnabled ? "hero--scrollable" : ""}`}
      ref={sectionRef}
    >
      <div className="hero__ambient" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__orb hero__orb--3" />
      </div>

      <Particles intensity={opened ? "high" : "medium"} className="hero__particles" />

      <div className="hero__portrait-ring">
        <PortraitPhoto
          src={siteConfig.photos.hero}
          fallback="/images/memory-01.svg"
          alt={siteConfig.fullName ?? siteConfig.girlfriendName}
          className="hero__portrait"
          cropClass="photo-crop--center"
          loading="eager"
        />
      </div>

      <ul className="hero__beats" aria-label="Story highlights">
        {siteConfig.storyBeats.map((beat) => (
          <li key={beat} className="hero__beat handwritten">
            {beat}
          </li>
        ))}
      </ul>

      <div className="hero__content">
        <p className="hero__greeting heading-serif heading-serif--hero">
          Hey, {siteConfig.girlfriendName}...
        </p>
        <p className="hero__message heading-serif heading-serif--medium">
          {siteConfig.heroMessage}
        </p>
        <p className="hero__sub body-text">{siteConfig.heroSubMessage}</p>
      </div>

      <div className="hero__gift-wrap">
        <GiftBox ref={giftRef} variant="hero" onOpenComplete={handleOpenComplete} />
      </div>

      {!opened && (
        <button
          className="hero__open-btn btn-primary"
          onClick={handleOpenGift}
          disabled={opening}
        >
          Open your gift
        </button>
      )}

      <div className="hero__reveal" ref={revealRef} style={{ display: "none" }}>
        <h2 className="hero__reveal-title heading-serif heading-serif--hero">
          Happy Birthday, {siteConfig.fullName ?? siteConfig.girlfriendName} ❤️
        </h2>
        <p className="hero__reveal-sub body-text">
          Turn the page — your story is waiting.
        </p>
      </div>

      {scrollEnabled && (
        <div className="hero__scroll-hint">
          <span>Scroll to begin</span>
          <div className="hero__scroll-line" />
        </div>
      )}
    </section>
  );
}
