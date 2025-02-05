'use strict';

import { USER_TABLE, UserSchema } from '../models/user.model.js';
import { AUTH_TABLE, AuthSchema } from '../models/auth.model.js';
import {
  APPOINTMENT_TABLE,
  AppointmentSchema,
} from '../models/appointment.model.js';
import {
  APPOINTMENTDATA_TABLE,
  AppointmentDataSchema,
} from '../models/appointmentData.model.js';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(USER_TABLE, UserSchema);
  await queryInterface.createTable(AUTH_TABLE, AuthSchema);
  await queryInterface.createTable(APPOINTMENT_TABLE, AppointmentSchema);
  await queryInterface.createTable(
    APPOINTMENTDATA_TABLE,
    AppointmentDataSchema
  );
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable(APPOINTMENTDATA_TABLE);
  await queryInterface.dropTable(APPOINTMENT_TABLE);
  await queryInterface.dropTable(AUTH_TABLE);
  await queryInterface.dropTable(USER_TABLE);
}
