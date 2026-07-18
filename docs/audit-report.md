# Informe de Auditoría Integral: Desarrollo, Experiencia de Usuario y Comunicación

## 1. Introducción y Objetivos de la Auditoría

Este informe presenta un análisis exhaustivo de los componentes clave que definen el éxito de un producto digital en el entorno actual. El propósito de esta auditoría es evaluar de manera integral las áreas de desarrollo técnico, rendimiento, experiencia de usuario (UX/UI), arquitectura de la información, accesibilidad web y comunicación de marca. A través de este diagnóstico, se identifican con precisión las fortalezas existentes y, fundamentalmente, las áreas de oportunidad que permitirán optimizar la calidad general del producto.

El objetivo final es proporcionar una serie de recomendaciones estratégicas y accionables, fundamentadas en las mejores prácticas de la industria, para mejorar la eficiencia, el alcance y el impacto del producto digital. Al abordar estos pilares de forma interconectada, sentamos las bases para un crecimiento sostenible, una mayor satisfacción del usuario y un posicionamiento más sólido en el mercado. A continuación, iniciaremos nuestro análisis con la evaluación de los cimientos técnicos que sustentan toda la experiencia digital: el desarrollo y el rendimiento.

## 2. Análisis de Desarrollo y Rendimiento Técnico

Una base técnica sólida es un pilar estratégico indispensable para cualquier producto digital. El rendimiento, la estabilidad y la eficiencia del código no son meras consideraciones técnicas; impactan directamente en la experiencia del usuario, la tasa de retención, la conversión y el posicionamiento en los motores de búsqueda. Un sitio lento o propenso a errores aleja a los usuarios y perjudica la reputación de la marca, sin importar la calidad de su contenido o diseño. La agilidad en el despliegue no puede comprometer la estabilidad; una ruptura en el pipeline de CI/CD, como se analizará, puede manifestarse instantáneamente como los problemas de rendimiento que esta sección detalla.

| Problema de Rendimiento | Impacto Potencial | Solución Estratégica |
| :--- | :--- | :--- |
| Tiempos de Carga Lentos | Altas tasas de rebote y bajo compromiso del usuario. Perjudica el posicionamiento en motores de búsqueda. | Comprimir imágenes, minificar código (CSS, HTML, JavaScript) y utilizar un hosting de alto rendimiento con integración de CDN. |
| Código No Optimizado | Aumento del tiempo que tardan las páginas en renderizarse debido a archivos HTML, CSS y JS inflados. | Minificar el código para eliminar caracteres y espacios innecesarios. Utilizar carga asíncrona para archivos JavaScript grandes. |
| Falta de Caché | El contenido dinámico se recarga en cada visita, ralentizando significativamente los tiempos de carga. | Implementar caché en el navegador para almacenar archivos localmente y utilizar una Red de Entrega de Contenido (CDN) para distribuir el contenido globalmente. |
| Demasiadas Solicitudes HTTP | El rendimiento se ve afectado al tener que cargar múltiples recursos (imágenes, scripts, hojas de estilo) por separado. | Combinar archivos CSS y JS. Habilitar la carga diferida (lazy loading) para imágenes y otros medios. |
| Mal Rendimiento del Hosting | Recursos limitados, tiempos de carga lentos y posibles tiempos de inactividad, especialmente en planes de hosting compartido. | Actualizar a un hosting gestionado en la nube (Managed Cloud Hosting) para obtener recursos dedicados, mayor velocidad y disponibilidad. |

### Análisis de Caso: Riesgos en el Entorno de Despliegue

El análisis de un incidente de error en el despliegue en Firebase App Hosting revela vulnerabilidades críticas en el pipeline de desarrollo. Un cambio en el entorno de construcción de Google Cloud Build (de `nodejs_20250928_RC00` a `nodejs_20251005_RC00`) introdujo una incompatibilidad que provocaba fallos en la inicialización del Firebase Admin SDK durante la fase de 'Collecting page data', rompiendo los despliegues. Este caso subraya varios aprendizajes clave:

