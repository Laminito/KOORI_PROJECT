'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'UserId'})
      this.belongsTo(models.Koori,{foreignKey:'KooriId'})
      this.belongsTo(models.Rapport,{foreignKey:'RapportId'})
      this.belongsTo(models.Session,{foreignKey:'SessionId'})
      this.belongsTo(models.Fiche,{foreignKey:'FicheId'})
      this.belongsTo(models.Ibox,
        {
        foreignKey: {
            name: "IboxId",
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          }   
      })
     
    }
  }
  Evaluation.init({
    commentaire: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    note: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    UserId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    KooriId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    IboxId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    RapportId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    SessionId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    FicheId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    etat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
  },
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};