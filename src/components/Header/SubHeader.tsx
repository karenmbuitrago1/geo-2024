import { LogoDane } from '../Atoms/LogoDane';
import { LogoGeoportal } from '../Atoms/LogoGeoportal';
import { getTodayFormattedDate } from '../../utils/date';

export const SubHeader = () => (
  <div className='container mx-auto flex flex-col p-2 md:p-4'>
    <div className='flex flex-col md:flex-row h-10 items-center justify-between py-1'>
      <span className='text-gray-500'>{getTodayFormattedDate()}</span>
      <div className='flex gap-2 mt-2 md:mt-0'>
        <button className='bg-primary px-2 text-white'>EN</button>
        <button className='bg-primary px-2 text-white'>ES</button>
      </div>
    </div>
    <div className='flex flex-col md:flex-row items-center justify-between h-20'>
      <div className='flex items-center h-10 md:w-2/3 gap-4'>
        <a
          href='https://www.dane.gov.co'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LogoDane />
        </a>
        <LogoGeoportal />
      </div>
      <div className='mt-3 md:mt-0 md:flex md:w-1/3 items-center'>
        <div className='flex flex-col w-full'>
          <span>Resultados de la búsqueda:</span>
          <input
            type='text'
            placeholder='Buscar...'
            className='rounded border py-1 pl-2 pr-8 mt-1'
          />
        </div>
      </div>
    </div>
    <div className='flex h-10' />
  </div>
);
