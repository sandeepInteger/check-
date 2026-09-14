/** Files in public/images/ — spaces encoded for safe URLs */
export function publicImage(fileName) {
  return `/images/${encodeURIComponent(fileName)}`;
}

export const userPhotos = {
  one: publicImage("Media (1).jfif"),
  two: publicImage("Media (2).jfif"),
  three: publicImage("Media (3).jfif"),
  four: publicImage("Media (4).jfif"),
  five: publicImage("Media (5).jfif"),
};
