'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EvaluationIbox extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'UserId', otherKey: 'IboxId' });
            this.belongsTo(models.Ibox, { foreignKey: 'IboxId', otherKey: 'UserId' });
        }
    }
    EvaluationIbox.init({
        UserId: DataTypes.INTEGER,
        IboxId: DataTypes.INTEGER,
        evaluation: DataTypes.TEXT,
        note: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'EvaluationIbox',
        tableName: 'EvaluationIboxs',
    });
    return EvaluationIbox;
};