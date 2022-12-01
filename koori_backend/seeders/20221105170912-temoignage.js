'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Temoignages', [{
                nomComplet: 'Papa Saliou MBODJ',
                message: 'Toute personne, toute équipe ayant participé à un projet utilisant les méthodes de Koori en ressort transformée.',
                avatar: "https://pbs.twimg.com/profile_images/1371217385303195652/MUvgMqyg_400x400.jpg",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nomComplet: 'El Hadji Birahim GUEYE',
                message: 'Ce livret est très utile, didactique et complet. Il va aider tous ceux qui cherchent un protocole pour trouver leur rêve.',
                avatar: "https://media-exp1.licdn.com/dms/image/C5603AQFUmienqir7cw/profile-displayphoto-shrink_800_800/0/1646256680572?e=1672876800&v=beta&t=H27G90WBWI5jaAwl10eecKsFXZ0LpfeLjl38SXsyAtw",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Temoignages', null, {});
    }
};