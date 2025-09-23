import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../stylesheets/Menu.css';

const Menu = ({ scrollToSectionMobile, setMenu }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setMenu(false);
    }
  };

  return (
    <>
      {/* Overlay con glassmorphism */}
      <div
        className="menu_overlay"
        onClick={() => setMenu(false)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />

      {/* Menú con diseño elegante */}
      <nav className="nav_menu">
        <div className="menu_header">
          <div className="menu_brand">
            <h2>Navigation</h2>
            <p>Explore my portfolio</p>
          </div>
          <button
            type="button"
            aria-label="close menu"
            className="close_btn"
            onClick={() => setMenu(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <ul className="nav_list_menu">
          <li className="nav_item">
            <button
              type="button"
              className="nav_link"
              onClick={() => {
                scrollToSectionMobile('works', 2);
                setMenu(false);
              }}
            >
              <span className="nav_number">01</span>
              <span className="nav_text">Works</span>
            </button>
          </li>
          <li className="nav_item">
            <button
              type="button"
              className="nav_link"
              onClick={() => {
                scrollToSectionMobile('about', 3);
                setMenu(false);
              }}
            >
              <span className="nav_number">02</span>
              <span className="nav_text">About</span>
            </button>
          </li>
          <li className="nav_item">
            <button
              type="button"
              className="nav_link"
              onClick={() => {
                scrollToSectionMobile('contact', 4);
                setMenu(false);
              }}
            >
              <span className="nav_number">03</span>
              <span className="nav_text">Contact</span>
            </button>
          </li>
        </ul>

        <div className="menu_footer">
          <p>Ready to collaborate?</p>
          <button
            type="button"
            className="menu_cta"
            onClick={() => {
              scrollToSectionMobile('contact', 4);
              setMenu(false);
            }}
          >
            Let&apos;s build something
          </button>
        </div>
      </nav>
    </>
  );
};

Menu.propTypes = {
  scrollToSectionMobile: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

export default Menu;
