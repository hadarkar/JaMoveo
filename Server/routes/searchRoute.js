// server/routes/searchRoute.js

import express from "express";
import { verifyToken }    from "../middleware/auth.js";
import { isAdmin }       from "../middleware/isAdmin.js";
import { searchSongsController }   from "../controllers/searchController.js";

const router = express.Router();

// GET /api/search/tracks?q=... — רק ADMIN יכול לקרוא
router.get("/tracks", verifyToken, isAdmin, searchSongsController);

export default router;
