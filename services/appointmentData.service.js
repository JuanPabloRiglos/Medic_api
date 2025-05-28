import boom from '@hapi/boom';

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;

class appointmentDataService {
  async getAll() {
    try {
      const db_data = await models.AppointmentData.findAll();
      // el models. va seguido del nombre de la clase del modelo, en este caso, User
      return db_data;
    } catch (error) {
      throw boom.internal('Error al obtener los datos de los turnos');
    }
  }

  async findOne(id) {
    try {
      const date = await models.AppointmentData.findByPk(id);
      console.log('Datee', id);
      if (!date) throw boom.notFound('Turno no encontrado');
      return date;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal('Error al buscar el turno requerido');
      }
    }
  }

  async findByPatient(id) {
    try {
      const appointments = await models.AppointmentData.findAll({
        where: {
          patientId: id,
        },
        include: [
          // Incluir información del paciente
          {
            model: models.User,
            as: 'patient',
            attributes: ['name', 'phone'],
            include: [
              {
                model: models.Auth,
                as: 'auth',
                attributes: ['email'],
              },
            ],
          },
          // Incluir información del doctor
          {
            model: models.User,
            as: 'doctor',
            attributes: ['name', 'lastName', 'phone'],
            include: [
              // Aquí obtenemos la información específica del doctor
              {
                model: models.Doctor,
                as: 'doctorData',
                attributes: [
                  'specialty',
                  'licenseNumber',
                  'experience',
                  'insuranceCompanies',
                  'address',
                ],
              },
              {
                model: models.Auth,
                as: 'auth',
                attributes: ['email'],
              },
            ],
          },
        ],
      });
      return appointments;
    } catch (error) {
      throw boom.badImplementation('Error al obtener citas por Paciente');
    }
  }

  async create(newData) {
    try {
      const newAppointmentData = await models.AppointmentData.create(newData);
      return newAppointmentData;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict(
          'El id del turno ya está en uso en otro appointmentData'
        );
      }
      throw boom.internal('Error al crear los datos del turno');
    }
  }

  async update(id, newData) {
    try {
      const date = await this.findOne(id);
      if (!date) throw boom.notFound('Turno no encontrado');
      const dateUpdated = await date.update(newData);
      if (!dateUpdated) throw boom.internal('Error al editar el turno');
      return dateUpdated;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal('Error al editar el los datos del turno');
      }
    }
  }

  async delete(id) {
    try {
      const date = await this.findOne(id);
      if (!date) throw boom.notFound('turno no encontrado');
      await date.destroy();
      return `Se elimino el turno con ID ${id}`;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal('Error al eliminar el dato del turno');
      }
    }
  }
}

export default appointmentDataService;
