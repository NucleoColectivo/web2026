
// --- CONFIGURACIÓN DE RUTAS GITHUB (AUDIO E IMAGEN) ---
export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/RADIO/audio/";
export const GITHUB_IMG_BASE = "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/";

// --- PODCAST DATA ---
export const PODCAST_DATA = {
  id: 'en-la-sala-con-cosiaca',
  image: 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/podcast_en%20la%20sala.png',
  episodes: [
    { id: 'saludo', duration: '2:15', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/_saludo.mp3`, type: 'audio', categoryKey: 'podcast.categories.intro' },
    { id: 'culebreo', duration: '8:45', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/10%20culebrero%20fin2.mp3`, type: 'audio', categoryKey: 'podcast.categories.character' },
    { id: 'trocha', duration: '7:20', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/11%20el_encuentro_en_la_trocha%20fin2.mp3`, type: 'audio', categoryKey: 'podcast.categories.character' },
    { id: 'fernando-garcia', duration: '18:30', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/01%20Fernando%20Gonzalez%20Ochoa.mp3`, type: 'audio', categoryKey: 'podcast.categories.author' },
    { id: 'francisco-herrera', duration: '16:45', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/02%20Francisco%20Herrera%20y%20Campuzano.mp3`, type: 'audio', categoryKey: 'podcast.categories.author' },
    { id: 'cancion-valle', duration: '12:30', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/la%20cancion%20del%20valle%20de%20aburra.mp3`, type: 'audio', categoryKey: 'podcast.categories.soundscape' },
    { id: 'verraquera-arriera', duration: '14:10', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/la%20verraquera%20arriera.mp3`, type: 'audio', categoryKey: 'podcast.categories.soundscape' },
    { id: 'medellin-hoy', duration: '16:30', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/08%20Luz%20Castro.mp3`, type: 'audio', categoryKey: 'podcast.categories.author' },
    { id: 'medellin-cafetales', duration: '15:20', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_author/08%20Luz%20Castro.mp3`, type: 'audio', categoryKey: 'podcast.categories.soundscape' },
    { id: 'violencia-esperanza', duration: '18:45', url: `https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/podcast_cosiaca/sobre%20la%20violencia%20a%20la%20esperanza.mp3`, type: 'audio', categoryKey: 'podcast.categories.soundscape' },
    { id: 'spotify', duration: '', url: 'https://open.spotify.com/show/7oTb30ubwdkdrnshBcD2GK', type: 'link', categoryKey: 'podcast.categories.platform' }
  ]
};

// --- CONFIGURACIÓN DJ AUTOMÁTICO & BIENVENIDA ---
export const WELCOME_FILENAME = "t2a_¡Bienvenid_20250608_072417.mp3";
export const WELCOME_DJ_URL = `${GITHUB_RAW_BASE}${encodeURIComponent(WELCOME_FILENAME)}`;

export const DJ_MESSAGES = [
  `${GITHUB_RAW_BASE}mensaje_identificacion.mp3`,
  `${GITHUB_RAW_BASE}cuña_arte_tecnologia.mp3`,
  `${GITHUB_RAW_BASE}separador_radio.mp3`,
  `${GITHUB_RAW_BASE}mensaje_comunidad.mp3`
];

// INTERVALO OPTIMIZADO PARA FREE TIER (Plan Spark)
export const DJ_INTERVAL_MINUTES = 20; 

// --- COLORES DE MARCA ---
export const BRAND = {
  yellow: '#F8C300', // Amarillo del Logo
  purple: '#4C0299', // Morado del Logo
  purpleLight: '#8B5CF6', // Versión más clara
  black: '#0a0a0a',
  white: '#ffffff'
};

// --- DATOS REALES DE EMISORAS ---
export const STATIONS_DATA = [
  {
    category: "Global Experimental (Verificadas)",
    stations: [
      { id: 'nts', title: 'NTS Radio', location: 'Londres / Global', url: 'https://stream-relay-geo.ntslive.net/stream', description: 'Plataforma global de radio experimental.', tags: ['Underground', 'Eclectic'] },
      { id: 'dublab', title: 'Dublab', location: 'Los Ángeles', url: 'https://dublab.out.airtime.pro/dublab_a', description: 'Radio experimental comunitaria pionera.', tags: ['Freeform', 'Community'] },
      { id: 'thelot', title: 'The Lot Radio', location: 'Nueva York', url: 'https://thelot.out.airtime.pro/thelot_a', description: 'Streaming desde un contenedor en Brooklyn.', tags: ['Electronic', 'Disco'] },
      { id: 'rinse', title: 'Rinse FM', location: 'Londres', url: 'https://streamer.dgen.net/rinsefm', description: 'El corazón de la música underground británica.', tags: ['Rinse', 'Bass'] },
      { id: 'soma', title: 'SomaFM: Drone Zone', location: 'San Francisco', url: 'http://ice1.somafm.com/dronezone-128-mp3', description: 'Texturas atmosféricas y ambientales.', tags: ['Ambient', 'Drone'] },
      { id: 'dronecore', title: 'DroneCore Station', location: 'Global', url: 'https://stream.zeno.fm/qv7yt59x608uv', description: 'Paisajes sonoros profundos y experimentación con drones.', tags: ['Experimental', 'Arte Sonoro', 'Drone'] },
      { id: 'electropulse', title: 'Electro Pulse 24/7', location: 'Global', url: 'https://stream.zeno.fm/y4dfbn0zgzzuv', description: 'Ritmos electrónicos sin parar, del House al Techno.', tags: ['Electrónica', 'House', 'Techno'] },
      { id: 'kexp', title: 'KEXP', location: 'Seattle, USA', url: 'https://kexp.streamguys1.com/kexp160.aac', description: 'Donde la música importa. Promoviendo música nueva junto a clásicos.', tags: ['Indie', 'Alternative'] },
      { id: 'wfmu', title: 'WFMU', location: 'New Jersey, USA', url: 'https://stream.wfmu.org/freeform-128k', description: 'Una estación de radio independiente y de formato libre.', tags: ['Freeform', 'Independent'] },
      { id: 'wxyc', title: 'WFMU', location: 'Chapel Hill, USA', url: 'http://audio-mp3.ibiblio.org:8000/wxyc.mp3', description: 'Radio dirigida por estudiantes de la UNC Chapel Hill.', tags: ['College Radio', 'Indie'] },
      { id: 'cjsw', title: 'CJSW', location: 'Calgary, Canadá', url: 'https://stream.cjsw.com/cjsw.mp3', description: 'La única radio comunitaria y universitaria de Calgary.', tags: ['Community', 'College Radio'] },
    ]
  },
  {
    category: "Latinoamérica & Colombia",
    stations: [
      { id: 'radiotonico', title: 'Radiotónico', location: 'México', url: 'https://s2.radio.co/s325d53958/listen', description: 'Investigación musical y locución experimental.', tags: ['Experimental', 'Talk'] },
      { id: 'tsonami', title: 'Radio Tsonami', location: 'Chile', url: 'https://stream.tsonami.cl/radio', description: 'Enfoque en paisaje sonoro y experimentación.', tags: ['Sound Art', 'Field Recording'] },
      { id: 'salsavintage', title: 'Salsa Vintage FM', location: 'LATAM', url: 'https://stream.zeno.fm/eqxrc0yb5c9uv', description: 'Clásicos de la salsa y sonidos latinos para el bailador.', tags: ['Salsa', 'Latina', 'Caribeña'] },
      { id: 'red_radar', title: 'Red Radar (Mix)', location: 'Norte de Santander', url: '#', description: 'Señal comunitaria de la red regional.', tags: ['Comunitaria', 'Territorio'] }
    ]
  },
  {
    category: "Europa & Vanguardia",
    stations: [
      { id: 'lyl', title: 'LYL Radio', location: 'Lyon, Francia', url: 'https://icecast.lyl.live/live', description: 'Nativa de Lyon, enfoque experimental.', tags: ['Avant-garde', 'French'] },
      { id: 'relativa', title: 'Radio Relativa', location: 'Madrid', url: 'https://stream.radiorelativa.eu/stream', description: 'Emisora experimental ibérica.', tags: ['Experimental', 'Club'] },
      { id: 'cashmere', title: 'Cashmere Radio', location: 'Berlín', url: 'https://cashmereradio.out.airtime.pro/cashmereradio_a', description: 'Radio experimental berlinesa.', tags: ['Electronic', 'Art'] },
      { id: 'resonance', title: 'Resonance FM', location: 'Londres, UK', url: 'http://stream.resonance.fm/resonance', description: 'La primera estación de radio artística del mundo.', tags: ['Art', 'Community'] },
      { id: 'radionova', title: 'Radio Nova', location: 'París, Francia', url: 'http://novazz.ice.infomaniak.ch/novazz-128.mp3', description: 'Le Grand Mix. Una mezcla ecléctica de géneros.', tags: ['Eclectic', 'World', 'French'] },
      { id: 'fip', title: 'FIP', location: 'París, Francia', url: 'http://icecast.radiofrance.fr/fip-hifi.aac', description: 'Música ecléctica sin anuncios de Radio France.', tags: ['Eclectic', 'Jazz', 'World'] },
      { id: 'intergalacticfm', title: 'Intergalactic FM', location: 'Holanda', url: 'https://stream.intergalactic.fm/1', description: 'Especializada en Italo Disco, Electro y joyas oscuras.', tags: ['Italo Disco', 'Electronic', 'Synth'] },
      { id: 'radiox', title: 'Radio-X', location: 'Frankfurt, Alemania', url: 'https://streams.radio-x.de/radiox-192.mp3', description: 'Radio local no comercial con música variada.', tags: ['Community', 'Alternative'] },
    ]
  },
  {
    category: "Música del Mundo & Géneros",
    stations: [
      { id: 'lofiartspace', title: 'LoFi Art Space Radio', location: 'Global', url: 'https://stream.zeno.fm/9p6nbxdg2ehvv', description: 'Sonidos relajantes y atmósferas para la concentración y el arte.', tags: ['Chillout', 'Lo-Fi', 'Ambient'] },
      { id: 'jazzboulevard', title: 'Jazz Boulevard Radio', location: 'Global', url: 'https://stream.zeno.fm/1e0sbgvzfy8uv', description: 'Un paseo por las avenidas del Jazz, Blues y Soul.', tags: ['Jazz', 'Blues', 'Soul'] },
      { id: 'afrosouljourney', title: 'AfroSoul Journey', location: 'África', url: 'https://stream.zeno.fm/q6r4e2a7hxquv', description: 'Un viaje sonoro por las raíces y fusiones africanas.', tags: ['World', 'África', 'Soul'] },
      { id: 'dubroots', title: 'Dubroots Collective', location: 'Global', url: 'https://stream.zeno.fm/7khxvntgmc9uv', description: 'Vibraciones de Reggae y Dub de la comunidad global.', tags: ['Reggae', 'Dub', 'Caribeño'] },
      { id: 'radioparadisemellow', title: 'Radio Paradise (Mellow)', location: 'California, USA', url: 'https://stream.radioparadise.com/mellow-flac', description: 'Una mezcla relajada y acústica de canciones.', tags: ['Mellow', 'Acoustic', 'Rock'] },
    ]
  }
];

// Datos de Miembros y Proyectos
export const ARTISTS = [
  {
    id: 'manuel',
    slug: 'manuel-palacio',
    location: "Medellín, Colombia",
    social: {
      instagram: 'https://www.instagram.com/manuelpalacio/',
      websites: [
        { url: 'https://manuelpalacioart.wordpress.com/ilustracion/', label: 'artists.manuel.websites.illustration' },
        { url: 'https://manuelpalacioart.wordpress.com/diseno-grafico/', label: 'artists.manuel.websites.graphic_design' },
        { url: 'https://artemanuelpalacio.wordpress.com/grupos-de-investigacion-y-colectivos/', label: 'artists.manuel.websites.collectives' },
        { url: 'https://artemanuelpalacio.wordpress.com/proyectos/proyecto-micro-experimentalista/', label: 'artists.manuel.websites.projects' },
        { url: 'https://sinergiadetejidos.wixsite.com/sinergia-de-tejidos', label: 'artists.manuel.websites.sinergia_web' },
        { url: 'https://www.instagram.com/sinergia_de_tejidos/', label: 'artists.manuel.websites.sinergia_ig' },
        { url: 'https://alephexperimental.wordpress.com/', label: 'artists.manuel.websites.aleph_experimental' },
        { url: 'https://siitne.wordpress.com/', label: 'artists.manuel.websites.siitne_web' },
      ],
      facebook: 'https://www.facebook.com/manuelpalacio',
      whatsapp: 'https://wa.me/573006101221',
      youtube: [
        { url: 'https://www.youtube.com/watch?v=fHgvh093Kfs', label: 'artists.manuel.youtube.audiovisual_performance' },
        { url: 'https://www.youtube.com/watch?v=nV3TJoi3Ax0', label: 'artists.manuel.youtube.experimental_videoart' },
        { url: 'https://www.youtube.com/@SemilleroSIITNE', label: 'artists.manuel.youtube.siitne' },
      ],
    },
    avatar: `${GITHUB_IMG_BASE}Manuel.png`,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: 'carlos',
    slug: 'carlos-londono',
    location: "Medellín, Colombia",
    social: {
      instagram: [
        'https://www.instagram.com/carlos.londor/',
        'https://www.instagram.com/medellin.distopico/'
      ],
      websites: [
        { url: 'https://drive.google.com/drive/folders/1kdogixH10kU_9GaFjWUcHNfpNwcamdIL', label: 'artists.carlos.websites.drive_ia' }
      ],
      facebook: 'https://www.facebook.com/carlos.a.londono.77',
      whatsapp: 'https://wa.me/573196242779'
    },
    avatar: `${GITHUB_IMG_BASE}carlos.jpeg`,
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: 'maria-cecilia',
    slug: 'maria-cecilia-castano',
    location: "Medellín, Colombia",
    social: {
      linkedin: 'https://www.linkedin.com/in/mar%C3%ADa-cecilia-casta%C3%B1o-95479164/',
      whatsapp: 'https://wa.me/573024573122',
    },
    avatar: 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/MARIA%20CECILIA/maria5.png',
    createdAt: "2026-01-01T00:00:00Z"
  }
];

export const PROJECTS = [
  {
    id: 'criaturas-imposibles',
    slug: 'criaturas-imposibles',
    year: 2024,
    status: 'published',
    featured: true,
    curatorial_line: "IA Creativa & Falso Documental",
    authors: [
      { id: 'carlos', name: 'Carlos Londoño', role: ['artista', 'director'] }
    ],
    formats: ['Video', 'Arte Digital', 'IA'],
    tags: ['ia', 'falso-documental', 'surrealismo'],
    technology: {
      software: ['Stable Diffusion', 'Midjourney', 'RunwayML', 'Capcut'],
      hardware: [],
      ai_models: ['Stable Diffusion', 'RunwayML Gen-2'],
      languages: []
    },
    media: {
      hero_image: 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/carlos_londor_/nuevo_02.png',
      gallery: [
        'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/carlos_londor_/criatura_01.png',
        'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/carlos_londor_/criatura_02.png',
        'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/carlos_londor_/criatura_03.png'
      ],
      externalUrl: 'https://www.youtube.com/watch?v=o67dlCRr3S0'
    },
    exhibitions: [
      { place: 'Núcleo Colectivo - Vitrina Digital', date: '2024-06-01', version: 'v1.0' }
    ],
    license: 'CC-BY-NC-SA 4.0',
    collaboration: { open: false, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'gravedad_sonora',
    slug: 'gravedad-sonora',
    year: 2026,
    status: 'published',
    featured: true,
    curatorial_line: "Arte Interactivo & Sonoro",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['artista', 'desarrollador'] }
    ],
    formats: ['Web', 'Arte Sonoro', 'Interactivo'],
    tags: ['web-audio', 'three-js', 'gravedad', 'sonido'],
    technology: {
      software: ['VS Code', 'Blender'],
      hardware: ['PC'],
      ai_models: [],
      languages: ["Javascript", "GLSL"]
    },
    media: {
      hero_image: `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_06.png`,
      gallery: [
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_01.png`,
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_02.png`,
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_03.png`,
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_04.png`,
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_05.png`,
          `${GITHUB_IMG_BASE}Sonido%20y%20gravedad_06.png`
      ],
      externalUrl: 'https://nucleocolectivo.github.io/gravedad-sonora/'
    },
    exhibitions: [
      { place: 'Vitrina de Núcleo Colectivo', date: '2026-01-10', version: 'v1.0' }
    ],
    license: 'CC-BY-NC-SA 4.0',
    collaboration: { open: false, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'vj_system',
    slug: 'malla-sonica',
    year: 2026,
    status: 'published',
    featured: true,
    curatorial_line: "Arte Interactivo & Live Coding",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['artista', 'desarrollador'] }
    ],
    formats: ['Software', 'Live Coding'],
    tags: ['react-three-fiber', 'vj', 'audioreactivo'],
    technology: {
      software: ['React', 'Three.js'],
      hardware: [],
      ai_models: [],
      languages: ["Javascript", "GLSL"]
    },
    media: {
      hero_image: `${GITHUB_IMG_BASE}malla%205_5.png`,
      gallery: [],
      externalUrl: 'https://nucleocolectivo.github.io/MallaSonica/'
    },
    exhibitions: [],
    license: 'MIT',
    collaboration: { open: true, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'instrumento_gestual',
    slug: 'instrumento-gestual',
    year: 2026,
    status: 'published',
    featured: false,
    curatorial_line: "Arte Interactivo & Sonoro",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['artista', 'investigador'] }
    ],
    formats: ['Arte Interactivo', 'IA', 'Web'],
    tags: ['hand-tracking', 'vision-por-computadora', 'web-audio'],
    technology: {
      software: ['MediaPipe', 'Three.js'],
      hardware: ['Webcam'],
      ai_models: ['Hand Tracking Model'],
      languages: ["Javascript"]
    },
    media: {
      hero_image: `${GITHUB_IMG_BASE}arte%20interactivo%20y%20sonido%20reactivo_3.png`,
      gallery: [
        `${GITHUB_IMG_BASE}arte%20interactivo%20y%20sonido%20reactivo_.png`,
        `${GITHUB_IMG_BASE}arte%20interactivo%20y%20sonido%20reactivo_2.png`
      ],
      externalUrl: 'https://nucleocolectivo.github.io/art/'
    },
    exhibitions: [],
    license: 'Propietaria',
    collaboration: { open: false, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'nucleo-bots-ai',
    slug: 'nucleo-bots-ai',
    year: 2024,
    status: 'published',
    featured: true,
    curatorial_line: "Herramientas con IA",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['creador'] }
    ],
    formats: ['Aplicación Web', 'IA', 'Herramienta'],
    tags: ['ia', 'chatbot', 'personalizable', 'copiloto'],
    technology: {
      software: ['Genkit', 'Next.js', 'React'],
      hardware: [],
      ai_models: ['Gemini'],
      languages: ["Typescript"]
    },
    media: {
      hero_image: 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/nucleobotsIa/nucleobotsIa_1.png',
      gallery: [
        'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/nucleobotsIa/nucleobotsIa_1.png',
        'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/nucleobotsIa/nucleobotsIa_2.png'
      ],
      externalUrl: 'https://studio--studio-3094441412-7af6f.us-central1.hosted.app/'
    },
    exhibitions: [],
    license: 'Propietaria',
    collaboration: { open: true, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'kinefonia',
    slug: 'kinefonia-generative-art-studio',
    year: 2026,
    status: 'published',
    featured: true,
    curatorial_line: "Arte Interactivo & Generativo",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['creador'] }
    ],
    formats: ['Aplicación Web', 'IA', 'Arte Generativo'],
    tags: ['ia', 'arte-generativo', 'estudio-creativo', 'p5js'],
    technology: {
      software: ['p5.js', 'React'],
      hardware: [],
      ai_models: [],
      languages: ["Javascript"]
    },
    media: {
      hero_image: `${GITHUB_IMG_BASE}KINEFONIA_1.png`,
      gallery: [
        `${GITHUB_IMG_BASE}KINEFONIA_1.png`,
        `${GITHUB_IMG_BASE}KINEFON%C3%8DA_2.png`
      ],
      externalUrl: 'https://kinefonia.vercel.app/'
    },
    exhibitions: [],
    license: 'Propietaria',
    collaboration: { open: true, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'fluir-micro-sesiones',
    slug: 'fluir-de-lo-micro-sesiones-en-confinamiento',
    year: 2020,
    status: 'published',
    featured: false,
    curatorial_line: "Videoarte Experimental",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['artista'] }
    ],
    formats: ['Video', 'Videoarte', 'Experimental'],
    tags: ['confinamiento', 'percepción', 'micro-escala'],
    technology: {
      software: ['Adobe Premiere', 'After Effects'],
      hardware: [],
      ai_models: [],
      languages: []
    },
    media: {
      hero_image: 'https://img.youtube.com/vi/nV3TJoi3Ax0/hqdefault.jpg',
      gallery: [],
      externalUrl: 'https://www.youtube.com/watch?v=nV3TJoi3Ax0'
    },
    exhibitions: [],
    license: 'CC-BY-NC-SA 4.0',
    collaboration: { open: false, contact: 'contacto@nucleocolectivo.com' },
  },
  {
    id: 'fluir-micro-proceso',
    slug: 'fluir-de-lo-micro-proceso',
    year: 2020,
    status: 'published',
    featured: false,
    curatorial_line: "Videoarte & Documental de Proceso",
    authors: [
      { id: 'manuel', name: 'Manuel Palacio', role: ['artista'] }
    ],
    formats: ['Video', 'Documental de Proceso', 'Performance'],
    tags: ['proceso-creativo', 'performance-audiovisual', 'artista', 'making-of'],
    technology: {
      software: ['Adobe Premiere', 'After Effects'],
      hardware: [],
      ai_models: [],
      languages: []
    },
    media: {
      hero_image: 'https://img.youtube.com/vi/fHgvh093Kfs/hqdefault.jpg',
      gallery: [],
      externalUrl: 'https://www.youtube.com/watch?v=fHgvh093Kfs'
    },
    exhibitions: [],
    license: 'CC-BY-NC-SA 4.0',
    collaboration: { open: false, contact: 'contacto@nucleocolectivo.com' },
  }
];

