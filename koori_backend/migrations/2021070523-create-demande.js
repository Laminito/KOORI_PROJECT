'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Demandes', {
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
      ServiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Services',
          key: 'id'
        }
      },
      RapportId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: 'Rapports',
          key: 'id'
        }
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      date_realisation: {
        allowNull: false,
        type: Sequelize.DATE
      },
        date_fin: {
            allowNull: true,
            type: Sequelize.DATE
        },
      statut: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Nouvelle'
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
    await  queryInterface.bulkInsert('Demandes', [
        {
      UserId:1,
      ServiceId: 1,
      titre: 'ORANGE MONEY',
      description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
          ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
          'gros yeux qui peuvent détecter les profonds secrets de la mer.',
      date_realisation: new Date(),
      date_fin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
{
      UserId:2,
      ServiceId: 3,
      titre: 'NEW CHALLENGE',
      description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
          ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
          'gros yeux qui peuvent détecter les profonds secrets de la mer.',
      date_realisation: new Date(),
    date_fin: null,
    createdAt: new Date(),
      updatedAt: new Date()
    },
{
      UserId:3,
      ServiceId: 1,
      titre: 'BAISSE DES FRAIS OM',
      description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
          ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
          'gros yeux qui peuvent détecter les profonds secrets de la mer.',
      date_realisation: new Date(),
    date_fin: null,
    createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Demandes');
  }
};
