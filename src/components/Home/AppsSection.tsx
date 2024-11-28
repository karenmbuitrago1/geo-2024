import { useEffect, useState } from 'react';
import { appsSectionsService } from '../../services/appsSection.service';

type New = {
  title: string;
  image: string;
  titleEn: string;
  urlVisor: string;
  urlVideo: string;
  description: string;
};

const ITEMS_PER_SLIDE_DEFAULT = 4;
const ITEMS_PER_SLIDE_MOBILE = 1;

export const AppsSection = () => {
  const [apps, setApps] = useState<New[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_PER_SLIDE_DEFAULT);

  const totalSlides = Math.ceil(apps.length / itemsPerSlide);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await appsSectionsService.getAppsServices();
      if (response) {
        setApps(
          response.map((slide: any) => ({
            title: slide.TITULO,
            description: slide.TEXTO,
            urlVideo: slide.URL_PIEZA,
            titleEn: slide.TITULO_INGLES,
            descriptionEn: slide.TEXTO_INGLES,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.MEDIA}`,
            urlVisor: `${import.meta.env.VITE_API_IMAGES}${slide.URL}`,
          }))
        );
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [apps.length, totalSlides]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(ITEMS_PER_SLIDE_MOBILE);
      } else {
        setItemsPerSlide(ITEMS_PER_SLIDE_DEFAULT);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (urlVisor: string) => {
    window.open(urlVisor, '_blank');
  };

  return (
    <section className='container mx-auto py-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>
        Aplicaciones Móviles
      </h2>
      <p className='mx-auto mb-8 max-w-2xl text-center'>
        Descargue ahora las aplicaciones móviles disponibles para acceder a las
        experiencias interactivas.
      </p>
      <div className='relative overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {apps.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.urlVisor)}
              className={`p-2 hover:cursor-pointer flex-shrink-0 ${itemsPerSlide === ITEMS_PER_SLIDE_DEFAULT ? 'w-1/4' : 'w-full'}`}
              style={{
                minWidth:
                  itemsPerSlide === ITEMS_PER_SLIDE_DEFAULT ? '250px' : '100%',
              }}
            >
              <div className='h-full overflow-hidden rounded-lg bg-white shadow-md'>
                <div className='relative'>
                  <img
                    src={`${item.image}-desktop.webp`}
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
    </section>
  );
};