const SliderTop = ({ language }: { language: 'ES' | 'EN' }) => {
  const imageUrlDesktop = `${import.meta.env.VITE_API_IMAGES}/src/images/departamento/geovisores/bannerSuperiorDesktop-0001.webp`;
  const imageUrlMobile = `${import.meta.env.VITE_API_IMAGES}/src/images/departamento/geovisores/bannerSuperiorMobile-0001.webp`;

  return (
    <div className='relative'>
      <div className='relative'>
        <a
          rel='noreferrer'
          href='/geovisores/'
          className='block'
        >
          <picture>
            <source
              srcSet={imageUrlMobile}
              media='(max-width: 768px)'
            />
            <img
              width='100'
              height='60'
              loading='lazy'
              src={imageUrlDesktop}
              alt='Geoportal DANE - Geovisores'
              title='Geoportal DANE - Geovisores'
              className='w-full h-auto'
            />
          </picture>
        </a>
      </div>
      <div
        className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-white bg-black bg-opacity-50 p-8'
        itemScope
        itemType='https://schema.org/GovernmentOrganization'
      >
        <div className='flex items-center gap-4 my-2 justify-center'>
          <div className='text-xl pt-1'>
            <span className='DANE__Geovisor__icon__geovisor'></span>
          </div>
          <h1
            itemProp='name'
            className='text-xl font-semibold text-left'
          >
            {language === 'ES' ? 'Geovisores' : 'Geoviewers'}
          </h1>
        </div>
        <p className='w-[60%] text-base text-left hidden md:block'>
          {language === 'ES'
            ? 'Los Geovisores son herramientas de fácil uso y acceso, que permiten la consulta, visualización, análisis y descarga de información georreferenciada, a las cuales pueden acceder diferentes usuarios como investigadores, tomadores de decisiones, autoridades territoriales y ambientales y especialmente la comunidad en general.'
            : 'The Geoviewers are easy-to-use and access tools that allow the consultation, visualization, analysis, and download of georeferenced information, which can be accessed by different users such as researchers, decision-makers, territorial and environmental authorities, and especially the community in general.'}
        </p>
      </div>
    </div>
  );
};

export default SliderTop;
