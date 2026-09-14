import { useCallback, useEffect, useRef, useState } from "react";

export function useAudio(src, { loop = false, volume = 0.4, lazy = false } = {}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = lazy ? "none" : "metadata";
    audioRef.current = audio;
    return audio;
  }, [src, loop, volume, lazy]);

  useEffect(() => {
    if (lazy) return;

    const audio = ensureAudio();

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [lazy, ensureAudio]);

  const bindListeners = useCallback(
    (audio) => {
      const onTimeUpdate = () => setCurrentTime(audio.currentTime);
      const onLoadedMetadata = () => setDuration(audio.duration || 0);
      const onEnded = () => setIsPlaying(false);
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onError = () => setIsPlaying(false);

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("error", onError);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("ended", onEnded);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("error", onError);
      };
    },
    []
  );

  const lazyCleanupRef = useRef(null);

  useEffect(() => {
    if (!lazy) return;
    return () => {
      lazyCleanupRef.current?.();
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [lazy]);

  const play = useCallback(async () => {
    const audio = ensureAudio();
    if (lazy && !lazyCleanupRef.current) {
      lazyCleanupRef.current = bindListeners(audio);
    }
    try {
      await audio.play();
      setHasStarted(true);
    } catch {
      setIsPlaying(false);
    }
  }, [ensureAudio, lazy, bindListeners]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    const audio = ensureAudio();
    if (lazy && !lazyCleanupRef.current) {
      lazyCleanupRef.current = bindListeners(audio);
    }
    if (audio.paused) {
      await play();
    } else {
      pause();
    }
  }, [ensureAudio, lazy, bindListeners, play, pause]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    hasStarted,
    play,
    pause,
    toggle,
    seek,
    audioRef,
  };
}
