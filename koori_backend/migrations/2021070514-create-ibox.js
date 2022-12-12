'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Iboxs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            version: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
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
        await queryInterface.bulkInsert('Iboxs', [{
            description: "L'ibox est un ensemble de fiches pratiques destines qux animateurs d'ateliers de design thinking." +
                "Chaque exercice fait reference a une ou plusieurs etapes de la methode Koori. la couleur correspond au cauris utilisant le plus cette fiche." +
                "Il n'est pas a exclure que des fiches soient utiles a d'autres cauris. Plusieurs exercices, de differentes fiches peuvent egalement etre combines afin d'atteindre un objectif de creativite particulier.",
            version: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Iboxs');
    }
};