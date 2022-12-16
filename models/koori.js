'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Koori extends Model {
        static associate(models) {
            // define association here
            this.hasMany(models.Commentaire);
            this.hasMany(models.Phase);
            this.belongsToMany(models.User, { as: 'EvaluationKooriUser', through: models.EvaluationKoori, foreignKey: 'KooriId' });

        }
    }
    Koori.init({
        description: DataTypes.TEXT,
        quoi: DataTypes.TEXT,
        quand: DataTypes.TEXT,
        comment: DataTypes.TEXT,
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Koori',
    });
    return Koori;
};