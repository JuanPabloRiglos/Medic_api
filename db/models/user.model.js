import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

//nombre de la Tabla
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: uuidv4(), // usar un UUID por defecto.
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM('Patient', 'Secretary', 'Doctor', 'Admin'),
    defaultValue: 'Patient',
  },
  phone: {
    allowNull: true, // doctor y admin tal vez no haria falta.
    type: DataTypes.STRING,
  },
  healthInsurance: {
    allowNull: true, // solo pacientes
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Auth, {
      as: 'auth',
      foreignKey: 'userId',
    });
    this.hasMany(models.Appointment, {
      as: 'createdDates',
      foreignKey: 'createdBy',
    });
    this.hasMany(models.Appointment, {
      as: 'assignedDates',
      foreignKey: 'assignedBy',
    });
    this.hasMany(models.Appointment, {
      as: 'ownedDates',
      foreignKey: 'ownedBy',
    });
    this.hasMany(models.AppointmentData, {
      as: 'patientAppointments',
      foreignKey: 'patientId',
    });
    this.hasMany(models.AppointmentData, {
      as: 'doctorAppointments',
      foreignKey: 'doctorId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
