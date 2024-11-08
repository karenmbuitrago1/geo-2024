import { useEffect, useState } from 'react';
import { heroSliderService } from '../../services/heroSlider.service';

type Slide = {
  title: string;
  image: string;
  titleEn: string;
  imageMobile: string;
  description: string;
  descriptionEn: string;
};

export const HeroSlider = () => {
  const [slides, setSlides] = useState<Array<Slide>>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await heroSliderService.getHeroSlider();
      if (response) {
        setSlides(
          response.map((slide: any) => ({
            title: slide.TITULO,
            description: slide.TEXTO,
            titleEn: slide.TITULO_INGLES,
            descriptionEn: slide.TEXTO_INGLES,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGE_DESKTOP}`,
            imageMobile: `${import.meta.env.VITE_API_IMAGES}${
              slide.IMAGE_MOBILE
            }`,
          }))
        );
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className='relative h-96 overflow-hidden bg-gray-800 text-white'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className='absolute inset-0 h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-50'></div>
          <div className='container relative z-10 mx-auto flex h-full flex-col justify-center px-4 md:px-0'>
            <h1 className='mb-4 text-4xl font-bold'>{slide.title}</h1>
            <p className='max-w-2xl'>{slide.description}</p>
          </div>
        </div>
      ))}
      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full hover:cursor-pointer ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
