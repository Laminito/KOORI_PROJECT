'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Telechargement extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
            // define association here
            this.belongsTo(models.Rapport, {
                foreignKey: {
                    name: "RapportId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            this.belongsTo(models.User, {
                foreignKey: {
                    name: "UserId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
                });
        }
    }
    Telechargement.init({
        UserId: DataTypes.INTEGER,
        RapportId: DataTypes.INTEGER,
        date: {
            type:DataTypes.DATE,
            allowNull:new Date()
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Telechargement',
    });
    return Telechargement;
};