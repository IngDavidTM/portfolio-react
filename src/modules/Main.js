import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLanguage, useTranslation } from '../context/LanguageContext';
import '../stylesheets/Main.css';
import Menu from './Menu';

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

  const scrollToSection = (element, number) => {
    const section = document.getElementById(element);
    const documentHeight = document.documentElement.scrollHeight;
    const targetScrollPos = parseInt((documentHeight * number) / 4, 10);

    if (section) {
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSectionMobile = (element, number) => {
    const section = document.getElementById(element);
    const documentHeight = document.documentElement.scrollHeight;
    const targetScrollPos = parseInt((documentHeight * number) / 5, 10);

    if (section) {
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth',
      });
      setMenu(false);
    } else {
      setMenu(true);
    }
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
          <li><button type="button" className="nav_works" onClick={() => scrollToSection('works', 1)}>{navCopy.works}</button></li>
          <li><button type="button" className="nav_about" onClick={() => scrollToSection('about', 2)}>{navCopy.about}</button></li>
          <li><button type="button" className="nav_contact" onClick={() => scrollToSection('contact', 3)}>{navCopy.contact}</button></li>
        </ul>
      </nav>
      {menu && <Menu scrollToSectionMobile={scrollToSectionMobile} setMenu={setMenu} />}
      <section className="main">
        <p />
        <header>
          <h1>
            <span className="line"><span>{mainCopy.headline.line1}</span></span>
            <span className="line line_soft"><span>{mainCopy.headline.line2}</span></span>
          </h1>
          <p className="main_lede">{mainCopy.description}</p>
          <a href="#contact" className="main_cta">
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
