'use strict';
const {
  Model
} = require('sequelize');
const dates = require('express-dates-middleware');
module.exports = (sequelize, DataTypes) => {
  class Session_demande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Session, { foreignKey: 'SessionId'});
      this.belongsTo(models.Demande, { foreignKey: 'DemandeId'});
    }
  }
  Session_demande.init({
    date_session: {
      type:DataTypes.DATE,
      defaultValue: new Date()
    },
    SessionId:DataTypes.INTEGER,
    DemandeId:DataTypes.INTEGER,
    etat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
  },
  }, {
    sequelize,
    modelName: 'Session_demande',
  });
  return Session_demande;
};