import { Sequelize } from 'sequelize';
import { UserModel, UserSchema, USER_TABLE } from './user.model.js';


function setupModels(sequelize) {
    UserModel.init(UserSchema, UserModel.config(sequelize));


    //UserModel.associate(sequelize.models);

}

export default setupModels ;
