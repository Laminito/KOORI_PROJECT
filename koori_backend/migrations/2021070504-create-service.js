'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      nom_des_clients: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type_de_service: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description_elements_service: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      benefices_client: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      indicateur_mesure_qualite: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      engagement_niveaux_service: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      plage_horaire: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      livrables: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      suivi_gestion_relation_client: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      avatar: {
        allowNull: true,
        type: Sequelize.BLOB
      },
      liste_des_applications_metiers_supporte: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      tarifs_et_Facturation: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      archive: {
        defaultValue: false,
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    },
        {
            freezeTableName: true
        });
    await  queryInterface.bulkInsert('Services', [{
      libelle: "Boot'Camp",
      nom_des_clients: 'Toutes les directions de la SONATEL',
      type_de_service: 'Standard - Transversal',
      description: 'Le bootcamp d’innovation a pour objectif d’aider à essaimer la culture d’innovation au niveau de toutes les entités de SONATEL. Ce service offre aux\n' +
          'collaborateurs la possibilité de participer à des camps d’innovation ayant le double objectif de les sensibiliser aux techniques d’innovation et\n' +
          'd’approfondir en un laps de temps très court un nombre définis de problématiques pressentis comme source de création de valeur. Ce service est\n' +
          'régulièrement appliquer à la suite des mur d’idées du programme Oz ( challenge d’innovation ouvert à tous SONATEL)',
      description_elements_service: 'Soutien à l’animation des initiatives d’innovation (Oz…)\n' +
          'Training on the job Design thinking :\n' +
          '- Analyse de l’écosystème lié aux sujets (carte des acteurs,\n' +
          'empathie, benchmark..)\n' +
          '- Idéation et génération de concepts innovants\n' +
          '- Prototypage et test des concepts\n' +
          'Analyse business :\n' +
          '⁃ analyse business model canvas…\n' +
          'Support à la formalisation de projets innovants et aux pitchs de\n' +
          'présentation\n' +
          'Mise sous tension créative à l’échelle de SONATEL',
      benefices_client: 'Acculturation à l’innovation et au design thinking\n' +
          'Inclusion de tous les collaborateurs dans la stratégie d’innovation\n' +
          'Fourniture d’une analyse efficiente d’un sujet présupposé générateur\n' +
          'de valeur\n' +
          'Réalisation rapide de prototypes sur les concepts imaginés',
      indicateur_mesure_qualite: 'Durée du bootcamp d’innovation ne dépasse pas 02 semaine\n' +
          'Indice de satisfaction des participants',
      engagement_niveaux_service: 'Délais de réalisation : 02 x 01 semaine',
      plage_horaire: '07:30 – 16 :45 Lundi au Jeudi\n' +
          '07:30 – 13:30 Vendredi',
      livrables: 'livret ibox et Koori,\n' +
          'deck innovation',
      suivi_gestion_relation_client: 'Comite innovation: mensuel',
      avatar: null,
      liste_des_applications_metiers_supporte: 'N/A',
      tarifs_et_Facturation: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },
{
      libelle: "Raid Innovation",
      nom_des_clients: 'Toutes les directions de la SONATEL',
      type_de_service: 'Standard - Transversal',
      description: 'Le raid d’innovation adresse des challenges sur des sujets supposés innovants identifiés par des BUs et validés par le comité d’innovation présidé'+
      'par le Directeur Général. Ce service est applicable à tous les domaines pouvant potentiellement créer de la valeur business qu’ils soient ou non dans'+
      'nos lignes business actuelles',
      description_elements_service: 'Design thinking sur le sujet \n'+
      '- Analyse de l’ecosystème lié au challenge ( carte des acteurs,empathie, benchmark..)'+
      '- Idéation et génération de concepts innovants'+
      '- Prototypage et test des conceptsAnalyse business :'+
      '- analyse business model canvas'+
      'Orientation et conseil de mise en œuvre'+
      '- Identification des keys learnings'+
      '- Fourniture feuille de mise en route',
      benefices_client: 'Fourniture d’une analyse efficiente d’un sujet présupposé générateur de valeur'+
      'Réalisation rapide de prototypes de concepts imaginée'+
      'Feedback client rapide sur la valeur supposée ( design thinking)'+
      'Tests efficients des concepts de produits identifiés',
      indicateur_mesure_qualite: 'Durée du raid d’innovation: 01 mois'+
      'Indice de satisfaction des participants',
      engagement_niveaux_service: '1 mois',
      plage_horaire: '07:30 – 16 :45 Lundi au Jeudi\n' +
          '07:30 – 13:30 Vendredi',
      livrables: 'Document de restitution du raid : Learning de chaque étape du design thinking,\n' +
          'Business modele Canvas',
      suivi_gestion_relation_client: 'Comite de pilotage du raid : hebdomadaire'+
      'Comite innovation: mensuel',
      avatar: null,
      liste_des_applications_metiers_supporte: 'N/A',
      tarifs_et_Facturation: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },
{
      libelle: "Quick Design",
      nom_des_clients: 'Toutes les directions de la SONATEL',
      type_de_service: 'Standard - Transversal',
      description: 'Le Quick Design a pour objectif d’aider à essaimer la culture d’innovation au niveau de toutes les entités de SONATEL. Ce service offre aux\n' +
          'collaborateurs la possibilité de participer à des camps d’innovation ayant le double objectif de les sensibiliser aux techniques d’innovation et\n' +
          'd’approfondir en un laps de temps très court un nombre définis de problématiques pressentis comme source de création de valeur. Ce service est\n' +
          'régulièrement appliquer à la suite des mur d’idées du programme Oz ( challenge d’innovation ouvert à tous SONATEL)',
      description_elements_service: 'Soutien à l’animation des initiatives d’innovation (Oz…)\n' +
          'Training on the job Design thinking :\n' +
          '- Analyse de l’écosystème lié aux sujets (carte des acteurs,\n' +
          'empathie, benchmark..)\n' +
          '- Idéation et génération de concepts innovants\n' +
          '- Prototypage et test des concepts\n' +
          'Analyse business :\n' +
          '⁃ analyse business model canvas…\n' +
          'Support à la formalisation de projets innovants et aux pitchs de\n' +
          'présentation\n' +
          'Mise sous tension créative à l’échelle de SONATEL',
      benefices_client: 'Acculturation à l’innovation et au design thinking\n' +
          'Inclusion de tous les collaborateurs dans la stratégie d’innovation\n' +
          'Fourniture d’une analyse efficiente d’un sujet présupposé générateur\n' +
          'de valeur\n' +
          'Réalisation rapide de prototypes sur les concepts imaginés',
      indicateur_mesure_qualite: 'Durée du bootcamp d’innovation ne dépasse pas 02 semaine\n' +
          'Indice de satisfaction des participants',
      engagement_niveaux_service: 'Délais de réalisation : 02 x 01 semaine',
      plage_horaire: '07:30 – 16 :45 Lundi au Jeudi\n' +
          '07:30 – 13:30 Vendredi',
      livrables: 'livret ibox et Koori,\n' +
          'deck innovation',
      suivi_gestion_relation_client: 'Comite innovation: mensuel',
      avatar: null,
      liste_des_applications_metiers_supporte: 'N/A',
      tarifs_et_Facturation: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },
{
      libelle: "Post-Raid & MVP",
      nom_des_clients: 'Toutes les directions de la SONATEL',
      type_de_service: 'Standard - Transversal',
      description: 'Le bootcamp d’innovation a pour objectif d’aider à essaimer la culture d’innovation au niveau de toutes les entités de SONATEL. Ce service offre aux\n' +
          'collaborateurs la possibilité de participer à des camps d’innovation ayant le double objectif de les sensibiliser aux techniques d’innovation et\n' +
          'd’approfondir en un laps de temps très court un nombre définis de problématiques pressentis comme source de création de valeur. Ce service est\n' +
          'régulièrement appliquer à la suite des mur d’idées du programme Oz ( challenge d’innovation ouvert à tous SONATEL)',
      description_elements_service: 'Soutien à l’animation des initiatives d’innovation (Oz…)\n' +
          'Training on the job Design thinking :\n' +
          '- Analyse de l’écosystème lié aux sujets (carte des acteurs,\n' +
          'empathie, benchmark..)\n' +
          '- Idéation et génération de concepts innovants\n' +
          '- Prototypage et test des concepts\n' +
          'Analyse business :\n' +
          '⁃ analyse business model canvas…\n' +
          'Support à la formalisation de projets innovants et aux pitchs de\n' +
          'présentation\n' +
          'Mise sous tension créative à l’échelle de SONATEL',
      benefices_client: 'Acculturation à l’innovation et au design thinking\n' +
          'Inclusion de tous les collaborateurs dans la stratégie d’innovation\n' +
          'Fourniture d’une analyse efficiente d’un sujet présupposé générateur\n' +
          'de valeur\n' +
          'Réalisation rapide de prototypes sur les concepts imaginés',
      indicateur_mesure_qualite: 'Durée du bootcamp d’innovation ne dépasse pas 02 semaine\n' +
          'Indice de satisfaction des participants',
      engagement_niveaux_service: 'Délais de réalisation : 02 x 01 semaine',
      plage_horaire: '07:30 – 16 :45 Lundi au Jeudi\n' +
          '07:30 – 13:30 Vendredi',
      livrables: 'livret ibox et Koori,\n' +
          'deck innovation',
      suivi_gestion_relation_client: 'Comite innovation: mensuel',
      avatar: null,
      liste_des_applications_metiers_supporte: 'N/A',
      tarifs_et_Facturation: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },
{
      libelle: "Day 4 Innovation",
      nom_des_clients: 'Toutes les directions de la SONATEL',
      type_de_service: 'Standard - Transversal',
      description: 'Le bootcamp d’innovation a pour objectif d’aider à essaimer la culture d’innovation au niveau de toutes les entités de SONATEL. Ce service offre aux\n' +
          'collaborateurs la possibilité de participer à des camps d’innovation ayant le double objectif de les sensibiliser aux techniques d’innovation et\n' +
          'd’approfondir en un laps de temps très court un nombre définis de problématiques pressentis comme source de création de valeur. Ce service est\n' +
          'régulièrement appliquer à la suite des mur d’idées du programme Oz ( challenge d’innovation ouvert à tous SONATEL)',
      description_elements_service: 'Soutien à l’animation des initiatives d’innovation (Oz…)\n' +
          'Training on the job Design thinking :\n' +
          '- Analyse de l’écosystème lié aux sujets (carte des acteurs,\n' +
          'empathie, benchmark..)\n' +
          '- Idéation et génération de concepts innovants\n' +
          '- Prototypage et test des concepts\n' +
          'Analyse business :\n' +
          '⁃ analyse business model canvas…\n' +
          'Support à la formalisation de projets innovants et aux pitchs de\n' +
          'présentation\n' +
          'Mise sous tension créative à l’échelle de SONATEL',
      benefices_client: 'Acculturation à l’innovation et au design thinking\n' +
          'Inclusion de tous les collaborateurs dans la stratégie d’innovation\n' +
          'Fourniture d’une analyse efficiente d’un sujet présupposé générateur\n' +
          'de valeur\n' +
          'Réalisation rapide de prototypes sur les concepts imaginés',
      indicateur_mesure_qualite: 'Durée du bootcamp d’innovation ne dépasse pas 02 semaine\n' +
          'Indice de satisfaction des participants',
      engagement_niveaux_service: 'Délais de réalisation : 02 x 01 semaine',
      plage_horaire: '07:30 – 16 :45 Lundi au Jeudi\n' +
          '07:30 – 13:30 Vendredi',
      livrables: 'livret ibox et Koori,\n' +
          'deck innovation',
      suivi_gestion_relation_client: 'Comite innovation: mensuel',
      avatar: null,
      liste_des_applications_metiers_supporte: 'N/A',
      tarifs_et_Facturation: 'N/A',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Services');
  }
};
