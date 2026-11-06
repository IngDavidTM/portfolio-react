import { subpathOf } from '../context/LanguageContext';
import caseStudies from '../data/caseStudies';

// Three kinds of page: the portfolio, one case study per project at
// projects/<slug>/ under any language prefix, and "not found" for the rest.
export const casePath = (slug) => `projects/${slug}/`;

export const routeFor = (pathname = '/') => {
  const subpath = subpathOf(pathname);
  if (!subpath) return { page: 'home' };
  const match = subpath.match(/^projects\/([a-z0-9-]+)\/$/);
  if (match && caseStudies[match[1]]) return { page: 'case', slug: match[1] };
  return { page: 'notfound' };
};
