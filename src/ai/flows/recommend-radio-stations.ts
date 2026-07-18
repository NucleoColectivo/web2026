'use server';

/**
 * @fileOverview An AI agent that recommends radio stations based on user listening history.
 *
 * - recommendRadioStations - A function that handles the radio station recommendation process.
 * - RecommendRadioStationsInput - The input type for the recommendRadioStations function.
 * - RecommendRadioStationsOutput - The return type for the recommendRadioStations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRadioStationsInputSchema = z.object({
  listeningHistory: z
    .string()
    .describe('The user listening history as a string.'),
});
export type RecommendRadioStationsInput = z.infer<typeof RecommendRadioStationsInputSchema>;

const RecommendRadioStationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended radio stations based on the listening history.'),
});
export type RecommendRadioStationsOutput = z.infer<typeof RecommendRadioStationsOutputSchema>;

export async function recommendRadioStations(input: RecommendRadioStationsInput): Promise<RecommendRadioStationsOutput> {
  return recommendRadioStationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRadioStationsPrompt',
  input: {schema: RecommendRadioStationsInputSchema},
  output: {schema: RecommendRadioStationsOutputSchema},
  prompt: `You are a radio station recommendation expert.

  Based on the user's listening history, recommend radio stations that the user might like.
  The radio stations should be similar to the stations in the listening history.
  Be concise.

  User Listening History: {{{listeningHistory}}}`,
});

const recommendRadioStationsFlow = ai.defineFlow(
  {
    name: 'recommendRadioStationsFlow',
    inputSchema: RecommendRadioStationsInputSchema,
    outputSchema: RecommendRadioStationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
