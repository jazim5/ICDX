'use server';

/**
 * @fileOverview An AI agent for interpreting medical codes (ICD-10).
 *
 * - interpretMedicalCode - A function that takes an ICD-10 code or diagnostic phrase and returns a structured JSON object.
 * - InterpretMedicalCodeInput - The input type for the interpretMedicalCode function.
 * - InterpretMedicalCodeOutput - The return type for the interpretMedicalCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretMedicalCodeInputSchema = z.object({
  input: z
    .string()
    .describe('The ICD-10 code or diagnostic phrase to interpret.'),
});
export type InterpretMedicalCodeInput = z.infer<typeof InterpretMedicalCodeInputSchema>;

const InterpretMedicalCodeOutputSchema = z.object({
  code_id: z.string().describe('The ICD-10 code.'),
  description: z.string().describe('Plain-language description of the code.'),
  category: z.string().describe('Major ICD-10 category.'),
  applicable_settings: z
    .array(z.string())
    .describe('List of clinical settings where the code is typically used.'),
  diagnostic_criteria: z
    .string()
    .describe('Concise diagnostic criteria or guidance.'),
  MEAT_compliance_recommendations: z
    .string()
    .describe(
      'Recommendations for Monitor, Evaluate, Assess, and Treat documentation.'
    ),
});
export type InterpretMedicalCodeOutput = z.infer<typeof InterpretMedicalCodeOutputSchema>;

export async function interpretMedicalCode(input: InterpretMedicalCodeInput): Promise<InterpretMedicalCodeOutput> {
  return interpretMedicalCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretMedicalCodePrompt',
  input: {schema: InterpretMedicalCodeInputSchema},
  output: {schema: InterpretMedicalCodeOutputSchema},
  prompt: `You are a clinical medical coding assistant for the Codex SaaS application. Given an ICD-10 code or diagnostic phrase, return a structured JSON object with these fields:

- code_id: The ICD-10 code
- description: Plain-language description
- category: Major ICD-10 category
- applicable_settings: List of clinical settings where the code is typically used
- diagnostic_criteria: Concise diagnostic criteria or guidance
- MEAT_compliance_recommendations: Recommendations for Monitor, Evaluate, Assess, and Treat documentation

Your entire output must be a single valid JSON object with these fields only, no additional text.

Input:
{{input}}`,
});

const interpretMedicalCodeFlow = ai.defineFlow(
  {
    name: 'interpretMedicalCodeFlow',
    inputSchema: InterpretMedicalCodeInputSchema,
    outputSchema: InterpretMedicalCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
