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
            this.belongsTo(models.Phase, { foreignKey: 'PhaseId'});
            this.belongsTo(models.Fiche, { foreignKey: 'FicheId'});
        }
    }
    Phase_fiche.init({
        PhaseId: DataTypes.INTEGER,
        FicheId: DataTypes.INTEGER,
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Phase_fiche',
    });
    return Phase_fiche;
};