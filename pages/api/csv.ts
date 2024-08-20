import { createObjectCsvStringifier } from "csv-writer";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
}
