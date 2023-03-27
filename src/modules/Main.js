import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Main.css';

const Main = () => {
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

  return (
    <>
      <nav>
        <FontAwesomeIcon icon={faBurger} className="nav_icon" />
        <ul className="nav_list">
          <li><button type="button" onClick={() => scrollToSection('works', 1)}>Works</button></li>
          <li><button type="button" onClick={() => scrollToSection('about', 2)}>About</button></li>
          <li><button type="button" onClick={() => scrollToSection('contact', 3)}>Contact</button></li>
        </ul>
      </nav>
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
          <a href="https://github.com/IngDavidTM">GitHub</a>
          ,
          {' '}
          <a href="https://www.linkedin.com/in/ing-david-tamayo/">Linkedin</a>
          {' '}
          and
          {' '}
          <a href="https://twitter.com/David5TM">Twitter</a>
          .
          {' '}
          <br />
          {' '}
          Download my
          {' '}
          <a href="https://docs.google.com/document/d/1GLGsbYhyyOqI1kPLedp_tqjvOReM2xoXauD5eBXVEoI/edit?usp=sharing">Resume</a>
        </p>
        <p />
      </section>

    </>
  );
};

export default Main;
