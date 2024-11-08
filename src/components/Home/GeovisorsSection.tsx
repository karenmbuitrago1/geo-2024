import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  geovisoresService,
  geovisoresServiceSecond,
} from '../../services/geovisoresSection';

interface MenuItem {
  name: string;
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
  urlVisor: string;
  description: string;
}

export const GeovisorsSection = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // @ts-ignore
  const [geoService, setGeoService] = useState<CensusCard[]>([]);
  const [geoServiceSecond, setGeoServiceSecond] = useState<CensusCard[]>([]);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>(['Economía']);

  useEffect(() => {
    const fetchData = async () => {
      const response = await geovisoresService.getGeovisores();
      if (response) {
        setGeoService(
          response.map((slide: any) => ({
            cod2: slide.COD_L2,
            cod3: slide.COD_L3,
            title: slide.NIVEL_03,
            description: slide.DESCRIPCION,
            urlVisor: slide.URL,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGEN_DESKTOP}`,
            tags: ['Etiqueta'],
          }))
        );

        const items: MenuItem[] = response.map((item: any) => ({
          name: item.NIVEL_03,
          COD_L2: item.COD_L2,
          COD_L3: item.COD_L3,
          iconClass: item.ICONO,
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
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGEN_DESKTOP}`,
            urlVisor: slide.URL,
          }))
        );
      }
    };

    fetchNews();
  }, []);

  const filteredGeoServiceSecond = geoServiceSecond.filter(
    (item) => item.cod3 === selectedSubItem
  );

  const visibleGeoServiceSecond = filteredGeoServiceSecond.slice(
    0,
    visibleCount
  );

  const handleClickAllGeovisores = () => {
    navigate('/geovisores');
  };

  return (
    <section
      id='home-geovisores'
      className='bg-gray-100 px-4 py-16 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='py-8 text-center'>
          <h1 className='mb-2 text-4xl font-bold'>Geovisores</h1>
          <p className='text-gray-600'>
            Consulte la gran variedad de geovisores para la visualización de
            datos estadísticos de todo el territorio colombiano.
          </p>
        </div>

        <div className='container mx-auto flex flex-col md:flex-row px-4 py-8'>
          <div className='w-full md:w-1/4 pr-8 mb-8 md:mb-0'>
            <h2 className='my-4 text-base font-regular'>
              Seleccione la información que quiera consultar
            </h2>
            {['Economía', 'Territorio', 'Sociedad'].map((category) => (
              <div
                key={category}
                className='mb-4 bg-white rounded-lg shadow-md py-2 px-4'
              >
                <button
                  className='flex w-full items-center justify-between text-left font-medium'
                  onClick={() =>
                    setActiveMenuItem((prev) =>
                      prev.includes(category)
                        ? prev.filter((name) => name !== category)
                        : [...prev, category]
                    )
                  }
                >
                  {category}
                  {activeMenuItem.includes(category) ? (
                    <span className='DANE__Geovisor__icon__minus' />
                  ) : (
                    <span className='DANE__Geovisor__icon__plus' />
                  )}
                </button>
                {activeMenuItem.includes(category) && (
                  <ul className='ml-4 mt-2 text-left'>
                    {menuItems
                      .filter((item) => {
                        if (category === 'Economía') return item.COD_L2 === '2';
                        if (category === 'Territorio')
                          return item.COD_L2 === '1';
                        return item.COD_L2 !== '2' && item.COD_L2 !== '1';
                      })
                      .map((item, index) => (
                        <li
                          key={index}
                          className='py-1 flex items-center'
                        >
                          <button
                            className={`text-gray-700 text-left ${
                              selectedSubItem === item.COD_L3
                                ? 'bg-primary text-white hover:bg-primary-dark p-2 rounded-xl'
                                : ''
                            }`}
                            onClick={() => {
                              setSelectedSubItem(item.COD_L3);
                            }}
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className='w-full md:w-3/4'>
            <p className='mb-4 text-gray-600'>
              Mostrando {visibleGeoServiceSecond.length} de{' '}
              {filteredGeoServiceSecond.length} resultados
            </p>

            <div className='space-y-4'>
              {visibleGeoServiceSecond.map((card) => (
                <div
                  key={card.cod4}
                  className='rounded-lg bg-white p-2 shadow-md cursor-pointer'
                >
                  <div
                    onClick={() => window.open(card.urlVisor, '_blank')}
                    className='m-1 flex items-start'
                  >
                    <img
                      loading='lazy'
                      src={card.image}
                      alt={card.title}
                      className='w-24 h-24 rounded-lg mr-4 object-cover'
                    />
                    <div>
                      <h3 className='text-lg font-semibold'>{card.title}</h3>
                      <p className='mb-4 text-gray-600 line-clamp-2 text-sm'>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredGeoServiceSecond.length && (
              <div className='flex justify-center font-bold'>
                <button
                  type='button'
                  onClick={() => setVisibleCount(visibleCount + 4)}
                  className='mt-6 px-4 py-2 text-primary hover:text-hover transition-colors'
                >
                  Cargar más ...
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-center mt-1'>
          <button
            type='button'
            aria-label='Ver todos'
            onClick={handleClickAllGeovisores}
            className='hover:bg-hover h-10 bg-primary px-4 py-2 text-base text-white transition-colors'
          >
            Ver todos
          </button>
        </div>
      </div>
    </section>
  );
};
