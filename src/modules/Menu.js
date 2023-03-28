import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Menu.css';

const Menu = (menu) => {
  const { scrollToSectionMobile, setMenu } = menu;
  return (
    <nav className="nav_menu">
      <div className="title_menu">
        <button type="button" className="button" onClick={() => { setMenu(!menu); }}>
          <FontAwesomeIcon icon={faBurger} className="nav_icon" />
        </button>
        <h3>Burger Menu</h3>
      </div>
      <ul className="nav_list_menu">
        <li><button type="button" onClick={() => scrollToSectionMobile('works', 2)}>Works</button></li>
        <li><button type="button" onClick={() => scrollToSectionMobile('works', 3)}>About</button></li>
        <li><button type="button" onClick={() => scrollToSectionMobile('works', 4)}>Contact</button></li>
      </ul>
    </nav>
  );
};

export default Menu;
