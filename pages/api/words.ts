import type { NextApiRequest, NextApiResponse } from "next";
import MeCab from "mecab-async";
import { Pool } from "pg";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

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

        const dataRes = rows;

        try {
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          const Gloss = z.object({
            gloss: z.array(z.string()),
          });

          const Entry = z.object({
            kanji: z.union([z.array(z.string()), z.null()]),
            reading: z.array(z.string()),
            definition: z.array(Gloss),
          });

          const List = z.object({
            list: z.array(Entry),
          });

          // AI request
          const response1 = await openai.beta.chat.completions.parse({
            messages: [
              {
                role: "system",
                content:
                  "I am going to send you three mesages back to back. The first is a string of Japanese text. The second contains an array of words we'd like to translate. The third is an array of objects with possible definitions for the words in the text. For each array item in the second message return the most likely object in the third message based on the sentence context in the first message. You can remove objects from the array, but DO NOT alter object properties.",
              },
              {
                role: "user",
                content: text,
              },
              {
                role: "user",
                content: `${words}`,
              },
              {
                role: "user",
                content: `${dataRes}`,
              },
            ],
            model: "gpt-4o-mini",
            response_format: zodResponseFormat(List, "list"),
          });

          return res.json(response1.choices[0].message.parsed);
        } catch (err) {
          console.error(`Error using AI API: ${err}`);
          return res.status(500).json({ error: err });
        }
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
