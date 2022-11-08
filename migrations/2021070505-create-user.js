'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ProfilId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Profils',
                    key: 'id'
                }
            },
            nomComplet: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            profession: {
                type: Sequelize.STRING
            },
            service: {
                type: Sequelize.STRING
            },
            departement: {
                type: Sequelize.STRING
            },
            direction: {
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.BLOB,
                allowNull: true
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
        await queryInterface.bulkInsert('Users', [{
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
                ProfilId: 2,
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
                ProfilId: 2,
                nomComplet: 'Cheikhou Bodian',
                email: 'cheikhoubodian@gmail.com',
                password: "pass",
                profession: 'Commercial',
                service: 'Systeme information',
                departement: 'DSC',
                direction: 'Direction Systeme Commercial',
                avatar: 'https://img.freepik.com/photos-gratuite/beau-jeune-homme-africain-pensif-s-appuyant-main-tout-pensant_1262-12382.jpg?w=2000',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ProfilId: 2,
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
        ])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};