'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EvaluationFiche extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'FicheId' });
            this.belongsTo(models.Fiche, { foreignKey: 'FicheId', otherKey: 'UserId' });
        }
    }
    EvaluationFiche.init({
        UserId: DataTypes.INTEGER,
        FicheId: DataTypes.INTEGER,
        evaluation: DataTypes.TEXT,
        note: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'EvaluationFiche',
    });
    return EvaluationFiche;
};