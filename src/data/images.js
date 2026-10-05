// Every photo is resized at build time (vite-imagetools) into a srcset,
// so phones download ~640px images instead of the 2–5k originals.
const srcSets = import.meta.glob('../images/*.avif', {
  eager: true,
  import: 'default',
  // Glob options must be literals: 640, 1024 and 1600px wide variants
  query: { w: '640;1024;1600', format: 'avif', as: 'srcset' },
});

const fallbacks = import.meta.glob('../images/*.avif', {
  eager: true,
  import: 'default',
  query: { w: '1024', format: 'avif' },
});

const images = Object.keys(srcSets).reduce((acc, path) => {
  const name = path.split('/').pop().replace('.avif', '');
  acc[name] = { src: fallbacks[path], srcSet: srcSets[path] };
  return acc;
}, {});

export default images;
