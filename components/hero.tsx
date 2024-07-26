"use client";

import React, { useState } from "react";
import Analyzer from "./analyzer";
import Breakdown from "./breakdown";

export default function Hero() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");

  const handleOutput = (value) => {
    setOutput(value);
  };

  const handleError = (value) => {
    setError(value);
  };

  return (
    <section className="grid md:grid-cols-2 gap-16 items-center w-full py-16 px-4 md:px-16 min-h-[70vh]">
      {output.length > 0 ? (
        <Breakdown words={output} />
      ) : (
        <div className="text-center col-span-1 flex flex-col gap-4">
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
        output={output}
      />
    </section>
  );
}