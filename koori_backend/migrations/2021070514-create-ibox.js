'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Iboxes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            avatar: {
                type: Sequelize.BLOB,
                defaultValue:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/IBOX_logo.svg/2560px-IBOX_logo.svg.png",
                get() {
                    return this.getDataValue('avatar').toString('utf8'); // or whatever encoding is right
                }
            },
            etat: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        });
        await queryInterface.bulkInsert('Iboxes', [
            {
                 description: "L'ibox1 est un ensemble de fiches pratiques destines qux animateurs d'ateliers de design thinking." +
                    "Chaque exercice fait reference a une ou plusieurs etapes de la methode Koori. la couleur correspond au cauris utilisant le plus cette fiche." +
                    "Il n'est pas a exclure que des fiches soient utiles a d'autres cauris. Plusieurs exercices, de differentes fiches peuvent egalement etre combines afin d'atteindre un objectif de creativite particulier."
            },
            {
                description: "L'ibox2 est un ensemble de fiches pratiques destines qux animateurs d'ateliers de design thinking." +
                    "Chaque exercice fait reference a une ou plusieurs etapes de la methode Koori. la couleur correspond au cauris utilisant le plus cette fiche." +
                    "Il n'est pas a exclure que des fiches soient utiles a d'autres cauris. Plusieurs exercices, de differentes fiches peuvent egalement etre combines afin d'atteindre un objectif de creativite particulier."
            },
            {
                description: "L'ibox3 est un ensemble de fiches pratiques destines qux animateurs d'ateliers de design thinking." +
                    "Chaque exercice fait reference a une ou plusieurs etapes de la methode Koori. la couleur correspond au cauris utilisant le plus cette fiche." +
                    "Il n'est pas a exclure que des fiches soient utiles a d'autres cauris. Plusieurs exercices, de differentes fiches peuvent egalement etre combines afin d'atteindre un objectif de creativite particulier."
            }
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Iboxes');
    }
};