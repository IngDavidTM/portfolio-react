import '../stylesheets/Works.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Scrollbar, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import WorkCard from './WorkCard';
import Popup from './Popup';
import Project1 from '../images/Project1.png';
import Project2 from '../images/Project2.png';
import Project3 from '../images/Project3.png';
import Project4 from '../images/Project4.png';
import Project5 from '../images/Project5.png';
import Project6 from '../images/Project6.png';

const Works = () => (
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
          <SwiperSlide><WorkCard image={Project1} title="World Biotech Congress 2022" tags={['HTML', 'CSS', 'JavaScript']} /></SwiperSlide>
          <SwiperSlide><WorkCard image={Project2} title="Air Pollution" tags={['React', 'Redux']} /></SwiperSlide>
          <SwiperSlide><WorkCard image={Project3} title="Budget App" tags={['Ruby', 'Ruby on Rails']} /></SwiperSlide>
          <SwiperSlide><WorkCard image={Project4} title="Recipe App" tags={['JavaScript', 'Webpack']} /></SwiperSlide>
          <SwiperSlide><WorkCard image={Project5} title="Wheels and Deals" tags={['React', 'Redux', 'Ruby on Rails']} /></SwiperSlide>
          <SwiperSlide><WorkCard image={Project6} title="To do list" tags={['JavaScript']} /></SwiperSlide>
        </Swiper>
      </div>
    </section>
    <Popup image={Project1} title="World Biotech Congress 2022" tags={['HTML', 'CSS', 'JavaScript']} description="This is a capstone project for Microverse. The project is a website for a fictional conference. The website is built using HTML, CSS, and JavaScript." github="#" live="#" />

  </>
);

export default Works;
