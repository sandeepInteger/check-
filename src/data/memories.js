import { userPhotos } from "./photos";

export const memories = [
  {
    id: "beginning",
    type: "beginning",
    title: "It started with a smile.",
    date: "The moment Shriya walked in",
    text: "I didn't know it yet, but your smile had already rewritten the day.",
    imageSrc: userPhotos.one,
    imageFallback: "/images/memory-01.svg",
    cropClass: "photo-crop--soft-top",
  },
  {
    id: "first-memory",
    type: "scrapbook",
    title: "Then came that look.",
    date: "When the world got quiet",
    text: "The kind of look that says everything without a word — soft, sure, and completely you.",
    imageSrc: userPhotos.two,
    imageFallback: "/images/memory-02.svg",
    cropClass: "photo-crop--eyes",
  },
  {
    id: "collage",
    type: "collage",
    title: "And somehow, every ordinary moment became my favorite.",
    images: [
      {
        src: userPhotos.three,
        fallback: "/images/memory-03.svg",
        cropClass: "photo-crop--center",
      },
      {
        src: userPhotos.four,
        fallback: "/images/memory-04.svg",
        cropClass: "photo-crop--warm",
      },
      {
        src: userPhotos.five,
        fallback: "/images/memory-05.svg",
        cropClass: "photo-crop--soft-bottom",
      },
    ],
  },
  {
    id: "favorite",
    type: "favorite",
    title: "This one stays with me.",
    subtitle: "Your laugh — the one that makes everything feel lighter.",
    imageSrc: userPhotos.four,
    imageFallback: "/images/memory-01.svg",
    cropClass: "photo-crop--center",
  },
  {
    id: "little-things",
    type: "notes",
    title: "The little things, Shriya.",
    imageSrc: userPhotos.five,
    imageFallback: "/images/memory-02.svg",
    cropClass: "photo-crop--soft-top",
    notes: [
      "The way you smile mid-sentence.",
      "That look before you say something funny.",
      "How you light up a room without trying.",
      "You — exactly as you are.",
    ],
  },
  {
    id: "letter",
    type: "letter",
    title: "For you, Shriya",
    text: `Dear Shriya,

Some people walk into your life quietly. You didn't — you walked in with that smile, and everything felt warmer.

I still get caught on the way you look at things: curious, gentle, a little mischievous when you're happy. It's in the small moments — a shared laugh, a glance that lasts a second too long — that I remember why you're so easy to adore.

On your birthday, I just want you to feel seen. Not for one perfect photo or one big gesture, but for all of it: your heart, your humor, the way you make ordinary days feel like something worth keeping.

Thank you for being Shriya Jamwal — unapologetically you.

With love, always.`,
  },
  {
    id: "last-page",
    type: "closing",
    text: "And that's only a tiny part of your story...",
    closingText: "I still have one more gift for you.",
  },
];
