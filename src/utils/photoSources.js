const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "jfif"];

/** Build candidate URLs for a file base name in public/images/shriya/ */
export function photoSources(baseName, fallback) {
  if (!baseName) {
    return fallback ? [fallback] : [];
  }

  const folder = "/images/shriya";
  const fromFolder = EXTENSIONS.map((ext) => `${folder}/${baseName}.${ext}`);
  return fallback ? [...fromFolder, fallback] : fromFolder;
}
