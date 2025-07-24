// server/services/songService.js

import { songs } from "../data/songStore.js";

/**
 * מחפש את השירים ב‑songs לפי contain ב‑title או ב‑artist
 * @param {string} query
 * @returns {Promise<Array<{id:string,title:string,artist:string,lyrics:string}>>}
 */
export const searchSongs = async (query) => {
  const lower = query.toLowerCase();
  return songs.filter(
    (s) =>
      s.title.toLowerCase().includes(lower) ||
      s.artist.toLowerCase().includes(lower)
  );
};
