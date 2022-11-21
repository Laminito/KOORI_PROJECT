'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Commentaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      nbrlike: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      SujetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sujets',
          key: 'id'
        }
      },
      KooriId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kooris',
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Commentaires');
  }
};
