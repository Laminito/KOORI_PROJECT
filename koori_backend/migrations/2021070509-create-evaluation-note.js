'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Evaluation_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      RapportId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rapports',
          key: 'id'
        }
      },
      note: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      evaluation: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      statut: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Evaluation_notes');
  }
};
