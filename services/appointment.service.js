import boom from '@hapi/boom'

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js'
const models = sequelize.models


class appointmentService{
    
    async getAll(){
       const db_data = await models.Appointment.findAll();
       // el models. va seguido del nombre de la clase del modelo, en este caso, User
       return db_data;
    };

    async findOne(id){
        const date = await models.Appointment.findByPk(id);
        console.log('Datee', id)
        if(! date) throw boom.notFound('Turno no encontrado');
        return date;
    };

    async create(newData){
        console.log('EN SERVICE APP')
        const newDate = await models.Appointment.create(newData);
        if (! newDate) throw boom.badImplementation('Error al crear el turno');
        return newDate;
    };

    async update(id, newData){
        const date = await this.findOne(id);
        if(! date) throw boom.notFound('Turno no encontrado');
        const dateUpdated = await date.update(newData);
        if(! dateUpdated) throw boom.badImplementation('Error al editar el turno');
        return  dateUpdated;
    };

    async delete(id){
        const date = await this.findOne(id);
        if(! date) throw boom.notFound('turno no encontrado');
        await date.destroy();
        return `Se elimino el turno con ID ${id}`
    }
};

export default appointmentService