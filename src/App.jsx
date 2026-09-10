import { useCallback, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Book from "./components/Book";
import FinalGift from "./components/FinalGift";
import FloatingMusicControl from "./components/FloatingMusicControl";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { useAudio } from "./hooks/useAudio";
import { siteConfig } from "./data/siteConfig";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/components.css";

export default function App() {
  useLenisScroll();

  const [heroOpened, setHeroOpened] = useState(false);
  const [bookClosed, setBookClosed] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const backgroundAudio = useAudio(siteConfig.backgroundMusic, {
    loop: true,
    volume: 0.25,
  });

  const personalSong = useAudio(siteConfig.personalSong, {
    loop: false,
    volume: 0.7,
  });

  useEffect(() => {
    document.body.style.overflow = heroOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [heroOpened]);

  const handleFirstInteraction = useCallback(() => {
    if (!musicEnabled) {
      setMusicEnabled(true);
      backgroundAudio.play();
    }
  }, [musicEnabled, backgroundAudio]);

  const handleBackgroundToggle = useCallback(() => {
    if (!musicEnabled) {
      setMusicEnabled(true);
      backgroundAudio.play();
    } else {
      backgroundAudio.toggle();
    }
  }, [musicEnabled, backgroundAudio]);

  const handleSongToggle = useCallback(async () => {
    if (personalSong.isPlaying) {
      personalSong.pause();
    } else {
      if (backgroundAudio.isPlaying) {
        backgroundAudio.pause();
      }
      await personalSong.play();
    }
  }, [personalSong, backgroundAudio]);

  return (
    <div className="app">
      <Hero
        onGiftOpened={() => setHeroOpened(true)}
        onFirstInteraction={handleFirstInteraction}
      />

      <Book active={heroOpened} onBookClosed={() => setBookClosed(true)} />

      <FinalGift
        active={bookClosed}
        songPlaying={personalSong.isPlaying}
        songTime={personalSong.currentTime}
        songDuration={personalSong.duration}
        onSongToggle={handleSongToggle}
        onSongSeek={personalSong.seek}
        playerVisible={bookClosed}
      />

      <FloatingMusicControl
        label={siteConfig.backgroundMusicLabel}
        isPlaying={backgroundAudio.isPlaying}
        onToggle={handleBackgroundToggle}
        visible={musicEnabled || heroOpened}
      />
    </div>
  );
}
