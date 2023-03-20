import '../stylesheets/Works.css';
import WorkCard from './WorkCard';
import Project1 from '../images/Project1.png';
import Project2 from '../images/Project2.png';
import Project3 from '../images/Project3.png';
import Project4 from '../images/Project4.png';
import Project5 from '../images/Project5.png';
import Project6 from '../images/Project6.png';

const Works = () => (
  <section className="works">
    <h2>Projects</h2>
    <p>Swipe or drag to see some of the projects I&apos;ve worked on.</p>
    <div className="works_container">
      <WorkCard image={Project1} title="World Biotech Congress 2022" tags={['HTML', 'CSS', 'JavaScript']} />
      <WorkCard image={Project2} title="Air Pollution" tags={['React', 'Redux']} />
      <WorkCard image={Project3} title="Budget App" tags={['Ruby', 'Ruby on Rails']} />
      <WorkCard image={Project4} title="Recipe App" tags={['JavaScript', 'Webpack']} />
      <WorkCard image={Project5} title="Wheels and Seals" tags={['React', 'Redux', 'Ruby on Rails']} />
      <WorkCard image={Project6} title="To do list" tags={['JavaScript']} />
    </div>
  </section>
);

export default Works;
