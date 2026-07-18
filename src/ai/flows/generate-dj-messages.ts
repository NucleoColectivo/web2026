'use server';

/**
 * @fileOverview Generates short, context-aware messages for a radio station, adjusting to the station's genre and mood.
 *
 * - generateDjMessage - A function that generates the DJ message.
 * - GenerateDjMessageInput - The input type for the generateDjMessage function.
 * - GenerateDjMessageOutput - The return type for the generateDjMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDjMessageInputSchema = z.object({
  stationName: z.string().describe('The name of the radio station.'),
  genre: z.string().describe('The genre of music the station plays.'),
  mood: z.string().describe('The overall mood or vibe of the station.'),
});
export type GenerateDjMessageInput = z.infer<typeof GenerateDjMessageInputSchema>;

const GenerateDjMessageOutputSchema = z.object({
  message: z.string().describe('The generated DJ message.'),
});
export type GenerateDjMessageOutput = z.infer<typeof GenerateDjMessageOutputSchema>;

export async function generateDjMessage(input: GenerateDjMessageInput): Promise<GenerateDjMessageOutput> {
  return generateDjMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDjMessagePrompt',
  input: {schema: GenerateDjMessageInputSchema},
  output: {schema: GenerateDjMessageOutputSchema},
  prompt: `You are the voice of radio station {{stationName}}. Craft a short, engaging message to play between songs.

The station plays {{genre}} music and has a {{mood}} vibe. Keep the message brief and on-brand.

Message:`,
});

const generateDjMessageFlow = ai.defineFlow(
  {
    name: 'generateDjMessageFlow',
    inputSchema: GenerateDjMessageInputSchema,
    outputSchema: GenerateDjMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      message: output?.message ?? 'This is radio station ' + input.stationName,
    };
  }
);
