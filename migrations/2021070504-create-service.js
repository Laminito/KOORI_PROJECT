'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
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
        }, {
            freezeTableName: true
        });
        await queryInterface.bulkInsert('Services', [{
                libelle: "Boot'Camp",
                avatar: "https://media.istockphoto.com/id/803702186/photo/determined-woman-climbing-a-net-during-obstacle-course.jpg?s=1024x1024&w=is&k=20&c=SR5HqWTU_CG2DGRNbC9WaXTXMdIiQK1SUpgFNsqaxLQ=",
                nom_des_clients: 'Toutes les directions de la SONATEL',
                type_de_service: 'Standard - Transversal',
                description: 'Le bootcamp d???innovation a pour objectif d???aider ?? essaimer la culture d???innovation au niveau de toutes les entit??s de SONATEL. Ce service offre aux\n' +
                    'collaborateurs la possibilit?? de participer ?? des camps d???innovation ayant le double objectif de les sensibiliser aux techniques d???innovation et\n' +
                    'd???approfondir en un laps de temps tr??s court un nombre d??finis de probl??matiques pressentis comme source de cr??ation de valeur. Ce service est\n' +
                    'r??guli??rement appliquer ?? la suite des mur d???id??es du programme Oz ( challenge d???innovation ouvert ?? tous SONATEL)',
                description_elements_service: 'Soutien ?? l???animation des initiatives d???innovation (Oz???)\n' +
                    'Training on the job Design thinking :\n' +
                    '- Analyse de l?????cosyst??me li?? aux sujets (carte des acteurs,\n' +
                    'empathie, benchmark..)\n' +
                    '- Id??ation et g??n??ration de concepts innovants\n' +
                    '- Prototypage et test des concepts\n' +
                    'Analyse business :\n' +
                    '??? analyse business model canvas???\n' +
                    'Support ?? la formalisation de projets innovants et aux pitchs de\n' +
                    'pr??sentation\n' +
                    'Mise sous tension cr??ative ?? l?????chelle de SONATEL',
                benefices_client: 'Acculturation ?? l???innovation et au design thinking\n' +
                    'Inclusion de tous les collaborateurs dans la strat??gie d???innovation\n' +
                    'Fourniture d???une analyse efficiente d???un sujet pr??suppos?? g??n??rateur\n' +
                    'de valeur\n' +
                    'R??alisation rapide de prototypes sur les concepts imagin??s',
                indicateur_mesure_qualite: 'Dur??e du bootcamp d???innovation ne d??passe pas 02 semaine\n' +
                    'Indice de satisfaction des participants',
                engagement_niveaux_service: 'D??lais de r??alisation : 02 x 01 semaine',
                plage_horaire: '07:30 ??? 16 :45 Lundi au Jeudi\n' +
                    '07:30 ??? 13:30 Vendredi',
                livrables: 'livret ibox et Koori,\n' +
                    'deck innovation',
                suivi_gestion_relation_client: 'Comite innovation: mensuel',
                liste_des_applications_metiers_supporte: 'N/A',
                tarifs_et_Facturation: 'N/A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                libelle: "Raid Innovation",
                avatar: "https://cdn2.photostockeditor.com/t/2712/person-man-using-black-laptop-computer-human-human-image.jpg",
                nom_des_clients: 'Toutes les directions de la SONATEL',
                type_de_service: 'Standard - Transversal',
                description: 'Le raid d???innovation adresse des challenges sur des sujets suppos??s innovants identifi??s par des BUs et valid??s par le comit?? d???innovation pr??sid??' +
                    'par le Directeur G??n??ral. Ce service est applicable ?? tous les domaines pouvant potentiellement cr??er de la valeur business qu???ils soient ou non dans' +
                    'nos lignes business actuelles',
                description_elements_service: 'Design thinking sur le sujet \n' +
                    '- Analyse de l???ecosyst??me li?? au challenge ( carte des acteurs,empathie, benchmark..)' +
                    '- Id??ation et g??n??ration de concepts innovants' +
                    '- Prototypage et test des conceptsAnalyse business :' +
                    '- analyse business model canvas' +
                    'Orientation et conseil de mise en ??uvre' +
                    '- Identification des keys learnings' +
                    '- Fourniture feuille de mise en route',
                benefices_client: 'Fourniture d???une analyse efficiente d???un sujet pr??suppos?? g??n??rateur de valeur' +
                    'R??alisation rapide de prototypes de concepts imagin??e' +
                    'Feedback client rapide sur la valeur suppos??e ( design thinking)' +
                    'Tests efficients des concepts de produits identifi??s',
                indicateur_mesure_qualite: 'Dur??e du raid d???innovation: 01 mois' +
                    'Indice de satisfaction des participants',
                engagement_niveaux_service: '1 mois',
                plage_horaire: '07:30 ??? 16 :45 Lundi au Jeudi\n' +
                    '07:30 ??? 13:30 Vendredi',
                livrables: 'Document de restitution du raid : Learning de chaque ??tape du design thinking,\n' +
                    'Business modele Canvas',
                suivi_gestion_relation_client: 'Comite de pilotage du raid : hebdomadaire' +
                    'Comite innovation: mensuel',
                liste_des_applications_metiers_supporte: 'N/A',
                tarifs_et_Facturation: 'N/A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                libelle: "Quick Design",
                avatar: "https://flowdesign.co.za/images/blog/creative-rates-south-africa-article-apreciation.jpg",
                nom_des_clients: 'Toutes les directions de la SONATEL',
                type_de_service: 'Standard - Transversal',
                description: 'Le Quick Design a pour objectif d???aider ?? essaimer la culture d???innovation au niveau de toutes les entit??s de SONATEL. Ce service offre aux\n' +
                    'collaborateurs la possibilit?? de participer ?? des camps d???innovation ayant le double objectif de les sensibiliser aux techniques d???innovation et\n' +
                    'd???approfondir en un laps de temps tr??s court un nombre d??finis de probl??matiques pressentis comme source de cr??ation de valeur. Ce service est\n' +
                    'r??guli??rement appliquer ?? la suite des mur d???id??es du programme Oz ( challenge d???innovation ouvert ?? tous SONATEL)',
                description_elements_service: 'Soutien ?? l???animation des initiatives d???innovation (Oz???)\n' +
                    'Training on the job Design thinking :\n' +
                    '- Analyse de l?????cosyst??me li?? aux sujets (carte des acteurs,\n' +
                    'empathie, benchmark..)\n' +
                    '- Id??ation et g??n??ration de concepts innovants\n' +
                    '- Prototypage et test des concepts\n' +
                    'Analyse business :\n' +
                    '- analyse business model canvas???\n' +
                    'Support ?? la formalisation de projets innovants et aux pitchs de\n' +
                    'pr??sentation\n' +
                    'Mise sous tension cr??ative ?? l?????chelle de SONATEL',
                benefices_client: 'Acculturation ?? l???innovation et au design thinking\n' +
                    'Inclusion de tous les collaborateurs dans la strat??gie d???innovation\n' +
                    'Fourniture d???une analyse efficiente d???un sujet pr??suppos?? g??n??rateur\n' +
                    'de valeur\n' +
                    'R??alisation rapide de prototypes sur les concepts imagin??s',
                indicateur_mesure_qualite: 'Dur??e du bootcamp d???innovation ne d??passe pas 02 semaine\n' +
                    'Indice de satisfaction des participants',
                engagement_niveaux_service: 'D??lais de r??alisation : 02 x 01 semaine',
                plage_horaire: '07:30 ??? 16 :45 Lundi au Jeudi\n' +
                    '07:30 ??? 13:30 Vendredi',
                livrables: 'livret ibox et Koori,\n' +
                    'deck innovation',
                suivi_gestion_relation_client: 'Comite innovation: mensuel',
                liste_des_applications_metiers_supporte: 'N/A',
                tarifs_et_Facturation: 'N/A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                libelle: "Post-Raid & MVP",
                avatar: "https://magazine.atavist.com/wp-content/uploads/2013/11/atavistillu-1429650147-100-22-1024x602.jpg",
                nom_des_clients: 'Toutes les directions de la SONATEL',
                type_de_service: 'Standard - Transversal',
                description: 'Le bootcamp d???innovation a pour objectif d???aider ?? essaimer la culture d???innovation au niveau de toutes les entit??s de SONATEL. Ce service offre aux\n' +
                    'collaborateurs la possibilit?? de participer ?? des camps d???innovation ayant le double objectif de les sensibiliser aux techniques d???innovation et\n' +
                    'd???approfondir en un laps de temps tr??s court un nombre d??finis de probl??matiques pressentis comme source de cr??ation de valeur. Ce service est\n' +
                    'r??guli??rement appliquer ?? la suite des mur d???id??es du programme Oz ( challenge d???innovation ouvert ?? tous SONATEL)',
                description_elements_service: 'Soutien ?? l???animation des initiatives d???innovation (Oz???)\n' +
                    'Training on the job Design thinking :\n' +
                    '- Analyse de l?????cosyst??me li?? aux sujets (carte des acteurs,\n' +
                    'empathie, benchmark..)\n' +
                    '- Id??ation et g??n??ration de concepts innovants\n' +
                    '- Prototypage et test des concepts\n' +
                    'Analyse business :\n' +
                    '??? analyse business model canvas???\n' +
                    'Support ?? la formalisation de projets innovants et aux pitchs de\n' +
                    'pr??sentation\n' +
                    'Mise sous tension cr??ative ?? l?????chelle de SONATEL',
                benefices_client: 'Acculturation ?? l???innovation et au design thinking\n' +
                    'Inclusion de tous les collaborateurs dans la strat??gie d???innovation\n' +
                    'Fourniture d???une analyse efficiente d???un sujet pr??suppos?? g??n??rateur\n' +
                    'de valeur\n' +
                    'R??alisation rapide de prototypes sur les concepts imagin??s',
                indicateur_mesure_qualite: 'Dur??e du bootcamp d???innovation ne d??passe pas 02 semaine\n' +
                    'Indice de satisfaction des participants',
                engagement_niveaux_service: 'D??lais de r??alisation : 02 x 01 semaine',
                plage_horaire: '07:30 ??? 16 :45 Lundi au Jeudi\n' +
                    '07:30 ??? 13:30 Vendredi',
                livrables: 'livret ibox et Koori,\n' +
                    'deck innovation',
                suivi_gestion_relation_client: 'Comite innovation: mensuel',
                liste_des_applications_metiers_supporte: 'N/A',
                tarifs_et_Facturation: 'N/A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                libelle: "Day 4 Innovation",
                avatar: "https://cumbriagrowthhub.co.uk/wp-content/uploads/2022/04/Coaching-Innovation-Clock-9.jpg",
                nom_des_clients: 'Toutes les directions de la SONATEL',
                type_de_service: 'Standard - Transversal',
                description: 'Le bootcamp d???innovation a pour objectif d???aider ?? essaimer la culture d???innovation au niveau de toutes les entit??s de SONATEL. Ce service offre aux\n' +
                    'collaborateurs la possibilit?? de participer ?? des camps d???innovation ayant le double objectif de les sensibiliser aux techniques d???innovation et\n' +
                    'd???approfondir en un laps de temps tr??s court un nombre d??finis de probl??matiques pressentis comme source de cr??ation de valeur. Ce service est\n' +
                    'r??guli??rement appliquer ?? la suite des mur d???id??es du programme Oz ( challenge d???innovation ouvert ?? tous SONATEL)',
                description_elements_service: 'Soutien ?? l???animation des initiatives d???innovation (Oz???)\n' +
                    'Training on the job Design thinking :\n' +
                    '- Analyse de l?????cosyst??me li?? aux sujets (carte des acteurs,\n' +
                    'empathie, benchmark..)\n' +
                    '- Id??ation et g??n??ration de concepts innovants\n' +
                    '- Prototypage et test des concepts\n' +
                    'Analyse business :\n' +
                    '??? analyse business model canvas???\n' +
                    'Support ?? la formalisation de projets innovants et aux pitchs de\n' +
                    'pr??sentation\n' +
                    'Mise sous tension cr??ative ?? l?????chelle de SONATEL',
                benefices_client: 'Acculturation ?? l???innovation et au design thinking\n' +
                    'Inclusion de tous les collaborateurs dans la strat??gie d???innovation\n' +
                    'Fourniture d???une analyse efficiente d???un sujet pr??suppos?? g??n??rateur\n' +
                    'de valeur\n' +
                    'R??alisation rapide de prototypes sur les concepts imagin??s',
                indicateur_mesure_qualite: 'Dur??e du bootcamp d???innovation ne d??passe pas 02 semaine\n' +
                    'Indice de satisfaction des participants',
                engagement_niveaux_service: 'D??lais de r??alisation : 02 x 01 semaine',
                plage_horaire: '07:30 ??? 16 :45 Lundi au Jeudi\n' +
                    '07:30 ??? 13:30 Vendredi',
                livrables: 'livret ibox et Koori,\n' +
                    'deck innovation',
                suivi_gestion_relation_client: 'Comite innovation: mensuel',
                liste_des_applications_metiers_supporte: 'N/A',
                tarifs_et_Facturation: 'N/A',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Services', null, {});

    }
};