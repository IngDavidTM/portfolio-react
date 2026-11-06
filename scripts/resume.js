/* eslint-env node */
/* eslint-disable no-console */

/*
 * Prints resume/resume.<lang>.html to public/cv/david-tamayo-cv-<lang>.pdf
 * with a local Chrome or Chromium. Run by hand after editing the resume:
 *   npm run resume            (or CHROME=/path/to/chrome npm run resume)
 * The PDFs are committed, so the site build does not need a browser.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'cv');

const findChrome = () => {
  if (process.env.CHROME) return process.env.CHROME;
  const candidates = ['google-chrome', 'chromium', 'chromium-browser'];
  const onPath = candidates.find((bin) => {
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

const chrome = findChrome();
fs.mkdirSync(OUT, { recursive: true });

['en', 'es'].forEach((lang) => {
  const source = path.join(ROOT, 'resume', `resume.${lang}.html`);
  const target = path.join(OUT, `david-tamayo-cv-${lang}.pdf`);
  execFileSync(chrome, [
    '--headless=new',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${target}`,
    `file://${source}`,
  ], { stdio: 'ignore' });
  console.log(`${path.relative(ROOT, target)} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
});
