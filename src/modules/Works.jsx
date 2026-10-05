import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import projects from '../data/projects';
import { springSnappy } from '../lib/motion';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import '../stylesheets/Works.css';

// Curated filters; counts come from the data so they never drift
const FILTER_TAGS = ['React', 'Next', 'Vue', 'Typescript', 'Tailwind', 'Wordpress'];

const Works = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  // `openedId` is the card the dialog grew out of; only that project morphs back on close
  const [selection, setSelection] = useState({ id: null, openedId: null, direction: 0 });

  const filters = useMemo(() => [
    { value: 'all', count: projects.length },
    ...FILTER_TAGS.map((tag) => ({
      value: tag,
      count: projects.filter((item) => item.tags.includes(tag)).length,
    })),
  ], []);

  const visible = useMemo(() => (filter === 'all'
    ? projects
    : projects.filter((item) => item.tags.includes(filter))), [filter]);
  const selected = projects.find((item) => item.id === selection.id) || null;
  const position = selected ? visible.indexOf(selected) + 1 : 0;

  const openProject = (id) => setSelection({ id, openedId: id, direction: 0 });
  const closeDialog = useCallback(() => setSelection((prev) => ({ ...prev, id: null })), []);
  const navigate = useCallback((step) => {
    setSelection((prev) => {
      const index = visible.findIndex((item) => item.id === prev.id);
      if (index === -1) return prev;
      const next = visible[(index + step + visible.length) % visible.length];
      return { ...prev, id: next.id, direction: step };
    });
  }, [visible]);

  return (
    <section id="work" className="section works" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          titleId="work-title"
          index="01"
          eyebrow={t('works.eyebrow')}
          title={t('works.title')}
          accent={t('works.accent')}
          subtitle={t('works.subtitle')}
        />

        <Reveal className="works_filters" delay={0.1}>
          <div role="group" aria-label={t('works.filterLabel')} className="works_filters_track">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className="works_filter"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {filter === item.value && (
                  <motion.span layoutId="works-filter" className="works_filter_active" transition={springSnappy} />
                )}
                <span className="works_filter_label">{item.value === 'all' ? t('works.all') : item.value}</span>
                <span className="works_filter_count">{item.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <LayoutGroup>
          <motion.ul className="works_grid" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, index) => (
                <ProjectCard
                  key={item.id}
                  project={item}
                  number={projects.indexOf(item) + 1}
                  wide={index % 3 === 0}
                  onOpen={() => openProject(item.id)}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
          <ProjectDialog
            project={selected}
            morph={selected ? selected.id === selection.openedId : true}
            direction={selection.direction}
            position={position}
            total={visible.length}
            onNavigate={navigate}
            onClose={closeDialog}
          />
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Works;
