import { useTranslation } from '../context/LanguageContext';
import skills from '../data/skills';
import images from '../data/images';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import '../stylesheets/About.css';

const GROUPS = ['languages', 'frameworks', 'tools'];

const About = () => {
  const { t } = useTranslation();
  const principles = t('about.principles');

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          titleId="about-title"
          index="02"
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          accent={t('about.accent')}
        />

        <div className="about_grid">
          <Reveal as="figure" className="about_photo">
            <img
              src={images.me.src}
              srcSet={images.me.srcSet}
              sizes="(min-width: 900px) 560px, 100vw"
              alt={t('about.photoAlt')}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <div className="about_text">
            <Reveal as="p" className="about_lead" delay={0.05}>
              {t('about.paragraph')}
            </Reveal>
            <ol className="about_principles">
              {principles.map((item, index) => (
                <Reveal as="li" key={item.title} delay={0.08 * (index + 1)} className="about_principle">
                  <span className="about_principle_index">{`0${index + 1}`}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="toolbox">
          <Reveal as="h3" className="toolbox_title">{t('about.toolbox')}</Reveal>
          <div className="toolbox_grid">
            {GROUPS.map((group, index) => (
              <Reveal key={group} className="toolbox_group" delay={0.06 * index}>
                <h4>{t(`about.groups.${group}`)}</h4>
                <ul>
                  {skills[group].map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
