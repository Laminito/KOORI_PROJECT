'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('EvaluationIboxs', [{
            FicheId: 1,
            IboxId: 1,
            evaluation: "commencer par un icebreaker de 10 min maximum, pour une nouvelle équipe. Si nécessaire , réaliser un exercice énergisant. Prendre 02 min pour rappeler le challenge concerné. l’inscrire sur le tableau blanc." +
                "Il est important de rappeler certains éléments clés pour cet exercice : pas de bonne ou mauvaise idées, les réflexions sont personnelles et  la quantité est plus importante que la qualité.",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('EvaluationIboxs', null, {});

    }
};