*   **Criticidad de las actualizaciones del entorno:** Las actualizaciones automáticas o no supervisadas en las herramientas de construcción y despliegue (CI/CD) pueden introducir cambios disruptivos (breaking changes) que paralizan el flujo de trabajo.
*   **Impacto de la falta de comunicación:** El incidente fue percibido como un "cambio que rompe cosas y que no se comunicó correctamente", lo que obligó al desarrollador a invertir tiempo en una solución temporal (reescribir importaciones como dinámicas) que afectaba a toda la base de código.
*   **Necesidad de procesos de reversión (rollback):** La resolución final del incidente no provino de una solución alternativa del desarrollador, sino de la intervención directa del equipo de Firebase, que revirtió la actualización del entorno de construcción. Este hecho subraya que los mecanismos de rollback no son un lujo, sino una herramienta de recuperación crítica para la continuidad del servicio.

La robustez técnica y la fiabilidad de los procesos de despliegue son el prerrequisito para ofrecer una experiencia de usuario consistente y de alta calidad, tema que abordaremos a continuación.

## 3. Auditoría de Experiencia de Usuario (UX) y Arquitectura de la Información (AI)

La Arquitectura de la Información (AI) y la Experiencia de Usuario (UX) son los pilares que garantizan que un sitio web sea intuitivo, fácil de usar y, en última instancia, cumpla con sus objetivos de negocio. Una estructura de contenido lógica y una interacción clara son fundamentales para marcar el camino que el usuario debe seguir, evitando la frustración y asegurando que "sepa en todo momento dónde se encuentra". Una buena AI no solo organiza el contenido, sino que también gestiona las expectativas del visitante, guiándolo de forma natural hacia la información o las acciones deseadas.

Según el objetivo de la web, se pueden emplear diferentes modelos estructurales para organizar el contenido:

1.  **Estructura Jerárquica o de Árbol:** Es la más común. Parte de una página de inicio (raíz) desde la cual se ramifican páginas secundarias que, a su vez, pueden subdividirse. El contenido se vuelve más específico a medida que el usuario profundiza. Es ideal para sitios corporativos y portales con grandes volúmenes de información, ya que facilita la escalabilidad del contenido y refuerza la autoridad temática a ojos de los motores de búsqueda.
2.  **Estructura Lineal:** Guía al usuario a través de un camino único y predefinido, similar a la lectura de un libro, eliminando distracciones. Es perfecta para tutoriales, manuales, tours de productos o formularios extensos, maximizando las tasas de conversión al eliminar puntos de fuga y guiar al usuario hacia una única acción deseada.
3.  **Estructura en Red:** Las páginas se enlazan unas con otras sin una jerarquía aparente. Ofrece libertad al usuario, pero puede resultar caótica si no se implementan mecanismos de orientación. Es útil en sitios con contenido muy interconectado como wikis o bases de conocimiento, fomentando la exploración y el descubrimiento orgánico de información.
4.  **Estructura Lineal + Jerárquica:** Combina la organización esquemática de la jerarquía con la guía de un recorrido lineal. Permite estructurar grandes bloques de contenido y, al mismo tiempo, dirigir al usuario a través de procesos específicos. Es un modelo flexible y muy habitual, idóneo para plataformas complejas que combinan contenido informativo con flujos de tareas.

### Principio de Usabilidad: La Regla de los Tres Clics

Un principio fundamental de la usabilidad es que un usuario debe ser capaz de encontrar el contenido que necesita en el menor número de pasos posible. La "regla de los tres clics" recomienda que cualquier información importante sea accesible en un máximo de tres clics desde el punto de entrada. No es una restricción arbitraria, sino un principio de diseño que reduce la fricción del usuario, aumenta la probabilidad de conversión y previene el abandono de tareas clave.

