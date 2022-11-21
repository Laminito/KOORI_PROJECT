'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Phase_fiches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_phase: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Phases',
          key: 'id'
        }
      },
      id_fiche: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Fiches',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await  queryInterface.bulkInsert('Phase_fiches', [{
      id_phase: 1,
      id_fiche: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        id_phase: 2,
        id_fiche: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_phase: 3,
        id_fiche: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_phase: 4,
        id_fiche: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_phase: 5,
        id_fiche: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Phase_fiches');
  }
};
