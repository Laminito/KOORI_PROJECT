'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EvaluationKoori extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'KooriId' });
            this.belongsTo(models.Koori, { foreignKey: 'KooriId', otherKey: 'UserId' });
        }
    }
    EvaluationKoori.init({
        UserId: DataTypes.INTEGER,
        KooriId: DataTypes.INTEGER,
        evaluation: DataTypes.TEXT,
        note: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'EvaluationKoori',
    });
    return EvaluationKoori;
};