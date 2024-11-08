import { useEffect, useState } from 'react';
import { newsSectionsService } from '../../services/newsSection.service';

type MobileAppsSectionProps = {
  title: string;
  image: string;
  titleEn: string;
  urlVisor: string;
  urlVideo: string;
  description: string;
  descriptionEn: string;
};

export const MobileAppsSection = () => {
  const [news, setNews] = useState<MobileAppsSectionProps[]>([]);

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

  const handleViewNews = (urlVisor: string) => {
    window.open(urlVisor, '_blank');
  };

  const handleViewVideo = (urlVideo: string) => {
    window.open(urlVideo, '_blank');
  };

  return (
    <section className='container mx-auto py-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>
        Aplicaciones Móbiles
      </h2>
      <p className='mx-auto mb-8 max-w-2xl text-center'>
        Descargue ahora las aplicaciones móviles disponibles para acceder a las
        experiencias interactivas.
      </p>
      <div className='relative'>
        <div className='flex transition-transform duration-500 ease-in-out'>
          {news.map((item, index) => (
            <div
              key={index}
              className='w-1/4 flex-shrink-0 px-2'
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
    </section>
  );
};
