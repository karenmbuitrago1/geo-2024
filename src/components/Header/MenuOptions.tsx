import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuOptions = () => {
  const [option, setOption] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (selectedOption: string, targetId: string) => {
    setOption(selectedOption);
    setIsOpen(false);

    navigate('/', { replace: true });

    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
        <button
          className={getOptionClass('home')}
          onClick={() => handleClick('home', 'home')}
        >
          Inicio
        </button>
        <button
          className={getOptionClass('home-geovisores')}
          onClick={() => handleClick('home-geovisores', 'home-geovisores')}
        >
          Geovisores
        </button>
        <button
          className={getOptionClass('home-servicios')}
          onClick={() => handleClick('home-servicios', 'home-servicios')}
        >
          Servicios
        </button>
        <button
          className={getOptionClass('home-acerca')}
          onClick={() => handleClick('home-acerca', 'home-acerca')}
        >
          Acerca de
        </button>
      </div>
    </div>
  );
};
