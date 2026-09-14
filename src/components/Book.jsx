import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memories } from "../data/memories";
import { siteConfig } from "../data/siteConfig";
import MemoryPage from "./MemoryPage";
import { animatePageContent, resetPageContent } from "../utils/pageAnimations";

gsap.registerPlugin(ScrollTrigger);

export default function Book({ active, onBookClosed }) {
  const sectionRef = useRef(null);
  const bookRef = useRef(null);
  const pageRefs = useRef([]);
  const closingRef = useRef(false);
  const closedNotifiedRef = useRef(false);

  useEffect(() => {
    if (!active) return;

    pageRefs.current.forEach((page) => resetPageContent(page));

    const ctx = gsap.context(() => {
      const totalPages = memories.length;
      const scrollLength = totalPages * 100;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}%`,
        pin: ".book__pin-wrapper",
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const globalProgress = self.progress;
          const pageProgress = globalProgress * totalPages;
          const currentPageIndex = Math.min(
            Math.floor(pageProgress),
            totalPages - 1
          );
          const localProgress = pageProgress - currentPageIndex;

          pageRefs.current.forEach((page, i) => {
            if (!page) return;

            if (i < currentPageIndex) {
              gsap.set(page, { rotateY: -180, z: i });
            } else if (i === currentPageIndex) {
              const turnStart = 0.72;
              const turnProgress =
                localProgress > turnStart
                  ? (localProgress - turnStart) / (1 - turnStart)
                  : 0;
              gsap.set(page, {
                rotateY: -180 * turnProgress,
                z: totalPages - i + turnProgress * 2,
              });
              animatePageContent(page, Math.min(localProgress / turnStart, 1));
            } else {
              gsap.set(page, { rotateY: 0, z: totalPages - i });
            }
          });

          if (globalProgress > 0.92) {
            if (!closingRef.current) closingRef.current = true;
            const closeProgress = Math.min(1, (globalProgress - 0.92) / 0.08);
            gsap.set(bookRef.current, {
              scale: 1 - closeProgress * 0.15,
              rotateY: closeProgress * 8,
            });
          }

          if (globalProgress > 0.98 && !closedNotifiedRef.current) {
            closedNotifiedRef.current = true;
            onBookClosed?.();
          }
        },
      });

      gsap.from(".book__intro-wrap", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        y: 40,
      });

      gsap.from(".book__wrapper", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.92,
        y: 60,
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [active, onBookClosed]);

  if (!active) return null;

  return (
    <section className="book-section" ref={sectionRef}>
      <div className="book__pin-wrapper">
        <div className="book__intro-wrap">
          <p className="book__intro-kicker section-label">A story for</p>
          <p className="book__intro heading-serif heading-serif--medium">
            {siteConfig.fullName ?? siteConfig.girlfriendName}
          </p>
          <p className="book__intro-tagline body-text">
            Smile, look, laugh — and everything in between.
          </p>
        </div>

        <div className="book__scene">
          <div className="book__wrapper" ref={bookRef}>
            <div className="book__spine" aria-hidden="true" />
            <div className="book__shadow" aria-hidden="true" />

            <div className="book__pages" style={{ perspective: "2200px" }}>
              {memories.map((memory, i) => (
                <div
                  key={memory.id}
                  className="book__page gpu-layer"
                  ref={(el) => {
                    pageRefs.current[i] = el;
                  }}
                  style={{
                    zIndex: memories.length - i,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="book__page-front paper-texture">
                    <MemoryPage memory={memory} pageIndex={i} />
                  </div>
                  <div className="book__page-back" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="book__scroll-indicator">
          <span>Keep scrolling</span>
        </div>
      </div>
    </section>
  );
}
