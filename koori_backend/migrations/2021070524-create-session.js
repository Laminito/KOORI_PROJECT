'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isNotified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      etat: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      }
    });
    await  queryInterface.bulkInsert('Sessions', [
      {
      isNotified:false
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};