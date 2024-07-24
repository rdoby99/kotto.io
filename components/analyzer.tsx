import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Analyzer({ onOutputReturn, onError, output }) {
  const [input, setInput] = useState("");

  const analyzeText = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/words?text=${encodeURIComponent(input)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onOutputReturn(data.words);
    } catch (error) {
      console.error("An error occurred:", error);
      onError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        placeholder="Input Japanese text here. ここに日本語のテキストを入力してください..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={analyzeText}>Analyze</Button>
      {output.length > 0 ? <Button variant="link">Reset</Button> : null}
    </div>
  );
}
