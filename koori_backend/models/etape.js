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
                    onUpdate: 'CASCADE'
                }
            });
        }
    }
    Etape.init({
        FicheId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Etape',
    });
    return Etape;
};