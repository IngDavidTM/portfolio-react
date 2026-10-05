import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// AVIF encoding takes seconds per variant. In dev and tests, answer the resize
// queries with the original file so startup stays instant; only `vite build` resizes.
const originalImagesInDev = () => ({
  name: 'original-images-in-dev',
  apply: 'serve',
  enforce: 'pre',
  load(id) {
    const [file, query] = id.split('?');
    if (!query || !query.includes('w=') || !/\.(avif|jpe?g|png|webp)$/.test(file)) return null;
    const url = `/${path.relative(process.cwd(), file).split(path.sep).join('/')}`;
    const value = query.includes('as=srcset') ? `${url} 1600w` : url;
    return `export default ${JSON.stringify(value)};`;
  },
});

export default defineConfig({
  plugins: [originalImagesInDev(), react(), imagetools()],
  build: {
    // Same output folder CRA used, so the hosting config keeps working
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: false,
  },
});
