import { api } from '../utils/api';

export const newsSectionsService = {
  getNews: async () => {
    try {
      const response = await api.get(
        '/laboratorio/serviciosjson/geoportal2019/geoportal_home_novedades.php?nivel_geoportal=1'
      );
      return response.data?.resultado || [];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
