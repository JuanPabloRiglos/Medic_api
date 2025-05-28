export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('users', 'birthdate', {
    type: Sequelize.DATEONLY,
    allowNull: true,
  });
  await queryInterface.addColumn('users', 'image', {
    type: Sequelize.STRING,
    allowNull: true,
  });
  await queryInterface.addColumn('users', 'dni', {
    type: Sequelize.STRING,
    allowNull: true,
  });
  await queryInterface.addColumn('users', 'country', {
    type: Sequelize.STRING,
    allowNull: true,
  });
  await queryInterface.addColumn('users', 'state', {
    type: Sequelize.STRING,
    allowNull: true,
  });
  await queryInterface.addColumn('users', 'postal_code', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('users', 'birthdate');
  await queryInterface.removeColumn('users', 'image');
  await queryInterface.removeColumn('users', 'dni');
  await queryInterface.removeColumn('users', 'country');
  await queryInterface.removeColumn('users', 'state');
  await queryInterface.removeColumn('users', 'postal_code');
}
