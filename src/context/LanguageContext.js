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

const initialLanguage = () => readStored() || detectLanguage();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // A manual pick wins over detection from then on
  const chooseLanguage = useCallback((next) => {
    if (!LANGUAGES.includes(next) || next === language) return;
    store(next);
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
