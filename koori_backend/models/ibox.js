'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ibox extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Fiche);
            this.hasMany(models.Evaluation)

        }
    }
    Ibox.init({
        description: {
            type:DataTypes.TEXT,
        allowNull:false
        },
        avatar: {
            type: DataTypes.BLOB,
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
        modelName: 'Ibox'
    });
    return Ibox;
};