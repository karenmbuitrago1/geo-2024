import { useState } from 'react';

export const Menu = () => {
  const [option, setOption] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (selectedOption: string) => {
    setOption(selectedOption);
    setIsOpen(false);
  };

  const getOptionClass = (currentOption: string) =>
    `flex flex-1 items-center justify-center cursor-pointer ${
      option === currentOption
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-black'
    }`;

  return (
    <div className='relative'>
      <button
        className='md:hidden flex items-center p-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='DANE__Geovisor__icon__List text-xl mr-2 text-primary' />
      </button>

      <div
        className={`${
          isOpen ? 'flex flex-col' : 'hidden'
        } md:flex md:flex-row h-12`}
      >
        <a
          href='#home'
          className={getOptionClass('home')}
          onClick={() => handleClick('home')}
        >
          Inicio
        </a>
        <a
          href='#geovisors'
          className={getOptionClass('geovisors')}
          onClick={() => handleClick('geovisors')}
        >
          Geovisores
        </a>
        <a
          href='#services'
          className={getOptionClass('services')}
          onClick={() => handleClick('services')}
        >
          Servicios
        </a>
        <a
          href='#about'
          className={getOptionClass('about')}
          onClick={() => handleClick('about')}
        >
          Acerca de
        </a>
      </div>
    </div>
  );
};
