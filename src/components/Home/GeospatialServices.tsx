import { useEffect, useState } from 'react';
import { newsSectionsService } from '../../services/geoServicesSection.service';

interface ServiceItemProps {
  icono: string;
  title: string;
  titleEn: string;
  urlVisor: string;
  description: string;
  descriptionEn: string;
}

export const GeospatialServices = ({ language }: { language: 'ES' | 'EN' }) => {
  const [geoService, setGeoService] = useState<ServiceItemProps[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await newsSectionsService.getGeoServices();
      if (response) {
        setGeoService(
          response.map((slide: any) => ({
            title: slide.NIVEL_02,
            titleEn: slide.NIVEL_02_INGLES,
            description: slide.TEXTO,
            descriptionEn: slide.TEXTO_INGLES,
            icono: slide.ICONO,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.MEDIA}`,
            urlVisor: slide.URL,
          }))
        );
      }
    };

    fetchNews();
  }, []);

  const handleClick = (urlVisor: string) => {
    window.open(urlVisor, '_blank');
  };

  return (
    <section
      id='home-servicios'
      className='px-4 py-16 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <h2 className='mb-2 text-center text-4xl font-bold'>
          {language === 'ES'
            ? 'Servicios Geoespaciales'
            : 'Geospatial Services'}
        </h2>
        <p className='mb-12 text-center text-gray-600'>
          {language === 'ES'
            ? 'El Geoportal es el ecosistema de servicios de mapas interactivos, servicios de mapas web, catálogo de metadatos geográficos, aplicaciones móviles, entre otros.'
            : 'The Geoportal is the ecosystem of interactive map services, web map services, geographic metadata catalog, mobile applications, among others.'}
        </p>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {geoService.map((geoService, index) => (
            <div
              key={index}
              onClick={() => handleClick(geoService.urlVisor)}
              className='flex transform cursor-pointer items-center rounded-lg bg-gray-100 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
            >
              <span
                className={`DANE__Geovisor__icon__${geoService.icono} text-primary`}
                style={{
                  fontSize: '60px',
                }}
              ></span>
              <h3 className='ml-4 text-lg font-semibold text-gray-800'>
                {language === 'ES' ? geoService.title : geoService.titleEn}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
