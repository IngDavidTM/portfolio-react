import '../stylesheets/About.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination, A11y,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Skills from './Skills';

const About = () => (
  <section className="about">
    <h2>About me</h2>
    <h3>
      I&apos;m a front-end and back-end developer who enjoys collaborating with
      design teams to accurately translate their designs. Using modern
      technologies to bring creativity to life is my passion.
    </h3>
    <div className="swiper_skills">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides
        pagination={{ clickable: true }}
      >
        <SwiperSlide><Skills title="Languages" items={['JavaScript', 'Ruby', 'HTML', 'CSS']} /></SwiperSlide>
        <SwiperSlide><Skills title="Frameworks" items={['React', 'Redux', 'Ruby on Rails', 'Jest', 'Capybara', 'Rspec', 'Bootstrap', 'Tailwind']} /></SwiperSlide>
        <SwiperSlide><Skills title="Skills" items={['Github', 'Terminal', 'Gitlab']} /></SwiperSlide>
      </Swiper>
    </div>
  </section>
);

export default About;
