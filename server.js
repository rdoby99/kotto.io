const express = require("express");
const cors = require("cors");
const MeCab = require("mecab-async");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const { createObjectCsvStringifier } = require("csv-writer");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
});

// Download selected rows from front end
app.post("/csv", async (req, res) => {
  const data = req.body.data;

  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "front", title: "FRONT" },
      { id: "back", title: "BACK" },
    ],
  });

  try {
    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(data);

    const csvContent = header + records;

    // Set headers to force download
    res.setHeader("Content-Disposition", "attachment; filename=output.csv");
    res.setHeader("Content-Type", "text/csv");

    // Send CSV content as a response
    res.send(csvContent);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: err.message });
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
