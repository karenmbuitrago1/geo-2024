export const Header = () => (
  <header
    id='home'
    className='flex h-12 items-center bg-secondary text-white'
  >
    <div className='container mx-auto hidden items-center justify-between sm:flex'>
      <img
        className='h-5'
        alt='GOVCO Logo'
        src='https://www.dane.gov.co/files/images/nuevaImg/header_govco.png'
      />
      <nav className='flex items-center space-x-4'>
        <ul className='flex space-x-4'>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.dane.gov.co/index.php/transparencia'
              className='hover:underline'
            >
              Transparencia
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
              href='https://www.dane.gov.co/index.php/servicios-al-ciudadano'
            >
              Atención y servicio a la ciudadanía
            </a>
          </li>

          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.dane.gov.co/index.php/servicios-al-ciudadano/tramites/participacion-ciudadana'
              className='hover:underline'
            >
              Participa
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.dane.gov.co/index.php/sala-de-prensa'
              className='hover:underline'
            >
              Sala de prensa
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
