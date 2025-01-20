import { Sequelize } from 'sequelize';
import { User, UserSchema, USER_TABLE } from './user.model.js';
import {FreeDate, FreeDateSchema, FREEDATE_TABLE} from './freeDate.model.js'


function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    FreeDate.init(FreeDateSchema, FreeDate.config(sequelize));

    User.associate(sequelize.models);
    FreeDate.associate(sequelize.models)
}

export default setupModels ;
