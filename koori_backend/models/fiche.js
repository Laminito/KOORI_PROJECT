'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Fiche extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Etape);
            this.belongsToMany(models.Phase, { as: 'FichePhase', through: models.Phase_fiche, foreignKey: 'id_fiche' });
            this.belongsTo(models.Ibox, {
                foreignKey: {
                    name: "IboxId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
        }
    }
    Fiche.init({
        IboxId: DataTypes.INTEGER,
        avatar: DataTypes.BLOB,
        titre: DataTypes.STRING,
        sous_titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        prerequis: DataTypes.TEXT,
        dureeMin: DataTypes.INTEGER,
        dureeMax: DataTypes.INTEGER,
        equipeMin: DataTypes.INTEGER,
        equipeMax: DataTypes.INTEGER,
        outils: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Fiche'
    });
    return Fiche;
};