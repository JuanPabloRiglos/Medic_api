import boom from '@hapi/boom'

//importo instancia de sequelize
import sequelize from '../libs/sequelize'

class UserService{
    
    async create(newData){

    };

    async getAll(){
       
    };

    async findOne(id){
        const user = id
            if(! user){
                throw boom.notFound('Usuario no encontrado')
            }
    };

    async update({id, newData}){
        const user = id
            if(! user){
            throw boom.notFound('Usuario no encontrado')
        }
    };

    async delete(id){
        const user = id
        if(! user){
            throw boom.notFound('Usuario no encontrado')
        }
    }
};

export default UserService