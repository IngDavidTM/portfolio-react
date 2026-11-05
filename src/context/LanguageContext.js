import PropTypes from 'prop-types';
import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import translations from '../i18n/translations';

const LanguageContext = createContext();

const getValueByPath = (obj, path) => (
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const swap = () => setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cross-fade the whole page between languages where View Transitions exist
    if (!document.startViewTransition || reduce) {
      swap();
      return;
    }
    document.startViewTransition(() => flushSync(swap));
  };

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage }), [language]);

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
