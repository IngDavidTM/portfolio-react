import { MotionConfig } from 'framer-motion';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import About from './modules/About';
import Contact from './modules/Contact';
import Footer from './modules/Footer';
import Hero from './modules/Hero';
import Nav from './modules/Nav';
import Works from './modules/Works';

const Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <a href="#work" className="skip_link">{t('meta.skip')}</a>
      <Nav />
      <main>
        <Hero />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

// reducedMotion="user": with the OS setting on, Motion drops transforms and keeps fades
const App = () => (
  <LanguageProvider>
    <MotionConfig reducedMotion="user">
      <Page />
    </MotionConfig>
  </LanguageProvider>
);

export default App;
