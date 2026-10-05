import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

const getValueByPath = (obj, path) => (
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
);

const STORAGE_KEY = 'language';
const SUPPORTED = ['en', 'es'];

// Saved choice first, then the browser's language, then English
const getInitialLanguage = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch (error) {
    // Storage can be unavailable (private mode); fall through
  }
  const browser = (navigator.language || 'en').slice(0, 2);
  return SUPPORTED.includes(browser) ? browser : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Not persisting is fine
    }
  }, [language]);

  const setLanguage = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLanguageState(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

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
    const result = getValueByPath(translations[language], path);
    return result !== undefined ? result : path;
  };

  return { t, language };
};

export default LanguageContext;
