import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import language, { protos } from "@google-cloud/language";

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

/**
 *  Queries supabase database with array of tokens
 *
 * @param words - string[]. Array of tokens to check against the database.
 * @returns json of databse entries.
 */
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

/**
 * Tokenizes Japanese text string with Google Cloud NLP
 *
 * @param text - string. The string you'd like to tokenize.
 * @returns array of tokens
 */
async function tokenizeText(text: string): Promise<string[]> {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(`Error: Missing Google Cloud Credentials`);
  }

  //TO-DO update auth
  const gcloud = new language.LanguageServiceClient({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  });

  const document: protos.google.cloud.language.v1.IDocument = {
    content: text,
    type: "PLAIN_TEXT",
    language: "ja",
  };

  const encodingType = "UTF8";

  const [syntax] = await gcloud.analyzeSyntax({ document, encodingType });

  let tokens: string[] = [];

  if (syntax.tokens) {
    tokens = syntax.tokens
      .map((node) => node.text?.content)
      .filter(
        (content): content is string =>
          content !== null && content !== undefined
      );
  }

  return tokens || [];
}

/**
 *  Calls OpenAI API to contextualize vocabulary
 *
 * @param text - string. String of Japanese text.
 * @param words - string[]. Tokens from text.
 * @param dataRes - {}. Corresponding database entries from tokens.
 * @returns json. Relevant databse entries.
 */
async function AIAnalysis(text: string, words: string[], dataRes: {}) {
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

  const response = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: "system",
        content: `Select a database entries from my following message based on this text: '${text}' and this set of tokens: '${words}'. EACH token should be matched to ONE databse entry. You must NOT edit, paraphrase, or modify the wording of an individual databse entry in any way. Simply return the exact entry that fits the context. This is an extract-only task. Do not generate or modify any text.`,
      },
      {
        role: "user",
        content: `${dataRes}`,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(List, "list"),
  });

  return response.choices[0].message.parsed;
}

/**
 * Main reqeust function
 *
 * @param req request
 * @param res response
 * @returns request response
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const text: string | undefined = Array.isArray(req.query.text)
      ? req.query.text[0]
      : req.query.text;

    if (text === undefined) {
      res.status(400).send("Bad request: text query parameter is required");
      return;
    }

    // Tokenize text
    const words = await tokenizeText(text);
    if (!words.length) throw new Error("Error tokenizing words");

    // Query Database
    const dataRes = await queryDatabase(words);
    if (!dataRes) throw new Error("Error querying database");

    // Use OpenAI to contextualize returned entries
    const response = await AIAnalysis(text, words, dataRes);
    if (!response) throw new Error("Error using AI API");

    return res.json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error", details: err });
  }
}
