'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('EvaluationNotes', [{
            UserId: 3,
            RapportId: 1,
            note: 13,
            evaluation: "L'évaluation est une détermination et une évaluation systématiques du mérite, de la valeur et de l'importance d'un sujet, à l'aide de critères régis par un ensemble de normes . Il peut aider une organisation, un programme, une conception, un projet ou toute autre intervention ou initiative à évaluer tout objectif, concept/proposition réalisable, ou toute alternative, pour aider à la prise de décision ; ou pour déterminer le degré de réalisation ou la valeur par rapport au but, aux objectifs et aux résultats d'une telle action qui a été réalisée.L'objectif principal de l'évaluation, en plus d'avoir un aperçu des initiatives antérieures ou existantes, est de permettre la réflexionet aider à identifier les changements futurs.L'évaluation est souvent utilisée pour caractériser et évaluer des sujets d'intérêt dans un large éventail d'entreprises humaines, y compris les arts , la justice pénale , les fondations , les organisations à but non lucratif , le gouvernement , les soins de santé et d'autres services humains. C'est à long terme et fait à la fin d'une période de temps.",
            statut: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('EvaluationNotes', null, {});

    }
};