Una gran experiencia de usuario debe ser, por definición, una experiencia para todos. Esto nos lleva directamente a la necesidad de que sea inclusiva y accesible.

## 4. Evaluación de Accesibilidad Web (Conforme a WCAG 2.1)

La accesibilidad web no debe ser vista como un mero requisito técnico o legal, sino como una oportunidad estratégica para crear un producto digital de mayor calidad. Su objetivo es derribar las barreras que impiden o dificultan el acceso, beneficiando a todos los usuarios, incluyendo a personas con discapacidades permanentes (visuales, auditivas, motoras), temporales (un brazo roto) o situacionales (entorno ruidoso, conexión lenta). Adoptar la accesibilidad es adoptar una filosofía de diseño inclusivo, definido como "el conjunto de características que debe incorporar un sitio web para que el mayor número posible de personas en el mayor número posible de circunstancias pueda acceder a él y usarlo". Por tanto, invertir en accesibilidad no es un centro de costes, sino una inversión directa en la ampliación del mercado potencial, la robustez del producto y la defensa de la marca.

Las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 se basan en cuatro principios fundamentales que garantizan un acceso robusto y universal.

### 4.1. Principio 1: Perceptible

La información y los componentes de la interfaz deben presentarse a los usuarios de formas que puedan percibir, sin depender de un único sentido.

*   **Puntos de Verificación Clave:**
    *   **Verificación de Alternativas Textuales:** Asegurar que todo contenido no textual (imágenes, iconos informativos, gráficos) cuente con una alternativa textual que comunique su propósito de forma equivalente.
    *   **Verificación de Alternativas Multimedia:** Comprobar que los medios tempodependientes, como vídeos o audios, ofrezcan alternativas sincronizadas (subtítulos) y transcripciones.
    *   **Análisis de Contraste:** Validar que exista un contraste de color suficiente entre el texto y el fondo para garantizar la legibilidad en diversas condiciones de iluminación y para usuarios con baja visión.

### 4.2. Principio 2: Operable

Los componentes de la interfaz de usuario y la navegación deben ser manejables por todos los usuarios, independientemente del dispositivo de entrada que utilicen.

*   **Puntos de Verificación Clave:**
    *   **Pruebas de Navegación por Teclado:** Validar que cada elemento interactivo sea plenamente operable utilizando únicamente el teclado, garantizando que no existan 'trampas de foco' que impidan al usuario continuar la navegación.
    *   **Evaluación de Tiempos Límite:** Confirmar que los usuarios disponen de tiempo suficiente para leer e interactuar con el contenido, ofreciendo mecanismos para ajustar o extender los límites de tiempo.
    *   **Auditoría de Navegación:** Facilitar que los usuarios puedan navegar, localizar contenido y determinar su ubicación actual dentro del sitio de manera clara y consistente.

### 4.3. Principio 3: Comprensible

La información y el manejo de la interfaz de usuario deben ser fáciles de entender, evitando la ambigüedad y la complejidad innecesaria.

*   **Puntos de Verificación Clave:**
    *   **Revisión de Legibilidad:** Asegurar que el contenido textual sea fácil de leer y comprender, empleando un lenguaje sencillo y evitando jerga no explicada.
    *   **Análisis de Predictibilidad:** Verificar que la navegación y la interacción operen de manera consistente y predecible en todo el sitio, evitando cambios de contexto inesperados.
    *   **Validación de Asistencia en Errores:** Confirmar que el sistema ayuda a los usuarios a evitar y corregir errores, especialmente en formularios, mediante instrucciones claras y mensajes de error específicos.

### 4.4. Principio 4: Robusto

El contenido debe ser lo suficientemente robusto como para ser interpretado de forma fiable por una amplia variedad de agentes de usuario, incluidas las tecnologías de asistencia, tanto actuales como futuras.

