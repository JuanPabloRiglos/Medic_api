import boom from '@hapi/boom'

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js'
const models = sequelize.models


class UserService{
    
    async getAll(){
        try {
             const db_data = await models.User.findAll();
            // el models. va seguido del nombre de la clase del modelo, en este caso, User
             return db_data;
        } catch (error) {
            throw boom.internal('Error al obtener usuarios', error);
        }


      
    };

    async findOne(id){
        try {
            const user = await models.User.findByPk(id);
            if(! user) throw boom.notFound('Usuario no encontrado');
            return user
        } catch (error) {
            throw boom.internal('Error al encontrar usuario', error);
        }
    };

    async create(newData){
        try {
            const newUser = await models.User.create(newData);
            if (! newUser) throw boom.badImplementation('Error al crear usuario');
            return newUser;
        } catch (error) {
            throw boom.internal('Error al crear usuario', error);
        }

      
    };

    async update(id, newData){
        try {
            const user = await this.findOne(id);
            if(! user) throw boom.notFound('Usuario no encontrado');
            const updatedUser = await user.update(newData);
            if(! updatedUser) throw boom.badImplementation('Error al editar el Usuario');
            return  updatedUser;
        } catch (error) {
            throw boom.internal('Error al actualizar usuario', error);
        }

    };

    async delete(id){
       try {
        const user = await this.findOne(id);
        if(! user) throw boom.notFound('Usuario no encontrado');
        await user.destroy();
        return `Se elimino el usuario con ID ${id}`
       } catch (error) {
        throw boom.internal('Error al eliminar usuario', error);
       }
    }
};

export default UserService