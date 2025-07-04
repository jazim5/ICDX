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
    type: z.string().describe('The category or classification of the code (e.g., disease, symptom).'),
    code_id: z.string().describe('The unique identifier for the ICD-10 code.'),
    parent_code: z.string().describe('The ICD-10 code of the broader category under which the code falls.'),
    code_title: z.string().describe('The official title or name of the ICD-10 code.'),
    version_number: z.string().describe('The version of the ICD-10 code set in use (e.g., "V24", "V28").').optional(),
    hcc_number: z.number().describe('Hierarchical Condition Category number associated with the code (2023 Data).').optional(),
    code_definition: z.string().describe('A detailed explanation of what the code represents.'),
    clinical_guidelines: z.string().describe('Guidelines for diagnosing or managing the condition associated with the code.'),
    epidemiology: z.string().describe('Information about the distribution and determinants of the disease in a population.'),
    cost_of_care: z.number().describe('Estimated cost associated with the treatment of conditions under this code.').optional(),
    comorbidities: z.array(z.string()).describe('List of other conditions commonly associated with the primary condition coded.'),
    quality_of_life_impact: z.string().describe("Information on how the condition affects patients' daily lives and overall quality of life."),
    outcomes: z.string().describe('Typical outcomes for the condition or its usual prognosis.'),
    prevention: z.string().describe('Measures that can prevent the onset of the condition.'),
    demographics: z.string().describe('Information on the populations most affected by the condition (age, sex, race, etc.).'),
    interoperability_considerations: z.string().describe('Factors affecting how the code interoperates with different systems or software.'),
    frequently_associated_codes: z.array(z.string()).describe('Codes that are often reported together with this code.'),
    diagnosis_criteria: z.string().describe('Criteria used to diagnose the condition associated with the code.'),
    chart_preparation: z.string().describe('Guidelines on how to document the condition in medical charts.'),
    treatment_protocols: z.string().describe('Protocols for the treatment of the condition linked to the code.'),
    medication_guidelines: z.string().describe('Guidelines regarding medications prescribed for the condition, including dosages.'),
    procedural_codes_linkage: z.array(z.string()).describe('Associated CPT codes for procedures related to the ICD-10 code.'),
    severity_or_stage: z.string().describe('Details on the severity or stage of the condition at the time of coding.'),
    risk_factors: z.array(z.string()).describe('Factors that increase the risk of developing the condition.'),
    statistical_incidence_and_prevalence_rates: z.string().describe('The statistical rates of incidence and prevalence of the condition.').optional(),
    legal_and_ethical_considerations: z.string().describe('Legal or ethical issues associated with diagnosing or treating the condition.'),
    reimbursement_guidelines: z.string().describe('Information on reimbursement practices related to the condition.'),
    international_variations: z.string().describe("Variations in the code's usage or interpretation across different countries."),
    historical_data: z.string().describe('Historical changes and evolution of the code and its application.'),
    research_links: z.array(z.string()).describe('Links or references to recent research related to the condition.'),
    patient_education_resources: z.array(z.string()).describe('Educational materials available for patients regarding their condition.'),
    clinical_decision_support: z.string().describe('Tools or systems that provide decision-making support based on the ICD-10 code.'),
    audit_criteria: z.string().describe('Criteria for auditing the use of this ICD-10 code in clinical settings.'),
    technology_and_digital_health_links: z.string().describe('How the code is used in technological applications like EMRs.'),
    inclusion_terms: z.array(z.string()).describe('Specific conditions included in this code.'),
    exclusion_terms: z.array(z.string()).describe("Conditions that shouldn't be coded here but somewhere else."),
    notes: z.string().describe('Specific coding instructions or clinical notes.'),
});
export type InterpretMedicalCodeOutput = z.infer<typeof InterpretMedicalCodeOutputSchema>;

export async function interpretMedicalCode(input: InterpretMedicalCodeInput): Promise<InterpretMedicalCodeOutput> {
  return interpretMedicalCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretMedicalCodePrompt',
  input: {schema: InterpretMedicalCodeInputSchema},
  output: {schema: InterpretMedicalCodeOutputSchema},
  prompt: `You are a clinical medical coding assistant for the Codex SaaS application. Given an ICD-10 code or diagnostic phrase, return a structured JSON object with comprehensive details about the code.

Your entire output must be a single valid JSON object. Populate all fields with relevant information. If information for a field is not available, provide a reasonable default or indicate that it's not applicable.

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
