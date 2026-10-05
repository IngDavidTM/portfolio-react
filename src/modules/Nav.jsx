import { useState } from 'react';
import {
  motion, useMotionValueEvent, useScroll, useSpring,
} from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import useActiveSection from '../hooks/useActiveSection';
import { springSnappy } from '../lib/motion';
import Icon from './Icon';
import LanguageToggle from './LanguageToggle';
import MobileMenu from './MobileMenu';
import '../stylesheets/Nav.css';

export const SECTIONS = ['work', 'about', 'contact'];
const OBSERVED = ['top', ...SECTIONS];

const Nav = () => {
  const { t } = useTranslation();
  const active = useActiveSection(OBSERVED);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  // The bar only becomes a material once content actually scrolls beneath it
  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 16));

  return (
    <>
      <header className="nav" data-scrolled={isScrolled}>
        <div className="nav_bar">
          <a href="#top" className="nav_logo" aria-label={t('nav.home')}>
            <span className="nav_monogram" aria-hidden="true">DT</span>
            <span className="nav_name" aria-hidden="true">David Tamayo</span>
          </a>

          <nav className="nav_links" aria-label={t('nav.label')}>
            <ul>
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="nav_active"
                        transition={springSnappy}
                      />
                    )}
                    <span className="nav_link_label">{t(`nav.${id}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav_actions">
            <LanguageToggle />
            <a href="#contact" className="button button_primary button_sm nav_cta">
              {t('nav.talk')}
              <Icon name="arrow-right" />
            </a>
            <button
              type="button"
              className="nav_menu_button"
              aria-label={t('nav.openMenu')}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>

          <motion.span className="nav_progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
      </header>

      <MobileMenu open={isMenuOpen} active={active} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Nav;
