import boom from '@hapi/boom';
import { Op } from 'sequelize';
//importo servicio correlativo para unificar llamada
import appointmentDataService from './appointmentData.service.js';

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;

class appointmentService {
  async getAll() {
    try {
      const db_data = await models.Appointment.findAll();
      // el models. va seguido del nombre de la clase del modelo, en este caso, User
      return db_data;
    } catch (error) {
      throw boom.internal('Error al obtener turnos', error);
    }
  }

  async findByDate(date) {
    try {
      const appointments = await models.Appointment.findAll({
        where: {
          date,
        },
        include: [
          {
            model: models.User,
            as: 'owner',
            attributes: ['id', 'name'],
          },
          {
            model: models.AppointmentData,
            as: 'appointmentData',
          },
        ],
      });
      return appointments;
    } catch (error) {
      throw boom.badImplementation('Error al obtener citas por fecha');
    }
  }

  async findByDateRange(startDate, endDate) {
    try {
      const appointments = await models.Appointment.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: models.User,
            as: 'owner',
            attributes: ['id', 'name'],
          },
          {
            model: models.AppointmentData,
            as: 'appointmentData',
          },
        ],
      });
      return appointments;
    } catch (error) {
      throw boom.badImplementation(
        'Error al obtener citas por rango de fechas'
      );
    }
  }

  async findOne(id) {
    try {
      const date = await models.Appointment.findByPk(id, {
        include: [
          {
            model: models.User,
            as: 'creator',
            attributes: ['id', 'name'],
          },
          {
            model: models.User,
            as: 'owner',
            attributes: ['id', 'name'],
          },
          {
            model: models.User,
            as: 'assigner',
            attributes: ['id', 'name'],
          },
          {
            model: models.AppointmentData,
            as: 'appointmentData',
          },
        ],
      });
      console.log('Datee', id);
      if (!date) throw boom.notFound('Turno no encontrado');
      return date;
    } catch (error) {
      throw boom.internal('Error al encontrar turnos', error);
    }
  }

  async createMany(newDataArray) {
    console.log('A ver el newDataArray', newDataArray);
    try {
      const createdAppointments = [];
      for (let newData of newDataArray) {
        console.log('A ver el newData', newData);
        // Validación para verificar si ya existe un appointment en la misma fecha y hora
        const existingAppointment = await models.Appointment.findOne({
          where: {
            date: newData.date,
            time: newData.time,
          },
        });

        if (existingAppointment) {
          throw boom.conflict('Ya existe un turno en esta fecha y horario');
        }

        const newDate = await models.Appointment.create(newData);
        if (!newDate) throw boom.badImplementation('Error al crear el turno');
        createdAppointments.push(newDate);
      } //fin for of
      return createdAppointments;
    } catch (error) {
      if (boom.isBoom(error)) {
        // Si el error ya es un error boom, lo re-lanzamos tal cual
        throw error;
      } else {
        // Si es un error diferente, lanzamos un error interno
        throw boom.internal('Error al crear el turno', error);
      }
    }
  }

  async update(id, newData, appointmentDataId) {
    try {
      const date = await this.findOne(id);
      if (!date) throw boom.notFound('Turno no encontrado');
      const dateUpdated = await date.update(newData);
      if (!dateUpdated)
        throw boom.badImplementation('Error al editar el turno');

      let newAppointmentData = null;

      if (appointmentDataId) {
        //crea automaticamente el appointmentData
        const externalService = new appointmentDataService();
        newAppointmentData = await externalService.create({
          id: appointmentDataId,
          appointmentId: id,
          date: dateUpdated.date,
          patientId: dateUpdated.ownedBy,
        });
      }

      let response;
      if (newAppointmentData) {
        response = {
          'Turno actualizado': dateUpdated,
          'Registro basico del turno a efectuarse creado': newAppointmentData,
        };
      } else {
        response = { 'Turno actualizado': dateUpdated };
      }
      return response;
    } catch (error) {
      throw boom.internal('Error al actualizar el turno', error);
    }
  }

  async delete(id) {
    try {
      const date = await this.findOne(id);
      if (!date) throw boom.notFound('turno no encontrado');
      await date.destroy();
      return `Se elimino el turno con ID ${id}`;
    } catch (error) {
      throw boom.internal('Error al eliminar el turno', error);
    }
  }
}

export default appointmentService;
