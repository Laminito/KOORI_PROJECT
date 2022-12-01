'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Rapports', [{
            ServiceId: 1,
            titre: 'Empathie',
            file: "https://sophieturpaud.com/wp-content/uploads/2015/03/Definition-empathie-via-@sophieturpaud-.jpg",
            description: 'Un challenge en lien avec des clients/utilisateurs se pose à vous: le cauri rouge permet  de dérouler les exercices vous permettant de vous mettre dans les bottes de vos clients et de mieux comprendre,  sentir et apprécier  la douleur vécue par ces derniers.',
            moyenne: 15.8,
            statut: 'Traiter',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Rapports', null, {});
    }
};