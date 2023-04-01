import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../stylesheets/Main.css';
import Menu from './Menu';

const Main = () => {
  const [menu, setMenu] = useState(false);

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
        <button type="button" className="button nav_icon" onClick={() => { setMenu(!menu); }}>
          <FontAwesomeIcon icon={faBurger} className="nav_icon" />
        </button>
        <ul className="nav_list">
          <li><button type="button" onClick={() => scrollToSection('works', 1)}>Works</button></li>
          <li><button type="button" onClick={() => scrollToSection('about', 2)}>About</button></li>
          <li><button type="button" onClick={() => scrollToSection('contact', 3)}>Contact</button></li>
        </ul>
      </nav>
      {menu && <Menu scrollToSectionMobile={scrollToSectionMobile} setMenu={setMenu} />}
      <section className="main">
        <p />
        <header>
          <h1>
            Hey there. I am David
            {' '}
            <br />
            {' '}
            I am a software Developer
          </h1>
          <p>
            Hello! My name is David, and I am a Full-Stack software
            web developer with a passion for leveraging software
            engineering to enhance web-based tools.
          </p>
          <a href="#contact">Let&apos;s collaborate</a>
        </header>
        <p className="main_footer">
          Find me at
          {' '}
          <a href="https://github.com/IngDavidTM" target="_blank" rel="noreferrer">GitHub</a>
          ,
          {' '}
          <a href="https://www.linkedin.com/in/ing-david-tamayo/" target="_blank" rel="noreferrer">Linkedin</a>
          {' '}
          and
          {' '}
          <a href="https://twitter.com/David5TM" target="_blank" rel="noreferrer">Twitter</a>
          .
          {' '}
          <br />
          {' '}
          Download my
          {' '}
          <a href="https://docs.google.com/document/d/1GLGsbYhyyOqI1kPLedp_tqjvOReM2xoXauD5eBXVEoI/edit?usp=sharing" target="_blank" rel="noreferrer">Resume</a>
        </p>
        <p />
      </section>

    </>
  );
};

export default Main;
