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
  const [selectedId, setSelectedId] = useState(null);

  const filters = useMemo(() => [
    { value: 'all', count: projects.length },
    ...FILTER_TAGS.map((tag) => ({
      value: tag,
      count: projects.filter((item) => item.tags.includes(tag)).length,
    })),
  ], []);

  const visible = filter === 'all'
    ? projects
    : projects.filter((item) => item.tags.includes(filter));
  const selected = projects.find((item) => item.id === selectedId) || null;
  const closeDialog = useCallback(() => setSelectedId(null), []);

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
                  onOpen={() => setSelectedId(item.id)}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
          <ProjectDialog project={selected} onClose={closeDialog} />
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Works;
