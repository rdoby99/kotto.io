import { createObjectCsvStringifier } from "csv-writer";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.data;

  const csvStringifier = createObjectCsvStringifier({
    header: ["front", "back"],
  });

  try {
    const records = csvStringifier.stringifyRecords(data);

    // Set headers to force download
    res.setHeader("Content-Disposition", "attachment; filename=output.csv");
    res.setHeader("Content-Type", "text/csv");

    // Send CSV content as a response
    res.send(records);
  } catch (err) {
    console.error(`Error: ${err}`);
    return res.status(500).json({ error: err });
  }
}
