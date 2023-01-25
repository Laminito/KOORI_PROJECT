'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Session_demandes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DemandeId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Demandes',
          key: 'id'
        }
      },
      SessionId:{
        allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Sessions',
            key: 'id'
          }
      },
      date_session: {
        type: Sequelize.DATE
        
      },
      etat: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:true
    },
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
    await queryInterface.bulkInsert('Session_demandes',[
      {
        DemandeId:1,
        SessionId:1
      }
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Session_demandes');
  }
};