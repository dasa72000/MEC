'use server';

/**
 * @fileOverview A form data validation AI agent.
 *
 * - validateFormData - A function that handles the form data validation process.
 * - ValidateFormDataInput - The input type for the validateFormData function.
 * - ValidateFormDataOutput - The return type for the validateFormData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateFormDataInputSchema = z.object({
  marriageData: z.record(z.any()).describe('Data related to the marriage.'),
  groomData: z.record(z.any()).describe('Personal data of the groom.'),
  brideData: z.record(z.any()).describe('Personal data of the bride.'),
  address: z.record(z.any()).describe('Address information.'),
  growthLadder: z.array(z.string()).describe('List of growth ladder steps.'),
  serverRetreats: z.array(z.record(z.any())).describe('List of server retreats.'),
  secretariats: z.array(z.record(z.any())).describe('List of secretariats.'),
  growthGroups: z.array(z.record(z.any())).describe('List of growth groups.'),
  observations: z.string().describe('Any observations related to the form data.'),
});
export type ValidateFormDataInput = z.infer<typeof ValidateFormDataInputSchema>;

const ValidateFormDataOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the form data is valid or not.'),
  errors: z.array(z.string()).describe('List of validation errors, if any.'),
});
export type ValidateFormDataOutput = z.infer<typeof ValidateFormDataOutputSchema>;

export async function validateFormData(input: ValidateFormDataInput): Promise<ValidateFormDataOutput> {
  return validateFormDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateFormDataPrompt',
  input: {schema: ValidateFormDataInputSchema},
  output: {schema: ValidateFormDataOutputSchema},
  prompt: `You are an AI expert in validating form data for a marriage application.

  Your task is to ensure that the provided data is valid, complete, and accurate.
  Pay close attention to:
  - Missing required fields.
  - Inconsistent or illogical data.
  - Data types and formats.
  - Year ranges (1970-2035 for year fields).
  - Completeness of records in dynamic lists (no partial entries).

  Based on your validation, determine if the form data is valid or not and provide a list of specific errors if any.

  Input Data:
  Marriage Data: {{{json marriageData}}}
  Groom Data: {{{json groomData}}}
  Bride Data: {{{json brideData}}}
  Address: {{{json address}}}
  Growth Ladder: {{{json growthLadder}}}
  Server Retreats: {{{json serverRetreats}}}
  Secretariats: {{{json secretariats}}}
  Growth Groups: {{{json growthGroups}}}
  Observations: {{{observations}}}
  Output should be a JSON object with "isValid" (boolean) and "errors" (array of strings) fields.
  `,
});

const validateFormDataFlow = ai.defineFlow(
  {
    name: 'validateFormDataFlow',
    inputSchema: ValidateFormDataInputSchema,
    outputSchema: ValidateFormDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
