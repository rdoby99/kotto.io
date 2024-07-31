const express = require("express");
const cors = require("cors");
const MeCab = require("mecab-async");
const { Pool } = require("pg");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

const mecab = new MeCab();
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

app.get("/words", async (req, res) => {
  try {
    // Parse using Mecab
    const text = req.query.text;
    mecab.parse(text, async (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const words = result
        .map((node) => node[0])
        .filter((word) => word !== "EOS");

      if (!words.length) {
        return res.json({ results: [] });
      }

      // Query database
      const placeholders = words.map((_, i) => `$${i + 1}`).join(", ");
      const query = `SELECT * FROM words WHERE word IN (${placeholders})`;

      try {
        const client = await pool.connect();
        const { rows } = await client.query(query, words);
        client.release();

        return res.json({ results: rows });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
