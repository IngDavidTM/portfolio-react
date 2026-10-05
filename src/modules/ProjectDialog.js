import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import projects from '../data/projects';
import { spring } from '../lib/motion';
import Icon from './Icon';
import Sheet from './Sheet';

const ProjectDialog = ({ project, onClose }) => {
  const { t, language } = useTranslation();
  const number = project ? String(projects.indexOf(project) + 1).padStart(2, '0') : '';

  return (
    <Sheet
      open={Boolean(project)}
      label={project ? `${t('project.dialogLabel')}: ${project.title}` : t('project.dialogLabel')}
      closeLabel={t('project.close')}
      centerOnDesktop
      className="project_dialog"
      onClose={onClose}
    >
      {project && (
        <>
          <motion.div
            layoutId={`project-media-${project.id}`}
            className="project_dialog_media"
            style={{ borderRadius: 20 }}
            transition={spring}
          >
            <img src={project.image} alt={project.title} />
          </motion.div>
          <motion.div
            className="project_dialog_body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ ...spring, delay: 0.08 }}
          >
            <header className="project_dialog_header">
              <span className="project_number">{number}</span>
              <h2>{project.title}</h2>
            </header>
            <div className="project_dialog_grid">
              <div>
                <h3 className="project_dialog_label">{t('project.overview')}</h3>
                <p className="project_dialog_text">{project.description[language]}</p>
              </div>
              <div>
                <h3 className="project_dialog_label">{t('project.stack')}</h3>
                <ul className="project_tags">
                  {project.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}
                </ul>
              </div>
            </div>
            <div className="project_dialog_actions">
              <a href={project.live} target="_blank" rel="noreferrer" className="button button_primary">
                {t('project.visit')}
                <Icon name="arrow-up-right" />
              </a>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="button button_ghost">
                  <Icon name="github" />
                  {t('project.code')}
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </Sheet>
  );
};

ProjectDialog.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.objectOf(PropTypes.string).isRequired,
    live: PropTypes.string.isRequired,
    github: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

ProjectDialog.defaultProps = {
  project: null,
};

export default ProjectDialog;
