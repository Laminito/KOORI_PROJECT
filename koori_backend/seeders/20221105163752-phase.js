'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Phases', [{
                KooriId: 1,
                titre: 'Empathie',
                avatar: "https://comarketing-news.fr/wp-content/uploads/empathie-clients.jpg",
                description: 'Un challenge en lien avec des clients/utilisateurs se pose à vous: le cauri rouge permet  de dérouler les exercices vous permettant de vous mettre dans les bottes de vos clients et de mieux comprendre,  sentir et apprécier  la douleur vécue par ces derniers.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                KooriId: 1,
                titre: 'Definition',
                avatar: "https://image.shutterstock.com/image-photo/definition-word-business-concep-260nw-1161600556.jpg",
                description: 'Vous avez identifié des douleurs, des problématiques client à adresser sans avoir une description claire et partagée par différents acteurs. Nous conseillons de « jeter » ce cauri  en utilisant les techniques qui permettront d’aboutir à des définitions claires et partagées',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                KooriId: 1,
                titre: 'Ideation',
                avatar: "https://productfolio.com/wp-content/uploads/idea-management.jpg",
                description: 'Vous avez un problème ou un challenge définis et vous souhaitez co-construire/co-imaginer  avec une équipe multidisciplinaire des concepts nouveaux en rupture avec l’existant. Le Koori ideation vous met à disposition des outils  et un processus permettant d’explorer en groupe des innovations orientées douleurs client ',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                KooriId: 1,
                titre: 'Prototypage',
                avatar: "https://plastisem.fr/wp-content/uploads/2022/04/prototypage2.jpg",
                description: 'Le Koori est une méthode qui met la validation visuelle au cœur de la démarche de co-creation. Le prototypage est un processus qui , avec divers outils doit permettre une visualisation rapide et efficiente.\n' +
                    'Ce cauri peut être utiliser en dehors du processus global pour adresser tout besoin de visualisation d’un processus, d’une solution, d’un service…',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                KooriId: 1,
                titre: 'Test',
                avatar: "https://miro.medium.com/max/1400/0*i1XbVjul86E_CSyf.jpg",
                description: 'Un des éléments clés de notre méthode de design thinking est lié à la validation au plus tôt des hypothèses de valeur. Le cauri de test est donc indispensable pour challenger sur le terrain des hypothèses pressenties par le groupe de création. Le cauri Test est utile pour chaque besoin de validation d’hypothèses avec un nombre fini d’acteurs impactés par le problème adressé.',
                createdAt: new Date(),
                updatedAt: new Date()

            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Phases', null, {});
    }
};