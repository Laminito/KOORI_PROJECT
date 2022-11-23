'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Sujets', {
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
            libelle: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nbrlike: {
                allowNull: false,
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
        await queryInterface.bulkInsert('Sujets', [{
            UserId: 2,
            libelle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            nbrlike: 12,
            createdAt: new Date(),
            updatedAt: new Date()

        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Sujets');
    }
};