*   **Puntos de Verificación Clave:**
    *   **Validación de Código:** Comprobar que el código fuente sigue los estándares web para garantizar la máxima compatibilidad con diferentes navegadores, dispositivos y tecnologías de asistencia.
    *   **Revisión Semántica:** Asegurar el uso correcto de la semántica del código (HTML) para que la información, la estructura y las relaciones entre los elementos puedan ser determinadas y comunicadas por el software.

La claridad funcional que promueve la accesibilidad debe reflejarse también en la claridad visual de la interfaz y la comunicación de la marca.

## 5. Análisis de Interfaz de Usuario (UI) y Comunicación

Una interfaz de usuario (UI) eficaz trasciende la simple estética; actúa como el principal vehículo para la comunicación de la marca y la conexión con el público. El diseño visual, la tipografía, los colores y la disposición de los elementos no solo deben ser agradables, sino también funcionales y coherentes con el propósito del negocio. Como bien define la filosofía de Núcleo Studio, el objetivo es crear "Marcas y Sitios Web que conectan con tu audiencia".

### Consistencia Visual y de Marca

Una comunicación exitosa se basa en la consistencia. El proceso de branding estratégico consiste en descubrir la "esencia única de cada negocio" y transformarla en una marca memorable y coherente. Esta identidad debe manifestarse de forma consistente en todos los puntos de contacto, especialmente en el sitio web. Elementos como el logotipo, la paleta de colores, la tipografía y el estilo fotográfico deben aplicarse de manera uniforme para construir reconocimiento y confianza. Un diseño web que resuena con la identidad de la marca crea una experiencia digital que no solo es usable, sino también inspiradora.

### Claridad del Contenido y Tono de Voz

La simplicidad es un pilar de la comunicación efectiva. Un mensaje claro tiene más probabilidades de ser entendido y recordado. Esta práctica, fundamental para la accesibilidad, beneficia a todos los usuarios al reducir la carga cognitiva. Se recomienda utilizar un "lenguaje sencillo" y "estructurar los textos en secciones precedidas de encabezados", tal como indican las pautas de accesibilidad. El tono de voz —ya sea profesional, cercano, formal o didáctico— debe definirse y aplicarse de forma consistente para reflejar la personalidad de la marca y conectar auténticamente con la audiencia. En última instancia, la "esencia única" de una marca no se comunica a través de la complejidad, sino a través de una claridad rigurosa. Un lenguaje sencillo y una estructura clara no son solo una concesión a la accesibilidad, sino la expresión más pura y efectiva de la identidad de la marca.

Para lograr un impacto real, es crucial que la solidez técnica, la usabilidad intuitiva y una comunicación clara y coherente trabajen en conjunto.

## 6. Resumen de Hallazgos y Hoja de Ruta Estratégica

El análisis integral realizado a lo largo de este informe ha revelado oportunidades clave de mejora en las áreas de rendimiento técnico, arquitectura de la información, accesibilidad y comunicación visual. Si bien existen fortalezas en la concepción del producto, la optimización de estos puntos críticos es fundamental para elevar la calidad de la experiencia del usuario, ampliar el alcance y maximizar el impacto. Esta sección final consolida los hallazgos más importantes y los traduce en una hoja de ruta accionable para guiar los esfuerzos futuros.

### Hallazgos Principales

*   **Riesgos Críticos de Rendimiento:** El análisis confirma la existencia de cuellos de botella de rendimiento, como tiempos de carga elevados y código no optimizado, que erosionan directamente la experiencia del usuario y penalizan el posicionamiento SEO.
*   **Incumplimiento Normativo de Accesibilidad:** Se han detectado barreras de accesibilidad que incumplen principios fundamentales de las WCAG 2.1, lo que no solo excluye a un segmento de usuarios, sino que expone a la organización a riesgos legales y de reputación significativos.
*   **Vulnerabilidades Estratégicas en el Despliegue:** El pipeline de CI/CD presenta una dependencia crítica de entornos de construcción externos sin mecanismos de reversión formalizados, lo que genera un riesgo operativo de interrupción del servicio.
*   **Fricción en la Experiencia de Usuario:** La arquitectura de la información actual presenta inconsistencias que contravienen principios de usabilidad, como la "regla de los tres clics", dificultando el acceso a contenidos y funcionalidades clave.
*   **Dilución de la Identidad de Marca:** Se observan inconsistencias en la aplicación de la identidad visual y el tono de voz, lo que debilita la coherencia del mensaje de la marca y la conexión con la audiencia.

