import boom from '@hapi/boom'

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js'
const models = sequelize.models


class appointmentService{
    
    async getAll(){
      try {
        const db_data = await models.Appointment.findAll();
        // el models. va seguido del nombre de la clase del modelo, en este caso, User
        return db_data;
      } catch (error) {
        throw boom.internal('Error al obtener turnos', error);
      }
    };

    async findOne(id){
      try {
        const date = await models.Appointment.findByPk(id);
        console.log('Datee', id)
        if(! date) throw boom.notFound('Turno no encontrado');
        return date;
      } catch (error) {
        throw boom.internal('Error al encontrar turnos', error)
      }
    };

    async create(newData){
      try {
        console.log('EN SERVICE APP')
        const newDate = await models.Appointment.create(newData);
        if (! newDate) throw boom.badImplementation('Error al crear el turno');
        return newDate;
      } catch (error) {
        throw boom.internal('Error al crear el turno', error)
      }
    };

    async update(id, newData){
     try {
        const date = await this.findOne(id);
        if(! date) throw boom.notFound('Turno no encontrado');
        const dateUpdated = await date.update(newData);
        if(! dateUpdated) throw boom.badImplementation('Error al editar el turno');
        return  dateUpdated;
     } catch (error) {
        throw boom.internal('Error al actualizar el turno', error)
     }
    };

    async delete(id){
        try {
            const date = await this.findOne(id);
        if(! date) throw boom.notFound('turno no encontrado');
        await date.destroy();
        return `Se elimino el turno con ID ${id}`
        } catch (error) {
            throw boom.internal('Error al eliminar el turno', error)
        }
    }
};

export default appointmentService