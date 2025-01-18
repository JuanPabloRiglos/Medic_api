import { Sequelize } from "sequelize";
import config from '../config/config.js';
import setupModels from "../db/models/index.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging:true,
});

setupModels(sequelize);
sequelize.sync(); // en prod. simplemente borrar esta linea y  correr migraciones.

export default sequelize