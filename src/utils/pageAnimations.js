import gsap from "gsap";

export function animatePageContent(pageEl, progress) {
  if (!pageEl) return;

  const elements = pageEl.querySelectorAll("[class*='page-animate']");
  elements.forEach((el) => {
    const classes = el.className;
    let threshold = 0.15;
    let stagger = 0;

    if (classes.includes("--title")) {
      threshold = 0.05;
    } else if (classes.includes("--date")) {
      threshold = 0.12;
      stagger = 0.05;
    } else if (classes.includes("--photo")) {
      threshold = 0.25;
      stagger = 0.1;
    } else if (classes.includes("--note")) {
      threshold = 0.45;
      stagger = 0.08;
    } else if (classes.includes("--text")) {
      threshold = 0.35;
      stagger = 0.06;
    }

    const noteMatch = classes.match(/--note-(\d)/);
    const photoMatch = classes.match(/--photo-(\d)/);
    const textMatch = classes.match(/--text-(\d)/);
    if (noteMatch) threshold = 0.3 + parseInt(noteMatch[1]) * 0.08;
    if (photoMatch) threshold = 0.2 + parseInt(photoMatch[1]) * 0.12;
    if (textMatch) threshold = 0.25 + parseInt(textMatch[1]) * 0.1;

    threshold += stagger;
    const localProgress = Math.max(0, Math.min(1, (progress - threshold) / 0.3));

    gsap.set(el, {
      opacity: localProgress,
      y: (1 - localProgress) * 20,
      scale: 0.95 + localProgress * 0.05,
      rotation: classes.includes("--photo") ? (1 - localProgress) * -3 : 0,
    });

    if (classes.includes("--photo") && localProgress > 0.5 && localProgress < 0.65) {
      const flash = pageEl.querySelector(".page-content__photo-flash");
      if (flash) {
        gsap.set(flash, { opacity: (0.65 - localProgress) * 4 });
      }
    }
  });
}

export function resetPageContent(pageEl) {
  if (!pageEl) return;
  const elements = pageEl.querySelectorAll("[class*='page-animate']");
  gsap.set(elements, { opacity: 0, y: 20, scale: 0.95, rotation: 0 });
}
