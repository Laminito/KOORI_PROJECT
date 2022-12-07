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
            id_rapport: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Rapports',
                    key: 'id'
                }
            },
            id_user: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                date: {
                    type: Sequelize.DATEONLY,
                    defaultValue: Sequelize.NOW,
                    // get: function() { 
                    // or use get(){ }
                    //     return this.getDataValue('date')
                    //         .toLocaleString('en-GB', { timeZone: 'UTC' });
                    // }
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
        await queryInterface.bulkInsert('Telechargements', [{
            id_rapport: 1,
            id_user: 3,
            // date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()

        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Telechargements');
    }
};