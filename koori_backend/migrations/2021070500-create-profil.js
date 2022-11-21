'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        type: Sequelize.TEXT,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type:Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
    await  queryInterface.bulkInsert('Profils', [{
      libelle: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      libelle: 'Client',
      createdAt: new Date(),
      updatedAt: new Date()
    },
     ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profils');
  }
};