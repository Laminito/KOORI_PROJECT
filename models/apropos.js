'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Apropos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Apropos.init({
        description: DataTypes.TEXT,
        mission: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Apropos',
    });
    return Apropos;
};