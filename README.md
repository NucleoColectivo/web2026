
# Núcleo Colectivo — Plataforma de Creación Contemporánea

![Núcleo Colectivo Logo](https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png)

**Núcleo Colectivo** es un laboratorio de creación, archivo vivo y vitrina digital diseñado para inventar el futuro del arte y la cultura desde la intersección entre la tecnología, la inteligencia artificial y el pensamiento crítico.

## 👁️ Identidad Gráfica

La estética de la plataforma se define como **"Brutalismo Técnico Orgánico"**. Combina la rigidez de las interfaces de sistemas (grids, monoespaciados, estados de carga) con la fluidez de las experiencias generativas y la sensibilidad artística.

### 🎨 Paleta de Colores
| Color | Hex | Uso Principal |
| :--- | :--- | :--- |
| **Amarillo Núcleo** | `#F8C300` | Acentos, llamadas a la acción, Splash Screen. |
| **Morado Núcleo** | `#4C0299` | Identidad primaria, gradientes de profundidad. |
| **Negro Profundo** | `#0A0A0A` | Fondos de alto contraste, tipografía sobre claro. |
| **Blanco Nieve** | `#FFFFFF` | Fondos limpios, lectura de manifiesto. |
| **Cian Técnico** | `#00FFFF` | Estados de la IA, Máquina Creativa. |

### 🔡 Tipografías
*   **Headlines (Space Grotesk):** Para títulos de alto impacto. Transmite una vibra tecnológica y moderna.
*   **Body (Montserrat):** Para textos largos y lectura fluida. Aporta elegancia y claridad.
*   **Technical (Space Mono):** Para metadatos, identificadores de sistema y la interfaz de la radio.

---

## 🛠️ Stack Tecnológico

*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - Renderizado híbrido y alto rendimiento.
*   **Inteligencia Artificial:** [Genkit 1.x](https://firebase.google.com/docs/genkit) + [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) - Orquestación de flujos de IA.
*   **UI/UX:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) + [ShadCN UI](https://ui.shadcn.com/) - Animaciones espaciales y componentes consistentes.
*   **Audio:** [Tone.js](https://tonejs.github.io/) - Motor de síntesis y manejo de audio reactivo.
*   **Backend:** [Firebase Auth](https://firebase.google.com/docs/auth) + [Firestore](https://firebase.google.com/docs/firestore).

---

## 💰 Gestión de Costos (Optimización Spark/Free Tier)

La plataforma está optimizada para operar bajo el **Plan Spark (Gratuito)** de Firebase y los niveles gratuitos de servicios externos. Se han implementado las siguientes medidas de ahorro:

1.  **Google Gemini API:** Se utiliza un sistema de **caché de sesión** para evitar llamadas repetidas por el mismo usuario. Los intervalos del Auto DJ se han ampliado a 20 minutos para minimizar el uso de tokens.
2.  **ElevenLabs (Voz):** El agente conversacional se carga únicamente **bajo demanda** del usuario, evitando el consumo pasivo de créditos de voz.
3.  **Firebase App Hosting:** Aunque requiere Plan Blaze para el despliegue inicial, el consumo de cómputo se mantiene al mínimo mediante la optimización de Server Actions.
4.  **Firestore:** Las lecturas en tiempo real están limitadas a componentes activos, reduciendo el conteo diario de operaciones.

---

## 🚀 Funcionalidades Clave

### 1. Sistema de Radio & Visualizador
Sintonización de emisoras experimentales globales con un **Visualizador de Malla Gravitacional** audioreactivo en tiempo real. Incluye un **Auto DJ impulsado por IA** con intervenciones contextuales optimizadas.

### 2. Máquina Creativa (Creative Machine V2)
Un orquestador de retos artísticos que utiliza IA para generar misiones de creación imposibles. Incluye un sistema de **caché inteligente** para reducir costes de procesamiento.

### 3. Games ESG (Serious Games)
Simuladores de activación estratégica como **"Conexión Sostenible"**, que permiten abordar criterios de sostenibilidad mediante aprendizaje basado en evidencia e IA narrativa opcional.

### 4. Canal Digital (Núcleo/Channel)
Archivo curado de contenidos audiovisuales especializados en arte y tecnología, organizados por núcleos temáticos.

---

## 📋 Requisitos de Despliegue

Este proyecto está diseñado para ejecutarse en **Firebase App Hosting**. Se recomienda monitorear las cuotas en el panel de Google Cloud para asegurar la permanencia en la capa gratuita.

**Variables de Entorno Necesarias:**
*   `GOOGLE_GENAI_API_KEY`: Para la comunicación con los modelos de Gemini.

---

## 🤝 Comunidad & Nodos

Núcleo Colectivo opera como una red expandida. Si tu práctica habita el cruce entre arte y tecnología, eres un nodo potencial.

*   **Instagram:** [@nucleo_colectivo_art](https://www.instagram.com/nucleo_colectivo_art/)
*   **TikTok:** [@ncleo.colectivo](https://www.tiktok.com/@ncleo.colectivo)

**© 2026 Núcleo Colectivo — Laboratorio, archivo y vitrina para la creación contemporánea.**
