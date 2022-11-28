'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Temoignage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Temoignage.init({
        createdAt: DataTypes.DATE,
        nomComplet: DataTypes.STRING,
        message: DataTypes.TEXT,
        avatar: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'Temoignage',
    });
    return Temoignage;
};