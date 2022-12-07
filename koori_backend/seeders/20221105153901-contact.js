'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Contacts', [{
            description: ' Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux',
            adresse: 'Ecole Police, Immeuble Scalène Mermoz lot B, Rue KA 05, Dakar',
            email: 'orange-money@gmail.com',
            telephone: '+221 33 839 21 00',
            disponibilite: 'Du lundi au vendredi de 7h:30 a 16h:45',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Contacts', null, {});

    }
};