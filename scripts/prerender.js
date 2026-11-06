/* eslint-env node */
/* eslint-disable no-console, import/no-extraneous-dependencies, no-new-func */

/*
 * Static prerender, run after `react-scripts build`.
 *
 * Renders the real React app to HTML once per language (/, /es/, /fr/) so
 * search engines and AI crawlers that never run JavaScript still read the
 * whole portfolio. The browser then hydrates that markup (src/index.js).
 *
 * Also writes, from the same data the page uses:
 *   - per-language <title>, description, canonical, hreflang, Open Graph
 *   - JSON-LD (Person, WebSite, ProfilePage, projects)
 *   - sitemap.xml, robots.txt and llms.txt
 *
 * No bundler: src files are compiled on the fly with the Babel presets
 * already in the project; styles are skipped and media imports resolve to
 * the hashed URLs in build/asset-manifest.json.
 */

const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = path.join(ROOT, 'build');
const SITE = (process.env.SITE_URL || 'https://david-tamayo.netlify.app').replace(/\/$/, '');

const nodeRequire = createRequire(path.join(ROOT, 'package.json'));
const babel = nodeRequire('@babel/core');
const React = nodeRequire('react');
const { renderToString } = nodeRequire('react-dom/server');

const manifest = JSON.parse(fs.readFileSync(path.join(BUILD, 'asset-manifest.json'), 'utf8')).files;

// ---- Minimal module loader for src/ ----
const STYLE = /\.(css|scss)$/;
const MEDIA = /\.(avif|png|jpe?g|webp|gif|svg)$/;
const cache = new Map();

const mediaUrl = (file) => {
  const url = manifest[`static/media/${path.basename(file)}`];
  if (!url) throw new Error(`No built asset for ${file}`);
  return url;
};

const resolveLocal = (from, spec) => {
  const base = path.resolve(path.dirname(from), spec);
  const found = [base, `${base}.js`, path.join(base, 'index.js')]
    .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!found) throw new Error(`Cannot resolve ${spec} from ${from}`);
  return found;
};

const load = (file) => {
  if (cache.has(file)) return cache.get(file).exports;
  const { code } = babel.transformFileSync(file, {
    cwd: ROOT,
    babelrc: false,
    configFile: false,
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  });
  const module = { exports: {} };
  cache.set(file, module);
  const localRequire = (spec) => {
    if (STYLE.test(spec)) return {};
    // Package style entry points ('swiper/css') resolve to .css files
    if (!spec.startsWith('.')) return STYLE.test(nodeRequire.resolve(spec)) ? {} : nodeRequire(spec);
    const target = resolveLocal(file, spec);
    if (MEDIA.test(target)) return { __esModule: true, default: mediaUrl(target) };
    return load(target);
  };
  new Function('module', 'exports', 'require', code)(module, module.exports, localRequire);
  return module.exports;
};

const fromSrc = (file) => load(path.join(SRC, file)).default;

const App = fromSrc('App.js');
const translations = fromSrc('i18n/translations.js');
const projects = fromSrc('data/projects.js');
const skillGroups = fromSrc('data/skills.js');
const profile = fromSrc('data/profile.js');
const { LANGUAGES, pathForLanguage } = load(path.join(SRC, 'context/LanguageContext.js'));

// ---- Helpers ----
const LOCALES = { en: 'en_US', es: 'es_ES', fr: 'fr_FR' };
const absolute = (urlPath) => `${SITE}${urlPath}`;
const attr = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
const jsonScript = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const allSkills = skillGroups.flatMap((group) => group.items);
const photo = absolute(manifest['static/media/me.avif']);
const ogImage = absolute('/og.jpg');

// ---- Structured data ----
const structuredData = (lang) => {
  const copy = translations[lang];
  const pageUrl = absolute(pathForLanguage(lang));
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: profile.name,
    jobTitle: copy.seo.role,
    description: copy.seo.description,
    url: `${SITE}/`,
    image: photo,
    sameAs: profile.links.map((link) => link.href),
    knowsAbout: allSkills,
  };
  const works = projects.map((project) => ({
    '@type': 'CreativeWork',
    name: project.title,
    url: project.live,
    image: absolute(project.image),
    description: project.description[lang],
    keywords: project.tags.join(', '),
    creator: { '@id': `${SITE}/#person` },
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: profile.name,
        inLanguage: LANGUAGES,
        publisher: { '@id': `${SITE}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: copy.seo.title,
        description: copy.seo.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: { '@id': `${SITE}/#person` },
        hasPart: {
          '@type': 'ItemList',
          name: copy.works.title,
          itemListElement: works.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item,
          })),
        },
      },
    ],
  };
};

