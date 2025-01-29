//importaciones de 3ros
//importaciones internas
import AuthService from '../services/auth.service.js';
//instancio la clase para usar fns
const service = new AuthService();

export const authController = {
  async login(data) {
    //hasheo
    //Lo Maneja el Controller de usuarios.
  },

  //REGISTER
  // async create(data) {
  //   //Lo Maneja el Controller de usuarios.
  // },

  async getAll() {
    try {
      const dataIndb = await service.getAll();
      return dataIndb;
    } catch (error) {
      throw error;
    }
  },

  async getByEmail(email) {
    try {
      const findedData = await service.findOne(email);
      return findedData;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const findedData = await service.findOne(id);
      return findedData;
    } catch (error) {
      throw error;
    }
  },

  async update(id, newData) {
    try {
      const updatedData = await service.update(id, newData);
      return updatedData;
    } catch (error) {
      throw error;
    }
  },

  async destroy(id) {
    try {
      const removedData = await service.delete(id);
      return removedData;
    } catch (error) {
      throw error;
    }
  },
};
