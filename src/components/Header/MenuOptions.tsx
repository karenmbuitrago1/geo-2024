import { useState } from 'react';

export const MenuOptions = () => {
  const [option, setOption] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (selectedOption: string) => {
    setOption(selectedOption);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const getOptionClass = (currentOption: string) =>
    `flex items-center justify-center cursor-pointer py-2 w-full ${
      option === currentOption
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-black'
    }`;

  return (
    <div className='relative w-full'>
      <button
        className='block md:hidden p-2 bg-primary text-white w-full flex gap-2 items-center justify-center'
        onClick={toggleMenu}
      >
        <span className='DANE__Geovisor__icon__List' />
        Menú
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex w-full flex-col md:flex-row bg-white absolute md:static top-8 right-0 md:top-auto md:right-auto z-20 shadow-lg md:shadow-none`}
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