### Hoja de Ruta de Mejoras Recomendadas

La siguiente tabla presenta un plan de acción priorizado para abordar los hallazgos identificados y transformar las debilidades en fortalezas estratégicas.

| Área de Mejora | Acción Específica Recomendada | Prioridad |
| :--- | :--- | :--- |
| Rendimiento Web | Implementar una estrategia completa de optimización: compresión de imágenes, minificación de CSS/JS, habilitación de caché de navegador y uso de una CDN. | CRÍTICA |
| Accesibilidad Web | Realizar una auditoría completa conforme a las WCAG 2.1 Nivel AA. Corregir prioritariamente errores de contraste de color y la falta de alternativas textuales en imágenes informativas. | Alta |
| Procesos de Despliegue | Establecer un protocolo de monitorización para actualizaciones de entornos de construcción y definir un plan formal de reversión (rollback) para mitigar incidentes de forma rápida. | Alta |
| Arquitectura de la Información (AI) | Revisar y rediseñar la estructura de navegación para asegurar que las tareas y contenidos clave se puedan completar o encontrar en menos de tres clics. | Media |
| Comunicación y UI | Desarrollar y documentar una guía de estilo visual y de tono de voz. Aplicarla de manera rigurosa en todo el sitio web para garantizar la coherencia de la marca. | Media |

---

## MODELO DE HONORARIOS INSTITUCIONAL

Programa IA para Procesos Creativos (16 horas)

### 1. Propósito del documento

Este documento define el modelo de honorarios institucional del Programa IA para Procesos Creativos, con el fin de:

*   Garantizar sostenibilidad humana y financiera del equipo núcleo.
*   Asegurar calidad pedagógica y continuidad del programa.
*   Presentar un esquema claro, defendible y profesional ante instituciones, aliados y convocatorias.

El modelo está diseñado para ser:

*   Escalable
*   Transparente
*   Replicable
*   Ajustable según volumen de talleres

### 2. Principio estructural (Regla Núcleo)

El programa se rige por el siguiente principio:
**Ningún integrante del equipo núcleo trabaja por debajo de un piso de sostenibilidad mensual.**

Este principio no implica que cada taller cubra dichos montos de manera individual.

**Distinción clave:**

*   El taller es la unidad operativa (16 horas).
*   El mes es la unidad estratégica de sostenibilidad.

Los honorarios por taller se leen de forma acumulativa mensual, no aislada.

### 3. Pisos e ideales de sostenibilidad (referencia interna)

Estos valores se usan para planeación interna. No se presentan como sueldos fijos ante instituciones.

| Rol | Piso mensual | Ideal mensual |
| :--- | :--- | :--- |
| Dirección creativa | $4.000.000 COP | $6.000.000 COP |
| Diseño pedagógico / audiovisual | $3.000.000 COP | $4.000.000 COP |
| Gestión, alianzas y facilitación | $3.000.000 COP | $4.000.000 COP |

### 4. Roles institucionales y funciones

#### 4.1 Dirección creativa y del programa

*   **Funciones:**
    *   Dirección general del programa
    *   Diseño conceptual y metodológico
    *   Curaduría de procesos y resultados
    *   Facilitación principal de los talleres
*   **Aplicación de honorarios:**
    *   Honorarios por taller (16 h): $1.200.000 COP
    *   Ingreso mensual proporcional al número de talleres realizados

#### 4.2 Diseño pedagógico y producción audiovisual

