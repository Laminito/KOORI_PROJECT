'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ibox extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Fiche);
        }
    }
    Ibox.init({
        description: DataTypes.TEXT,
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Ibox',
        tableName: 'Iboxs'
    });
    return Ibox;
};