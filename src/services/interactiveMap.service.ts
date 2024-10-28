import { api } from '../utils/api';

export const interactiveMapSectionService = {
  getInteractiveMapSection: async () => {
    try {
      const response = await api.get(
        '/laboratorio/serviciosjson/geoportal2019/geoportal_home_mi.php?nivel_geoportal=1'
      );
      return response.data?.resultado || [];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
