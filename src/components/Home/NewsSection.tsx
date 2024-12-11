import { useEffect, useState } from 'react';
import { newsSectionsService } from '../../services/newsSection.service';

type New = {
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

export const NewsSection = ({ language }: { language: 'ES' | 'EN' }) => {
  const [news, setNews] = useState<New[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_PER_SLIDE_DEFAULT);

  const totalSlides = Math.ceil(news.length / itemsPerSlide);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await newsSectionsService.getNews();
      if (response) {
        setNews(
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
  }, [news.length, totalSlides]);

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

  const handleViewNews = (urlVisor: string) => {
    window.open(urlVisor, '_blank');
  };

  const handleViewVideo = (urlVideo: string) => {
    window.open(urlVideo, '_blank');
  };

  return (
    <section className='container mx-auto py-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>
        {language === 'ES' ? 'Novedades' : 'News'}
      </h2>
      <p className='mx-auto mb-8 max-w-2xl text-center'>
        {language === 'ES'
          ? 'Descubra las últimas publicaciones del Geoportal DANE y manténgase actualizado con las novedades estadísticas del territorio colombiano.'
          : 'Discover the latest publications from the DANE Geoportal and stay updated with the statistical news of the Colombian territory.'}
      </p>
      <div className='relative overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {news.map((item, index) => (
            <div
              key={index}
              className={`p-2 flex-shrink-0 ${itemsPerSlide === ITEMS_PER_SLIDE_DEFAULT ? 'w-1/4' : 'w-full'}`}
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
                  <h3 className='mb-2 text-lg font-bold'>
                    {language === 'ES' ? item.title : item.titleEn}
                  </h3>
                  <p className='mb-4 flex-grow text-sm text-gray-600'>
                    {language === 'ES' ? item.description : item.descriptionEn}
                  </p>
                  <div className='mt-auto flex items-center space-x-4'>
                    <button
                      type='button'
                      aria-label='Ir al geovisor'
                      onClick={() => handleViewNews(item.urlVisor)}
                      className='hover:bg-hover h-10 bg-primary px-4 py-2 text-white transition-colors'
                    >
                      <img
                        alt='ver icono'
                        aria-hidden='true'
                        className='h-6 w-6'
                        src='/icons/eye-icon.svg'
                      />
                    </button>
                    <button
                      type='button'
                      aria-label='Ver video del geovisor'
                      onClick={() => handleViewVideo(item.urlVideo)}
                      className='h-10 px-4 py-2 transition-colors hover:bg-gray-100'
                    >
                      <img
                        alt='ver icono'
                        aria-hidden='true'
                        className='h-5 w-5'
                        src='/icons/video-icon.svg'
                      />
                    </button>
                  </div>
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
