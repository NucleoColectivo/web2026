'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolutionInputSchema = z.object({
  concepto: z.string(),
  accion: z.string(),
  desafio: z.string(),
  contexto: z.string(),
});
export type SolutionInput = z.infer<typeof SolutionInputSchema>;


const SolutionOutputSchema = z.object({
  titulo: z.string().describe("Un título corto y de alto impacto para la solución propuesta."),
  solucion: z.string().describe("La descripción detallada de la solución disruptiva, en un párrafo potente y persuasivo."),
  palabrasClave: z.array(z.string()).length(3).describe("Tres palabras clave que encapsulen la esencia de la solución."),
});
export type SolutionOutput = z.infer<typeof SolutionOutputSchema>;


export async function generateCreativeSolution(
  input: SolutionInput
): Promise<SolutionOutput> {
  return generateCreativeSolutionFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateCreativeSolutionPrompt',
    input: { schema: SolutionInputSchema },
    output: { schema: SolutionOutputSchema },
    prompt: `Actúa como un consultor de innovación futurista y estratega creativo de 'Núcleo Colectivo'. Genera una solución disruptiva y detallada para este reto:
- Concepto: {{{concepto}}}
- Acción: {{{accion}}}
- Obstáculo: {{{desafio}}}
- Lugar: {{{contexto}}}
Tu respuesta debe ser estructurada. Proporciona un título de alto impacto, la descripción de la solución en un párrafo persuasivo y tres palabras clave que la definan. Usa un tono inspirador y tecnológico.`,
});

const generateCreativeSolutionFlow = ai.defineFlow(
  {
    name: 'generateCreativeSolutionFlow',
    inputSchema: SolutionInputSchema,
    outputSchema: SolutionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
