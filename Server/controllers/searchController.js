// server/controllers/searchController.js

import * as searchService from "../services/searchService.js";

/**
 * Controller עבור GET /api/search/tracks?q=
 */
export const searchSongsController = async (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ message: "Missing query parameter q" });
  }

  try {
    const results = await searchService.searchSongs(q);
    return res.json(results);
  } catch (err) {
    console.error("❌ searchSongsController:", err);
    return res.status(500).json({ message: "Search failed" });
  }
};
