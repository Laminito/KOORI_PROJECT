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
            this.belongsTo(models.Rapport, { foreignKey: 'id_rapport', otherKey: 'id_user' });
            this.belongsTo(models.User, { foreignKey: 'id_user', otherKey: 'id_rapport' });
        }
    }
    Telechargement.init({
        id_rapport: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Telechargement',
    });
    return Telechargement;
};