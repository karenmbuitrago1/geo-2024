export const Footer = () => {
  return (
    <div className='bg-gray-100 p-4 text-grayPrimary'>
      <div className='mb-4'>
        <h3 className='text-xl font-bold text-center'>
          Departamento Administrativo Nacional de Estadística (DANE)
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
                <span className='font-bold'>Conmutador:</span>
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
                <span className='font-bold'>Línea gratuita de atención:</span>{' '}
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
              <h4 className='text-lg font-semibold'>HORARIO DE ATENCIÓN</h4>
              <p>
                <span className='font-bold'>Lunes a viernes</span> 8:00 - 17:00
              </p>
            </div>
          </li>
          <li className='flex items-start'>
            <div className='flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full mr-2'>
              <span className='DANE__Geovisor__icon__LocationLine  text-primary'></span>
            </div>
            <div>
              <h4 className='text-lg font-semibold'>DIRECCIÓN</h4>
              <p>
                <span className='font-bold'>
                  Carrera 59 No. 26-70 Interior I - CAN
                </span>
              </p>
              <p>
                <span className='font-bold'>Código postal:</span> 111321
              </p>
              <p>
                <span className='font-bold'>Apartado Aéreo:</span> 80043
              </p>
              <p>
                <span className='font-bold'>
                  Bogotá D.C., Colombia - Suramérica
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
