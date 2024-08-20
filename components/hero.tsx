"use client";

import React, { useState } from "react";
import Analyzer from "./analyzer";
import Breakdown from "./breakdown";
import { VocabItem, columns } from "./columns";
import { DataTable } from "./vocabTable";
import { Button } from "@/components/ui/button";
import VocabListSkeleton from "./vocabListSkeleton";

export default function Hero() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOutput = (value) => {
    setOutput(value);
  };

  const handleError = (value) => {
    setError(value);
  };

  const handleLoading = (value) => {
    setLoading(value);
  };

  return (
    <section className="grid md:grid-cols-2 gap-16 items-center w-full py-16 px-4 md:px-16 min-h-[70vh]">
      {/* Vocab List */}
      {output.length > 0 && !loading && (
        <div>
          <h1 className="h2 mb-6">Vocabulary</h1>
          <DataTable columns={columns} data={output} />
        </div>
      )}

      {/* Skeleton */}
      {loading && <VocabListSkeleton />}

      {/* Default screen */}
      {!loading && output.length == 0 && (
        <div className="text-center text-secondary-foreground col-span-1 flex flex-col gap-4">
          <h1 className="h1">Welcome to Kotto.io</h1>
          <p className="h4">
            Kotto.io is a Japanese text analyzer that breaks down any Japanese
            input into a vocabulary list. Use it as a study tool! Input Japanese
            text to get a breakdown of vocabulary words by JLPT level
          </p>
        </div>
      )}
      <Analyzer
        onOutputReturn={handleOutput}
        onError={handleError}
        onLoading={handleLoading}
        output={output}
        loading={loading}
      />
    </section>
  );
}
