import { config } from 'dotenv';
config();

import '@/ai/flows/generate-dj-messages.ts';
import '@/ai/flows/recommend-radio-stations.ts';
import '@/ai/flows/generate-creative-solution.ts';
import '@/ai/flows/evaluate-creative-solution.ts';
