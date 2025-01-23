import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

// Nombre de la Tabla
const APPOINTMENT_TABLE = 'appointment';

const AppointmentSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4() // Usar un UUID por defecto.
    },
    date: {
        allowNull: false,
        type: DataTypes.DATEONLY // Solo la fecha sin la hora.
    },
    time: {
        allowNull: false,
        type: DataTypes.TIME // Solo la hora sin la fecha.
    },
    createdBy: {//psna q/ da de alta turnos para luego ser tomados.
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id', 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL'
        }
    },
    ownedBy: {//prsna en nombre de quien esta hecha la reserva
        type: DataTypes.UUID,
        allowNull: true, // Puede ser null inicialmente.
        references: {
            model: 'users',
            key: 'id', 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL'
        }
    },
    assignedBy: {// prsna que efectuo la reserva (ej: secretary)
        type: DataTypes.UUID,
        allowNull: true, // Puede ser null inicialmente.
        references: {
            model: 'users',
            key: 'id', 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class Appointment extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        this.belongsTo(models.User, { as: 'owner', foreignKey: 'ownedBy' });
        this.belongsTo(models.User, { as: 'assigner', foreignKey: 'assignedBy' });
        this.hasOne(models.AppointmentData, { as: 'appointmentData', foreignKey: 'appointmentId' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: APPOINTMENT_TABLE,
            modelName: 'Appointment',
            timestamps: false
        };
    }
}

export { APPOINTMENT_TABLE, AppointmentSchema, Appointment };
