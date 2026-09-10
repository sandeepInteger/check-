# Birthday Surprise Website

An interactive, animation-heavy birthday experience built with React, Vite, GSAP, and Lenis.

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

## Customize Everything

### Names & messages

Edit `src/data/siteConfig.js`:

- `girlfriendName` — her name
- `boyfriendName` — your name
- Hero and final messages
- Audio file paths

### Memories (book pages)

Edit `src/data/memories.js` — add, remove, or reorder memory objects.

Replace placeholder image paths with your photos:

```
public/images/memory-01.jpg
public/images/memory-02.jpg
...
```

Then update paths in `memories.js` from `.svg` to `.jpg`.

### Audio

Add your files to `public/audio/`:

- `background-music.mp3` — soft looping instrumental
- `personal-song.mp3` — the personalized final song

## Experience Flow

1. **Hero** — romantic greeting + animated gift box
2. **Open gift** — lid opens, confetti, birthday reveal
3. **Scroll** — transitions into a 3D memory book
4. **Book** — scroll-driven page turns through 7 memories
5. **Final gift** — elegant gift opens to reveal a custom song player
6. **Music** — floating background music control (starts on first interaction)

## Tech Stack

- React + Vite
- GSAP + ScrollTrigger (page turns, scroll animations)
- Lenis (smooth scrolling)
- Lucide React (icons)
- CSS 3D transforms

## Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).
