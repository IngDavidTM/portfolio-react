import { useLanguage, useTranslation } from '../context/LanguageContext';

const LANGUAGES = ['en', 'es'];

// Segmented control: the thumb slides to the active option (CSS transition,
// so a second tap mid-slide retargets from where the thumb is)
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="language_toggle" role="group" aria-label={t('language.label')} data-language={language}>
      <span className="language_thumb" aria-hidden="true" />
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
