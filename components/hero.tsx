"use client";

import React, { useState } from "react";
import Analyzer from "./analyzer";
import { columns } from "./columns";
import { DataTable } from "./vocabTable";
import VocabListSkeleton from "./vocabListSkeleton";
import Image from "next/image";

export default function Hero() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOutput = (value: []) => {
    setOutput(value);
  };

  const handleError = (value: string) => {
    setError(value);
  };

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  return (
    <section className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center w-full py-8 pt-4 md:pt-4 px-4 md:px-16 min-h-[70vh] relative">
      {/* Vocab List */}
      {output.length > 0 && !loading && !error && (
        <div className="order-2 md:order-1">
          <h1 className="h2 mb-6">Vocabulary</h1>
          <DataTable columns={columns} data={output} />
        </div>
      )}

      {/* Skeleton */}
      {loading && <VocabListSkeleton classes="order-3 md:order-1 opacity-70" />}

      {/* Default screen */}
      {!loading && output.length == 0 && (
        <div className="text-left text-foreground col-span-1 flex flex-col gap-4 order-1">
          <h1 className="h1">Welcome to Kotto.io</h1>
          <p className="mb-8 md:max-w-[70%] text-lg">
            Kotto.io is a Japanese text analyzer that breaks down any Japanese
            input into a vocabulary list. Use it as a study tool!
            <br />
            <br />
            Try this sentence: これは猫です。(This is a cat.)
          </p>
          <p className="text-sm">
            *Please note: This is an alpha pre-release and some features are
            still under development.
          </p>
        </div>
      )}
      <div
        className={`${
          output.length > 0 ? "order-1 md:order-2" : "order-2"
        } h-full`}
      >
        <Analyzer
          onOutputReturn={handleOutput}
          onError={handleError}
          onLoading={handleLoading}
          output={output}
          loading={loading}
        />
        {error && <div>Try again.</div>}
      </div>
    </section>
  );
}
