import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/Menu.css';

const Menu = ({ scrollToSectionMobile, setMenu }) => {
  const { t } = useTranslation();
  const navCopy = t('nav');
  const menuCopy = t('menu');

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
        aria-label={menuCopy.closeAria}
      />

      {/* Menú con diseño elegante */}
      <nav className="nav_menu">
        <div className="menu_header">
          <div className="menu_brand">
            <h2>{menuCopy.title}</h2>
            <p>{menuCopy.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label={menuCopy.closeAria}
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
              <span className="nav_text">{navCopy.works}</span>
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
              <span className="nav_text">{navCopy.about}</span>
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
              <span className="nav_text">{navCopy.contact}</span>
            </button>
          </li>
        </ul>

        <div className="menu_footer">
          <p>{menuCopy.ready}</p>
          <button
            type="button"
            className="menu_cta"
            onClick={() => {
              scrollToSectionMobile('contact', 4);
              setMenu(false);
            }}
          >
            {menuCopy.ctaLabel}
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
