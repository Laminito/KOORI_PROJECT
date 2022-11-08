'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Profils', [{
            libelle: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            libelle: 'Client',
            createdAt: new Date(),
            updatedAt: new Date()

        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Profils', null, {});

    }
};