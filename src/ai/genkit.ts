
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Configuración de Genkit utilizando el plugin de Google AI.
 * Optimizado para Plan Spark (Costo USD 0) mediante el uso de Gemini 2.5 Flash.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || 'AIzaSy_BUILD_PLACEHOLDER',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
