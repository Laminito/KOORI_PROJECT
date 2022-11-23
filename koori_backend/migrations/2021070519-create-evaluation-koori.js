'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('EvaluationKooris', {
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
            KooriId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Kooris',
                    key: 'id'
                }
            },
            evaluation: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            note: {
                allowNull: true,
                type: Sequelize.INTEGER
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
        await queryInterface.bulkInsert('EvaluationKooris', [{
            UserId: 1,
            KooriId: 1,
            evaluation: "commencer par un icebreaker de 10 min maximum, pour une nouvelle équipe. Si nécessaire , réaliser un exercice énergisant. Prendre 02 min pour rappeler le challenge concerné. l’inscrire sur le tableau blanc." +
                "Il est important de rappeler certains éléments clés pour cet exercice : pas de bonne ou mauvaise idées, les réflexions sont personnelles et  la quantité est plus importante que la qualité.",
            note: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('EvaluationKooris');
    }
};