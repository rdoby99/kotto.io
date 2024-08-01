import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

export default function Breakdown(props) {
  //Ensure we only output Japanese words and no duplicates
  // const japaneseRegex =
  //   /^[\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF66-\uFF9F]+$/;
  // let wordsToShow = props.words.filter((wordObj) =>
  //   japaneseRegex.test(wordObj[0].kanji[0]);
  // );
  // let uniqueWords = new Set(wordsToShow);
  let uniqueWords = new Set(props.words);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center h2">Vocabulary</h1>
      <div className="mb-4">
        <div className="max-h-[440px] overflow-y-scroll">
          <ul className="flex flex-col divide-y divide-accent/50">
            {[...uniqueWords].map((item, index) => (
              <li key={index} className="flex flex-col gap-2 py-4">
                <div className="flex gap-2">
                  {item.kanji.length && (
                    <div className="h5 mr-4">{item.kanji[0]}</div>
                  )}
                  {item.reading.length && (
                    <div className="h5 mr-4">({item.reading[0]})</div>
                  )}
                </div>
                {item.definition.length && <p>{item.definition[0].gloss}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button variant="outline" className="w-full">
        Export as CSV
      </Button>
    </div>
  );
}
