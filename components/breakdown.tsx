import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

export default function Breakdown(props) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center">Text Breakdown</h1>
      <div className="flex justify-around items-center">
        <Image
          src="/breakdown_circle.png"
          alt="Breakdown Numbers"
          width={100}
          height={100}
        />
        <div className="text-9xl">N3</div>
      </div>
      <div className="mb-4">
        <div className="flex gap-4 justify-end mb-6">
          <div>
            Sort By: <span>Level - High to Low</span>
          </div>
          <div>
            Filter: <span>Level</span>
          </div>
        </div>
        <div className="max-h-[440px] overflow-y-scroll">
          <ul className="flex flex-col divide-y divide-black">
            {props.words.map((item, index) => (
              <li key={index} className="flex flex-col gap-2 py-4">
                <div className="h5 mr-4">{item}</div>
                <div className="p-1 bg-pink-500 text-xs text-white inline-block w-fit">
                  JLPT N3
                </div>
                <p>Amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <div className="inline-block border border-black w-5 h-5"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-2 justify-end py-4">
        <div>Deselect All</div>
        <div>Select All</div>
      </div>
      <Button variant="outline" className="w-full">
        Export as CSV
      </Button>
    </div>
  );
}
