import type { NextApiRequest, NextApiResponse } from "next";
// TO-DO - Type module for mecab
import MeCab from "mecab-async";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(`Error: Missing Supabase URL`);
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(`Error: Missing Supabase KEY`);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const mecab: any = new MeCab();

async function queryDatabase(words: string[]) {
  const { data, error } = await supabase.rpc("search_words", {
    search_terms: words,
  });

  if (error) {
    throw new Error(`Error querying database: ${error}`);
  } else {
    return data;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse using Mecab
    const text = req.query.text;
    mecab.parse(text, async (err: Error | null, result: string[]) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error parsing text.", details: err.message });
      }

      const words = result
        .map((node) => node[0])
        .filter((word) => word !== "EOS");

      if (!words.length) {
        return res.json({ results: [] });
      }

      try {
        const dataRes = await queryDatabase(words);

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
                content: `${text}`,
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
          return res
            .status(500)
            .json({ error: "Error using AI API", details: err });
        }
      } catch (err) {
        return res
          .status(500)
          .json({ error: "Error querying database", details: err });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Error in handler", details: err });
  }
}
