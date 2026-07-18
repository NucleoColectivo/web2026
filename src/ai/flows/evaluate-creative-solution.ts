'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluationInputSchema = z.object({
  concepto: z.string(),
  accion: z.string(),
  desafio: z.string(),
  contexto: z.string(),
  propuesta: z.string().describe("La solución propuesta por el usuario al reto creativo."),
});
export type EvaluationInput = z.infer<typeof EvaluationInputSchema>;


const EvaluationOutputSchema = z.object({
  puntuacion: z.number().min(0).max(100).describe("Un puntaje de 0 a 100 evaluando la propuesta. Considera originalidad, viabilidad y alineación con el reto."),
  calificacion: z.string().describe("Una calificación cualitativa (Ej: 'Buen Comienzo', 'Propuesta Sólida', 'Visión Innovadora')."),
  titulo: z.string().describe("Un título corto y potente para la retroalimentación (Ej: 'Potencial Disruptivo Detectado')."),
  retroalimentacion: z.string().describe("Feedback constructivo y detallado sobre la propuesta del usuario, destacando fortalezas y áreas de mejora. Debe ser alentador y técnico."),
});
export type EvaluationOutput = z.infer<typeof EvaluationOutputSchema>;


export async function evaluateCreativeSolution(
  input: EvaluationInput
): Promise<EvaluationOutput> {
  return evaluateCreativeSolutionFlow(input);
}

const prompt = ai.definePrompt({
    name: 'evaluateCreativeSolutionPrompt',
    input: { schema: EvaluationInputSchema },
    output: { schema: EvaluationOutputSchema },
    prompt: `Eres un experto consultor de innovación y director creativo en 'Núcleo Colectivo'. Tu tarea es evaluar una propuesta de solución para un reto creativo específico. Sé crítico, justo y alentador.

**RETO CREATIVO:**
- Concepto: {{{concepto}}}
- Acción: {{{accion}}}
- Obstáculo: {{{desafio}}}
- Lugar: {{{contexto}}}

**PROPUESTA DEL USUARIO:**
"{{{propuesta}}}"

**TU EVALUACIÓN:**
Analiza la propuesta del usuario y genera una evaluación estructurada. Otorga un puntaje basado en:
1.  **Originalidad (35%):** ¿La idea es fresca y novedosa?
2.  **Viabilidad (35%):** ¿Es factible de implementar en el contexto dado?
3.  **Alineación (30%):** ¿Responde directamente al reto planteado?

Proporciona una calificación cualitativa, un título para el feedback y una retroalimentación detallada que inspire al usuario a mejorar.`,
});

const evaluateCreativeSolutionFlow = ai.defineFlow(
  {
    name: 'evaluateCreativeSolutionFlow',
    inputSchema: EvaluationInputSchema,
    outputSchema: EvaluationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
