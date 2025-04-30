import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

// Nombre de la tabla
const DOCTOR_TABLE = 'doctors';

const DoctorSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  specialty: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  licenseNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'license_number',
  },
  experience: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  insuranceCompanies: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'insurance_companies', // Ej: "OSDE,SwissMedical,Galeno"
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Doctor extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCTOR_TABLE,
      modelName: 'Doctor',
      timestamps: false,
    };
  }
}

export { DOCTOR_TABLE, DoctorSchema, Doctor };
