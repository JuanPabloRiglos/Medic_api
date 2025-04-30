// //importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcrypt';
//importaciones internas
import DoctorService from '../services/doctor.service.js';
//instancio la clase para usar fns
const service = new DoctorService();

export const doctorController = {
  //   async getAll() {
  //     try {
  //       const usersIndb = await service.getAll();
  //       return usersIndb;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  //   async getByEmail(email) {
  //     try {
  //       const findedUser = await service.findOne(email);
  //       return findedUser;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  //   async getById(id) {
  //     try {
  //       const findedUser = await service.findOne(id);
  //       return findedUser;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  //   async getByLastName(lastName) {
  //     try {
  //       const findedUser = await service.findByLastName(lastName);
  //       return findedUser;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  //   async update(id, newData) {
  //     try {
  //       const updatedUser = await service.update(id, newData);
  //       return updatedUser;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  async create(id, data) {
    try {
      const doctorToAdd = {
        id: uuidv4(),
        userId: id,
        ...data,
      };
      const newDoctor = await service.create(doctorToAdd);
      return newDoctor;
    } catch (error) {
      throw error;
    }
  },

  //   async destroy(id) {
  //     try {
  //       const removedUSer = await service.delete(id);
  //       return removedUSer;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
};
