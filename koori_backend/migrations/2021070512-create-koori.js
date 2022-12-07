'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kooris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      quoi: {
        type: Sequelize.TEXT
      },
      quand: {
        type: Sequelize.TEXT
      },
      comment: {
        type: Sequelize.TEXT
      },
      version: {
        type: Sequelize.FLOAT
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
    await  queryInterface.bulkInsert('Kooris', [{
      description: "A Sonatel, nous appliquons le design thinking dans toutes nos initiatives d'innovation car nous avons la conviction que ce qui est nouveau n'est innovant que par la valeur qu'il cree pour nos clients et nos partenaires..." +
      "Du probleme a la solution innovante" +
      "Koori est une approche de design thinking qui se veut simple et accessible a tous. Elle permet une generalisation en entreprise des principes cles qui font du design thinking une importante source d'innovation et d'apprentissage." +
      "Elle aide les equipe a derouler simplement des methodes et techniques permettant a partir d'un probleme ou d'un challenge enonce d'aboutir a des apprentissages valides par le terrain.",
      quoi: "Koori met à disposition de tout SONATEL un processus  permettant l’usage adapté et simple d’une boite à outils pratique de co-creation centrée utilisateur." +
          "Il se base sur l’ibox qui incluent les fiches techniques des outils de design thinking identifiés comme utiles dans le processus de créativité." +
          "La méthode Koori adopte le design thinking comme approche d’exploration de problématique. elle se différencie ainsi des approches business traditionnelles en se base  fortement sur trois piliers majeurs suivant :",
      quand: "Koori, au même titre que la majeure partie des processus de design thinking, se différencie des techniques d’analyse traditionnelles sur 06 axes majeures: les hypothèses de base; le processus suivi, les méthodes utilisées, le focus sur l’abstrait, les décisions à prendre, la valeur à créer…",
      comment: "Notre méthode Koori permet de suivre une démarche systématique permettant de naviguer aisément dans la recherche d’innovation.\n" +
          "Koori assure le respect pragmatique des principaux concepts du design thinking.\n" +
          "La méthode offre cinq  cauris  à utiliser à des étapes clés de la démarche.  \n" +
          "\n" +
          "Toutefois chaque cauri peut être utilisé indépendamment. Par exemple, face à une recherche de solutions à un concept bien défini, le cauri  orange (idéation) peut être aisément  utilisé pour co-imaginer des solutions innovantes et en rupture avec l’existant.\n" +
          "Koori permet de penser autrement : sopi xalaat* (penser autrement en wolof)",
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kooris');
  }
};
