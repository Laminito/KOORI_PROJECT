'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Sujets', [{
            UserId: 2,
            libelle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
            nbrlike: 12,
            createdAt: new Date(),
            updatedAt: new Date()

        }], {});

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Sujets', null, {});
    }
};