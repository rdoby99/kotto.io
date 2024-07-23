import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Analyzer() {
  const [analysis, setAnalysis] = useState(false);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");

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
      setOutput(data.words);
      setAnalysis(true);
    } catch (error) {
      console.error("An error occurred:", error);
      setError(error.message);
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
      {analysis ? <Button variant="text">Reset</Button> : null}
    </div>
  );
}