*   **Funciones:**
    *   Co-diseño pedagógico del programa
    *   Acompañamiento técnico y metodológico
    *   Registro audiovisual, documentación y memoria
    *   Soporte durante las sesiones
*   **Aplicación de honorarios:**
    *   Honorarios por taller (16 h): $1.000.000 COP
    *   Ingreso mensual proporcional al número de talleres realizados

#### 4.3 Gestión, alianzas, facilitación y expansión

*   **Perfil del rol:** Rol estratégico integral con funciones pedagógicas, comunicativas y de gestión.
*   **Funciones:**
    *   Gestión general del programa
    *   Diseño y ejecución de alianzas institucionales
    *   Producción y organización de actividades y eventos
    *   Comunicación estratégica y relación con comunidades
    *   Escritura, sistematización y presentación de proyectos
    *   Facilitación de sesiones específicas cuando aplique
*   **Aplicación de honorarios (modelo mixto):**
    *   **Facilitación / apoyo operativo en talleres**
        *   Honorarios por taller (16 h): $600.000 – $800.000 COP
        *   Valor de referencia: $750.000 COP
    *   **Comisión por venta de talleres**
        *   10% del valor del taller vendido
        *   Aplica únicamente cuando la venta es gestionada directamente
        *   Funciona como incentivo, no como ingreso base

Este esquema permite que el rol no dependa exclusivamente de la venta, fortaleciendo la estabilidad del programa.

### 5. Presupuesto base por taller (16 horas)

**Valor institucional del taller: $5.250.000 COP**

**Distribución de referencia:**

| Concepto | Valor aproximado |
| :--- | :--- |
| Dirección creativa y facilitación | $1.200.000 |
| Diseño pedagógico y audiovisual | $1.000.000 |
| Gestión / facilitación complementaria | $750.000 |
| Caja Núcleo Colectivo / operación | $2.300.000 |
| **Total** | **$5.250.000** |

### 6. Caja Núcleo Colectivo (gastos operativos y sostenibilidad)

La Caja Núcleo Colectivo cubre:

*   Coordinación general
*   Administración y contabilidad básica
*   Diseño gráfico y comunicación
*   Desarrollo y mantenimiento de plataforma
*   Producción de materiales
*   Reserva para imprevistos
*   Reinversión en crecimiento del programa

Esta caja es indispensable para la continuidad del proyecto y su formalización institucional.

### 7. Escenarios de volumen mensual (referencia interna)

| Talleres / mes | Estado del proyecto |
| :--- | :--- |
| 1–2 talleres | Activación inicial / piloto |
| 3–4 talleres | Punto de equilibrio sostenible |
| 5–6 talleres | Estabilidad y mejora continua |
| 7–8 talleres | Escalamiento y contratación externa |

### 8. Tope operativo recomendado

Para preservar la calidad y evitar sobrecarga:

*   Máximo recomendado: 6 talleres / mes por integrante núcleo
*   A partir de ese punto:
    *   Se activa contratación de facilitadores externos
    *   El núcleo mantiene roles de dirección y supervisión

### 9. Principio de ajuste en meses bajos

Cuando el volumen mensual es menor:

*   Se prioriza la sostenibilidad humana
*   Se ajusta el margen de la caja Núcleo
*   El riesgo lo asume la estructura, no las personas

Este criterio diferencia un programa institucional de un esquema informal.

### 10. Cierre

Este modelo de honorarios:

*   No encarece artificialmente el programa
*   Formaliza una estructura existente
*   Garantiza continuidad, calidad y crecimiento
*   Es compatible con alianzas, convocatorias y licenciamiento

El Programa IA para Procesos Creativos se concibe como un sistema vivo, no como una suma aislada de talleres.

---

## TABLA–RESUMEN EJECUTIVA (1 PÁGINA)

Modelo de honorarios institucional – Programa IA para Procesos Creativos
(Formato defendible ante instituciones (sin sueldos explícitos))