export const SPECIAL_PROJECTS = [
  {
    id: 'cosiaca',
    slug: 'cosiaca-350',
    year: 2025,
    status: 'published',
    featured: true,
    curatorial_line: 'Narrativas Transmedia',
    authors: [
      { id: 'carlos', name: 'Carlos Londoño', role: ['director', 'investigador'] },
      { id: 'manuel', name: 'Manuel Palacio', role: ['diseñador', 'desarrollador'] }
    ],
    formats: ['Transmedia', 'Podcast', 'Juego Interactivo', 'IA'],
    tags: ['historia', 'medellin', 'cosiaca', 'humor'],
    technology: {
      software: ['Figma', 'React', 'Genkit'],
      hardware: [],
      ai_models: ['Gemini', 'ElevenLabs'],
      languages: ["Javascript", "Typescript"]
    },
    media: {
      hero_image: 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/PODCAST-02.png',
      gallery: [
          'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/web_01.png',
          'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/ALEJANDRO%20ECHAVARRIA.png',
          'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/COSIACA/DE%CC%81BORA%20ARANGO.png'
      ],
      externalUrl: 'https://cosiaca350.bolt.host/',
      video: 'https://www.youtube.com/@Cosiaca350'
    },
    exhibitions: [
      { place: 'Convocatorias de Fomento y Estímulos para el Arte y la Cultura 2025', date: '2025-01-01', version: 'Propuesta' }
    ],
    license: 'CC-BY-NC-ND 4.0',
    collaboration: { open: true, contact: 'contacto@nucleocolectivo.com' },
    social: {
        instagram: 'https://www.instagram.com/cosiaca350/',
        tiktok: 'https://www.tiktok.com/@cosiaca350',
        youtube: [
            { url: 'https://www.youtube.com/@Cosiaca350', label: 'special_projects.cosiaca.social.youtube.main_channel' },
            { url: 'https://www.youtube.com/playlist?list=PLLldviceNkKeURfhsKQ_uqFqg-Kyx-tjA', label: 'special_projects.cosiaca.social.youtube.historical_playlist' },
            { url: 'https://www.youtube.com/@Cosiaca350/shorts', label: 'special_projects.cosiaca.social.youtube.shorts' }
        ],
    }
  }
];

export const COLLECTIONS = [
  {
    id: "ia-y-memoria",
    slug: "ia-y-memoria",
    projects: ["criaturas-imposibles"],
    featured: true
  },
  {
    id: "arte-interactivo",
    slug: "arte-interactivo-y-percepcion",
    projects: ["gravedad_sonora", "instrumento_gestual"],
    featured: true
  }
];

export const LABS = [
    {
      id: 'ia-creativa',
      modules: [
        "Fundamentos de IA Generativa",
        "Prompt Design Avanzado",
        "Creación de Datasets Propios",
        "Desarrollo de Proyectos Personales"
      ],
      price: 250000,
      active: true
    }
];
