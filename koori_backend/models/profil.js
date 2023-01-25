'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profil extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.hasMany(models.User);
        }
    }
    Profil.init({
        libelle: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Profil',
        timestamps: true
    });
    return Profil;
};