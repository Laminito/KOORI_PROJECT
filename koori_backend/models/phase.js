'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Phase extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Koori, {
                foreignKey: {
                    name: "KooriId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            // this.belongsToMany(models.Fiche, { as: 'PhaseFiche', through: models.Phase_fiche, foreignKey: 'id_phase' });
            this.hasMany(models.Phase_fiche);
        }
    }
    Phase.init({
        KooriId: DataTypes.INTEGER,
        avatar: DataTypes.BLOB,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Phase',
    });
    return Phase;
};