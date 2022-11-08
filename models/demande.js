'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Demande extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: {
                    name: "UserId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            this.belongsTo(models.Service, {
                foreignKey: {
                    name: "ServiceId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            this.belongsToMany(models.User, { as: 'DemandeUser', through: models.Session, foreignKey: 'DemandeId' });
            this.belongsTo(models.Rapport, {
                foreignKey: {
                    name: "RapportId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
        }
    }
    Demande.init({
        RapportId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        ServiceId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        date_realisation: DataTypes.DATE,
        date_fin: DataTypes.DATE,
        statut: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Demande',
    });
    return Demande;
};