import {Model, DataTypes, Sequelize} from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

//nombre de la Tabla
const USER_TABLE = 'users';

const UserSchema = {
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4() // usar un UUID por defecto. 
    },
    name:{
        allowNull:false,
        type:DataTypes.STRING,
    },
    lastName:{
        allowNull:false,
        type:DataTypes.STRING,
        field: 'last_name'
    },
    email:{
        allowNull:false,
        type:DataTypes.STRING,
        unique: true
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING
    },
    role:{
        allowNull:false,
        type:DataTypes.ENUM('Patient', 'Secretary', 'Doctor', 'Admin'),
        defaultValue:'Patient'
    },
    phone:{
        allowNull:true, // doctor y admin tal vez no haria falta.
        type: DataTypes.STRING
    },
    healthInsurance:{
        allowNull:true, // solo pacientes
        type:DataTypes.STRING
    },
    createdAt:{
        allowNull:false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
};

class UserModel extends Model {
    static associate(models){
     
    };

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'UserModel',
            timestamps:false
        }
    }
}

export {USER_TABLE, UserSchema, UserModel }