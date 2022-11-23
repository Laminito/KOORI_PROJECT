'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt")

const defaultpass = "pass"
async function hash(password) {
    const passwprdHash = await bcrypt.hash(password, 10);

    return passwprdHash;
}

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            ProfilId: 2,
            nomComplet: 'Awa Diop',
            email: 'awa.diop@gmail.com',
            password: await hash(defaultpass),
            profession: 'Developpeuse web',
            service: 'Systeme information',
            departement: 'Innovation Lab',
            direction: 'Direction Systeme information',
            avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            ProfilId: 2,
            nomComplet: 'Fama Zeyna Faye Diop',
            email: 'zeyna@gmail.com',
            password: await hash(defaultpass),
            profession: 'Developpeuse web',
            service: 'Systeme information',
            departement: 'Innovation Lab',
            direction: 'Direction Systeme information',
            avatar: 'https:www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            ProfilId: 2,
            nomComplet: 'Jack',
            email: 'jack@gmail.sn',
            password: await hash(defaultpass),
            profession: 'Standardiste',
            service: 'Systeme information',
            departement: 'DSC',
            direction: 'Direction Systeme information',
            avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            ProfilId: 2,
            nomComplet: 'Cheikhou',
            email: 'cheikhou@gmail.com',
            password: await hash(defaultpass),
            profession: 'Standardiste',
            service: 'Systeme information',
            departement: 'DSC',
            direction: 'Direction Systeme information',
            avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.freepik.com%2Fvecteurs-premium%2Fportrait-femme-afro-americaine-profil-avatar-jeune-fille-noire_6291373.htm&psig=AOvVaw2IjzYSx3dPch48NxWm7Emv&ust=1666375424572000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJCU9auy7_oCFQAAAAAdAAAAABAN',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};