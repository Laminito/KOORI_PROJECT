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
      evaluation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      note: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      },
      DemandeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Demandes',
          key: 'id'
        }
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      isNotified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await  queryInterface.bulkInsert('Sessions', [{
      evaluation: 'Trés bien',
      note: 18,
      DemandeId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      evaluation: 'Trés bien',
      note: 16,
      DemandeId: 1,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      evaluation: 'Trés bien',
      note: 14,
      DemandeId: 1,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      evaluation: 'Trés bien',
      note: 16,
      DemandeId: 2,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      evaluation: 'Trés bien',
      note: 12,
      DemandeId: 2,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};