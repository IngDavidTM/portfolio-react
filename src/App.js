import PropTypes from 'prop-types';
import Main from './modules/Main';
import Works from './modules/Works';
import Photo from './modules/Photo';
import About from './modules/About';
import Contact from './modules/Contact';
import CaseStudy from './modules/CaseStudy';
import StatusPage from './modules/StatusPage';
import ErrorBoundary from './modules/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';
import { routeFor } from './utils/route';
import './stylesheets/Motion.css';

const Portfolio = () => (
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

// `language` and `path` come from the prerender; in the browser both are
// read from the URL
const App = ({ language, path }) => {
  const pathname = path || (typeof window === 'undefined' ? '/' : window.location.pathname);
  const route = routeFor(pathname);

  return (
    <LanguageProvider initial={language}>
      <ErrorBoundary>
        {route.page === 'home' && <Portfolio />}
        {route.page === 'case' && <CaseStudy slug={route.slug} />}
        {route.page === 'notfound' && <StatusPage kind="notfound" />}
      </ErrorBoundary>
    </LanguageProvider>
  );
};

App.propTypes = {
  language: PropTypes.string,
  path: PropTypes.string,
};

App.defaultProps = {
  language: undefined,
  path: undefined,
};

export default App;
