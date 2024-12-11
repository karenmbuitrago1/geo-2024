import { useEffect, useState } from 'react';
import {
  geovisoresService,
  geovisoresServiceSecond,
} from '../../services/geovisoresSection';
import SliderTop from './SliderPages';
import { useLanguageStore } from '../../utils/languageStore';

interface MenuItem {
  name: string;
  nameEn: string;
  COD_L2: string;
  COD_L3: string;
  iconClass: string;
}

interface CensusCard {
  cod2: string;
  cod3: string;
  cod4: string;
  title: string;
  image: string;
  tags: string[];
  titleEn: string;
  urlVisor: string;
  description: string;
  descriptionEn: string;
}

export const GeovisoresPage = () => {
  const { language } = useLanguageStore();
  const [visibleCount, setVisibleCount] = useState(16);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // @ts-ignore
  const [geoService, setGeoService] = useState<CensusCard[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [geoServiceSecond, setGeoServiceSecond] = useState<CensusCard[]>([]);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await geovisoresService.getGeovisores();
      if (response) {
        setGeoService(
          response.map((slide: any) => ({
            cod2: slide.COD_L2,
            cod3: slide.COD_L3,
            title: slide.NIVEL_03,
            urlVisor: slide.URL,
            description: slide.DESCRIPCION,
            titleEn: slide.NIVEL_03_INGLES,
            descriptionEn: slide.DESCRIPCION_INGLES,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGEN_DESKTOP}`,
            tags: ['Etiqueta'],
          }))
        );

        const items: MenuItem[] = response.map((item: any) => ({
          name: item.NIVEL_03,
          COD_L2: item.COD_L2,
          COD_L3: item.COD_L3,
          iconClass: item.ICONO,
          nameEn: item.NIVEL_03_INGLES,
        }));

        setMenuItems(items);

        const economiaItems = items.filter((item) => item.COD_L2 === '2');
        if (economiaItems.length > 0) {
          setSelectedSubItem(economiaItems[0].COD_L3);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await geovisoresServiceSecond.getGeovisoresSecond();
      if (response) {
        setGeoServiceSecond(
          response.map((slide: any) => ({
            cod2: slide.COD_L2,
            cod3: slide.COD_L3,
            cod4: slide.COD_L4,
            title: slide.NIVEL_04,
            description: slide.DESCRIPCION,
            titleEn: slide.NIVEL_04_INGLES,
            descriptionEn: slide.DESCRIPCION_INGLES,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGEN_DESKTOP}`,
            urlVisor: slide.URL,
          }))
        );
      }
    };

    fetchNews();
  }, []);

  const filteredGeoServiceSecond = geoServiceSecond.filter(
    (item) =>
      (item.cod3 === selectedSubItem || activeCategory === 'Todos') &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleGeoServiceSecond = filteredGeoServiceSecond.slice(
    0,
    visibleCount
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    if (category === 'Todos') {
      setSelectedSubItem(null);
    } else {
      const filterByCategory: Record<
        'Economía' | 'Territorio' | 'Sociedad',
        string | null
      > = {
        Economía: '2',
        Territorio: '1',
        Sociedad: '3',
      };

      if (
        category === 'Economía' ||
        category === 'Territorio' ||
        category === 'Sociedad'
      ) {
        const filteredItems = menuItems.filter((item) =>
          category === 'Sociedad'
            ? item.COD_L2 !== '2' && item.COD_L2 !== '1'
            : item.COD_L2 ===
              filterByCategory[category as 'Economía' | 'Territorio']
        );

        if (filteredItems.length > 0) {
          setSelectedSubItem(filteredItems[0].COD_L3);
        }
      }
    }

    setVisibleCount(16);
  };

  return (
    <div>
      <SliderTop language={language} />
      <section
        id='geovisores'
        className='bg-gray-100 px-4 py-8 sm:px-6 lg:px-8'
      >
        <div className='mx-auto max-w-7xl'>
          <div className='py-8 text-center'>
            <h1 className='mb-2 text-4xl font-bold'>
              {language === 'ES' ? 'Geovisores' : 'Geoviewers'}
            </h1>
            <p className='text-gray-600'>
              {language === 'ES'
                ? 'Consulte la gran variedad de geovisores para la visualización de datos estadísticos de todo el territorio colombiano.'
                : 'Find wide variety of geoviewers for the visualization of statistical data from all over the Colombian territory.'}
            </p>
          </div>

          <div className='mb-6'>
            <div className='flex justify-center items-center mb-6'>
              <p className='text-lg text-gray-700 mr-4'>
                {language === 'ES' ? 'Buscar:' : 'Search:'}
              </p>
              <label
                htmlFor='search'
                className='sr-only'
              >
                {language === 'ES'
                  ? 'Buscar geovisores...'
                  : 'Search geoviewers...'}
              </label>
              <input
                type='text'
                id='search'
                placeholder={
                  language === 'ES'
                    ? 'Escribe una palabra para realizar una búsqueda de geovisores...'
                    : 'Write a word to search in geoviewers...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-1/2 p-2 border border-gray-300 rounded-2xl'
              />
            </div>
          </div>

          <div className='flex sm:justify-start md:justify-center overflow-x-auto space-x-4 mb-6 scrollbar-hide'>
            {['Todos', 'Economía', 'Territorio', 'Sociedad'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium ${
                  activeCategory === category
                    ? 'bg-primaryDark text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className='mb-8 flex justify-center overflow-x-auto space-x-4 scrollbar-hide'>
            {activeCategory !== 'Todos' &&
              menuItems
                .filter((item) => {
                  if (activeCategory === 'Economía') return item.COD_L2 === '2';
                  if (activeCategory === 'Territorio')
                    return item.COD_L2 === '1';
                  return item.COD_L2 !== '2' && item.COD_L2 !== '1';
                })
                .map((item) => (
                  <button
                    key={item.COD_L3}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedSubItem === item.COD_L3
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => setSelectedSubItem(item.COD_L3)}
                  >
                    {language === 'ES' ? item.name : item.nameEn}
                  </button>
                ))}
          </div>

          <div className='w-full'>
            <p className='mb-4 text-gray-600'>
              {language === 'ES'
                ? `Mostrando ${visibleGeoServiceSecond.length} de ${filteredGeoServiceSecond.length} resultados`
                : `Showing ${visibleGeoServiceSecond.length} of ${filteredGeoServiceSecond.length} results`}
            </p>

            <ul className='flex flex-wrap gap-4 justify-start'>
              {visibleGeoServiceSecond.map((card, index) => (
                <li
                  key={index}
                  className='sm:w-full md:w-[48%] p-2 rounded-lg bg-white shadow-md cursor-pointer'
                >
                  <div
                    onClick={() => window.open(card.urlVisor, '_blank')}
                    className='m-1 flex items-start'
                  >
                    <img
                      loading='lazy'
                      src={card.image}
                      alt={card.title}
                      className='w-32 h-32 rounded-lg mr-4 object-cover'
                    />
                    <div>
                      <h3 className='text-lg font-semibold'>
                        {language === 'ES' ? card.title : card.titleEn}
                      </h3>
                      <p className='mb-4 text-gray-600 line-clamp-3 text-sm'>
                        {language === 'ES'
                          ? card.description
                          : card.descriptionEn}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {visibleCount < filteredGeoServiceSecond.length && (
              <div className='flex justify-center font-bold'>
                <button
                  type='button'
                  onClick={() => setVisibleCount(visibleCount + 4)}
                  className='mt-6 px-4 py-2 text-primary hover:text-hover transition-colors'
                >
                  {language === 'ES' ? 'Cargar más' : 'Load more'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
