export const getImage = (imgUrl) =>
  new URL(`/src/assets/images/${imgUrl}`, import.meta.url).href;

export const getMusic = (musicUrl) =>
  new URL(`/src/assets/music/${musicUrl}`, import.meta.url).href;
