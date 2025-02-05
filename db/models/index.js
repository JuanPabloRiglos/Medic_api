import { Sequelize } from 'sequelize';
import { User, UserSchema, USER_TABLE } from './user.model.js';
import {
  Appointment,
  AppointmentSchema,
  APPOINTMENT_TABLE,
} from './appointment.model.js';
import {
  AppointmentData,
  AppointmentDataSchema,
  APPOINTMENTDATA_TABLE,
} from './appointmentData.model.js';
import { Auth, AuthSchema, AUTH_TABLE } from './auth.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Appointment.init(AppointmentSchema, Appointment.config(sequelize));
  AppointmentData.init(
    AppointmentDataSchema,
    AppointmentData.config(sequelize)
  );
  Auth.init(AuthSchema, Auth.config(sequelize));

  User.associate(sequelize.models);
  Appointment.associate(sequelize.models);
  AppointmentData.associate(sequelize.models);
  Auth.associate(sequelize.models);
}

export default setupModels;
