import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  textToSplit: z.string().min(1, {
    message: "Text must contain at least one word.",
  }),
});

interface AnalyzerProps {
  onOutputReturn: (value: []) => void;
  onError: (value: string) => void;
  onLoading: (value: boolean) => void;
  output: {}[];
  loading: boolean;
  classes: string | null;
}

export default function Analyzer({
  onOutputReturn,
  onError,
  onLoading,
  output,
  loading,
  classes,
}: AnalyzerProps) {
  const Gloss = z.object({
    gloss: z.array(z.string()),
  });

  const Entry = z.object({
    kanji: z.union([z.array(z.string()), z.null()]),
    reading: z.array(z.string()),
    definition: z.array(Gloss),
  });

  const List = z.object({
    list: z.array(Entry),
  });

  type ListType = z.infer<typeof List>;
  type EntryType = z.infer<typeof Entry>;

  const [text, setText] = useState<ListType>();
  const [isEditMode, setIsEditMode] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToSplit: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    onLoading(true);
    try {
      const response = await fetch(
        `/api/words?text=${encodeURIComponent(formData.textToSplit)}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setText(data);
      setIsEditMode(false);
      onOutputReturn(data.list);
      onLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      onError("Error: Server Error");
      onLoading(false);
    }
  };

  const handleReset = () => {
    setIsEditMode(true);
    form.reset();
    onOutputReturn([]);
  };

  const renderTooltips = useCallback((data: ListType) => {
    return data.list.map((word: EntryType, index: number) => (
      <TooltipProvider key={index}>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <span className="cursor-help border-b border-dotted border-gray-400 hover:bg-primary/50">
              {word.kanji ? word.kanji[0] : word.reading[0]}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              {word.kanji ? (
                <p>
                  {word.kanji[0]} ({word.reading[0]})
                </p>
              ) : (
                <p>{word.reading[0]}</p>
              )}
              <p>{word.definition[0].gloss.join("; ")}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ));
  }, []);

  return (
    <div
      className={`flex flex-col gap-4 h-full py-4 md:py-32 w-full ${classes}`}
    >
      {output.length > 0 && (
        <div className="flex items-center space-x-2">
          <Switch
            id="edit-mode"
            checked={isEditMode}
            onCheckedChange={setIsEditMode}
          />
          <Label htmlFor="edit-mode">
            {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
          </Label>
        </div>
      )}
      {isEditMode ? (
        <Form {...form}>
          <form
            className="h-full flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="textToSplit"
              render={({ field }) => (
                <FormItem className="grow flex flex-col">
                  <Textarea
                    placeholder="Input Japanese text here. ここに日本語のテキストを入力してください..."
                    className="grow bg-white text-background text-lg"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Analyze
            </Button>
            {output.length > 0 ? (
              <Button variant="link" onClick={handleReset} disabled={loading}>
                Reset
              </Button>
            ) : null}
          </form>
        </Form>
      ) : (
        <div className="flex flex-col">
          <div className="hidden md:inline-block text-sm italic opacity-70 pb-4">
            Hover over words to get the definition.
          </div>
          <div className="text-sm italic opacity-70 pb-4 md:hidden">
            Tap on words to get the definition.
          </div>
          <div className="bg-white p-4 rounded-md shadow min-h-[100px] text-xl text-background">
            {text && renderTooltips(text)}
          </div>
          <Button variant="link" onClick={handleReset} disabled={loading}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
