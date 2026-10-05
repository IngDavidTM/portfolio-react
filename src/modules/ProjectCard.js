import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import { spring } from '../lib/motion';
import Icon from './Icon';

const ProjectCard = forwardRef(({
  project, number, wide, onOpen,
}, ref) => {
  const { t } = useTranslation();
  const label = String(number).padStart(2, '0');

  return (
    <motion.li
      ref={ref}
      layout
      className={`project_card${wide ? ' project_card_wide' : ''}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={spring}
    >
      <article className="project_card_inner">
        {/* Shares its layoutId with the dialog image, so opening is one continuous object */}
        <motion.div
          layoutId={`project-media-${project.id}`}
          className="project_media"
          style={{ borderRadius: 20 }}
          transition={spring}
        >
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        </motion.div>
        <div className="project_info">
          <span className="project_number">{label}</span>
          <h3 className="project_title">{project.title}</h3>
          <ul className="project_tags" aria-label="Stack">
            {project.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}
          </ul>
          <span className="project_arrow" aria-hidden="true">
            <Icon name="arrow-up-right" />
          </span>
        </div>
        <button
          type="button"
          className="project_trigger"
          aria-haspopup="dialog"
          aria-label={`${t('works.open')} ${project.title}`}
          onClick={onOpen}
        />
      </article>
    </motion.li>
  );
});

ProjectCard.displayName = 'ProjectCard';

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  wide: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ProjectCard;
