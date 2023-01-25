'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rapport extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Telechargement)
            //  this.belongsTo(models.Telechargement, {
            //         foreignKey: {
            //             name: "TelechargementId",
            //             allowNull: false,
            //             onDelete: 'RESTRICT',
            //             onUpdate: 'RESTRICT'
            //         }
            //         })
            this.belongsTo(models.Service, {
                foreignKey: {
                    name: "ServiceId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            // this.belongsToMany(models.User, { as: 'TelechargementUser', through: models.Telechargement, foreignKey: 'RapportId' });
        
            // this.belongsToMany(models.User, { as: 'EvaluationUser', through: models.EvaluationNote, foreignKey: 'RapportId' });
            this.hasMany(models.Evaluation)
            
        }
    }
    Rapport.init({
        ServiceId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        moyenne: DataTypes.FLOAT,
        statut: DataTypes.STRING,
        file: {
            allowNull: true,
            type: DataTypes.BLOB,
            get() {
                return this.getDataValue('file').toString('utf8'); // or whatever encoding is right
            }
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Rapport',
    });
    return Rapport;
};