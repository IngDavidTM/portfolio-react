import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { pathForLanguage, useTranslation } from '../context/LanguageContext';
import projects from '../data/projects';
import caseStudies, { caseOrder } from '../data/caseStudies';
import { casePath } from '../utils/route';
import LanguageSwitch from './LanguageSwitch';
import '../stylesheets/CaseStudy.css';

// Full-page states that are not the portfolio: a 404 for unknown URLs and
// a fallback when the app itself fails. Same sheet as the case studies.
const StatusPage = ({ kind, onRetry }) => {
  const { t, language } = useTranslation();
  const copy = t(kind === 'error' ? 'status.error' : 'status.notFound');
  const home = pathForLanguage(language);

  useEffect(() => {
    document.title = `${copy.title} | David Tamayo`;
  }, [copy.title]);

  return (
    <div className="case">
      <header className="case_bar">
        <a className="case_back" href={home}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>{t('status.home')}</span>
        </a>
        <LanguageSwitch />
      </header>

      <main className="case_sheet status_sheet">
        <div className="case_intro">
          <p className="status_code" aria-hidden="true">{kind === 'error' ? '500' : '404'}</p>
          <h1>{copy.title}</h1>
          <p className="case_lede">{copy.text}</p>
          <div className="status_actions">
            {kind === 'error' ? (
              <button type="button" className="case_visit btn_liquid" onClick={onRetry}>
                <span>{copy.retry}</span>
              </button>
            ) : null}
            <a className={`case_visit btn_liquid${kind === 'error' ? ' is-ghost' : ''}`} href={home}>
              <span>{t('status.home')}</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>

        {kind === 'notfound' ? (
          <section className="case_block" aria-labelledby="status-cases">
            <h2 id="status-cases">{t('status.cases')}</h2>
            <ul className="status_links">
              {caseOrder.map((slug) => {
                const project = projects.find((item) => item.id === caseStudies[slug].projectId);
                return (
                  <li key={slug}>
                    <a href={pathForLanguage(language, casePath(slug))}>
                      <strong>{project.title}</strong>
                      <span>{caseStudies[slug].headline[language]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
};

StatusPage.propTypes = {
  kind: PropTypes.oneOf(['notfound', 'error']).isRequired,
  onRetry: PropTypes.func,
};

StatusPage.defaultProps = {
  onRetry: () => window.location.reload(),
};

export default StatusPage;
