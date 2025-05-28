import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

// Nombre de la Tabla
const APPOINTMENTDATA_TABLE = 'appointment_data';

const AppointmentDataSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: uuidv4(), // Usar un UUID por defecto.
  },
  appointmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true, // Restricción de unicidad
    references: {
      model: 'appointment',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY, // Solo la fecha sin la hora.
  },
  symptoms: {
    allowNull: true,
    type: DataTypes.TEXT, // Campo para mucho texto.
  },
  observations: {
    allowNull: true,
    type: DataTypes.TEXT, // Campo para mucho texto.
  },
  directives: {
    allowNull: true,
    type: DataTypes.TEXT, // Campo para mucho texto.
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  doctorId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class AppointmentData extends Model {
  static associate(models) {
    this.belongsTo(models.Appointment, {
      as: 'appointment',
      foreignKey: 'appointmentId',
    });
    this.belongsTo(models.User, { as: 'patient', foreignKey: 'patientId' });
    this.belongsTo(models.User, { as: 'doctor', foreignKey: 'doctorId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: APPOINTMENTDATA_TABLE,
      modelName: 'AppointmentData',
      timestamps: false,
    };
  }
}

export { APPOINTMENTDATA_TABLE, AppointmentDataSchema, AppointmentData };
