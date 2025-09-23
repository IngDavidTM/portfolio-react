import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useLanguage, useTranslation } from '../context/LanguageContext';
import '../stylesheets/Main.css';
import Menu from './Menu';

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
          <li><button type="button" onClick={() => scrollToSection('works', 1)}>{navCopy.works}</button></li>
          <li><button type="button" onClick={() => scrollToSection('about', 2)}>{navCopy.about}</button></li>
          <li><button type="button" onClick={() => scrollToSection('contact', 3)}>{navCopy.contact}</button></li>
        </ul>
      </nav>
      {menu && <Menu scrollToSectionMobile={scrollToSectionMobile} setMenu={setMenu} />}
      <section className="main">
        <p />
        <header>
          <h1>
            {mainCopy.headline.line1}
            {' '}
            <br />
            {' '}
            {mainCopy.headline.line2}
          </h1>
          <p>
            {mainCopy.description}
          </p>
          <a href="#contact">{mainCopy.cta}</a>
        </header>
        <p className="main_footer">
          {mainCopy.social.intro}
          {' '}
          <a href="https://github.com/IngDavidTM" target="_blank" rel="noreferrer">GitHub</a>
          ,
          {' '}
          <a href="https://www.linkedin.com/in/ing-david-tamayo/" target="_blank" rel="noreferrer">Linkedin</a>
          {' '}
          {mainCopy.social.and}
          {' '}
          <a href="https://twitter.com/David5TM" target="_blank" rel="noreferrer">Twitter</a>
          .
          {' '}
          <br />
          {' '}
          {mainCopy.social.resumePrefix}
          {' '}
          <a href="https://docs.google.com/document/d/1jNK2rITeP2TEhDsLCzs6wJRNnnId4pD7/edit?usp=sharing&ouid=115820516505556240890&rtpof=true&sd=true" target="_blank" rel="noreferrer">{mainCopy.social.resumeLink}</a>
        </p>
        <p />
      </section>

    </>
  );
};

export default Main;
