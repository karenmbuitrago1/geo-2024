const SliderTop = () => {
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
            {/* Imagen para pantallas pequeñas */}
            <source
              srcSet={imageUrlMobile}
              media='(max-width: 768px)'
            />
            {/* Imagen para pantallas grandes */}
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

      {/* Caja de texto sobre la imagen */}
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
            Geovisores
          </h1>
        </div>

        {/* Texto descriptivo solo en pantallas medianas y grandes */}
        <p className='w-[60%] text-base text-left hidden md:block'>
          Los Geovisores son herramientas de fácil uso y acceso, que permiten la
          consulta, visualización, análisis y descarga de información
          georreferenciada, a las cuales pueden acceder diferentes usuarios como
          investigadores, tomadores de decisiones, autoridades territoriales y
          ambientales y especialmente la comunidad en general.
        </p>
      </div>
    </div>
  );
};

export default SliderTop;
