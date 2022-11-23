'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('EvaluationFiches', {
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
            FicheId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Fiches',
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
        await queryInterface.bulkInsert('EvaluationFiches', [{
                UserId: 1,
                FicheId: 1,
                evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée",
                note: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 2,
                FicheId: 2,
                evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée",
                note: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 3,
                FicheId: 3,
                evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée",
                note: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 4,
                FicheId: 4,
                evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée",
                note: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 5,
                FicheId: 5,
                evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée",
                note: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('EvaluationFiches');
    }
};