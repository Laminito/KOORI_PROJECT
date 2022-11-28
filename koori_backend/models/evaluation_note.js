'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Evaluation_note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'RapportId' });
            this.belongsTo(models.Rapport, { foreignKey: 'RapportId', otherKey: 'UserId' });
        }
    }
    Evaluation_note.init({
        UserId: DataTypes.INTEGER,
        RapportId: DataTypes.INTEGER,
        note: DataTypes.INTEGER,
        evaluation: DataTypes.TEXT,
        statut: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Evaluation_note',
    });
    return Evaluation_note;
};