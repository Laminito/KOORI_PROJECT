'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Commentaire extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.User, {
            //     foreignKey: {
            //         name: "UserId",
            //         allowNull: false,
            //         onDelete: 'RESTRICT',
            //         onUpdate: 'RESTRICT'
            //     },
            //     as: "user"
            // });
            // this.belongsTo(models.Sujet, {
            //     foreignKey: {
            //         name: "SujetId",
            //         allowNull: false,
            //         onDelete: 'RESTRICT',
            //         onUpdate: 'RESTRICT'
            //     }
            // });
            // this.belongsTo(models.Koori, {
            //     foreignKey: {
            //         name: "KooriId",
            //         allowNull: false,
            //         onDelete: 'RESTRICT',
            //         onUpdate: 'RESTRICT'
            //     },
            // });
        }
    }
    Commentaire.init({
        // UserId: DataTypes.INTEGER,
        // KooriId: DataTypes.INTEGER,
        // SujetId: DataTypes.INTEGER,
        created: DataTypes.DATE,
        content: DataTypes.TEXT,
        nbrlike: DataTypes.INTEGER,
        archived: DataTypes.BOOLEAN

    }, {
        sequelize,
        modelName: 'Commentaire',
    });
    return Commentaire;
};