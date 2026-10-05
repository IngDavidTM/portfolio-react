import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import projects from '../data/projects';
import useMediaQuery from '../hooks/useMediaQuery';
import { project as projectMomentum, spring } from '../lib/motion';
import Icon from './Icon';
import Sheet from './Sheet';

// Content slides in from the side the user is heading to, and leaves the other way
const slide = {
  enter: (direction) => ({ x: direction * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction * -56, opacity: 0 }),
};

const ProjectDialog = ({
  project, morph, direction, position, total, onNavigate, onClose,
}) => {
  const { t, language } = useTranslation();
  const isTouch = useMediaQuery('(pointer: coarse)');
  const swipeRef = useRef(null);
  const number = project ? String(projects.indexOf(project) + 1).padStart(2, '0') : '';
  const canNavigate = total > 1;

  useEffect(() => {
    if (!project || !canNavigate) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === 'ArrowLeft') onNavigate(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, canNavigate, onNavigate]);

  // A flick counts by where it would land, so a short fast swipe is enough
  const handleSwipeEnd = (event, info) => {
    const width = swipeRef.current ? swipeRef.current.offsetWidth : window.innerWidth;
    const restingPoint = info.offset.x + projectMomentum(info.velocity.x);
    if (restingPoint < -width * 0.25) onNavigate(1);
    else if (restingPoint > width * 0.25) onNavigate(-1);
  };

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
            ref={swipeRef}
            className="project_dialog_swipe"
            drag={isTouch && canNavigate ? 'x' : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            dragSnapToOrigin
            onDragEnd={handleSwipeEnd}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={project.id}
                className="project_dialog_slide"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={spring}
              >
                <motion.div
                  layoutId={morph ? `project-media-${project.id}` : undefined}
                  className="project_dialog_media"
                  style={{ borderRadius: 20 }}
                  transition={spring}
                >
                  <img
                    src={project.image.src}
                    srcSet={project.image.srcSet}
                    sizes="(min-width: 768px) 880px, 100vw"
                    alt={project.title}
                    draggable="false"
                  />
                </motion.div>
                <div className="project_dialog_body">
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
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {canNavigate && (
            <nav className="project_dialog_nav" aria-label={t('project.navLabel')}>
              <button type="button" className="project_dialog_step" onClick={() => onNavigate(-1)}>
                <Icon name="arrow-right" className="icon_flip" />
                <span>{t('project.prev')}</span>
              </button>
              <span className="project_dialog_counter" aria-live="polite">
                <span className="visually_hidden">{`${project.title}, `}</span>
                {`${position} / ${total}`}
              </span>
              <button type="button" className="project_dialog_step" onClick={() => onNavigate(1)}>
                <span>{t('project.next')}</span>
                <Icon name="arrow-right" />
              </button>
            </nav>
          )}
        </>
      )}
    </Sheet>
  );
};

ProjectDialog.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.objectOf(PropTypes.string).isRequired,
    live: PropTypes.string.isRequired,
    github: PropTypes.string,
  }),
  morph: PropTypes.bool,
  direction: PropTypes.number,
  position: PropTypes.number,
  total: PropTypes.number,
  onNavigate: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

ProjectDialog.defaultProps = {
  project: null,
  morph: true,
  direction: 0,
  position: 1,
  total: 1,
  onNavigate: () => {},
};

export default ProjectDialog;
