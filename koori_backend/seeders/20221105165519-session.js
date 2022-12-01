'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Sessions', [{
                evaluation: 'Trés bien',
                note: 18,
                DemandeId: 1,
                UserId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                evaluation: 'Trés bien',
                note: 16,
                DemandeId: 1,
                UserId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                evaluation: 'Trés bien',
                note: 14,
                DemandeId: 1,
                UserId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                evaluation: 'Trés bien',
                note: 16,
                DemandeId: 2,
                UserId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                evaluation: 'Trés bien',
                note: 12,
                DemandeId: 2,
                UserId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Sessions', null, {});
    }
};