| Ítem | Descripción |
| :--- | :--- |
| Duración estándar | 16 horas (4 sesiones × 4 horas) |
| Valor institucional base | $5.250.000 COP |
| Incluye | Diseño metodológico, facilitación, producción, documentación y cierre |
| Equipo núcleo | Dirección creativa, diseño pedagógico, gestión/alianzas |
| Caja Núcleo Colectivo | Gestión, operación, documentación, reinversión |

**Distribución funcional por taller (referencial):**

*   **Dirección y facilitación principal:** Conducción conceptual y metodológica
*   **Co-diseño pedagógico y audiovisual:** Soporte técnico, registro y memoria
*   **Gestión, alianzas y facilitación parcial:** Coordinación, producción, sesiones específicas
*   **Caja Núcleo:** Operación, continuidad y crecimiento

*Nota institucional: el valor del taller responde a un modelo sostenible de equipo y operación, no a honorarios individuales por hora.*

---

## ANEXO FINANCIERO INTERNO (USO DE GESTIÓN)

**Supuestos base:**

*   Valor taller 16 h: $5.250.000
*   Taller corto / flash (3–4 h): $1.200.000
*   Evento / activación institucional: $2.000.000 promedio

**Simulador mensual – Talleres estándar (16 h):**

| Talleres / mes | Ingreso bruto | Manuel | Carlos | Cecilia* | Caja Núcleo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | $5.25M | $1.2M | $1.0M | $0.53M | $2.52M |
| 2 | $10.5M | $2.4M | $2.0M | $1.05M | $5.05M |
| 4 | $21.0M | $4.8M | $4.0M | $2.1M | $10.1M |
| 6 | $31.5M | $7.2M | $6.0M | $3.15M | $15.15M |

*\*Cecilia: comisión base 10% + posibilidad de pago adicional por facilitación.*

**Simulador complementario – Talleres cortos y eventos:**

| Actividad | Valor unitario | Observación |
| :--- | :--- | :--- |
| Taller corto (3–4 h) | $1.200.000 | Ideal para eventos y convocatorias |
| Evento / activación | $2.000.000 | Charlas, muestras, lanzamientos |

**Ejemplo mensual mixto:**

*   2 talleres estándar = $10.5M
*   2 talleres cortos = $2.4M
*   1 evento = $2.0M
*   **Total mes: $14.9M**

Permite:

*   Completar pisos individuales
*   Proteger caja Núcleo
*   Reducir presión sobre talleres largos

**Tope operativo recomendado:**

| Rol | Máx. talleres 16 h / mes |
| :--- | :--- |
| Manuel | 6 |
| Carlos | 6 |
| Cecilia | 4 (como facilitadora parcial) |

A partir del taller #7 mensual se recomienda contratar facilitadores externos y mantener dirección desde Núcleo.

**Regla de reinversión anual (Caja Núcleo):**

*   Reinversión mínima: 20–30% de la caja anual
*   Destino prioritario:
    *   Plataforma (bitácora, archivo, web)
    *   Marketing y ventas institucionales
    *   Documentación y licenciamiento del programa

**Lectura final:** Este modelo permite operar desde 1 taller sin quiebre, alcanzar equilibrio real con 4 talleres/mes y escalar de forma sana combinando talleres estándar, formatos cortos y eventos institucionales.

---

## Tarifas para Facilitadores Externos (cuando se supera el tope operativo)

**Principio base:**
Cuando el número de talleres mensuales supera el tope operativo del core, Núcleo Colectivo no redistribuye ni reduce honorarios internos. En su lugar, se activa contratación de facilitadores externos bajo un esquema claro, justo y escalable.

**Regla:**

*   El core mantiene su piso mensual.
*   El crecimiento se absorbe vía externos.
*   La calidad se garantiza con lineamientos y supervisión del core.

**Tope operativo de referencia:**

