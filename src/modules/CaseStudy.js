import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faArrowRight, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { pathForLanguage, useTranslation } from '../context/LanguageContext';
import projects from '../data/projects';
import caseStudies, { caseOrder } from '../data/caseStudies';
import { casePath } from '../utils/route';
import LanguageSwitch from './LanguageSwitch';
import StatusPage from './StatusPage';
import '../stylesheets/CaseStudy.css';

const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const CaseStudy = ({ slug }) => {
  const { t, language } = useTranslation();
  const copy = t('case');
  const study = caseStudies[slug];
  const project = study && projects.find((item) => item.id === study.projectId);
  const home = pathForLanguage(language);

  useEffect(() => {
    if (project) document.title = `${project.title}: ${study.headline[language]} | David Tamayo`;
  }, [project, study, language]);

  if (!project) return <StatusPage kind="notfound" />;

  const position = caseOrder.indexOf(slug);
  const nextSlug = caseOrder[(position + 1) % caseOrder.length];
  const nextProject = projects.find((item) => item.id === caseStudies[nextSlug].projectId);

  return (
    <div className="case">
      <header className="case_bar">
        <a className="case_back" href={`${home}#works`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>{copy.back}</span>
        </a>
        <LanguageSwitch />
      </header>

      <main className="case_sheet">
        <div className="case_intro">
          <p className="case_kicker">
            {`${copy.kicker} · ${String(position + 1).padStart(2, '0')}`}
          </p>
          <h1>{project.title}</h1>
          <p className="case_headline">{study.headline[language]}</p>
          <p className="case_lede">{study.summary[language]}</p>

          <dl className="case_facts">
            <div>
              <dt>{copy.role}</dt>
              <dd>{study.role[language]}</dd>
            </div>
            <div>
              <dt>{copy.stack}</dt>
              <dd>{study.stack.join(' · ')}</dd>
            </div>
          </dl>

          <a className="case_visit btn_liquid" href={project.live} target="_blank" rel="noreferrer">
            <span>{copy.visit}</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>

        <figure className="case_shot">
          <span className="case_shot_bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{host(project.live)}</span>
          </span>
          <img src={project.image} alt={`${project.title}, ${host(project.live)}`} />
        </figure>

        {study.results[language].length > 0 && (
          <section className="case_results" aria-labelledby="case-results">
            <h2 id="case-results">{copy.results}</h2>
            <ul>
              {study.results[language].map((result) => (
                <li key={result.label}>
                  {result.value ? <strong>{result.value}</strong> : null}
                  <span>{result.label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="case_block" aria-labelledby="case-challenge">
          <h2 id="case-challenge">{copy.challenge}</h2>
          <p>{study.challenge[language]}</p>
        </section>

        <section className="case_block" aria-labelledby="case-built">
          <h2 id="case-built">{copy.built}</h2>
          <ul className="case_list">
            {study.built[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <footer className="case_footer">
          <div className="case_cta">
            <p>{copy.cta}</p>
            <a className="case_cta_link btn_liquid" href={`${home}#contact`}>
              <span>{copy.ctaButton}</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <a className="case_next" href={pathForLanguage(language, casePath(nextSlug))}>
            <span>{copy.next}</span>
            <strong>{nextProject.title}</strong>
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </footer>
      </main>
    </div>
  );
};

CaseStudy.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CaseStudy;
