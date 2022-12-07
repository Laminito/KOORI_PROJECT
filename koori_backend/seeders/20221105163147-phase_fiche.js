'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('PhaseFiches', [{
                id_phase: 1,
                id_fiche: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_phase: 2,
                id_fiche: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_phase: 3,
                id_fiche: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_phase: 4,
                id_fiche: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_phase: 5,
                id_fiche: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('PhaseFiches', null, {});
    }
};