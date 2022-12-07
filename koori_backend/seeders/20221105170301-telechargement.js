'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Telechargements', [{
            id_rapport: 1,
            id_user: 3,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()

        }], {});

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Telechargements', null, {});
    }
}