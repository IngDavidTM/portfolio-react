// Case studies, one page each at projects/<slug>/ in every language.
// Facts come from the live sites and the project's own code; keep them
// verifiable. `projectId` links to src/data/projects.js for title, image
// and live URL.

const caseStudies = {
  asoma: {
    projectId: 13,
    headline: {
      en: 'An AI engine that measures what ChatGPT says about a brand',
      es: 'Un motor de IA que mide lo que ChatGPT dice de una marca',
      fr: 'Un moteur d\'IA qui mesure ce que ChatGPT dit d\'une marque',
    },
    summary: {
      en: 'Asoma is a SaaS that tracks when ChatGPT, Gemini, Claude, Grok and Meta AI recommend a brand or its competitors, explains why, and turns it into actions. I designed and built its AI engine and analysis layer.',
      es: 'Asoma es un SaaS que detecta cuándo ChatGPT, Gemini, Claude, Grok y Meta AI recomiendan una marca o a su competencia, explica por qué y lo convierte en acciones. Diseñé y construí su motor de IA y su capa de análisis.',
      fr: 'Asoma est un SaaS qui repère quand ChatGPT, Gemini, Claude, Grok et Meta AI recommandent une marque ou ses concurrents, explique pourquoi et le transforme en actions. J\'ai conçu et développé son moteur d\'IA et sa couche d\'analyse.',
    },
    role: {
      en: 'AI engine design and development, at Prex Technologies',
      es: 'Diseño y desarrollo del motor de IA, en Prex Technologies',
      fr: 'Conception et développement du moteur d\'IA, chez Prex Technologies',
    },
    stack: ['Next.js', 'Multi-provider LLM APIs', 'AI agents', 'Data pipelines'],
    results: {
      en: [
        { value: '5', label: 'AI assistants measured: ChatGPT, Gemini, Claude, Grok and Meta AI' },
        { value: '8', label: 'pipeline stages, from the question to verifying the result' },
        { value: '4', label: 'specialised agents that set up, analyse and recommend' },
        { value: '0–100', label: 'visibility score, plus share of voice, position and citations' },
      ],
      es: [
        { value: '5', label: 'asistentes de IA medidos: ChatGPT, Gemini, Claude, Grok y Meta AI' },
        { value: '8', label: 'etapas del pipeline, de la pregunta a verificar el resultado' },
        { value: '4', label: 'agentes especializados que configuran, analizan y recomiendan' },
        { value: '0–100', label: 'puntaje de visibilidad, más cuota de voz, posición y citas' },
      ],
      fr: [
        { value: '5', label: 'assistants IA mesurés : ChatGPT, Gemini, Claude, Grok et Meta AI' },
        { value: '8', label: 'étapes du pipeline, de la question à la vérification du résultat' },
        { value: '4', label: 'agents spécialisés qui configurent, analysent et recommandent' },
        { value: '0–100', label: 'score de visibilité, plus part de voix, position et citations' },
      ],
    },
    challenge: {
      en: 'People now ask AI assistants what to buy, and brands have no idea what those assistants answer. The answers change by model, by week and by how the question is phrased, so a single manual check proves nothing. The product needed repeatable, auditable measurement across five different models, and a way to turn raw answers into decisions a marketing team can act on.',
      es: 'La gente ya le pregunta a los asistentes de IA qué comprar, y las marcas no saben qué responden. Las respuestas cambian según el modelo, la semana y cómo se formula la pregunta, así que una revisión manual no prueba nada. El producto necesitaba una medición repetible y auditable en cinco modelos distintos, y una forma de convertir respuestas crudas en decisiones que un equipo de marketing pueda ejecutar.',
      fr: 'Les gens demandent désormais aux assistants IA quoi acheter, et les marques ignorent ce qu\'ils répondent. Les réponses varient selon le modèle, la semaine et la formulation de la question : une vérification manuelle ne prouve rien. Le produit avait besoin d\'une mesure répétable et auditable sur cinq modèles, et d\'un moyen de transformer des réponses brutes en décisions qu\'une équipe marketing peut appliquer.',
    },
    built: {
      en: [
        'A measurement engine that sends the same versioned questions to every model each week and stores the exact model, method, parameters, full unedited answer, native citations and run status, including retries and failures.',
        'Scoring that turns answers into a 0–100 visibility score, share of voice against competitors, position in the answer and whether the brand\'s own site is cited.',
        'Source intelligence that shows which pages the assistants rely on, so teams know where to act.',
        'A team of agents (coordination, setup, analysis and recommendations) that closes the loop: measure, understand, act, measure again, with before/after experiments.',
      ],
      es: [
        'Un motor de medición que envía cada semana las mismas preguntas versionadas a todos los modelos y guarda el modelo exacto, el método, los parámetros, la respuesta completa sin editar, las citas nativas y el estado de cada corrida, con reintentos y fallos.',
        'Un sistema de puntaje que convierte las respuestas en un índice de visibilidad de 0 a 100, cuota de voz frente a la competencia, posición en la respuesta y si se cita el sitio de la marca.',
        'Inteligencia de fuentes que muestra en qué páginas se apoyan los asistentes, para saber dónde actuar.',
        'Un equipo de agentes (coordinación, configuración, análisis y recomendaciones) que cierra el ciclo: medir, entender, actuar y volver a medir, con experimentos de antes y después.',
      ],
      fr: [
        'Un moteur de mesure qui envoie chaque semaine les mêmes questions versionnées à tous les modèles et enregistre le modèle exact, la méthode, les paramètres, la réponse complète non retouchée, les citations natives et le statut de chaque exécution, relances et échecs compris.',
        'Un scoring qui transforme les réponses en score de visibilité de 0 à 100, part de voix face aux concurrents, position dans la réponse et citation ou non du site de la marque.',
        'Une analyse des sources qui montre sur quelles pages s\'appuient les assistants, pour savoir où agir.',
        'Une équipe d\'agents (coordination, configuration, analyse et recommandations) qui boucle le cycle : mesurer, comprendre, agir, mesurer à nouveau, avec des expériences avant/après.',
      ],
    },
  },

  'sigue-network': {
    projectId: 10,
    headline: {
      en: 'From WordPress to Next.js: a faster home for a social-impact network',
      es: 'De WordPress a Next.js: una casa más rápida para una red de impacto social',
      fr: 'De WordPress à Next.js : un site plus rapide pour un réseau à impact social',
    },
    summary: {
      en: 'SIGUE Network connects NGOs, social projects and companies across Latin America. I built and ran its WordPress site, then led the full migration to Next.js with an Express back end and a separate member portal.',
      es: 'SIGUE Network conecta ONG, proyectos sociales y empresas en Latinoamérica. Construí y mantuve su sitio en WordPress, y luego lideré la migración completa a Next.js con back end en Express y un portal de miembros aparte.',
      fr: 'SIGUE Network relie ONG, projets sociaux et entreprises en Amérique latine. J\'ai créé et maintenu son site WordPress, puis mené toute la migration vers Next.js avec un back end Express et un portail membres séparé.',
    },
    role: {
      en: 'Lead developer: WordPress site, then the full migration',
      es: 'Desarrollador principal: sitio en WordPress y luego toda la migración',
      fr: 'Développeur principal : site WordPress, puis toute la migration',
    },
    stack: ['Next.js', 'React', 'next-intl', 'Tailwind', 'Express', 'Supabase', 'WordPress'],
    results: {
      en: [
        { value: '25+', label: 'routes migrated, each mapped from its WordPress URL' },
        { value: '2', label: 'languages, Spanish and English, on every page' },
        { value: '1', label: 'member portal with its own sign-in, separate from the public site' },
        { label: 'Much faster, fully responsive pages instead of a page builder' },
      ],
      es: [
        { value: '25+', label: 'rutas migradas, cada una mapeada desde su URL de WordPress' },
        { value: '2', label: 'idiomas, español e inglés, en todas las páginas' },
        { value: '1', label: 'portal de miembros con su propio acceso, separado del sitio público' },
        { label: 'Páginas mucho más rápidas y totalmente responsive, sin constructor visual' },
      ],
      fr: [
        { value: '25+', label: 'routes migrées, chacune reliée à son URL WordPress' },
        { value: '2', label: 'langues, espagnol et anglais, sur chaque page' },
        { value: '1', label: 'portail membres avec sa propre connexion, séparé du site public' },
        { label: 'Des pages bien plus rapides et entièrement responsive, sans page builder' },
      ],
    },
    challenge: {
      en: 'The network had grown on WordPress and Elementor: events, programs, a blog, donations and member areas, all slowed down by plugins and hard to change. The migration had to keep every existing URL and its search ranking, support two languages, and give organizers and venues their own dashboards.',
      es: 'La red había crecido sobre WordPress y Elementor: eventos, programas, blog, donaciones y áreas de miembros, todo lento por los plugins y difícil de cambiar. La migración tenía que conservar cada URL existente y su posicionamiento, soportar dos idiomas y dar paneles propios a organizadores y sedes.',
      fr: 'Le réseau avait grandi sur WordPress et Elementor : événements, programmes, blog, dons et espaces membres, le tout ralenti par les plugins et difficile à faire évoluer. La migration devait conserver chaque URL existante et son référencement, gérer deux langues et offrir des tableaux de bord aux organisateurs et aux lieux.',
    },
    built: {
      en: [
        'A route map from every WordPress URL to its Next.js App Router page, so links and rankings survived the move.',
        'A bilingual Next.js site with next-intl: programs, academy, consulting, hub, resources, events, blog, donations and the 2026 Summit landing page.',
        'An Express back end for forms and data, plus organizer and venue dashboards for events.',
        'A separate member portal with Supabase authentication, Google sign-in and account management.',
      ],
      es: [
        'Un mapa de rutas de cada URL de WordPress a su página en el App Router de Next.js, para que enlaces y posicionamiento sobrevivieran al cambio.',
        'Un sitio bilingüe en Next.js con next-intl: programas, academia, consultoría, hub, recursos, eventos, blog, donaciones y la landing de la Cumbre 2026.',
        'Un back end en Express para formularios y datos, más paneles para organizadores y sedes de eventos.',
        'Un portal de miembros aparte con autenticación en Supabase, acceso con Google y gestión de cuenta.',
      ],
      fr: [
        'Une table de correspondance de chaque URL WordPress vers sa page App Router Next.js, pour que liens et référencement survivent au changement.',
        'Un site Next.js bilingue avec next-intl : programmes, académie, conseil, hub, ressources, événements, blog, dons et la page du Sommet 2026.',
        'Un back end Express pour les formulaires et les données, plus des tableaux de bord pour organisateurs et lieux d\'événements.',
        'Un portail membres séparé avec authentification Supabase, connexion Google et gestion du compte.',
      ],
    },
  },

  'casa-ecuador': {
    projectId: 11,
    headline: {
      en: 'A configurable evaluation engine for a national green-building certification',
      es: 'Un motor de evaluación configurable para una certificación nacional de construcción sostenible',
      fr: 'Un moteur d\'évaluation configurable pour une certification nationale de construction durable',
    },
    summary: {
      en: 'CASA is Ecuador\'s national sustainable-construction certification, run by the CEES under an agreement with the Ministry of Infrastructure and Technology (MIT). We built the platform that takes each project from registration through evaluation to a verifiable certificate.',
      es: 'CASA es la certificación nacional de construcción sostenible del Ecuador, operada por el CEES bajo un acuerdo con el Ministerio de Infraestructura y Tecnología (MIT). Construimos la plataforma que lleva cada proyecto del registro a la evaluación y a un certificado verificable.',
      fr: 'CASA est la certification nationale de construction durable de l\'Équateur, gérée par le CEES dans le cadre d\'un accord avec le ministère des Infrastructures et de la Technologie (MIT). Nous avons construit la plateforme qui mène chaque projet de l\'inscription à l\'évaluation puis à un certificat vérifiable.',
    },
    role: {
      en: 'Evaluation engine, admin panel and internal modules, at Prex Technologies',
      es: 'Motor de evaluación, administrador y módulos internos, en Prex Technologies',
      fr: 'Moteur d\'évaluation, administration et modules internes, chez Prex Technologies',
    },
    stack: ['React', 'Vite', 'MUI', 'REST API', 'JWT auth'],
    results: {
      en: [
        { value: '5', label: 'certification levels, from Certified to Platinum' },
        { value: '7', label: 'areas scored: energy, water, waste, biodiversity, health, climate and social value' },
        { value: '3', label: 'steps for every project: registration, evaluation, certification' },
        { label: 'Certificates validated by QR code' },
      ],
      es: [
        { value: '5', label: 'niveles de certificación, de Certificado a Platino' },
        { value: '7', label: 'áreas evaluadas: energía, agua, residuos, biodiversidad, salud, clima y valor social' },
        { value: '3', label: 'pasos para cada proyecto: registro, evaluación y certificación' },
        { label: 'Certificados que se validan con código QR' },
      ],
      fr: [
        { value: '5', label: 'niveaux de certification, de Certifié à Platine' },
        { value: '7', label: 'domaines évalués : énergie, eau, déchets, biodiversité, santé, climat et valeur sociale' },
        { value: '3', label: 'étapes pour chaque projet : inscription, évaluation, certification' },
        { label: 'Certificats vérifiables par QR code' },
      ],
    },
    challenge: {
      en: 'The certification grew out of an earlier evaluation system and needed to become an official national program, with a ministry behind it. Criteria, credits and categories had to be editable without new code, because the standard will keep evolving, and every decision needed evidence and a verifier\'s sign-off.',
      es: 'La certificación nació de un sistema de evaluación anterior y debía convertirse en un programa nacional oficial, con un ministerio detrás. Los criterios, créditos y categorías tenían que poder editarse sin escribir código, porque la norma seguirá cambiando, y cada decisión necesitaba evidencia y la aprobación de un verificador.',
      fr: 'La certification est née d\'un ancien système d\'évaluation et devait devenir un programme national officiel, soutenu par un ministère. Critères, crédits et catégories devaient être modifiables sans nouveau code, car la norme va continuer d\'évoluer, et chaque décision exigeait des preuves et la validation d\'un vérificateur.',
    },
    built: {
      en: [
        'A configurable evaluation engine: evaluations split into segments, themes and questions, each with uploaded evidence, scored in credits that map to a certification category. New evaluations can be created without code.',
        'A verifier workflow to review evidence, leave observations and approve, ending in a certificate with a QR validation code.',
        'The admin panel and internal modules that run registrations, projects, fees and users.',
        'Public pages for the project directory and statistics, plus a fee calculator by project type and size.',
      ],
      es: [
        'Un motor de evaluación configurable: cada evaluación se divide en segmentos, temas y preguntas con evidencia adjunta, y se puntúa en créditos que definen la categoría. Se pueden crear evaluaciones nuevas sin código.',
        'Un flujo para verificadores que revisan la evidencia, dejan observaciones y aprueban, y termina en un certificado con código QR de validación.',
        'El administrador y los módulos internos que gestionan registros, proyectos, tarifas y usuarios.',
        'Páginas públicas con el directorio de proyectos y estadísticas, y una calculadora de tarifas por tipo y tamaño de proyecto.',
      ],
      fr: [
        'Un moteur d\'évaluation configurable : chaque évaluation est découpée en segments, thèmes et questions avec preuves jointes, notée en crédits qui déterminent la catégorie. De nouvelles évaluations se créent sans code.',
        'Un parcours vérificateur pour examiner les preuves, formuler des observations et approuver, jusqu\'au certificat avec code QR de validation.',
        'Le panneau d\'administration et les modules internes qui gèrent inscriptions, projets, tarifs et utilisateurs.',
        'Des pages publiques avec l\'annuaire des projets et des statistiques, et un calculateur de tarifs selon le type et la taille du projet.',
      ],
    },
  },

  concreto: {
    projectId: 12,
    headline: {
      en: 'Making a construction marketplace findable by Google, Bing and AI agents',
      es: 'Un marketplace de construcción que Google, Bing y los agentes de IA sí encuentran',
      fr: 'Rendre une place de marché du BTP visible pour Google, Bing et les agents IA',
    },
    summary: {
      en: 'Concreto is a purchasing network for construction in Ecuador: buyers ask once and get compared offers from verified suppliers. I worked on its search visibility, internal automation and sales analytics.',
      es: 'Concreto es una red de compras para la construcción en Ecuador: el comprador pide una vez y recibe ofertas comparadas de proveedores verificados. Trabajé en su visibilidad en buscadores, la automatización interna y la analítica de ventas.',
      fr: 'Concreto est un réseau d\'achats pour le BTP en Équateur : l\'acheteur demande une fois et reçoit des offres comparées de fournisseurs vérifiés. J\'ai travaillé sur sa visibilité en recherche, l\'automatisation interne et l\'analyse des ventes.',
    },
    role: {
      en: 'SEO and AI-search optimization, automation and KPI dashboards, at Prex Technologies',
      es: 'SEO y optimización para buscadores de IA, automatización y paneles de KPIs, en Prex Technologies',
      fr: 'SEO et optimisation pour la recherche IA, automatisation et tableaux de KPI, chez Prex Technologies',
    },
    stack: ['Angular SSR', 'TypeScript', 'Structured data', 'llms.txt'],
    results: {
      en: [
        { value: '2,174', label: 'URLs in the sitemap, including 1,902 product pages with images' },
        { value: '9', label: 'AI crawlers explicitly allowed, from GPTBot to ClaudeBot and PerplexityBot' },
        { label: 'Structured data on every page type: products, categories, FAQ and site search' },
        { label: 'Bing duplicate-description warning and Google soft 404 on the blog fixed' },
      ],
      es: [
        { value: '2.174', label: 'URLs en el sitemap, incluidas 1.902 páginas de producto con imágenes' },
        { value: '9', label: 'rastreadores de IA permitidos explícitamente, de GPTBot a ClaudeBot y PerplexityBot' },
        { label: 'Datos estructurados en cada tipo de página: productos, categorías, FAQ y buscador' },
        { label: 'Corregidos el aviso de descripciones duplicadas de Bing y el soft 404 de Google en el blog' },
      ],
      fr: [
        { value: '2 174', label: 'URL dans le sitemap, dont 1 902 pages produit avec images' },
        { value: '9', label: 'robots IA explicitement autorisés, de GPTBot à ClaudeBot et PerplexityBot' },
        { label: 'Données structurées sur chaque type de page : produits, catégories, FAQ et recherche' },
        { label: 'Avertissement Bing sur les descriptions en double et soft 404 Google du blog corrigés' },
      ],
    },
    challenge: {
      en: 'Buyers increasingly start with a search engine or an AI assistant, and a catalog without public prices is easy for crawlers to misread or skip. The site had to be fully readable by Google, Bing and AI agents while keeping private areas out of the index, and the team needed clear sales numbers.',
      es: 'Cada vez más compradores empiezan en un buscador o un asistente de IA, y un catálogo sin precios públicos es fácil de malinterpretar o ignorar para los rastreadores. El sitio debía ser totalmente legible para Google, Bing y los agentes de IA, sin indexar las áreas privadas, y el equipo necesitaba cifras de ventas claras.',
      fr: 'Les acheteurs commencent de plus en plus par un moteur de recherche ou un assistant IA, et un catalogue sans prix publics est facile à mal lire ou à ignorer pour les robots. Le site devait être entièrement lisible par Google, Bing et les agents IA sans indexer les espaces privés, et l\'équipe avait besoin de chiffres de vente clairs.',
    },
    built: {
      en: [
        'Server-rendered pages with canonical and Open Graph tags everywhere, and a sitemap that covers every product, category, supplier and post.',
        'Structured data per page type (Organization, WebSite with search, FAQ, product and category pages) so search engines understand the catalog.',
        'A robots policy that welcomes AI search crawlers and an llms.txt that explains how to quote and sell, while login and private routes stay out of the index.',
        'Internal task automation, and statistics and KPI dashboards for the sales team.',
      ],
      es: [
        'Páginas renderizadas en servidor con etiquetas canonical y Open Graph en todas partes, y un sitemap que cubre cada producto, categoría, proveedor y artículo.',
        'Datos estructurados por tipo de página (organización, sitio con buscador, FAQ, productos y categorías) para que los buscadores entiendan el catálogo.',
        'Una política de robots que da la bienvenida a los rastreadores de IA y un llms.txt que explica cómo cotizar y vender, dejando el login y las rutas privadas fuera del índice.',
        'Automatización de tareas internas, y estadísticas y paneles de KPIs para el equipo de ventas.',
      ],
      fr: [
        'Des pages rendues côté serveur avec balises canonical et Open Graph partout, et un sitemap qui couvre chaque produit, catégorie, fournisseur et article.',
        'Des données structurées par type de page (organisation, site avec recherche, FAQ, produits et catégories) pour que les moteurs comprennent le catalogue.',
        'Une politique robots qui accueille les robots de recherche IA et un llms.txt qui explique comment demander un devis et vendre, en gardant la connexion et les routes privées hors de l\'index.',
        'L\'automatisation de tâches internes, et des statistiques et tableaux de KPI pour l\'équipe commerciale.',
      ],
    },
  },

  stupendastic: {
    projectId: 3,
    headline: {
      en: 'Automating the back office of an audiovisual production company',
      es: 'Automatizar la operación interna de una productora audiovisual',
      fr: 'Automatiser l\'activité interne d\'une société de production audiovisuelle',
    },
    summary: {
      en: 'Stupendastic films construction, real-estate and architecture projects. I automated their internal processes on top of Monday.com and built dashboards to see every person\'s tasks at a glance.',
      es: 'Stupendastic produce video y foto para construcción, inmobiliarias y arquitectura. Automaticé sus procesos internos sobre Monday.com y construí paneles para ver de un vistazo las tareas de cada persona.',
      fr: 'Stupendastic filme des projets de construction, d\'immobilier et d\'architecture. J\'ai automatisé ses processus internes sur Monday.com et construit des tableaux de bord pour voir d\'un coup d\'œil les tâches de chacun.',
    },
    role: {
      en: 'Automation engineer and dashboard developer',
      es: 'Ingeniero de automatización y desarrollador de paneles',
      fr: 'Ingénieur automatisation et développeur de tableaux de bord',
    },
    stack: ['Python', 'Monday.com API', 'Dropbox API', 'Next.js', 'Express'],
    results: {
      en: [
        { value: '10–15', label: 'internal processes automated' },
        { value: '10+ h', label: 'of manual data entry saved every week' },
        { value: '2', label: 'dashboards to follow the team\'s workload' },
      ],
      es: [
        { value: '10–15', label: 'procesos internos automatizados' },
        { value: '10+ h', label: 'de carga manual de datos ahorradas cada semana' },
        { value: '2', label: 'paneles para seguir la carga de trabajo del equipo' },
      ],
      fr: [
        { value: '10–15', label: 'processus internes automatisés' },
        { value: '10 h+', label: 'de saisie manuelle économisées chaque semaine' },
        { value: '2', label: 'tableaux de bord pour suivre la charge de l\'équipe' },
      ],
    },
    challenge: {
      en: 'Every shoot produces files, deadlines and handoffs across a team. Tasks lived in Monday.com, files in Dropbox, and people spent hours each week copying data between them and chasing status.',
      es: 'Cada rodaje genera archivos, plazos y entregas entre varias personas. Las tareas vivían en Monday.com, los archivos en Dropbox, y el equipo pasaba horas cada semana copiando datos entre ambos y persiguiendo estados.',
      fr: 'Chaque tournage génère des fichiers, des délais et des passations dans l\'équipe. Les tâches vivaient dans Monday.com, les fichiers dans Dropbox, et l\'équipe passait des heures chaque semaine à recopier des données et à suivre les statuts.',
    },
    built: {
      en: [
        'Python automations that connect Monday.com and Dropbox, running on on-premise and cloud servers.',
        'Between ten and fifteen internal workflows automated end to end, replacing manual data entry.',
        'Two dashboards that show each person\'s tasks and workload, so managers can rebalance work before it slips.',
      ],
      es: [
        'Automatizaciones en Python que conectan Monday.com y Dropbox, corriendo en servidores on-premise y en la nube.',
        'Entre diez y quince flujos internos automatizados de punta a punta, sustituyendo la carga manual de datos.',
        'Dos paneles que muestran las tareas y la carga de cada persona, para reequilibrar el trabajo antes de que se atrase.',
      ],
      fr: [
        'Des automatisations Python qui relient Monday.com et Dropbox, sur des serveurs on-premise et cloud.',
        'Entre dix et quinze flux internes automatisés de bout en bout, à la place de la saisie manuelle.',
        'Deux tableaux de bord qui montrent les tâches et la charge de chacun, pour rééquilibrer le travail avant les retards.',
      ],
    },
  },

  alicetrader: {
    projectId: 1,
    headline: {
      en: 'A real-time automated trading app, built from scratch',
      es: 'Una app de trading automatizado en tiempo real, construida desde cero',
      fr: 'Une application de trading automatisé en temps réel, construite de zéro',
    },
    summary: {
      en: 'AliceTrader is an invitation-only automated trading platform connected to tastytrade accounts. We built the application from scratch, including every connection to live account and market data.',
      es: 'AliceTrader es una plataforma de trading automatizado por invitación, conectada a cuentas de tastytrade. Construimos la aplicación desde cero, incluidas todas las conexiones a datos de cuentas y de mercado en vivo.',
      fr: 'AliceTrader est une plateforme de trading automatisé sur invitation, connectée à des comptes tastytrade. Nous avons construit l\'application de zéro, y compris toutes les connexions aux données de compte et de marché en direct.',
    },
    role: {
      en: 'Front-end lead and integrations',
      es: 'Líder de front-end e integraciones',
      fr: 'Responsable front-end et intégrations',
    },
    stack: ['Nuxt 3', 'Vue', 'Vuetify', 'TypeScript', 'Server-sent events'],
    results: {
      en: [
        { value: '30%', label: 'faster data loading after reworking how the app consumes the API' },
        { label: 'Live account data streamed from tastytrade over server-sent events' },
        { label: 'Dashboard, trades, statistics, crypto, onboarding, 2FA and admin, all from scratch' },
      ],
      es: [
        { value: '30%', label: 'más rápida la carga de datos tras rediseñar el consumo de la API' },
        { label: 'Datos de cuenta en vivo desde tastytrade mediante server-sent events' },
        { label: 'Dashboard, operaciones, estadísticas, cripto, onboarding, 2FA y administración, todo desde cero' },
      ],
      fr: [
        { value: '30 %', label: 'de chargement des données plus rapide après refonte de la consommation de l\'API' },
        { label: 'Données de compte en direct depuis tastytrade via server-sent events' },
        { label: 'Tableau de bord, trades, statistiques, crypto, onboarding, 2FA et administration, tout de zéro' },
      ],
    },
    challenge: {
      en: 'Traders need to see positions and results the moment they change, and an automated strategy is only trustworthy if every action is visible and logged. The app had to stay fast while streaming live data, and keep accounts secure.',
      es: 'Un trader necesita ver posiciones y resultados en el momento en que cambian, y una estrategia automatizada solo genera confianza si cada acción es visible y queda registrada. La app debía seguir siendo rápida mientras recibe datos en vivo, y mantener seguras las cuentas.',
      fr: 'Un trader doit voir positions et résultats au moment où ils changent, et une stratégie automatisée n\'inspire confiance que si chaque action est visible et journalisée. L\'application devait rester rapide tout en recevant des données en direct, et protéger les comptes.',
    },
    built: {
      en: [
        'The whole Nuxt 3 and Vuetify application: dashboard, trades, statistics, crypto, settings and activity logs.',
        'Live connection to tastytrade accounts over server-sent events, so the interface updates without polling.',
        'Onboarding, two-factor authentication and role-based access control for the admin area.',
        'A rework of API consumption that cut data load times by 30%.',
      ],
      es: [
        'Toda la aplicación en Nuxt 3 y Vuetify: dashboard, operaciones, estadísticas, cripto, ajustes y registros de actividad.',
        'Conexión en vivo con las cuentas de tastytrade mediante server-sent events, para que la interfaz se actualice sin consultas repetidas.',
        'Onboarding, autenticación en dos pasos y control de acceso por roles para la administración.',
        'Un rediseño del consumo de la API que redujo un 30% los tiempos de carga de datos.',
      ],
      fr: [
        'Toute l\'application Nuxt 3 et Vuetify : tableau de bord, trades, statistiques, crypto, réglages et journaux d\'activité.',
        'Connexion en direct aux comptes tastytrade via server-sent events, pour une interface mise à jour sans interrogations répétées.',
        'Onboarding, authentification à deux facteurs et contrôle d\'accès par rôles pour l\'administration.',
        'Une refonte de la consommation de l\'API qui a réduit de 30 % les temps de chargement.',
      ],
    },
  },

  cafexporto: {
    projectId: 2,
    headline: {
      en: 'Moving a specialty-coffee exporter from WordPress to Astro',
      es: 'Llevar a una exportadora de café de especialidad de WordPress a Astro',
      fr: 'Faire passer un exportateur de café de spécialité de WordPress à Astro',
    },
    summary: {
      en: 'CafExporto exports Ecuadorian specialty coffee from farms in the Andes, the Pacific slope and the Amazon. I first built their site on WordPress, then migrated the whole design to a faster, modern stack.',
      es: 'CafExporto exporta café de especialidad ecuatoriano desde fincas en los Andes, la vertiente del Pacífico y la Amazonía. Primero construí su sitio en WordPress y luego migré todo el diseño a un stack moderno y más rápido.',
      fr: 'CafExporto exporte du café de spécialité équatorien depuis des fermes des Andes, du versant Pacifique et de l\'Amazonie. J\'ai d\'abord créé leur site sous WordPress, puis migré tout le design vers une stack moderne et plus rapide.',
    },
    role: {
      en: 'Design migration and front-end development',
      es: 'Migración del diseño y desarrollo front-end',
      fr: 'Migration du design et développement front-end',
    },
    stack: ['Astro', 'CSS', 'WordPress (before)'],
    results: {
      en: [
        { value: '50', label: 'indexed pages, including 34 pages for individual coffee lots' },
        { label: 'Static Astro pages instead of a WordPress theme and plugins' },
        { label: 'Sitemap and organization data for search engines' },
      ],
      es: [
        { value: '50', label: 'páginas indexadas, entre ellas 34 de lotes de café individuales' },
        { label: 'Páginas estáticas en Astro en vez de un tema y plugins de WordPress' },
        { label: 'Sitemap y datos de organización para buscadores' },
      ],
      fr: [
        { value: '50', label: 'pages indexées, dont 34 pages de lots de café' },
        { label: 'Des pages Astro statiques au lieu d\'un thème et de plugins WordPress' },
        { label: 'Sitemap et données d\'organisation pour les moteurs de recherche' },
      ],
    },
    challenge: {
      en: 'Coffee buyers want to see origin, quality and individual lots, and the WordPress site made that slow to load and hard to grow. The brand needed the same story in a faster site that could add a page for every new lot.',
      es: 'Los compradores de café quieren ver origen, calidad y cada lote, y el sitio en WordPress hacía eso lento y difícil de crecer. La marca necesitaba contar lo mismo en un sitio más rápido, capaz de sumar una página por cada lote nuevo.',
      fr: 'Les acheteurs de café veulent voir l\'origine, la qualité et chaque lot, et le site WordPress rendait cela lent et difficile à faire évoluer. La marque avait besoin du même récit dans un site plus rapide, capable d\'ajouter une page par nouveau lot.',
    },
    built: {
      en: [
        'The original WordPress site, then a full migration of its design and CSS to Astro.',
        'Pages for the three farms, technology, quality lab, genetic bank, awards and foundation.',
        'A page per coffee lot, generated from content, plus a sitemap and organization data.',
      ],
      es: [
        'El sitio original en WordPress y luego la migración completa de su diseño y CSS a Astro.',
        'Páginas para las tres fincas, tecnología, laboratorio de calidad, banco genético, premios y fundación.',
        'Una página por lote de café, generada desde el contenido, más sitemap y datos de organización.',
      ],
      fr: [
        'Le site WordPress d\'origine, puis la migration complète de son design et de son CSS vers Astro.',
        'Des pages pour les trois fermes, la technologie, le laboratoire qualité, la banque génétique, les prix et la fondation.',
        'Une page par lot de café, générée à partir du contenu, plus sitemap et données d\'organisation.',
      ],
    },
  },
};

// Reading order across case pages ("next case study")
export const caseOrder = [
  'asoma', 'sigue-network', 'casa-ecuador', 'concreto', 'stupendastic', 'alicetrader', 'cafexporto',
];

export const slugForProject = (projectId) => (
  Object.keys(caseStudies).find((slug) => caseStudies[slug].projectId === projectId) || null
);

export default caseStudies;
