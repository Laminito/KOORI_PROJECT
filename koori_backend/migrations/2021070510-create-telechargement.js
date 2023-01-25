'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Telechargements', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            RapportId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Rapports',
                    key: 'id'
                }
            },
            date: {
                type: Sequelize.DATEONLY,
                defaultValue: Sequelize.NOW
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
        await queryInterface.bulkInsert('Telechargements', [{
            // ServiceId: 1,
            UserId: 4,
            RapportId: 1,
        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Telechargements');
    }
};