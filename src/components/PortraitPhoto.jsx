import { useMemo, useState } from "react";
import { photoSources } from "../utils/photoSources";

export default function PortraitPhoto({
  src: directSrc,
  baseName,
  fallback,
  alt,
  className = "",
  cropClass = "",
  loading = "lazy",
}) {
  const sources = useMemo(() => {
    if (directSrc) {
      return fallback ? [directSrc, fallback] : [directSrc];
    }
    return photoSources(baseName, fallback);
  }, [directSrc, baseName, fallback]);
  const [index, setIndex] = useState(0);
  const src = sources[index] ?? fallback;

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`${className} ${cropClass}`.trim()}
      onError={() => {
        setIndex((i) => (i < sources.length - 1 ? i + 1 : i));
      }}
    />
  );
}
