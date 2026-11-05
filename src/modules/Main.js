import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLanguage, useTranslation } from '../context/LanguageContext';
import '../stylesheets/Main.css';
import Menu from './Menu';
import { scrollToSection } from '../utils/scroll';

const links = [
  { label: 'GitHub', href: 'https://github.com/IngDavidTM' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ing-david-tamayo/' },
  { label: 'Twitter', href: 'https://twitter.com/David5TM' },
];

const resumeHref = 'https://docs.google.com/document/d/1jNK2rITeP2TEhDsLCzs6wJRNnnId4pD7/edit?usp=sharing&ouid=115820516505556240890&rtpof=true&sd=true';

const Main = () => {
  const [menu, setMenu] = useState(false);
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const navCopy = t('nav');
  const mainCopy = t('main');
  const toggleShort = t('language.toggleShort');
  const toggleLabel = t('language.toggleLabel');

  const goTo = (id) => {
    scrollToSection(id);
    setMenu(false);
  };
  return (
    <>
      <nav>
        <div className="nav_controls">
          <button
            type="button"
            aria-label={navCopy.openMenu}
            className="button nav_icon"
            onClick={() => { setMenu(!menu); }}
          >
            <FontAwesomeIcon icon={faBurger} className="nav_icon" />
          </button>
          <button
            type="button"
            className="language_chip"
            onClick={toggleLanguage}
            aria-label={toggleLabel}
          >
            {toggleShort}
          </button>
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