// ---- <head> per language ----
const headFor = (lang) => {
  const { seo } = translations[lang];
  const pageUrl = absolute(pathForLanguage(lang));
  const alternates = LANGUAGES
    .map((code) => `<link rel="alternate" hreflang="${code}" href="${absolute(pathForLanguage(code))}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${absolute('/')}">`);
  const otherLocales = LANGUAGES
    .filter((code) => code !== lang)
    .map((code) => `<meta property="og:locale:alternate" content="${LOCALES[code]}">`);

  return [
    `<title>${attr(seo.title)}</title>`,
    `<meta name="description" content="${attr(seo.description)}">`,
    `<meta name="author" content="${attr(profile.name)}">`,
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<link rel="canonical" href="${pageUrl}">`,
    ...alternates,
    '<meta property="og:type" content="profile">',
    `<meta property="og:url" content="${pageUrl}">`,
    `<meta property="og:site_name" content="${attr(profile.name)}">`,
    `<meta property="og:title" content="${attr(seo.title)}">`,
    `<meta property="og:description" content="${attr(seo.description)}">`,
    `<meta property="og:image" content="${ogImage}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${attr(seo.title)}">`,
    `<meta property="og:locale" content="${LOCALES[lang]}">`,
    ...otherLocales,
    `<meta property="profile:first_name" content="${attr(profile.name.split(' ')[0])}">`,
    `<meta property="profile:last_name" content="${attr(profile.name.split(' ').slice(1).join(' '))}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${attr(seo.title)}">`,
    `<meta name="twitter:description" content="${attr(seo.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<link rel="alternate" type="text/plain" title="LLM summary" href="${absolute('/llms.txt')}">`,
    `<script type="application/ld+json">${jsonScript(structuredData(lang))}</script>`,
  ].join('');
};

// ---- Pages ----
const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('build/index.html has no empty #root; was it already prerendered?');
}

LANGUAGES.forEach((lang) => {
  const markup = renderToString(React.createElement(App, { language: lang }));
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `${headFor(lang)}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  const dir = path.join(BUILD, pathForLanguage(lang));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`prerendered ${pathForLanguage(lang)} (${Math.round(html.length / 1024)} KB)`);
});

// ---- sitemap.xml ----
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...LANGUAGES.map((lang) => [
    '  <url>',
    `    <loc>${absolute(pathForLanguage(lang))}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    ...LANGUAGES.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absolute(pathForLanguage(code))}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('/')}"/>`,
    '  </url>',
  ].join('\n')),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);

// ---- robots.txt: everyone welcome, including AI search crawlers ----
fs.writeFileSync(path.join(BUILD, 'robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${absolute('/sitemap.xml')}`,
  '',
].join('\n'));

// ---- llms.txt: a plain summary for assistants (https://llmstxt.org) ----
const { en } = translations;
const llms = [
  `# ${profile.name}`,
  '',
  `> ${en.seo.description}`,
  '',
  en.about.paragraph,
  '',
  '## Skills',
  '',
  ...skillGroups.map((group) => `- ${en.about.skills[group.key]}: ${group.items.join(', ')}`),
  '',
  '## Projects',
  '',
  ...projects.map((project) => `- [${project.title}](${project.live}): ${project.description.en} (${project.tags.join(', ')})`),
  '',
  '## Portfolio',
  '',
  ...LANGUAGES.map((lang) => `- [${translations[lang].seo.title}](${absolute(pathForLanguage(lang))})`),
  '',
  '## Contact',
  '',
  `- [Contact form](${absolute('/#contact')})`,
  ...profile.links.map((link) => `- [${link.label}](${link.href})`),
  `- [Resume](${profile.resume})`,
  '',
].join('\n');
fs.writeFileSync(path.join(BUILD, 'llms.txt'), llms);

console.log(`sitemap.xml, robots.txt and llms.txt written for ${SITE}`);
