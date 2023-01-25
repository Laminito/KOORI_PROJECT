'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Koori extends Model {
        static associate(models) {
            // define association here
            // this.hasMany(models.Commentaire);
            this.hasMany(models.Phase);
            // this.belongsToMany(models.User, { as: 'EvaluationKooriUser', through: models.EvaluationKoori, foreignKey: 'KooriId' });
            this.hasMany(models.Evaluation)

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
        },
        avatar: {
            type: DataTypes.BLOB,
            get() {
                return this.getDataValue('avatar').toString('utf8'); // or whatever encoding is right
            },
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Koori',
    });
    return Koori;
};