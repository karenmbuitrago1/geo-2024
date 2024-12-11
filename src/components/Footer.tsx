export const Footer = ({ language }: { language: 'ES' | 'EN' }) => {
  return (
    <div className='bg-gray-100 p-4 text-grayPrimary'>
      <div className='mb-4'>
        <h3 className='text-xl font-bold text-center'>
          {language === 'ES'
            ? 'Departamento Administrativo Nacional de Estadística (DANE)'
            : 'National Administrative Department of Statistics (DANE)'}
        </h3>
      </div>
      <div className='flex justify-center'>
        <ul className='flex flex-col m-8 md:flex-row md:space-x-8 space-y-4 md:space-y-0'>
          <li className='flex items-start'>
            <div className='flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full mr-2'>
              <span className='DANE__Geovisor__icon__phone2 text-primary'></span>
            </div>
            <div>
              <h4 className='text-lg font-semibold'>CALL CENTER</h4>
              <p>
                <span className='font-bold'>
                  {language === 'ES' ? 'Conmutador : ' : 'Switchboard : '}
                </span>
                <a
                  className='text-blue-600 hover:underline'
                  href='tel:(+571) 597 8300'
                >
                  {' '}
                  (571) 597 8300
                </a>{' '}
                ó
                <a
                  className='text-blue-600 hover:underline'
                  href='tel:(+571) 597 8398'
                >
                  {' '}
                  (571) 597 8398
                </a>
              </p>
              <p>
                <span className='font-bold'>
                  {language === 'ES'
                    ? 'Línea gratuita de atención:'
                    : 'Toll-free service line:'}
                </span>{' '}
                <a
                  className='text-blue-600 hover:underline'
                  href='tel:01 8000 912002'
                >
                  01 8000 912002
                </a>
              </p>
            </div>
          </li>
          <li className='flex items-start'>
            <div className='flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full mr-2'>
              <span className='DANE__Geovisor__icon__clock2  text-primary'></span>
            </div>
            <div>
              <h4 className='text-lg font-semibold'>
                {language === 'ES'
                  ? 'HORARIO DE ATENCIÓN'
                  : 'ATTENTION SCHEDULE'}
              </h4>
              <p>
                <span className='font-bold'>
                  {language === 'ES' ? 'Lunes a viernes' : 'Monday to Friday'}
                </span>{' '}
                8:00 - 17:00
              </p>
            </div>
          </li>
          <li className='flex items-start'>
            <div className='flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full mr-2'>
              <span className='DANE__Geovisor__icon__LocationLine  text-primary'></span>
            </div>
            <div>
              <h4 className='text-lg font-semibold'>
                {language === 'ES' ? 'DIRECCIÓN' : 'ADDRESS'}
              </h4>
              <p>
                <span className='font-bold'>
                  Carrera 59 No. 26-70 Interior I - CAN
                </span>
              </p>
              <p>
                <span className='font-bold'>
                  {language === 'ES' ? 'Código postal:' : 'Postal code:'}
                </span>{' '}
                111321
              </p>
              <p>
                <span className='font-bold'>
                  {language === 'ES' ? 'Apartado Aéreo:' : 'Post Office Box:'}
                </span>{' '}
                80043
              </p>
              <p>
                <span className='font-bold'>
                  {language === 'ES'
                    ? 'Bogotá D.C., Colombia - Suramérica'
                    : 'Bogotá D.C., Colombia - South America'}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
