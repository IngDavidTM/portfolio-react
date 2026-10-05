import { useTranslation } from '../context/LanguageContext';
import links from '../data/links';
import Icon from './Icon';
import '../stylesheets/Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer_inner">
        <p className="footer_signature" aria-hidden="true">
          David
          {' '}
          <em>Tamayo</em>
        </p>
        <div className="footer_bar">
          <p className="footer_meta">
            {`© ${new Date().getFullYear()} · ${t('footer.built')}`}
          </p>
          <ul className="footer_links">
            <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={links.resume} target="_blank" rel="noreferrer">{t('hero.resume')}</a></li>
            <li>
              <a href="#top" className="footer_top">
                {t('footer.top')}
                <Icon name="arrow-up" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
