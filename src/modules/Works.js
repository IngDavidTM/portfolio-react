import '../stylesheets/Works.css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Scrollbar, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import WorkCard from './WorkCard';
import data from '../data/projects';
import Popup from './Popup';

const Works = () => {
  const [popup, setPopup] = useState(false);
  const [workPop, setWork] = useState({});
  const displayPopup = (work) => {
    setPopup(true);
    setWork(work);
  };

  return (
    <>
      <section className="works" id="works">
        <h2>Projects</h2>
        <p>Swipe or drag to see some of the projects I&apos;ve worked on.</p>
        <div className="swiper_container">
          <Swiper
            modules={[Scrollbar, A11y]}
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
