/* eslint-env node */
/* eslint-disable no-console, import/no-extraneous-dependencies, no-new-func */

/*
 * Social cards (1200×630) for each case study and language, written to
 * public/og/<slug>-<lang>.jpg with a local Chrome or Chromium. Run by hand
 * after changing a case study or a screenshot:
 *   npm run og            (or CHROME=/path/to/chrome npm run og)
 * The JPGs are committed; scripts/prerender.js links them when they exist.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { createRequire } = require('module');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'public', 'og');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));

const nodeRequire = createRequire(path.join(ROOT, 'package.json'));
const babel = nodeRequire('@babel/core');

// ---- Load the data modules; media imports become file:// URLs ----
const MEDIA = /\.(avif|png|jpe?g|webp|gif|svg)$/;
const load = (file) => {
  const { code } = babel.transformFileSync(file, {
    cwd: ROOT,
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }]],
  });
  const module = { exports: {} };
  const localRequire = (spec) => {
    const target = path.resolve(path.dirname(file), spec);
    if (MEDIA.test(target)) return { __esModule: true, default: `file://${target}` };
    return load(fs.existsSync(target) ? target : `${target}.js`);
  };
  new Function('module', 'exports', 'require', code)(module, module.exports, localRequire);
  return module.exports;
};

const { default: caseStudies, caseOrder } = load(path.join(SRC, 'data/caseStudies.js'));
const projects = load(path.join(SRC, 'data/projects.js')).default;
const translations = load(path.join(SRC, 'i18n/translations.js')).default;

const findChrome = () => {
  if (process.env.CHROME) return process.env.CHROME;
  const onPath = ['google-chrome', 'chromium', 'chromium-browser'].find((bin) => {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  });
  if (onPath) return onPath;
  const cache = path.join(os.homedir(), '.cache', 'ms-playwright');
  const build = fs.existsSync(cache) && fs.readdirSync(cache).filter((dir) => /^chromium-\d+$/.test(dir)).sort().pop();
  const bin = build && path.join(cache, build, 'chrome-linux64', 'chrome');
  if (bin && fs.existsSync(bin)) return bin;
  throw new Error('No Chrome found. Set CHROME=/path/to/chrome.');
};

const escape = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const font = `file://${path.join(ROOT, 'public', 'fonts', 'open-sans-latin.woff2')}`;
const fontExt = `file://${path.join(ROOT, 'public', 'fonts', 'open-sans-latin-ext.woff2')}`;

// Same palette as the site: slate panel, paper text, mist accents
const card = ({
  kicker, title, headline, stack, shot, domain,
}) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Open Sans'; font-weight: 300 800; font-stretch: 75% 100%; src: url('${font}') format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC; }
@font-face { font-family: 'Open Sans'; font-weight: 300 800; font-stretch: 75% 100%; src: url('${fontExt}') format('woff2'); unicode-range: U+0100-02BA, U+1E00-1E9F; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { font-family: 'Open Sans', sans-serif; background: #2a3132; color: #f5f5f5; position: relative; }
.text { position: absolute; left: 64px; top: 64px; bottom: 64px; width: 560px; display: flex; flex-direction: column; }
.kicker { font-size: 18px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #90afc5; }
h1 { margin-top: 22px; font-size: 76px; font-weight: 780; font-stretch: 80%; line-height: 0.95; letter-spacing: -0.03em; }
.headline { margin-top: 22px; font-size: 30px; font-weight: 500; line-height: 1.25; color: #c9d7e1; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.foot { margin-top: auto; display: flex; flex-direction: column; gap: 18px; }
.stack { display: flex; flex-wrap: wrap; gap: 8px; max-height: 84px; overflow: hidden; }
.stack span { padding: 6px 14px; border-radius: 999px; border: 1.5px solid rgba(144, 175, 197, 0.45); font-size: 17px; font-weight: 600; color: #d6e1e8; }
.sign { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 650; }
.mark { width: 40px; height: 40px; border-radius: 10px; background: #90afc5; color: #1b2122; display: grid; place-items: center; font-weight: 800; font-size: 22px; }
.sign small { font-weight: 500; color: #90afc5; font-size: 18px; }
.shot { position: absolute; left: 680px; top: 92px; width: 760px; border-radius: 18px; overflow: hidden; background: #eef1f3; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px -30px rgba(0,0,0,0.7); }
.bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; background: #f5f5f5; }
.bar i { width: 11px; height: 11px; border-radius: 50%; background: rgba(144, 175, 197, 0.7); }
.bar span { margin-left: 10px; padding: 3px 14px; border-radius: 999px; background: #e3e9ed; font-size: 15px; color: #46606d; }
.shot img { display: block; width: 100%; aspect-ratio: 1840 / 968; object-fit: cover; object-position: top; }
</style></head><body>
<div class="text">
  <p class="kicker">${escape(kicker)}</p>
  <h1>${escape(title)}</h1>
  <p class="headline">${escape(headline)}</p>
  <div class="foot">
    <div class="stack">${stack.map((item) => `<span>${escape(item)}</span>`).join('')}</div>
    <p class="sign"><span class="mark">D.</span>David Tamayo <small>${escape(domain)}</small></p>
  </div>
</div>
<figure class="shot"><span class="bar"><i></i><i></i><i></i><span>${escape(domain)}</span></span><img src="${shot}" alt=""></figure>
</body></html>`;

const chrome = findChrome();
fs.mkdirSync(OUT, { recursive: true });

caseOrder.forEach((slug, index) => {
  const study = caseStudies[slug];
  const project = projects.find((item) => item.id === study.projectId);
  Object.keys(translations).forEach((lang) => {
    const html = path.join(TMP, `${slug}-${lang}.html`);
    const png = path.join(TMP, `${slug}-${lang}.png`);
    const target = path.join(OUT, `${slug}-${lang}.jpg`);
    fs.writeFileSync(html, card({
      kicker: `${translations[lang].case.kicker} · ${String(index + 1).padStart(2, '0')}`,
      title: project.title,
      headline: study.headline[lang],
      stack: study.stack.slice(0, 5),
      shot: project.image,
      domain: host(project.live),
    }));
    execFileSync(chrome, [
      '--headless=new',
      '--no-sandbox',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=3000',
      `--screenshot=${png}`,
      `file://${html}`,
    ], { stdio: 'ignore' });
    execFileSync('convert', [png, '-strip', '-quality', '84', '-sampling-factor', '4:2:0', target]);
    console.log(`${path.relative(ROOT, target)} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
  });
});

fs.rmSync(TMP, { recursive: true, force: true });
