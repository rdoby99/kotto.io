import type { NextApiRequest, NextApiResponse } from "next";
import MeCab from "mecab-async";
import { Pool } from "pg";

const mecab = new MeCab();
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
      const query = `
      SELECT * FROM words 
      WHERE (kanji && $1::text[]) 
        OR ((kanji IS NULL OR array_length(kanji, 1) = 0) AND reading && $1::text[]) 
      `;

      try {
        const client = await pool.connect();
        const { rows } = await client.query(query, [words]);
        client.release();

        return res.json({ results: rows });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
