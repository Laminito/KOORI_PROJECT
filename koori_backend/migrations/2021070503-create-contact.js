'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      adresse: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      disponibilite: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await  queryInterface.bulkInsert('Contacts', [{
      description: ' Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux',
      adresse: 'Ecole Police, Immeuble Scalène Mermoz lot B, Rue KA 05, Dakar',
      email: 'ORANGE MONEY',
      telephone: '+221 33 839 21 00',
      disponibilite: 'Du lundi au vendredi de 7h:30 a 16h:45',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ])

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  }
};
