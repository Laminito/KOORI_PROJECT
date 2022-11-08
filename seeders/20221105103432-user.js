'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
                ProfilId: 1,
                nomComplet: 'Pape Saliou Mbodj',
                email: 'papasaliou.mbodj@gmail.com',
                password: "pass",
                profession: 'CTO',
                service: 'Systeme information',
                departement: 'Innovation Lab',
                direction: 'Direction Systeme information',
                avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                ProfilId: 1,
                nomComplet: 'Mohamed Ba',
                email: 'mba25516@gmail.com',
                password: "pass",
                profession: 'Developpeur web',
                service: 'Systeme information',
                departement: 'Innovation Lab',
                direction: 'Direction Systeme information',
                avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ProfilId: 1,
                nomComplet: 'Fama Sarr',
                email: 'sfama@ept.sn',
                password: "pass",
                profession: 'Developpeuse web',
                service: 'Systeme information',
                departement: 'Innovation Lab',
                direction: 'Direction Systeme information',
                avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ProfilId: 1,
                nomComplet: 'Abdoulaye Mangane',
                email: 'abmangane12@gmail.com',
                password: "pass",
                profession: 'Developpeur web',
                service: 'Systeme information',
                departement: 'Innovation Lab',
                direction: 'Direction Systeme information',
                avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};