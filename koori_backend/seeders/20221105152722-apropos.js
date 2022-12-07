'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Apropos', [{
            description: "Le Design Thinking a commencé comme un processus de création de nouvelles technologies et de nouveaux produits élégants. Mais cette méthodologie est maintenant largement utilisée dans les secteurs privé et public, pour des projets professionnels et personnels, partout dans le monde. La méthodologie du design-thinking a été popularisée par le cabinet de conseil en design IDEO . Les méthodes ont pris de l'ampleur dans le monde des affaires au sens large après que Tim Brown, le PDG d'IDEO, ait écrit un article en 2008 pour la Harvard Business Review sur l'utilisation de la pensée conceptuelle dans les affaires,tamment dans un hôpital californien, une entreprise japonaise de vélos, et l'industrie de la santé en Inde. Aujourd'hui, l'un des cours les plus populaires de l'Université de Stanford est Designing Your Life , qui applique le design thinking à la construction d'une carrière et d'une vie joyeuses.Voici ce qu'est le design thinking, comment il fonctionne et pourquoi il est important. ",
            mission: "Une mission claire pour l'entreprise est cruciale pour le retour sur investissement, la culture, les opérations et le positionnement de votre entreprise. Dans cet article, je vais vous expliquer comment utiliser les techniques de Design Thinking pour mettre en place l'énoncé de mission auquel tout le monde croit, et qui guidera votre entreprise à grande échelle.",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Apropos', null, {});

    }
};