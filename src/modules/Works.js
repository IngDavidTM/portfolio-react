import '../stylesheets/Works.css';
import { useEffect, useState } from 'react';
import WorkCard from './WorkCard';
import data from '../data/projects';
import Popup from './Popup';
import { useTranslation } from '../context/LanguageContext';
import { scrollToProject } from '../utils/scroll';

// Vertical scroll spent travelling the rail, in viewport heights per project
const RAIL_PER_PROJECT = 0.32;

const Works = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t, language } = useTranslation();
  const worksCopy = t('works');
  const count = data.length;
  const open = openIndex === null ? null : data[openIndex];

  // Every sheet after Projects is timed off how long the rail stays pinned
  useEffect(() => {
    document.documentElement.style.setProperty('--k', (count * RAIL_PER_PROJECT).toFixed(2));
  }, [count]);

  const step = (delta) => {
    setOpenIndex((current) => (current + delta + count) % count);
  };

  return (
    <>
      <section className="works" id="works">
        <div className="works_stage">
          <div className="works_header">
            <h2>{worksCopy.title}</h2>
            <span className="works_count">{String(count).padStart(2, '0')}</span>
            <p className="works_hint">{worksCopy.subtitle}</p>
          </div>
          <div className="works_viewport">
            <ol className="works_track">
              {data.map((work, index) => (
                <li key={work.id}>
                  <WorkCard
                    title={work.title}
                    image={work.image}
                    tags={work.tags}
                    onOpen={() => setOpenIndex(index)}
                    onFocus={() => scrollToProject(index, count)}
                  />
                </li>
              ))}
            </ol>
          </div>
          <div className="works_progress" aria-hidden="true"><span /></div>
        </div>
      </section>
      {open && (
        <Popup
          key="project-sheet"
          work={{ ...open, description: open.description[language] }}
          index={openIndex}
          count={count}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
};

export default Works;
