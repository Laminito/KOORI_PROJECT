'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Rapports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ServiceId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Services',
                    key: 'id'
                }
            },
            titre: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            moyenne: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            file: {
                allowNull: true,
                type: Sequelize.BLOB,
                get() {
                    return this.getDataValue('file').toString('utf8'); // or whatever encoding is right
                },
            },
            statut: {
                defaultValue: 'invisible',
                type: Sequelize.STRING
            },
            etat: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue:new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue:new Date()
            },
        });
        await queryInterface.bulkInsert('Rapports', [{
            ServiceId: 1,
            titre: 'Empathie',
            file: "https://sophieturpaud.com/wp-content/uploads/2015/03/Definition-empathie-via-@sophieturpaud-.jpg",
            description: 'Un challenge en lien avec des clients/utilisateurs se pose à vous: le cauri rouge permet  de dérouler les exercices vous permettant de vous mettre dans les bottes de vos clients et de mieux comprendre,  sentir et apprécier  la douleur vécue par ces derniers.',
            moyenne: 15.8,
            statut: 'Traiter',
        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Rapports');
    }
};