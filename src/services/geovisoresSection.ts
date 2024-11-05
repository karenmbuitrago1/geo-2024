import { api } from '../utils/api';

export const geovisoresService = {
  getGeovisores: async () => {
    try {
      const response = await api.get(
        '/laboratorio/serviciosjson/geoportal2019/geoportal_nivel03.php?nivel_geoportal=1'
      );
      return response.data?.resultado || [];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export const geovisoresServiceSecond = {
  getGeovisoresSecond: async () => {
    try {
      const response = await api.get(
        '/laboratorio/serviciosjson/geoportal2019/geoportal_nivel04.php?nivel_geoportal=1'
      );
      return response.data?.resultado || [];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
