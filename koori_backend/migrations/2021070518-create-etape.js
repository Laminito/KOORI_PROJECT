'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Etapes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FicheId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Fiches',
          key: 'id'
        }
      },
      titre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
    await  queryInterface.bulkInsert('Etapes', [{
      FicheId: 1,
      titre: "Introduction a l'exercice",
      description: "commencer par un icebreaker de 10 min maximum, pour une nouvelle équipe. Si nécessaire , réaliser un exercice énergisant. Prendre 02 min pour rappeler le challenge concerné. l’inscrire sur le tableau blanc." +
      "Il est important de rappeler certains éléments clés pour cet exercice : pas de bonne ou mauvaise idées, les réflexions sont personnelles et  la quantité est plus importante que la qualité.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        FicheId: 1,
        titre: "Divergence sur les acteurs",
        description: "Prendre une couleur de post-it. Lancer un chrono de 3 à 5 min pour que chaque participant note autant d’acteurs/rôles/équipes que possible dans ses post-it. Eviter toute censure. L’animateur doit être vigilant à la baisse de créativité des participants afin de les booster par des mises en situation. Ex: Qui disparaitrait si le sujet du challenge n’existait pas? Rappeler qu’il est nécessaire lors de l’exercice d’avoir un acteur/rôle par post-it. Privilégier le dessin et la représentation graphique au texte.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 1,
        titre: "Convergence sur les acteurs",
        description: "Prendre 10 min pour que chaque participant présente à l’équipe ses acteurs et regroupe les post-it similaires. En parallèle l’animateur doit aider à identifier des groupes d’acteurs identiques que l’équipe labélise.\n" +
            "Ex: groupe comité stratégique identifié",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 1,
        titre: "Convergence sur les aspirations et sentiments",
        description: "Prendre la seconde couleur de post-it. Rappeler les mêmes principes que  l’étape 2. Dans les mêmes conditions que l’étape 2, identifier aspirations et sentiments par acteur. Un sentiment ou une aspiration par post it.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 1,
        titre: "Identification des interactions",
        description: "L’animation prend 10 minutes pour challenger par des successions de questions les éventuelles relations pressenties entre les acteurs et groupe d’acteurs identifiés lors de l’exercice.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 1,
        titre: "Divergence sur les aspirations et sentiments",
        description: "Prendre la seconde couleur de post-it. Rappeler les mêmes principes que  l’étape 2. Dans les mêmes conditions que l’étape 2, identifier aspirations et sentiments par acteur. Un sentiment ou une aspiration par post it.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 2,
        titre: "Premières étapes / points d’entrée du produit",
        description: "Il est important, pour garder une logique de parcours claire, de commencer par l’identification du point d’entrée." +
            "Quand il s’agit d’une réflexion en groupe vous pouvez demander à chacun d’identifier le point d’entrée sur un post-it. Positionner les post-it sur le tableau en regroupant les points d’entrée répétitifs. Le point avec le plus de répétitions sera le point de départ du processus." +
            "Prendre 05 min car il s’agit d’une étape importante pour la suite.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 3,
        titre: "Description du produit à analyser",
        description: "Lister sur des post-it les réponses aux questions suivantes relatives au produit/service: " +
        "A quoi sert-il ? Comment l’usager l’utilise-t-il!? Comment est-il mis sur le marché? Avec quoi interagit-t-il? Comment fonctionne-t-il techniquement?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 4,
        titre: "Présentation des concepts",
        description: "Il est important pour chacun des participants de comprendre l’ensemble des concepts; les besoins / manques pour lesquels ils apportent une innovation. Faire pour cela une présentation de 02 min de chaque concept identifié.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FicheId: 5,
        titre: "Propositions de valeur",
        description: "Quel type de valeur offrez-vous à votre client (efficacité, commodité, statut social, prix bas, etc.)? Comment répondez-vous aux besoins de vos clients?",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Etapes');
  }
};
