import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

// Nombre de la Tabla
const FREEDATE_TABLE = 'free_dates';

const FreeDateSchema = {
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
            key: 'id'
        }
    },
    ownedBy: {//prsna en nombre de quien esta hecha la reserva
        type: DataTypes.UUID,
        allowNull: true, // Puede ser null inicialmente.
        references: {
            model: 'users',
            key: 'id'
        }
    },
    assignedBy: {// prsna que efectuo la reserva (ej: secretary)
        type: DataTypes.UUID,
        allowNull: true, // Puede ser null inicialmente.
        references: {
            model: 'users',
            key: 'id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
};

class FreeDate extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
        this.belongsTo(models.User, { as: 'owner', foreignKey: 'ownedBy' });
        this.belongsTo(models.User, { as: 'assigner', foreignKey: 'assignedBy' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: FREEDATE_TABLE,
            modelName: 'FreeDate',
            timestamps: false
        };
    }
}

export { FREEDATE_TABLE, FreeDateSchema, FreeDate };
