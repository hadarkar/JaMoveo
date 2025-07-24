// server/data/songStore.js

import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// כדי ליצור נתיב יחסי תקין
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// יצירת פונקציית require של CommonJS בתוך מודול ESM
const require = createRequire(import.meta.url);

// מייבאים את ה־JSON
const veechShelo = require(join(__dirname, "veech_shelo.json"));
const heyJude    = require(join(__dirname, "hey_jude_scroll_test.json"));

export const songs = [
  {
    id:     "veech_shelo",
    title:  "Veech Shelo",
    artist: "Unknown Artist",
    lyrics: veechShelo,
  },
  {
    id:     "hey_jude",
    title:  "Hey Jude",
    artist: "The Beatles",
    lyrics: heyJude,
  },
];
