'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Demande extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            this.hasMany(models.Session_demande);

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
            // this.belongsToMany(models.User, { as: 'DemandeUser', through: models.Session, foreignKey: 'DemandeId' });
            // this.belongsTo(models.Rapport, {
            //     foreignKey: {
            //         name: "RapportId",
            //         allowNull: true,
            //         onDelete: 'RESTRICT',
            //         onUpdate: 'RESTRICT'
            //     }
            // });
        }
    }
    Demande.init({
        UserId: DataTypes.INTEGER,
        ServiceId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        date_debut_souhaitee: DataTypes.DATE,
        disponibilite: DataTypes.BOOLEAN,
        statut: DataTypes.STRING,
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },

    }, {
        sequelize,
        modelName: 'Demande',
    });
    return Demande;
};