import { useEffect, useState } from 'react';
import { aboutSectionService } from '../../services/aboutSection.service';

interface AboutSectionItemProps {
  icono: string;
  title: string;
  titleEn: string;
  urlVisor: string;
  description: string;
  descriptionEn: string;
}

export const AboutSection = ({ language }: { language: 'ES' | 'EN' }) => {
  const [aboutItem, setAboutItem] = useState<AboutSectionItemProps[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await aboutSectionService.getAboutSection();
      if (response) {
        setAboutItem(
          response.map((slide: any) => ({
            title: slide.NIVEL_02,
            titleEn: slide.NIVEL_02_INGLES,
            description: slide.TEXTO,
            descriptionEn: slide.TEXTO_INGLES,
            icono: slide.ICONO,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.MEDIA}`,
            urlVisor: `${import.meta.env.VITE_API_IMAGES}${slide.URL}`,
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
      id='home-acerca'
      className='px-4 py-16 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <h2 className='mb-2 text-center text-4xl font-bold'>
          {language === 'ES' ? 'Acerca del Geoportal' : 'About Geoportal'}
        </h2>
        <p className='mb-12 text-center text-gray-600'>
          {language === 'ES'
            ? 'En esta sección, puede acceder a información esencial sobre cómo comunicarse con nosotros, así como a nuestras políticas legales y términos de uso, asegurando que tenga toda la información que necesita para utilizar el Geoportal de manera efectiva.'
            : 'In this section, you can access essential information on how to contact us, as well as our legal policies and terms of use, ensuring that you have all the information you need to use the Geoportal effectively.'}
        </p>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {aboutItem.map((aboutItem, index) => (
            <div
              key={index}
              onClick={() => handleClick(aboutItem.urlVisor)}
              className='flex transform cursor-pointer items-center rounded-lg bg-gray-100 p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
            >
              <span
                className={`DANE__Geovisor__icon__${aboutItem.icono} text-primary`}
                style={{
                  fontSize: '48px',
                }}
              ></span>
              <h3 className='ml-4 text-lg font-semibold text-gray-800'>
                {language === 'ES' ? aboutItem.title : aboutItem.titleEn}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
