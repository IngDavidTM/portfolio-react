import PropTypes from 'prop-types';
import { Fragment } from 'react';
import {
  motion, useMotionValue, useReducedMotion, useSpring,
} from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import links from '../data/links';
import useMediaQuery from '../hooks/useMediaQuery';
import { spring } from '../lib/motion';
import Icon from './Icon';
import '../stylesheets/Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { ...spring, duration: 0.8, delay } }),
};

// Words materialize in sequence: blur, lift and fade arriving together
const Words = ({ text, delay }) => text.split(' ').map((word, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <Fragment key={`${word}-${index}`}>
    <motion.span
      className="hero_word"
      initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ...spring, duration: 0.9, delay: delay + index * 0.045 }}
    >
      {word}
    </motion.span>
    {' '}
  </Fragment>
));

const Hero = () => {
  const { t, language } = useTranslation();
  const meta = t('hero.meta');
  const headlineWords = t('hero.headline').split(' ').length;
  const prefersReducedMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  // The glow drifts toward the pointer on a soft spring
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const glowY = useSpring(pointerY, { stiffness: 40, damping: 20 });
  const followPointer = canHover && !prefersReducedMotion;

  const handlePointerMove = (event) => {
    if (!followPointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) * 0.35);
    pointerY.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  };

  return (
    <section id="top" className="hero" onPointerMove={handlePointerMove}>
      <div className="hero_backdrop" aria-hidden="true">
        <motion.div className="hero_glow" style={{ x: glowX, y: glowY }} />
        <div className="hero_grid" />
      </div>

      <div className="container hero_inner">
        <motion.p className="hero_status" variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <span className="hero_status_dot" />
          {t('hero.status')}
        </motion.p>

        {/* Keyed by language so the headline re-materializes on switch */}
        <h1 className="hero_title" key={language}>
          <Words text={t('hero.greeting')} delay={0.1} />
          <span className="hero_title_rest">
            <Words text={t('hero.headline')} delay={0.25} />
            <motion.em
              className="hero_accent"
              initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...spring, duration: 0.9, delay: 0.25 + headlineWords * 0.045 }}
            >
              {t('hero.accent')}
            </motion.em>
          </span>
        </h1>

        <motion.p className="hero_lead" variants={fadeUp} initial="hidden" animate="visible" custom={0.7}>
          {t('hero.description')}
        </motion.p>

        <motion.div className="hero_actions" variants={fadeUp} initial="hidden" animate="visible" custom={0.8}>
          <a href="#work" className="button button_primary">
            {t('hero.primaryCta')}
            <Icon name="arrow-down" className="icon_down" />
          </a>
          <a href="#contact" className="button button_ghost">
            {t('hero.secondaryCta')}
          </a>
          <a href={links.resume} target="_blank" rel="noreferrer" className="hero_resume">
            <Icon name="file" />
            {t('hero.resume')}
          </a>
        </motion.div>

        <motion.dl className="hero_meta" variants={fadeUp} initial="hidden" animate="visible" custom={0.95}>
          {meta.map((item) => (
            <div key={item.label} className="hero_meta_item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          <div className="hero_meta_item hero_social">
            <dt className="visually_hidden">Social</dt>
            <dd>
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href={links.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)"><Icon name="x" /></a>
            </dd>
          </div>
        </motion.dl>
      </div>

    </section>
  );
};

Words.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

export default Hero;
