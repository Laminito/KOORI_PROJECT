'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Demandes', [{
                UserId: 1,
                ServiceId: 1,
                titre: 'ORANGE MONEY',
                description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
                    ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
                    'gros yeux qui peuvent détecter les profonds secrets de la mer.',
                date_realisation: new Date(),
                date_fin: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 2,
                ServiceId: 3,
                titre: 'NEW CHALLENGE',
                description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
                    ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
                    'gros yeux qui peuvent détecter les profonds secrets de la mer.',
                date_realisation: new Date(),
                date_fin: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 3,
                ServiceId: 1,
                titre: 'BAISSE DES FRAIS OM',
                description: 'Monsieur Ali est un homme maigre, solide comme sa barque, lent, lucide ; un des hommes qui semblent' +
                    ' faits pour être toujours en contact avec leur monde préféré : la mer. Il a un gros nez, un gros front, de ' +
                    'gros yeux qui peuvent détecter les profonds secrets de la mer.',
                date_realisation: new Date(),
                date_fin: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Demandes', null, {});

    }
};