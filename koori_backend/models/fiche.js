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
            this.hasMany(models.Evaluation);
            this.hasMany(models.Etape);
            this.hasMany(models.Phase_fiche);

            // this.belongsToMany(models.Phase, { as: 'FichePhase', through: models.Phase_fiche, foreignKey: 'id_fiche' });
            this.belongsTo(models.Ibox, {
                foreignKey: {
                    name: "IboxId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE'
                }
            });
          
        }
    }
    Fiche.init({
        IboxId: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        sous_titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        prerequis: DataTypes.TEXT,
        dureeMin: DataTypes.INTEGER,
        dureeMax: DataTypes.INTEGER,
        equipeMin: DataTypes.INTEGER,
        equipeMax: DataTypes.INTEGER,
        outils: DataTypes.TEXT,
        avatar:{
            type:DataTypes.BLOB,
            get() {
                return this.getDataValue('avatar').toString('utf8'); // or whatever encoding is right
            },
        },
        etat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:true
        },
    }, {
        sequelize,
        modelName: 'Fiche'
    });
    return Fiche;
};