//importaciones de 3ros
import { v4 as uuidv4 } from 'uuid';
//importaciones internas
import appointmentDataService from '../services/appointmentData.service.js';
//instancio la clase para usar fns
const service = new appointmentDataService();

export const appointmentDataController = {
  async getAll() {
    try {
      const dataDatesInDb = await service.getAll();
      return dataDatesInDb;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const dataFound = await service.findOne(id);
      return dataFound;
    } catch (error) {
      throw error;
    }
  },

  async getAppointmentsByPatientId(patientId) {
    try {
      const appointments = await service.findByPatient(patientId);
      return appointments;
    } catch (error) {
      throw error;
    }
  },

  async update(id, newData) {
    try {
      const datadUpdate = await service.update(id, newData);
      return datadUpdate;
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      const dataToAdd = { id: uuidv4(), ...data };
      const newData = await service.create(dataToAdd);
      return newData;
    } catch (error) {
      console.error('Error en controlador:', error);
      throw error;
    }
  },

  async destroy(id) {
    try {
      const dataRemoved = await service.delete(id);
      return dataRemoved;
    } catch (error) {
      throw error;
    }
  },
};
