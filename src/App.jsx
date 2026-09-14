import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Book from "./components/Book";
import FinalGift from "./components/FinalGift";
import { useLenisScroll } from "./hooks/useLenisScroll";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/components.css";

export default function App() {
  useLenisScroll();

  const [heroOpened, setHeroOpened] = useState(false);
  const [bookClosed, setBookClosed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = heroOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [heroOpened]);

  return (
    <div className="app">
      <Hero onGiftOpened={() => setHeroOpened(true)} />

      <Book active={heroOpened} onBookClosed={() => setBookClosed(true)} />

      <FinalGift active={bookClosed} />
    </div>
  );
}
