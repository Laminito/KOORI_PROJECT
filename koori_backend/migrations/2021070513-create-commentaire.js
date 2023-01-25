'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Commentaires', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            created: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            nbrlike: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            archived: {
                type: Sequelize.BOOLEAN
            },
            // UserId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'Users',
            //         key: 'id'
            //     }
            // },
            // SujetId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'Sujets',
            //         key: 'id'
            //     }
            // },
            // KooriId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'Kooris',
            //         key: 'id'
            //     }
            // },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            }
        });
        await queryInterface.bulkInsert('Commentaires', [{
            // UserId: 3,
            // KooriId: 1,
            // SujetId: 1,
            // created: new Date(),
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            nbrlike: 3,
            archived: true,

        }])
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Commentaires');
    }
};