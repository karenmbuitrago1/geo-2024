import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLanguageStore } from './utils/languageStore';

import { Footer } from './components/Footer';
import { HeaderMain } from './components/Header/HeaderMain';
import { HeroSlider } from './components/Home/HeroSlider';
import { AppsSection } from './components/Home/AppsSection';
import { NewsSection } from './components/Home/NewsSection';
import { AboutSection } from './components/Home/AboutSection';
import { GeovisorsSection } from './components/Home/GeovisorsSection';
import { GeospatialServices } from './components/Home/GeospatialServices';
import { InteractiveMapSection } from './components/Home/InteractiveMapasSection';

import { GeovisoresPage } from './components/Pages/GeovisoresPage';

const HomePage = () => {
  const { language } = useLanguageStore();

  return (
    <div>
      <HeroSlider language={language} />
      <NewsSection language={language} />
      <GeovisorsSection language={language} />
      <GeospatialServices language={language} />
      <InteractiveMapSection language={language} />
      <AppsSection language={language} />
      <AboutSection language={language} />
    </div>
  );
};

const App = () => {
  const { language } = useLanguageStore();

  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <HeaderMain />

        <main className='flex-grow'>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/geovisores'
              element={<GeovisoresPage />}
            />
          </Routes>
        </main>

        <Footer language={language} />
      </div>
    </Router>
  );
};

export default App;
