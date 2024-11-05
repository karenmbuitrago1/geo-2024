import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { HeaderMain } from './components/Header/HeaderMain';
import { GeovisorsSection } from './components/GeovisorsSection';
// import { MobileAppsSection } from './components/mobileAppsSection';
import { GeospatialServices } from './components/GeospatialServices';
import { InteractiveMapSection } from './components/InteractiveMapasSection';

const App = () => {
  return (
    <div className='min-h-screen'>
      <HeaderMain />
      <HeroSlider />
      <NewsSection />
      <GeovisorsSection />
      <GeospatialServices />
      <InteractiveMapSection />
      {/* <MobileAppsSection /> */}
      <AboutSection />
      <Footer />
    </div>
  );
};

export default App;
