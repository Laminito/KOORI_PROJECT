'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
            this.hasMany(models.Evaluation)
            this.hasMany(models.Session_demande)
            
        }
    };
    Session.init({
        date: DataTypes.DATE,
        isNotified: {
            type:DataTypes.BOOLEAN,
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};