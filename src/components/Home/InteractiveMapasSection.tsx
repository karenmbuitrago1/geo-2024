import { useEffect, useState } from 'react';
import { interactiveMapSectionService } from '../../services/interactiveMap.service';

type InteractiveMapSectionProps = {
  title: string;
  image: string;
  titleEn: string;
  urlVisor: string;
  urlVideo: string;
  description: string;
  descriptionEn: string;
};

const ITEMS_PER_SLIDE_DEFAULT = 4;
const ITEMS_PER_SLIDE_MOBILE = 1;

export const InteractiveMapSection = () => {
  const [news, setNews] = useState<InteractiveMapSectionProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_PER_SLIDE_DEFAULT);

  const totalSlides = Math.ceil(news.length / itemsPerSlide);

  useEffect(() => {
    const fetchNews = async () => {
      const response =
        await interactiveMapSectionService.getInteractiveMapSection();
      if (response) {
        setNews(
          response.map((slide: any) => ({
            title: slide.TITULO,
            urlVisor: slide.URL,
            description: slide.TEXTO,
            urlVideo: slide.URL_PIEZA,
            titleEn: slide.TITULO_INGLES,
            descriptionEn: slide.TEXTO_INGLES,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGE_DESKTOP}`,
          }))
        );
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(timer);
  }, [news.length, totalSlides]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Cambia el tamaño según tu diseño
        setItemsPerSlide(ITEMS_PER_SLIDE_MOBILE);
      } else {
        setItemsPerSlide(ITEMS_PER_SLIDE_DEFAULT);
      }
    };

    handleResize(); // Establecer el tamaño inicial
    window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño

    return () => window.removeEventListener('resize', handleResize); // Limpiar el listener
  }, []);

  const handleClick = (urlVisor: string) => {
    window.open(urlVisor, '_blank');
  };

  const handleClickAllMaps = () => {
    window.open(
      'https://geoportal.dane.gov.co/servicios/mapas-interactivos/',
      '_blank'
    );
  };

  return (
    <section className='bg-gray-100 px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <h2 className='mb-8 text-center text-3xl font-bold'>
          Mapas Interactivos
        </h2>
        <p className='mx-auto mb-8 max-w-2xl text-center'>
          Acceda a los mapa interactivos y aprenda más sobre el tema de su
          interés.
        </p>
        <div className='relative overflow-x-auto'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            }}
          >
            {news.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.urlVisor)}
                className={`flex-shrink-0 ${itemsPerSlide === ITEMS_PER_SLIDE_DEFAULT ? 'w-1/4' : 'w-full'} px-2 cursor-pointer`} // Ancho fijo en desktop, ancho completo en móvil
              >
                <div className='h-full overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
                  <div className='relative'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-48 w-full object-cover'
                    />
                  </div>
                  <div className='flex h-[calc(100%-12rem)] flex-col p-4'>
                    <h3 className='mb-2 text-lg font-bold'>{item.title}</h3>
                    <p className='mb-4 flex-grow text-sm text-gray-600'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-center space-x-2'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <div className='flex justify-center mt-16'>
          <button
            type='button'
            aria-label='Ver todos'
            onClick={handleClickAllMaps}
            className='hover:bg-hover h-10 bg-primary px-4 py-2 text-base text-white transition-colors'
          >
            Ver todos
          </button>
        </div>
      </div>
    </section>
  );
};
