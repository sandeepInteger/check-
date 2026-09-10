// Replace .svg placeholder paths with your real photos:
// /images/memory-01.jpg, /images/memory-02.jpg, etc.
export const memories = [
  {
    id: "beginning",
    type: "beginning",
    title: "It started with you.",
    date: "Somewhere between then and now",
    text: "Funny how one little moment can become such a big part of your life.",
    image: "/images/memory-01.svg",
  },
  {
    id: "first-memory",
    type: "scrapbook",
    title: "Our first little memory.",
    date: "The day that changed everything",
    text: "I still remember every little detail — the way you smiled, the way the world felt a little brighter.",
    image: "/images/memory-02.svg",
  },
  {
    id: "collage",
    type: "collage",
    title: "And somehow, the ordinary moments became my favorite ones.",
    images: [
      "/images/memory-03.svg",
      "/images/memory-04.svg",
      "/images/memory-05.svg",
    ],
  },
  {
    id: "favorite",
    type: "favorite",
    title: "Some memories just feel different.",
    subtitle: "This one is one of my favorites.",
    image: "/images/memory-01.svg",
  },
  {
    id: "little-things",
    type: "notes",
    title: "The little things.",
    image: "/images/memory-02.svg",
    notes: [
      "Your smile.",
      "Your laugh.",
      "Your random messages.",
      "The way you make everything better.",
    ],
  },
  {
    id: "letter",
    type: "letter",
    title: "For you ❤️",
    text: `Every day with you feels like a page I never want to stop reading.

You have this quiet way of making ordinary moments feel extraordinary — a shared laugh, a late-night conversation, the smallest gesture that somehow means everything.

On your birthday, I just want you to know how deeply grateful I am for you. For your heart, your kindness, and the way you make my world feel like home.

Thank you for being you. Thank you for being mine.`,
  },
  {
    id: "last-page",
    type: "closing",
    text: "And that's only a tiny part of our story...",
    closingText: "I still have one more gift for you.",
  },
];
