import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const LANGUAGES = ['en', 'es', 'fr'];
const FALLBACK = 'en';
const STORAGE_KEY = 'portfolio-language';

const getValueByPath = (obj, path) => (
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
);

const readStored = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : null;
  } catch (error) {
    return null;
  }
};

const store = (language) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    // Private mode or blocked storage: the choice just lasts this visit
  }
};

// The browser's language list is the visitor's own reading preference, in
// order. It beats IP geolocation, which misreads travellers, VPNs and
// multilingual countries, and needs no third-party request.
const detectLanguage = () => {
  const preferred = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  const match = preferred
    .map((tag) => (tag || '').toLowerCase().split('-')[0])
    .find((code) => LANGUAGES.includes(code));
  return match || FALLBACK;
};

// Each language has its own URL so search engines can index all three:
// / (English), /es/ and /fr/, and the same below them (/es/projects/asoma/).
// The prerendered HTML is built per URL.
export const pathForLanguage = (language, subpath = '') => (
  `${language === FALLBACK ? '/' : `/${language}/`}${subpath}`
);

export const languageFromPath = (pathname = '/') => {
  const segment = pathname.split('/')[1];
  return LANGUAGES.includes(segment) ? segment : null;
};

// The part of the path below the language prefix: '' or 'projects/asoma/'
export const subpathOf = (pathname = '/') => {
  const parts = pathname.split('/').filter((part) => part && part !== 'index.html');
  if (LANGUAGES.includes(parts[0])) parts.shift();
  return parts.length ? `${parts.join('/')}/` : '';
};

const syncUrl = (language) => {
  const { hash, search, pathname } = window.location;
  const url = `${pathForLanguage(language, subpathOf(pathname))}${search}${hash}`;
  window.history.replaceState(null, '', url);
};

export const LanguageProvider = ({ children, initial }) => {
  // Start from the URL (what the prerendered HTML was built with) so
  // hydration matches; personal preferences apply right after
  const [language, setLanguageState] = useState(() => {
    if (initial) return initial;
    if (typeof window === 'undefined') return FALLBACK;
    return languageFromPath(window.location.pathname) || FALLBACK;
  });

  // On the bare root, honour a saved choice, else the browser's languages.
  // A language URL (/es/, /fr/) is an explicit request and is kept.
  useEffect(() => {
    if (languageFromPath(window.location.pathname)) return;
    const preferred = readStored() || detectLanguage();
    if (preferred !== FALLBACK) {
      setLanguageState(preferred);
      syncUrl(preferred);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    // Inner pages (case studies) set their own title
    if (!subpathOf(window.location.pathname)) document.title = translations[language].seo.title;
  }, [language]);

  // A manual pick wins over detection from then on
  const chooseLanguage = useCallback((next) => {
    if (!LANGUAGES.includes(next) || next === language) return;
    store(next);
    syncUrl(next);
    const swap = () => setLanguageState(next);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cross-fade the whole page between languages where View Transitions exist
    if (!document.startViewTransition || reduce) {
      swap();
      return;
    }
    document.startViewTransition(() => flushSync(swap));
  }, [language]);

  const value = useMemo(() => ({ language, chooseLanguage }), [language, chooseLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initial: PropTypes.oneOf(LANGUAGES),
};

LanguageProvider.defaultProps = {
  initial: undefined,
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (path) => {
    const result = getValueByPath(translations[language], path)
      ?? getValueByPath(translations[FALLBACK], path);
    return result !== undefined ? result : path;
  };

  return { t, language };
};

export default LanguageContext;
