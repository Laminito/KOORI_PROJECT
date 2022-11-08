'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('EvaluationIboxs', {
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
            IboxId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Iboxs',
                    key: 'id'
                }
            },
            evaluation: {
                allowNull: true,
                type: Sequelize.TEXT
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            freezeTableName: true
        });
        await queryInterface.bulkInsert('EvaluationIboxs', [{
            UserId: 3,
            IboxId: 1,
            evaluation: "L'ibox est un ensemble de fiches pratiques destines qux animateurs d'ateliers de design thinking." +
                "Chaque exercice fait reference a une ou plusieurs etapes de la methode Koori. la couleur correspond au cauris utilisant le plus cette fiche." +
                "Il n'est pas a exclure que des fiches soient utiles a d'autres cauris. Plusieurs exercices, de differentes fiches peuvent egalement etre combines afin d'atteindre un objectif de creativite particulier.",
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('EvaluationIboxs');
    }
};