import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  textToSplit: z.string(),
});

export default function Analyzer({ onOutputReturn, onError, output }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToSplit: "",
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    const analyzeText = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/words?text=${encodeURIComponent(
            formData.textToSplit
          )}`,
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

    analyzeText();
  };

  const handleReset = () => {
    form.reset();
    onOutputReturn([]);
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="textToSplit"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  placeholder="Input Japanese text here. ここに日本語のテキストを入力してください..."
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button type="submit">Analyze</Button>
          {output.length > 0 ? (
            <Button variant="link" onClick={handleReset}>
              Reset
            </Button>
          ) : null}
        </form>
      </Form>
    </div>
  );
}
