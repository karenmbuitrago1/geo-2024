import { SubHeader } from './SubHeader';
import { MenuOptions } from './MenuOptions';
import { HeaderGoverment } from './HeaderGoverment';
import { useLanguageStore } from '../../utils/languageStore';

export const HeaderMain = () => {
  const { language } = useLanguageStore();

  return (
    <>
      <HeaderGoverment />
      <SubHeader />
      <MenuOptions language={language} />
    </>
  );
};
