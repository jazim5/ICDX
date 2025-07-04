"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  input: z.string().min(1, {
    message: "Please enter a medical code or phrase.",
  }),
});

interface CodexFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export function CodexForm({ onSubmit, isLoading }: CodexFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: "",
    },
  });

  function handleFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Medical Code or Phrase</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., E11.9 or Type 2 diabetes mellitus without complications"
                  className="resize-none min-h-[100px] text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter an ICD-10 code or a diagnostic phrase to get a detailed interpretation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Interpreting...
            </>
          ) : (
            "Interpret Code"
          )}
        </Button>
      </form>
    </Form>
  );
}
