'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Phase_fiches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            PhaseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Phases',
                    key: 'id'
                }
            },
            FicheId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Fiches',
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
        await queryInterface.bulkInsert('Phase_fiches', [{
                PhaseId: 1,
                FicheId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PhaseId: 2,
                FicheId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PhaseId: 3,
                FicheId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PhaseId: 4,
                FicheId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PhaseId: 5,
                FicheId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Phase_fiches');
    }
};