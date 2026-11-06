import { LANGUAGES, useLanguage, useTranslation } from '../context/LanguageContext';

// Each language is named in itself, so a visitor finds theirs whatever the page is in
const languageNames = { en: 'English', es: 'Español', fr: 'Français' };

const LanguageSwitch = () => {
  const { language, chooseLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="language_switch" role="group" aria-label={t('language.label')}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={languageNames[code]}
          aria-pressed={language === code}
          onClick={() => chooseLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
