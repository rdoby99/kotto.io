"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

export type VocabItem = {
  kanji: string[];
  reading: string[];
  definition: {
    gloss: string[];
  }[];
};

export const columns: ColumnDef<VocabItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    // accessorKey: "kanij[0]",
    accessorFn: (row) => (row.kanji ? row.kanji[0] : ""),
    header: "Kanji",
  },
  {
    // accessorKey: "reading[0]",
    accessorFn: (row) => (row.reading ? row.reading[0] : ""),
    header: "Kana",
  },
  {
    accessorFn: (row) =>
      row.definition ? row.definition[0].gloss.join("; ") : "",
    header: "Definition",
  },
];
