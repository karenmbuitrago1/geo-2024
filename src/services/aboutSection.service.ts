import { api } from '../utils/api';

export const aboutSectionService = {
  getAboutSection: async () => {
    try {
      const response = await api.get(
        '/laboratorio/serviciosjson/geoportal2019/geoportal_nivel02.php?nivel_geoportal=3'
      );
      return response.data?.resultado || [];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
