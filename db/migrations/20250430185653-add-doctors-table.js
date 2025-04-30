'use strict';

import { DOCTOR_TABLE, DoctorSchema } from '../models/doctor.model.js';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(DOCTOR_TABLE, DoctorSchema);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable(DOCTOR_TABLE);
}
