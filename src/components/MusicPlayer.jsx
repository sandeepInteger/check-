import { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import gsap from "gsap";
import { siteConfig } from "../data/siteConfig";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MusicPlayer({
  isPlaying,
  currentTime,
  duration,
  onToggle,
  onSeek,
  visible,
}) {
  const playerRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    gsap.from(playerRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
    });
  }, [visible]);

  useEffect(() => {
    if (!isPlaying || !notesRef.current) return;

    const interval = setInterval(() => {
      const note = document.createElement("span");
      note.className = "music-player__floating-note";
      note.textContent = "♪";
      notesRef.current.appendChild(note);

      gsap.fromTo(
        note,
        { x: Math.random() * 200 - 100, y: 0, opacity: 0.5 },
        {
          y: -60,
          opacity: 0,
          duration: 2,
          ease: "power1.out",
          onComplete: () => note.remove(),
        }
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!visible) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const displayDuration =
    duration > 0 ? formatTime(duration) : siteConfig.personalSongDuration;

  return (
    <div
      className={`music-player ${isPlaying ? "music-player--playing" : ""}`}
      ref={playerRef}
    >
      <div className="music-player__glow" aria-hidden="true" />
      <div className="music-player__notes" ref={notesRef} aria-hidden="true" />

      <div className="music-player__icon">♫</div>
      <h3 className="music-player__title heading-serif heading-serif--medium">
        {siteConfig.personalSongTitle}
      </h3>
      <p className="music-player__subtitle body-text">
        {siteConfig.personalSongSubtitle}
      </p>

      <button className="music-player__play-btn" onClick={onToggle}>
        {isPlaying ? (
          <>
            <Pause size={18} strokeWidth={1.5} />
            <span>PAUSE</span>
          </>
        ) : (
          <>
            <Play size={18} strokeWidth={1.5} />
            <span>PLAY</span>
          </>
        )}
      </button>

      <div
        className="music-player__progress-track"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          onSeek(ratio * (duration || 222));
        }}
      >
        <div
          className="music-player__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="music-player__time">
        <span>{formatTime(currentTime)}</span>
        <span>{displayDuration}</span>
      </div>
    </div>
  );
}
