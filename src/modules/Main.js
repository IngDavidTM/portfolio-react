import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { LANGUAGES, useLanguage, useTranslation } from '../context/LanguageContext';
import '../stylesheets/Main.css';
import Menu from './Menu';
import { scrollToSection } from '../utils/scroll';
import profile from '../data/profile';

const { links, resume: resumeHref } = profile;

// Each language is named in itself, so a visitor finds theirs whatever the page is in
const languageNames = { en: 'English', es: 'Español', fr: 'Français' };

const Main = () => {
  const [menu, setMenu] = useState(false);
  const { language, chooseLanguage } = useLanguage();
  const { t } = useTranslation();
  const navCopy = t('nav');
  const mainCopy = t('main');

  // On phones the floating controls sit over each sheet's title, so they
  // slip away while scrolling down and come back on any scroll up
  const [navHidden, setNavHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) < 6) return;
        setNavHidden(y > lastY && y > 80);
        lastY = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (id) => {
    scrollToSection(id);
    setMenu(false);
  };
  return (
    <>
      <nav className={navHidden && !menu ? 'is-hidden' : undefined}>
        <div className="nav_controls">
          <button
            type="button"
            aria-label={navCopy.openMenu}
            className="button nav_icon"
            onClick={() => { setMenu(!menu); }}
          >
            <FontAwesomeIcon icon={faBurger} className="nav_icon" />
          </button>
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
        </div>
        <ul className="nav_list">
          <li><button type="button" className="nav_works" onClick={() => goTo('works')}>{navCopy.works}</button></li>
          <li><button type="button" className="nav_about" onClick={() => goTo('about')}>{navCopy.about}</button></li>
          <li><button type="button" className="nav_contact" onClick={() => goTo('contact')}>{navCopy.contact}</button></li>
        </ul>
      </nav>
      {menu && <Menu goTo={goTo} setMenu={setMenu} />}
      <section className="main">
        <p />
        <header>
          <h1>
            <span className="line"><span>{mainCopy.headline.line1}</span></span>
            <span className="line line_soft"><span>{mainCopy.headline.line2}</span></span>
          </h1>
          <p className="main_lede">{mainCopy.description}</p>
          <a
            href="#contact"
            className="main_cta btn_liquid"
            onClick={(event) => { event.preventDefault(); goTo('contact'); }}
          >
            <span>{mainCopy.cta}</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </header>
        <ul className="main_footer">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </li>
          ))}
          <li>
            <a href={resumeHref} target="_blank" rel="noreferrer">{mainCopy.social.resumeLink}</a>
          </li>
        </ul>
        <p />
      </section>

    </>
  );
};

export default Main;
