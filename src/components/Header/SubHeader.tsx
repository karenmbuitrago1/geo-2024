import { useEffect } from 'react';
import { LogoDane } from '../Atoms/LogoDane';
import { LogoGeoportal } from '../Atoms/LogoGeoportal';
import { getTodayFormattedDate } from '../../utils/date';

import './subHeader.css';

export const SubHeader = () => {
  useEffect(() => {
    if (!document.getElementById('google-pse-script')) {
      const script = document.createElement('script');
      script.id = 'google-pse-script';
      script.async = true;
      script.src = 'https://cse.google.com/cse.js?cx=a42069d8c5bdc40e1';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className='container mx-auto flex flex-col p-2 md:p-4'>
      <div className='flex flex-col md:flex-row items-center justify-between py-2'>
        <span className='text-gray-500'>{getTodayFormattedDate()}</span>
        <div className='flex gap-2 mt-2 md:mt-0'>
          {/* <button className='bg-primary px-2 text-white'>EN</button> */}
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
          <a
            href='/'
            target='_blank'
            rel='noopener noreferrer'
            className='h-10'
          >
            <LogoGeoportal />
          </a>
        </div>
        <div className='search-container'>
          <div className='gcse-search'></div>
        </div>
      </div>
    </div>
  );
};
