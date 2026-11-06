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
    tags: ['LLMs', 'AI engine', 'Next', 'Data analysis'],
    description: {
      en: 'SaaS that measures how AI assistants (ChatGPT, Gemini, Claude, Grok, Meta AI) talk about a brand versus its competitors. I designed and built the whole AI engine: automated multi-model queries, share-of-mention scoring, source intelligence and recommendations.',
      es: 'SaaS que mide cómo los asistentes de IA (ChatGPT, Gemini, Claude, Grok, Meta AI) hablan de una marca frente a su competencia. Diseñé y construí todo el motor de IA: consultas automáticas a varios modelos, cuota de menciones, inteligencia de fuentes y recomendaciones.',
      fr: 'SaaS qui mesure comment les assistants IA (ChatGPT, Gemini, Claude, Grok, Meta AI) parlent d\'une marque face à ses concurrents. J\'ai conçu et développé tout le moteur IA\u00a0: requêtes automatisées sur plusieurs modèles, part de mentions, analyse des sources et recommandations.',
    },
    live: 'https://asoma.lat/',
  },
  {
    id: 10,
    title: 'SIGUE Network',
    image: Project10,
    tags: ['Next', 'Express', 'WordPress migration', 'Performance'],
    description: {
      en: 'Network that connects NGOs, social projects and companies across Latin America. I first built and ran the site on WordPress, then led the full migration to Next.js with an Express back end: a bilingual site with events and member areas that is far faster and fully responsive.',
      es: 'Red que conecta ONG, proyectos sociales y empresas en Latinoamérica. Primero construí y mantuve el sitio en WordPress, y luego lideré toda la migración a Next.js con back end en Express: un sitio bilingüe con eventos y áreas de miembros, mucho más rápido y totalmente responsive.',
      fr: 'Réseau qui relie ONG, projets sociaux et entreprises en Amérique latine. J\'ai d\'abord créé et maintenu le site sous WordPress, puis mené toute la migration vers Next.js avec un back end Express\u00a0: un site bilingue avec événements et espaces membres, bien plus rapide et entièrement responsive.',
    },
    live: 'https://siguenetwork.org/',
  },
  {
    id: 11,
    title: 'CASA Ecuador',
    image: Project11,
    tags: ['Solution design', 'Evaluation engine', 'React', 'Admin panel'],
    description: {
      en: 'Official platform for the CASA sustainable-housing certification, backed by the CEES and the MIT. We designed the evaluation engine, the admin panel and the internal modules that take each project from registration through evaluation to certification.',
      es: 'Plataforma oficial de la certificación CASA de vivienda sostenible, respaldada por el CEES y el MIT. Diseñamos el motor de evaluación, el administrador y los módulos internos que llevan cada proyecto del registro a la evaluación y la certificación.',
      fr: 'Plateforme officielle de la certification CASA de logement durable, soutenue par le CEES et le MIT. Nous avons conçu le moteur d\'évaluation, le panneau d\'administration et les modules internes qui mènent chaque projet de l\'inscription à l\'évaluation et à la certification.',
    },
    live: 'https://casaecuador.ec/',
  },
  {
    id: 12,
    title: 'Concreto',
    image: Project12,
    tags: ['Angular', 'TypeScript', 'KPIs', 'E-commerce'],
    description: {
      en: 'Construction purchasing network in Ecuador: catalog, quote builder, clearance sales and supplier stores. I support the product design and the sales features, and build the statistics and KPI dashboards the team runs on.',
      es: 'Red de compras para la construcción en Ecuador: catálogo, cotizador, liquidaciones y tiendas de proveedores. Doy soporte en el diseño del producto y en las funciones de venta, y construyo las estadísticas y paneles de KPIs con los que trabaja el equipo.',
      fr: 'Réseau d\'achats pour la construction en Équateur\u00a0: catalogue, générateur de devis, déstockage et boutiques fournisseurs. J\'accompagne la conception du produit et les fonctions de vente, et je construis les statistiques et tableaux de KPI qu\'utilise l\'équipe.',
    },
    live: 'https://concreto.com.ec/',
  },
  {
    id: 3,
    title: 'Stupendastic',
    image: Project3,
    tags: ['Python', 'Automation', 'Next', 'Express'],
    description: {
      en: 'Two dashboards on top of Monday.com. Python automations run on on-premise and cloud servers to balance the team\'s workload and make the state of every task visible at a glance.',
      es: 'Dos paneles sobre Monday.com. Automatizaciones en Python corren en servidores on-premise y en la nube para equilibrar la carga del equipo y mostrar de un vistazo el estado de cada tarea.',
      fr: 'Deux tableaux de bord au-dessus de Monday.com. Des automatisations Python tournent sur des serveurs on-premise et cloud pour équilibrer la charge de l\'équipe et montrer d\'un coup d\'œil l\'état de chaque tâche.',
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
      en: 'AI-powered platform for finding jobs and talent. I built the candidate communication flows and fixed production issues across the stack.',
      es: 'Plataforma con IA para encontrar empleo y talento. Construí los flujos de comunicación con candidatos y resolví incidencias en producción en todo el stack.',
      fr: 'Plateforme dopée à l\'IA pour trouver un emploi ou des talents. J\'ai construit les parcours de communication avec les candidats et corrigé des incidents de production sur toute la stack.',
    },
    github: 'https://github.com/torre-labs/',
    live: 'https://torre.ai/',
  },
  {
    id: 1,
    title: 'AliceTrader',
    image: Project2,
    tags: ['Fintech', 'Real-time data', 'Vue', 'TypeScript'],
    description: {
      en: 'Options trading platform: analyze, trade and manage positions with real-time market data and configurable tools.',
      es: 'Plataforma de trading de opciones: analizar, operar y gestionar posiciones con datos de mercado en tiempo real y herramientas configurables.',
      fr: 'Plateforme de trading d\'options\u00a0: analyser, trader et gérer ses positions avec des données de marché en temps réel et des outils configurables.',
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
      en: 'Site for Pelom, a SaaS that lets restaurants manage their menus: dishes, prices and availability.',
      es: 'Sitio de Pelom, un SaaS para que los restaurantes gestionen sus menús: platos, precios y disponibilidad.',
      fr: 'Site de Pelom, un SaaS qui permet aux restaurants de gérer leurs menus\u00a0: plats, prix et disponibilité.',
    },
    live: 'https://www.pelom.co/',
  },
  {
    id: 8,
    title: 'Web Minds Studio',
    image: Project8,
    tags: ['Next', 'React', 'Tailwind'],
    description: {
      en: 'Studio site that sells website plans by subscription, with flexible tiers teams can tailor to what they need.',
      es: 'Sitio de un estudio que vende planes web por suscripción, con niveles flexibles que cada equipo adapta a lo que necesita.',
      fr: 'Site d\'un studio qui vend des sites web par abonnement, avec des formules flexibles que chaque équipe adapte à ses besoins.',
    },
    github: 'https://github.com/WebMindsStudio',
    live: 'https://webmindsstudio.com/',
  },
  {
    id: 2,
    title: 'CafExporto',
    image: Project1,
    tags: ['WordPress', 'Plugins', 'CSS'],
    description: {
      en: 'Corporate site for a coffee exporter: six pages built on WordPress with custom plugins and styling.',
      es: 'Sitio corporativo para una exportadora de café: seis páginas en WordPress con plugins y estilos a medida.',
      fr: 'Site d\'entreprise pour un exportateur de café\u00a0: six pages sous WordPress avec plugins et styles sur mesure.',
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
