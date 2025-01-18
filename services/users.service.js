import boom from '@hapi/boom'

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js'
const models = sequelize.models


class UserService{
    
    async getAll(){
       const db_data = await models.UserModel.findAll();
       return db_data;
    };

    async findOne(id){
        const user = await models.UserModel.findByPk(id);
        console.log('USUARIOOO', id)
        if(! user) throw boom.notFound('Usuario no encontrado');
        return user;
    };

    async create(newData){
        const newUser = await models.UserModel.create(newData);
        if (! newUser) throw boom.badImplementation('Error al crear usuario');
        return newUser;
    };

    async update(id, newData){
        const user = await this.findOne(id);
        if(! user) throw boom.notFound('Usuario no encontrado');
        const updatedUser = await user.update(newData);
        if(! updatedUser) throw boom.badImplementation('Error al editar el Usuario');
        return  updatedUser;
    };

    async delete(id){
        const user = await this.findOne(id);
        if(! user) throw boom.notFound('Usuario no encontrado');
        await user.destroy();
        return `Se elimino el usuario con ID ${id}`
    }
};

export default UserService