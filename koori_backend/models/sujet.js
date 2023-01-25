'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sujet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.hasMany(models.Commentaire);
            // this.belongsTo(models.User, {
            //     foreignKey: {
            //         name: "UserId",
            //         allowNull: false,
            //         onDelete: "RESTRICT",
            //         onUpdate: 'RESTRICT'
            //     }
            // });
        }
    }
    Sujet.init({

        // UserId: DataTypes.INTEGER,
        libelle: DataTypes.TEXT,
        nbrlike: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Sujet',
    });
    return Sujet;
};