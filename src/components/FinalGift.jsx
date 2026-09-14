import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../data/siteConfig";
import GiftBox from "./GiftBox";
import Particles from "./Particles";
import PortraitPhoto from "./PortraitPhoto";

gsap.registerPlugin(ScrollTrigger);

export default function FinalGift({ active }) {
  const sectionRef = useRef(null);
  const giftRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      gsap.from(".final-gift__heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        y: 30,
      });

      gsap.from(".final-gift__gift-wrap", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.85,
        y: 40,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  const handleOpen = () => {
    if (opening || opened) return;
    setOpening(true);

    gsap.to(".final-gift__open-btn", {
      opacity: 0,
      duration: 0.4,
    });

    giftRef.current?.open();
  };

  const handleOpenComplete = () => {
    setOpened(true);

    gsap.from(".final-gift__message", {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: "power3.out",
      delay: 0.35,
    });
  };

  if (!active) return null;

  return (
    <section className="final-gift" ref={sectionRef}>
      <Particles intensity="low" className="final-gift__particles" />

      <div className="final-gift__content">
        <p className="final-gift__heading heading-serif heading-serif--medium">
          One last thing...
        </p>
        <p className="final-gift__sub body-text">
          A few words, saved for the end.
        </p>

        {!opened && (
          <>
            <div className="final-gift__gift-wrap">
              <GiftBox
                ref={giftRef}
                variant="final"
                onOpenComplete={handleOpenComplete}
              />
            </div>
            <button
              className="final-gift__open-btn btn-primary"
              onClick={handleOpen}
              disabled={opening}
            >
              Open your final gift ❤️
            </button>
          </>
        )}

        {opened && (
          <div className="final-gift__message">
            <div className="final-gift__main-photo-wrap">
              <PortraitPhoto
                src={siteConfig.photos.main}
                fallback="/images/memory-01.svg"
                alt={siteConfig.fullName ?? siteConfig.girlfriendName}
                className="final-gift__main-photo"
                cropClass="photo-crop--center"
              />
            </div>
            <h2 className="heading-serif heading-serif--hero">
              Happy Birthday, {siteConfig.fullName ?? siteConfig.girlfriendName} ❤️
            </h2>
            <p className="body-text final-gift__final-msg">
              {siteConfig.finalMessage.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>
            <p className="final-gift__signature handwritten">
              — {siteConfig.signOff}
            </p>
            <p className="final-gift__footer body-text">
              Made with ❤️, just for you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
