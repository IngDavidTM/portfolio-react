import { subpathOf } from '../context/LanguageContext';

// Two kinds of page: the portfolio itself, and one case study per project
// at projects/<slug>/ under any language prefix.
export const casePath = (slug) => `projects/${slug}/`;

export const routeFor = (pathname = '/') => {
  const match = subpathOf(pathname).match(/^projects\/([a-z0-9-]+)\/$/);
  return match ? { page: 'case', slug: match[1] } : { page: 'home' };
};
