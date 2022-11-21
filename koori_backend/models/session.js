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
            this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'DemandeId' });
            this.belongsTo(models.Demande, { foreignKey: 'DemandeId', otherKey: 'UserId' });
        }
    };
    Session.init({
        DemandeId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        evaluation: DataTypes.STRING,
        note: DataTypes.INTEGER,
        isNotified: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};