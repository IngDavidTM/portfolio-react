import Main from './modules/Main';
import Works from './modules/Works';
import Photo from './modules/Photo';
import About from './modules/About';
import Contact from './modules/Contact';

const App = () => (
  <div className="App">
    <Main />
    <div className="container_info">
      <Photo />
      <Works />
      <About />
      <Contact />
    </div>
  </div>
);

export default App;
