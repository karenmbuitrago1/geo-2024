import { useEffect, useState } from 'react';
import { geovisoresService } from '../services/geovisoresSection';

interface MenuItem {
  name: string;
  subItems?: string[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Economía',
    subItems: [
      'Censo Económico',
      'Construcción',
      'Cuentas Nacionales',
      'Directorios Estadísticos',
      'Servicios',
    ],
  },
  {
    name: 'Sociedad',
    subItems: ['Demografía y población', 'Directorios estadísticos'],
  },
  {
    name: 'Territorio',
    subItems: [
      'Agropecuario',
      'Demografía y Población',
      'Directorios Estadísticos',
      'Geoestadística',
      'Observatorio inmobiliario Nacional',
    ],
  },
];

interface FilterItem {
  name: string;
  iconClass: string;
}

const filterItems: FilterItem[] = [
  { name: 'Todos', iconClass: 'DANE__Geovisor__icon__all' },
  { name: 'Economía', iconClass: 'DANE__Geovisor__icon__economy' },
  { name: 'Sociedad', iconClass: 'DANE__Geovisor__icon__society' },
  { name: 'Territorio', iconClass: 'DANE__Geovisor__icon__ambient' },
];

interface CensusCard {
  date: string;
  title: string;
  image: string;
  tags: string[];
  urlVisor: string;
  category: string;
  description: string;
}

export const GeovisorsSection = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [geoService, setGeoService] = useState<CensusCard[]>([]);
  const [activeMenuItem, setActiveMenuItem] = useState<string[]>(
    menuItems.map((item) => item.name)
  );

  useEffect(() => {
    const fetchNews = async () => {
      const response = await geovisoresService.getGeovisores();
      if (response) {
        setGeoService(
          response.map((slide: any) => ({
            title: slide.NIVEL_03,
            description: slide.DESCRIPCION,
            urlVisor: `${import.meta.env.VITE_API_IMAGES}${slide.URL}`,
            image: `${import.meta.env.VITE_API_IMAGES}${slide.IMAGEN_DESKTOP}`,
            date: 'Fecha actualizada',
            tags: ['Etiqueta'],
            category:
              slide.COD_L2 === '2'
                ? 'Economía'
                : slide.COD_L2 === '1'
                  ? 'Territorio'
                  : 'Sociedad',
          }))
        );
      }
    };

    fetchNews();
  }, []);

  const filteredGeoService =
    selectedFilter === 'Todos'
      ? geoService
      : geoService.filter((item) => item.category === selectedFilter);

  const visibleGeoService = filteredGeoService.slice(0, visibleCount);

  return (
    <section
      id='geovisors'
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

        <div className='container mx-auto flex px-4 py-8'>
          <div className='w-1/4 pr-8'>
            <h2 className='my-4 text-base font-regular'>
              Seleccione la información que quiera consultar
            </h2>
            {menuItems.map((item) => (
              <div
                key={item.name}
                className='mb-4 bg-white rounded-lg shadow-md py-2 px-4'
              >
                <button
                  className='flex w-full items-center justify-between text-left font-medium'
                  onClick={() =>
                    setActiveMenuItem((prev) =>
                      prev.includes(item.name)
                        ? prev.filter((name) => name !== item.name)
                        : [...prev, item.name]
                    )
                  }
                >
                  {item.name}
                  {activeMenuItem.includes(item.name) ? (
                    <span className='DANE__Geovisor__icon__minus' />
                  ) : (
                    <span className='DANE__Geovisor__icon__plus' />
                  )}
                </button>
                {activeMenuItem.includes(item.name) && item.subItems && (
                  <ul className='ml-4 mt-2'>
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem}
                        className='py-1'
                      >
                        <button className='text-gray-700 hover:text-primary'>
                          {subItem}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className='w-3/4'>
            <div className='container mx-auto px-4'>
              <ul className='flex space-x-4 py-4'>
                {filterItems.map((filter) => (
                  <li key={filter.name}>
                    <button
                      className={`px-4 py-2 flex items-center ${
                        selectedFilter === filter.name
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-200 text-primary font-semibold'
                      }`}
                      onClick={() => setSelectedFilter(filter.name)}
                    >
                      <span className={`${filter.iconClass} text-xl mr-1`} />
                      {filter.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className='mb-4 text-gray-600'>
              Mostrando {visibleGeoService.length} de{' '}
              {filteredGeoService.length} resultados
            </p>

            <div className='space-y-4'>
              {visibleGeoService.map((card, index) => (
                <div
                  key={index}
                  className='rounded-lg bg-white p-2 shadow-md cursor-pointer'
                >
                  <div
                    onClick={() => window.open(card.urlVisor, '_blank')}
                    className='m-1 flex items-start'
                  >
                    <img
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
                  {/* <p className='text-sm text-gray-500'>
                    Última actualización: {card.date}
                  </p> */}
                </div>
              ))}
            </div>

            {visibleCount < filteredGeoService.length && (
              <div className='flex justify-center font-bold'>
                <button
                  type='button'
                  onClick={() => setVisibleCount(visibleCount + 4)}
                  className='mt-6 px-4 py-2 text-primary  hover:text-hover transition-colors'
                >
                  Cargar más ...
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
