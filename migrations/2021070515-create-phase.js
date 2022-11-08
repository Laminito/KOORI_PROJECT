'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Phases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      KooriId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kooris',
          key: 'id'
        }
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      avatar: {
        allowNull: true,
        type: Sequelize.BLOB
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
    await  queryInterface.bulkInsert('Phases', [{
      KooriId: 1,
      titre: 'Empathie',
      description: 'Un challenge en lien avec des clients/utilisateurs se pose à vous: le cauri rouge permet  de dérouler les exercices vous permettant de vous mettre dans les bottes de vos clients et de mieux comprendre,  sentir et apprécier  la douleur vécue par ces derniers.',
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        KooriId: 1,
        titre: 'Definition',
        description: 'Vous avez identifié des douleurs, des problématiques client à adresser sans avoir une description claire et partagée par différents acteurs. Nous conseillons de « jeter » ce cauri  en utilisant les techniques qui permettront d’aboutir à des définitions claires et partagées',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KooriId: 1,
        titre: 'Ideation',
        description: 'Vous avez un problème ou un challenge définis et vous souhaitez co-construire/co-imaginer  avec une équipe multidisciplinaire des concepts nouveaux en rupture avec l’existant. Le Koori ideation vous met à disposition des outils  et un processus permettant d’explorer en groupe des innovations orientées douleurs client ',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KooriId: 1,
        titre: 'Prototypage',
        description: 'Le Koori est une méthode qui met la validation visuelle au cœur de la démarche de co-creation. Le prototypage est un processus qui , avec divers outils doit permettre une visualisation rapide et efficiente.\n' +
            'Ce cauri peut être utiliser en dehors du processus global pour adresser tout besoin de visualisation d’un processus, d’une solution, d’un service…',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        KooriId: 1,
        titre: 'Test',
        description: 'Un des éléments clés de notre méthode de design thinking est lié à la validation au plus tôt des hypothèses de valeur. Le cauri de test est donc indispensable pour challenger sur le terrain des hypothèses pressenties par le groupe de création. Le cauri Test est utile pour chaque besoin de validation d’hypothèses avec un nombre fini d’acteurs impactés par le problème adressé.',
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Phases');
  }
};
