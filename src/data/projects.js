import Project1 from '../images/Project1.avif';
import Project2 from '../images/Project2.avif';
import Project3 from '../images/Project3.avif';
import Project4 from '../images/Project4.avif';
import Project5 from '../images/Project5.avif';
import Project7 from '../images/Project7.avif';
import Project8 from '../images/Project8.avif';

const data = [
  {
    id: 1,
    title: 'CafExporto',
    image: Project1,
    tags: ['Wordpress', 'CSS', 'Plugins'],
    description: {
      en: 'This is a project created with WordPress for the company CafExporto. It consists of six pages.',
      es: 'Proyecto creado con WordPress para la empresa CafExporto. Consta de seis páginas.',
    },
    live: 'https://cafexporto.com/',
  },
  {
    id: 2,
    title: 'AliceTrader',
    image: Project2,
    tags: ['Vue', 'Tailwind', 'Vuex', 'Typescript'],
    description: {
      en: 'An intuitive app for analyzing, trading, and managing options with real-time data and customizable tools.',
      es: 'Aplicación intuitiva para analizar, operar y gestionar opciones con datos en tiempo real y herramientas personalizables.',
    },
    github: 'https://github.com/tastyware',
    live: 'https://alicetrader.com/',
  },
  {
    id: 3,
    title: 'Stupendastic',
    image: Project3,
    tags: ['Python', 'Express', 'Next', 'Typescript'],
    description: {
      en: 'Two dashboards for managing Monday tasks and automations via Python scripts, using on-premise and cloud-hosted servers to handle employee task management and improve task visualization.',
      es: 'Dos paneles para gestionar tareas y automatizaciones de Monday mediante scripts en Python, empleando servidores on-premise y en la nube para administrar al equipo y mejorar la visualización de tareas.',
    },
    github: 'https://github.com/Stupendastic-Connect',
    live: 'https://www.stupendastic.com/',
  },
  {
    id: 4,
    title: 'Recipe App',
    image: Project4,
    tags: ['JavaScript', 'Webpack'],
    description: {
      en: 'A web app that lists meal recipes from an API. Users can leave comments and likes on each dish.',
      es: 'Aplicación web que muestra recetas de comidas desde una API. Los usuarios pueden comentar y dar “likes” a cada plato.',
    },
    github: 'https://github.com/IngDavidTM/capstone-javascript-API',
    live: 'https://ingdavidtm.github.io/capstone-javascript-API/dist/',
  },
  {
    id: 5,
    title: 'Wheels and Deals',
    image: Project5,
    tags: ['React', 'Redux', 'Ruby on Rails'],
    description: {
      en: 'Wheels and Deals is a car rental website built with React, Redux, and Ruby on Rails. It includes user authentication, booking creation, and a catalog of available cars.',
      es: 'Wheels and Deals es un sitio de alquiler de autos creado con React, Redux y Ruby on Rails. Permite autenticación de usuarios, creación de reservas y un catálogo de vehículos disponibles.',
    },
    github: 'https://github.com/IngDavidTM/wheels-and-deals-react',
    live: 'https://wheels-and-deals.netlify.app/',
  },
  {
    id: 7,
    title: 'Projects at Torre ai',
    image: Project7,
    tags: ['Scala', 'Vue', 'Sass'],
    description: {
      en: 'This platform lets users leverage AI tools for job or talent searches. I worked on building candidate communication flows and solving technical issues as they appeared.',
      es: 'Plataforma que permite aprovechar herramientas de IA para buscar empleo o talento. Me encargué de crear procesos de comunicación con candidatos y resolver incidencias técnicas.',
    },
    github: 'https://github.com/torre-labs/',
    live: 'https://torre.ai/',
  },
  {
    id: 8,
    title: 'Web Minds Studio',
    image: Project8,
    tags: ['Next', 'Tailwind', 'React'],
    description: {
      en: 'This site presents several subscription tiers to help teams build their website with flexible, customizable plans.',
      es: 'Sitio que presenta distintos planes de suscripción para ayudar a crear sitios web con opciones flexibles y personalizables.',
    },
    github: 'https://github.com/WebMindsStudio',
    live: 'https://www.webmindsstudio.com/',
  },
];

export default data;
