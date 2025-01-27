//importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
//importaciones internas
import UserService from '../services/users.service.js';
//instancio la clase para usar fns
const service = new UserService();

export const userController = {
  async getAll() {
    try {
      const usersIndb = await service.getAll();
      return usersIndb;
    } catch (error) {
      throw error;
    }
  },

  async getByEmail(email) {
    try {
      const findedUser = await service.findOne(email);
      return findedUser;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const findedUser = await service.findOne(id);
      return findedUser;
    } catch (error) {
      throw error;
    }
  },

  async getByLastName(lastName) {
    try {
      const findedUser = await service.findByLastName(lastName);
      return findedUser;
    } catch (error) {
      throw error;
    }
  },

  async update(id, newData) {
    try {
      const updatedUser = await service.update(id, newData);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const userToAdd = { id: uuidv4(), ...data };
      const newUser = await service.create(userToAdd);
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  async destroy(id) {
    try {
      const removedUSer = await service.delete(id);
      return removedUSer;
    } catch (error) {
      throw error;
    }
  },
};
