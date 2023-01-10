'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Profils', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            libelle: {
                type: Sequelize.TEXT,
                unique: true,
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
        await queryInterface.bulkInsert('Profils', [{
            libelle: 'Admin'
        }, {
            libelle: 'Client'
        }, ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Profils');
    }
};