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
            etat: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            }
        });
        await queryInterface.bulkInsert('Phase_fiches', [
            {
                PhaseId: 1,
                FicheId: 1,
            },
            {
                PhaseId: 2,
                FicheId: 2,
            },
            {
                PhaseId: 3,
                FicheId: 3,
            },
            {
                PhaseId: 4,
                FicheId: 4,
            },
            {
                PhaseId: 5,
                FicheId: 5,
            }
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Phase_fiches');
    }
};