import Project1 from '../images/Project1.avif';
import Project2 from '../images/Project2.avif';
import Project3 from '../images/Project3.avif';
import Project6 from '../images/Project6.avif';
import Project7 from '../images/Project7.avif';
import Project8 from '../images/Project8.avif';
import Project9 from '../images/Project9.avif';
import Project10 from '../images/Project10.avif';
import Project11 from '../images/Project11.avif';
import Project12 from '../images/Project12.avif';
import Project13 from '../images/Project13.avif';

// Ordered by weight: AI and solution-design work first, then product
// engineering, then earlier web work.
const data = [
  {
    id: 13,
    title: 'Asoma',
    image: Project13,
    tags: ['LLMs', 'AI agents', 'AI engine', 'Next'],
    description: {
      en: 'SaaS that measures how ChatGPT, Gemini, Claude, Grok and Meta AI talk about a brand versus its competitors. At Prex Technologies I designed and built the whole AI engine: weekly multi-model measurement, a 0–100 visibility score, source intelligence and agents that turn findings into actions.',
      es: 'SaaS que mide cómo ChatGPT, Gemini, Claude, Grok y Meta AI hablan de una marca frente a su competencia. En Prex Technologies diseñé y construí todo el motor de IA: medición semanal en varios modelos, un puntaje de visibilidad de 0 a 100, inteligencia de fuentes y agentes que convierten hallazgos en acciones.',
      fr: 'SaaS qui mesure comment ChatGPT, Gemini, Claude, Grok et Meta AI parlent d\'une marque face à ses concurrents. Chez Prex Technologies, j\'ai conçu et développé tout le moteur IA\u00a0: mesure hebdomadaire multi-modèles, score de visibilité de 0 à 100, analyse des sources et agents qui transforment les constats en actions.',
    },
    live: 'https://asoma.lat/',
  },
  {
    id: 10,
    title: 'SIGUE Network',
    image: Project10,
    tags: ['Next', 'Express', 'WordPress migration', 'Performance'],
    description: {
      en: 'Network that connects NGOs, social projects and companies across Latin America. I built and ran the WordPress site, then led the full migration to Next.js with an Express back end: 25+ bilingual routes with events, blog, donations and a member portal, far faster and fully responsive.',
      es: 'Red que conecta ONG, proyectos sociales y empresas en Latinoamérica. Construí y mantuve el sitio en WordPress, y luego lideré toda la migración a Next.js con back end en Express: más de 25 rutas bilingües con eventos, blog, donaciones y portal de miembros, mucho más rápido y totalmente responsive.',
      fr: 'Réseau qui relie ONG, projets sociaux et entreprises en Amérique latine. J\'ai créé et maintenu le site WordPress, puis mené toute la migration vers Next.js avec un back end Express\u00a0: plus de 25 routes bilingues avec événements, blog, dons et portail membres, bien plus rapide et entièrement responsive.',
    },
    live: 'https://siguenetwork.org/',
  },
  {
    id: 11,
    title: 'CASA Ecuador',
    image: Project11,
    tags: ['Solution design', 'Evaluation engine', 'React', 'Admin panel'],
    description: {
      en: 'Ecuador\'s national sustainable-construction certification, run by the CEES under an agreement with the Ministry of Infrastructure and Technology (MIT). At Prex Technologies we built a configurable evaluation engine (criteria, credits and five levels that can change without code), the verifier workflow, QR-validated certificates and the admin panel.',
      es: 'Certificación nacional de construcción sostenible del Ecuador, operada por el CEES bajo un acuerdo con el Ministerio de Infraestructura y Tecnología (MIT). En Prex Technologies construimos un motor de evaluación configurable (criterios, créditos y cinco niveles que cambian sin tocar código), el flujo de verificadores, certificados validados por QR y el administrador.',
      fr: 'Certification nationale de construction durable de l\'Équateur, gérée par le CEES dans le cadre d\'un accord avec le ministère des Infrastructures et de la Technologie (MIT). Chez Prex Technologies, nous avons construit un moteur d\'évaluation configurable (critères, crédits et cinq niveaux modifiables sans code), le parcours vérificateur, des certificats validés par QR et l\'administration.',
    },
    live: 'https://casaecuador.ec/',
  },
  {
    id: 12,
    title: 'Concreto',
    image: Project12,
    tags: ['SEO', 'AI search', 'Angular', 'KPIs'],
    description: {
      en: 'Construction purchasing network in Ecuador. At Prex Technologies I made it findable by Google, Bing and AI agents (2,174 URLs in the sitemap, structured data on every page type, llms.txt and AI crawlers welcome), automated internal tasks and built the sales KPI dashboards.',
      es: 'Red de compras para la construcción en Ecuador. En Prex Technologies la hice visible para Google, Bing y los agentes de IA (2.174 URLs en el sitemap, datos estructurados en cada tipo de página, llms.txt y rastreadores de IA permitidos), automaticé tareas internas y construí los paneles de KPIs de ventas.',
      fr: 'Réseau d\'achats pour le BTP en Équateur. Chez Prex Technologies, je l\'ai rendu visible pour Google, Bing et les agents IA (2 174 URL dans le sitemap, données structurées sur chaque type de page, llms.txt et robots IA bienvenus), j\'ai automatisé des tâches internes et construit les tableaux de KPI commerciaux.',
    },
    live: 'https://concreto.com.ec/',
  },
  {
    id: 3,
    title: 'Stupendastic',
    image: Project3,
    tags: ['Automation', 'Python', 'Monday.com', 'Dashboards'],
    description: {
      en: 'Audiovisual production company for construction and architecture. I automated 10 to 15 internal processes in Python on Monday.com and Dropbox, saving the team 10+ hours a week, and built dashboards to follow every person\'s tasks.',
      es: 'Productora audiovisual para construcción y arquitectura. Automaticé entre 10 y 15 procesos internos en Python sobre Monday.com y Dropbox, ahorrando al equipo más de 10 horas por semana, y construí paneles para seguir las tareas de cada persona.',
      fr: 'Société de production audiovisuelle pour la construction et l\'architecture. J\'ai automatisé 10 à 15 processus internes en Python sur Monday.com et Dropbox, en faisant gagner plus de 10 heures par semaine à l\'équipe, et construit des tableaux de bord pour suivre les tâches de chacun.',
    },
    github: 'https://github.com/Stupendastic-Connect',
    live: 'https://www.stupendastic.com/',
  },
  {
    id: 7,
    title: 'Torre',
    image: Project7,
    tags: ['AI recruiting', 'Scala', 'Vue'],
    description: {
      en: 'Global job network with an AI recruiter. I collaborated on several sections: candidate communication flows, fixes to legacy Scala and Vue code, and a Docker setup that sped up onboarding.',
      es: 'Red global de empleo con un reclutador de IA. Colaboré en varias secciones: flujos de comunicación con candidatos, mejoras al código heredado en Scala y Vue, y un entorno Docker que aceleró el onboarding.',
      fr: 'Réseau mondial de l\'emploi avec un recruteur IA. J\'ai contribué à plusieurs sections\u00a0: parcours de communication avec les candidats, corrections du code Scala et Vue existant, et un environnement Docker qui a accéléré l\'onboarding.',
    },
    github: 'https://github.com/torre-labs/',
    live: 'https://torre.ai/',
  },
  {
    id: 1,
    title: 'AliceTrader',
    image: Project2,
    tags: ['Fintech', 'Real-time data', 'Nuxt', 'TypeScript'],
    description: {
      en: 'Invitation-only automated trading platform connected to tastytrade. We built the app from scratch with all its connections: live account data over server-sent events, dashboard, trades, statistics, 2FA and admin, with 30% faster data loading.',
      es: 'Plataforma de trading automatizado por invitación, conectada a tastytrade. Construimos la app desde cero con todas sus conexiones: datos de cuenta en vivo por server-sent events, dashboard, operaciones, estadísticas, 2FA y administración, con un 30% menos de tiempo de carga.',
      fr: 'Plateforme de trading automatisé sur invitation, connectée à tastytrade. Nous avons construit l\'application de zéro avec toutes ses connexions\u00a0: données de compte en direct par server-sent events, tableau de bord, trades, statistiques, 2FA et administration, avec un chargement 30\u00a0% plus rapide.',
    },
    github: 'https://github.com/tastyware',
    live: 'https://alicetrader.com/',
  },
  {
    id: 6,
    title: 'Pelom',
    image: Project6,
    tags: ['SaaS', 'Next', 'TypeScript', 'Tailwind'],
    description: {
      en: 'App for restaurants and cafés: multilingual QR menus and instant waiter calls. I collaborated on several sections of the product and its site.',
      es: 'App para restaurantes y cafeterías: menús QR multilingües y llamado instantáneo al mesero. Colaboré en varias secciones del producto y de su sitio.',
      fr: 'Application pour restaurants et cafés\u00a0: menus QR multilingues et appel instantané du serveur. J\'ai contribué à plusieurs sections du produit et de son site.',
    },
    live: 'https://www.pelom.co/',
  },
  {
    id: 8,
    title: 'Web Minds Studio',
    image: Project8,
    tags: ['Next', 'Tailwind', 'SEO'],
    description: {
      en: 'Web and software studio in Quito with a five-language site. I improved its Next.js and TypeScript front end, with server-side rendering for SEO and speed.',
      es: 'Estudio de desarrollo web y software en Quito, con un sitio en cinco idiomas. Mejoré su front-end en Next.js y TypeScript, con renderizado en servidor para SEO y velocidad.',
      fr: 'Studio web et logiciel à Quito, avec un site en cinq langues. J\'ai amélioré son front-end Next.js et TypeScript, avec rendu côté serveur pour le SEO et la vitesse.',
    },
    github: 'https://github.com/WebMindsStudio',
    live: 'https://webmindsstudio.com/',
  },
  {
    id: 2,
    title: 'CafExporto',
    image: Project1,
    tags: ['Astro', 'WordPress migration', 'CSS'],
    description: {
      en: 'Exporter of Ecuadorian specialty coffee. I built the original WordPress site, then migrated the whole design and CSS to Astro: 50 fast static pages, including one for each coffee lot.',
      es: 'Exportadora de café de especialidad ecuatoriano. Construí el sitio original en WordPress y luego migré todo el diseño y el CSS a Astro: 50 páginas estáticas y rápidas, incluida una por cada lote de café.',
      fr: 'Exportateur de café de spécialité équatorien. J\'ai créé le site WordPress d\'origine, puis migré tout le design et le CSS vers Astro\u00a0: 50 pages statiques et rapides, dont une par lot de café.',
    },
    live: 'https://cafexporto.com/',
  },
  {
    id: 9,
    title: 'Portfolio Yanua',
    image: Project9,
    tags: ['React', 'Webpack', 'CSS'],
    description: {
      en: 'Biotechnology research portfolio: projects, publications and collaborations, with direct email contact.',
      es: 'Portafolio de investigación en biotecnología: proyectos, publicaciones y colaboraciones, con contacto directo por correo.',
      fr: 'Portfolio de recherche en biotechnologie\u00a0: projets, publications et collaborations, avec contact direct par e-mail.',
    },
    github: 'https://github.com/IngDavidTM/portfolio-yanua',
    live: 'https://yanua.netlify.app/',
  },
];

export default data;
