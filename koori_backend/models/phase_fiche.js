'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Phase_fiche extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Phase, { foreignKey: 'id_phase', otherKey: 'id_fiche' });
            this.belongsTo(models.Fiche, { foreignKey: 'id_fiche', otherKey: 'id_phase' });
        }
    }
    Phase_fiche.init({
        id_phase: DataTypes.INTEGER,
        id_fiche: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Phase_fiche',
    });
    return Phase_fiche;
};