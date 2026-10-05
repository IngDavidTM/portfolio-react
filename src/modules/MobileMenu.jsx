import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import links from '../data/links';
import { spring } from '../lib/motion';
import Icon from './Icon';
import LanguageToggle from './LanguageToggle';
import Sheet from './Sheet';

const SECTIONS = ['work', 'about', 'contact'];

const MobileMenu = ({ open, active, onClose }) => {
  const { t } = useTranslation();

  return (
    <Sheet
      open={open}
      label={t('nav.menuTitle')}
      closeLabel={t('nav.closeMenu')}
      dragAnywhere
      className="mobile_menu"
      onClose={onClose}
    >
      <div className="mobile_menu_inner">
        <p className="eyebrow">{t('nav.menuTitle')}</p>
        <nav aria-label={t('nav.label')}>
          <ul className="mobile_menu_links">
            {SECTIONS.map((id, index) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.04 * index }}
              >
                <a
                  href={`#${id}`}
                  onClick={onClose}
                  aria-current={active === id ? 'location' : undefined}
                >
                  <span className="mobile_menu_index">{`0${index + 1}`}</span>
                  <span className="mobile_menu_label">{t(`nav.${id}`)}</span>
                  <Icon name="arrow-right" className="mobile_menu_arrow" />
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="mobile_menu_footer">
          <LanguageToggle />
          <div className="mobile_menu_social">
            <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={links.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)"><Icon name="x" /></a>
          </div>
        </div>
        <a href="#contact" className="button button_primary mobile_menu_cta" onClick={onClose}>
          {t('nav.talk')}
          <Icon name="arrow-right" />
        </a>
      </div>
    </Sheet>
  );
};

MobileMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  active: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

MobileMenu.defaultProps = {
  active: null,
};

export default MobileMenu;
