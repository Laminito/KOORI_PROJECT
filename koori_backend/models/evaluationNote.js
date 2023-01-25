'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EvaluationNote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'RapportId' });
            // this.belongsTo(models.Rapport, { foreignKey: 'RapportId', otherKey: 'UserId' });
        }
    }
    EvaluationNote.init({
        // UserId: DataTypes.INTEGER,
        // RapportId: DataTypes.INTEGER,
        evaluation: DataTypes.TEXT,
        statut: DataTypes.BOOLEAN,
        note: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'EvaluationNote',
    });
    return EvaluationNote;
};