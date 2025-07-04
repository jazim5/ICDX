"use client";

import { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { CodexForm } from '@/components/codex/codex-form';
import { CodexResults } from '@/components/codex/codex-results';
import { InitialState } from '@/components/codex/initial-state';
import { ResultsSkeleton } from '@/components/codex/results-skeleton';
import { interpretMedicalCode } from '@/ai/flows/interpret-medical-code';
import type { InterpretMedicalCodeOutput } from '@/ai/flows/interpret-medical-code';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [result, setResult] = useState<InterpretMedicalCodeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (input: string) => {
    if (!input) {
      toast({
        title: "Input required",
        description: "Please enter a medical code or phrase.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const output = await interpretMedicalCode({ input });
      setResult(output);
    } catch (error) {
      console.error("Error interpreting medical code:", error);
      toast({
        title: "An Error Occurred",
        description: "We couldn't process your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-headline text-foreground">
                Codex Assistant
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <CodexForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <div className="min-h-[400px]">
            {isLoading && <ResultsSkeleton />}
            {result && !isLoading && <CodexResults data={result} />}
            {!result && !isLoading && <InitialState />}
          </div>
        </div>
      </main>

      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Codex Assistant. For informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
