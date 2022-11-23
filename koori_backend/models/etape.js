'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Etape extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Fiche, {
                foreignKey: {
                    name: "FicheId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
        }
    }
    Etape.init({
        FicheId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Etape',
    });
    return Etape;
};