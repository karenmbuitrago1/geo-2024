import { Footer } from './components/Footer';
import { Menu } from './components/Header/Menu';
import { Header } from './components/Header/Header';
import { HeroSlider } from './components/HeroSlider';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { SubHeader } from './components/Header/SubHeader';
import { GeovisorsSection } from './components/GeovisorsSection';
// import { MobileAppsSection } from './components/mobileAppsSection';
import { GeospatialServices } from './components/GeospatialServices';
import { InteractiveMapSection } from './components/InteractiveMapasSection';

const App = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <SubHeader />
      <Menu />
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
