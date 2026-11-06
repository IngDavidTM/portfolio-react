import PropTypes from 'prop-types';
import Main from './modules/Main';
import Works from './modules/Works';
import Photo from './modules/Photo';
import About from './modules/About';
import Contact from './modules/Contact';
import { LanguageProvider } from './context/LanguageContext';
import './stylesheets/Motion.css';

const App = ({ language }) => (
  <LanguageProvider initial={language}>
    <div className="App">
      <Main />
      <div className="container_info">
        <Photo />
        <Works />
        <About />
        <Contact />
      </div>
    </div>
  </LanguageProvider>
);

App.propTypes = {
  language: PropTypes.string,
};

App.defaultProps = {
  language: undefined,
};

export default App;