*   Manuel: hasta 4 talleres/mes como facilitador principal.
*   Carlos: hasta 4 talleres/mes (incluye producción y documentación).
*   Cecilia: hasta 3–4 talleres/mes combinando gestión + facilitación.

A partir del taller 5, se activa esquema de externos.

**Esquema de contratación de externos (por taller de 16 h):**

*   **Facilitador/a externo/a principal:**
    *   Honorario: $700.000 – $900.000 COP por taller (16 h)
    *   Perfil: artista, diseñador/a, educador/a o tecnólogo/a con experiencia práctica en IA creativa.
    *   Función: dictar sesiones asignadas siguiendo el programa Núcleo.
*   **Co-facilitador/a o apoyo técnico:**
    *   Honorario: $350.000 – $500.000 COP por taller
    *   Función: acompañamiento técnico, soporte a participantes, asistencia en dinámicas.

**Tarifas por sesión (si se contrata parcialmente):**

*   **Sesión de 4 h:**
    *   Facilitador externo: $180.000 – $250.000 COP
    *   Apoyo técnico: $120.000 – $150.000 COP
*   **Taller corto / flash (3 h):**
    *   Facilitador externo: $200.000 – $300.000 COP

**Rol del core cuando hay externos:**

*   **Manuel:**
    *   Dirección creativa y curaduría (no siempre en aula)
    *   Revisión de contenidos y resultados
    *   Acompañamiento conceptual
*   **Carlos:**
    *   Lineamientos técnicos y de calidad
    *   Supervisión audiovisual y documentación
*   **Cecilia:**
    *   Coordinación, agenda, contrato y seguimiento
    *   Relación institucional y logística

👉 El core no se diluye: se convierte en dirección + control de calidad.

**Impacto en caja Núcleo:**

*   El costo de externos se cubre desde:
    *   Margen operativo
    *   Caja Núcleo
    *   Incremento por volumen
*   **Regla sana:**
    *   Máx. 30–35% del valor del taller destinado a externos.
    *   Núcleo conserva mínimo 20% de margen para sostenibilidad y reinversión.

**Ventajas del esquema:**

*   Permite escalar sin quemar al equipo.
*   Crea red de colaboradores certificados.
*   Prepara el terreno para licencias y formación de formadores.
*   Hace a Núcleo replicable y exportable.

**Nota estratégica:**
Los facilitadores externos no reemplazan al core. Son extensión operativa del programa. El valor de Núcleo está en:

*   el diseño
*   la metodología
*   la curaduría
*   la visión

Eso no se subcontrata.

---

## CONCLUSIÓN OPERATIVA (INTERNA)

*   El límite sano del core es 6 talleres/mes.
*   El taller #7 no se celebra, se sistematiza.
*   La caja Núcleo permite crecer sin sacrificar personas.
*   La reinversión anual convierte talleres en infraestructura cultural.

**Regla final: si el crecimiento no paga sistema, personas y archivo, no es crecimiento.**

---

## Resumen Ejecutivo

El producto presenta una base conceptual sólida, pero evidencia debilidades críticas en rendimiento, accesibilidad y procesos de despliegue que comprometen su escalabilidad, confiabilidad y alcance.

### Riesgos principales identificados:

*   **Rendimiento insuficiente:** afectando SEO, retención y percepción de calidad.
*   **Incumplimientos de accesibilidad (WCAG 2.1):** que excluyen usuarios y generan riesgo legal.
*   **Vulnerabilidad en el pipeline de despliegue:** con dependencia crítica de cambios externos no controlados.
*   **Fricción en la navegación:** dificultando el acceso a contenidos clave.
*   **Inconsistencias de identidad visual y tono:** debilitando la comunicación de marca.

### Recomendación estratégica:

Abordar estas áreas de forma coordinada —no aislada— permitirá transformar el producto en una plataforma robusta, inclusiva y alineada con estándares internacionales, fortaleciendo su impacto y sostenibilidad.
