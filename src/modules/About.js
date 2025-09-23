import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from '../context/LanguageContext';
import '../stylesheets/About.css';
import Skills from './Skills';

const skillSets = {
  languages: [
    'JavaScript',
    'Python',
    'Ruby',
    'TypeScript',
    'SQL',
    'Shell',
    'R',
    'HTML',
    'CSS',
  ],
  frameworks: [
    'React',
    'Next',
    'Vue',
    'Nuxt',
    'Vuex',
    'Redux',
    'Ruby on Rails',
    'Scala',
    'Jest',
    'Mocha',
    'Capybara',
    'Rspec',
    'Bootstrap',
    'Tailwind',
    'Sass',
    'Express',
  ],
  skills: [
    'GitHub',
    'Linux',
    'GitLab',
    'Docker',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'SQLite',
    'Twilio',
    'Postman',
  ],
};

const About = () => {
  const { t } = useTranslation();
  const aboutCopy = t('about');
  const [direction, setDirection] = useState('right');
  const previousIndexRef = useRef(0);

  const handleSlideChange = (swiper) => {
    const current = swiper.activeIndex;
    const previous = previousIndexRef.current;

    if (current === previous) {
      return;
    }

    const wrappedToStart = previous === swiper.slides.length - 1 && current === 0;
    const isForward = current > previous || wrappedToStart;
    setDirection(isForward ? 'right' : 'left');
    previousIndexRef.current = current;
  };

  return (
    <section className="about" id="about">
      <h2>{aboutCopy.title}</h2>
      <h3>{aboutCopy.paragraph}</h3>
      <div className="swiper_skills" data-direction={direction}>
        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides
          pagination={{ clickable: true }}
          speed={450}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            <Skills
              direction={direction}
              title={aboutCopy.skills.languages}
              items={skillSets.languages}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Skills
              direction={direction}
              title={aboutCopy.skills.frameworks}
              items={skillSets.frameworks}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Skills
              direction={direction}
              title={aboutCopy.skills.skills}
              items={skillSets.skills}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default About;
