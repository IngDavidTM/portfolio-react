import '../stylesheets/Works.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Scrollbar, Navigation, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import WorkCard from './WorkCard';
import data from '../data/projects';
import Popup from './Popup';
import { useTranslation } from '../context/LanguageContext';

const Works = () => {
  const [popup, setPopup] = useState(false);
  const [workPop, setWork] = useState({});
  const { t, language } = useTranslation();
  const worksCopy = t('works');
  const displayPopup = (work) => {
    setPopup(true);
    setWork({
      ...work,
      description: work.description[language],
    });
  };

  useEffect(() => {
    if (!popup || !workPop.id) {
      return;
    }

    const updatedWork = data.find((item) => item.id === workPop.id);
    if (updatedWork) {
      setWork({
        ...updatedWork,
        description: updatedWork.description[language],
      });
    }
  }, [language, popup, workPop.id]);

  return (
    <>
      <section className="works" id="works">
        <h2>{worksCopy.title}</h2>
        <p>{worksCopy.subtitle}</p>
        <div className="swiper_container">
          <Swiper
            modules={[Scrollbar, Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides
            breakpoints={{
              480: {
                slidesPerView: 1.4,
              },
              650: {
                slidesPerView: 2.1,
              },
              2048: {
                slidesPerView: 3.1,
              },
            }}
            scrollbar={{ draggable: true }}
            navigation={{
              nextEl: '.works_nav_next',
              prevEl: '.works_nav_prev',
            }}
            loop
          >
            {data.map((work) => (
              <SwiperSlide key={work.id} onClick={() => { displayPopup(work); }}>
                <WorkCard
                  title={work.title}
                  image={work.image}
                  tags={work.tags}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="works_nav">
            <button type="button" className="works_nav_btn works_nav_prev" aria-label={worksCopy.prev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button type="button" className="works_nav_btn works_nav_next" aria-label={worksCopy.next}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </section>
      {popup && (
      <Popup
        title={workPop.title}
        image={workPop.image}
        tags={workPop.tags}
        description={workPop.description}
        github={workPop.github}
        live={workPop.live}
        setPopup={setPopup}
      />
      )}
    </>
  );
};

export default Works;
