'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('EvaluationNotes', {
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
        await queryInterface.bulkInsert('EvaluationNotes', [{
            UserId: 3,
            RapportId: 1,
            note: 13,
            evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps.",
            statut: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('EvaluationNotes');
    }
};