'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Profil, {
                foreignKey: {
                    name: "ProfilId",
                    allowNull: false,
                    onDelete: 'RESTRICT',
                    onUpdate: 'RESTRICT'
                }
            });
            // this.hasMany(models.Demande);
            this.hasMany(models.Commentaire);
            this.belongsToMany(models.Demande, { as: 'UserDemande', through: models.Session, foreignKey: 'UserId' });
            this.belongsToMany(models.Rapport, { as: 'UserRapport', through: models.Telechargement, foreignKey: 'UserId' });
            this.belongsToMany(models.Koori, { as: 'UserEvaluationKoori', through: models.EvaluationKoori, foreignKey: 'UserId' });
            this.belongsToMany(models.Ibox, { as: 'UserEvaluationIbox', through: models.EvaluationIbox, foreignKey: 'UserId' });
            this.belongsToMany(models.Fiche, { as: 'UserEvaluationFiche', through: models.EvaluationFiche, foreignKey: 'UserId' });
            this.belongsToMany(models.Rapport, { as: 'UserEvaluation', through: models.EvaluationNote, foreignKey: 'UserId' });


        }
    }
    User.init({
        ProfilId: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nomComplet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: false
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.BLOB
        },
    }, {
        sequelize,
        modelName: 'User',

    });

    return User;
};