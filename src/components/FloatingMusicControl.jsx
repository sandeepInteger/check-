import { Music2, Pause, Play } from "lucide-react";

export default function FloatingMusicControl({
  label,
  isPlaying,
  onToggle,
  visible = true,
}) {
  if (!visible) return null;

  return (
    <button
      className="floating-music"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      <span className="floating-music__icon">
        <Music2 size={14} strokeWidth={1.5} />
      </span>
      <span className="floating-music__label">{label}</span>
      <span className="floating-music__toggle">
        {isPlaying ? (
          <Pause size={14} strokeWidth={1.5} />
        ) : (
          <Play size={14} strokeWidth={1.5} />
        )}
      </span>
    </button>
  );
}
