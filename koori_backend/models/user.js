'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
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
            this.hasMany(models.Demande);
            this.belongsToMany(models.Demande, { as: 'UserDemande', through: models.Session, foreignKey: 'UserId' });
            this.belongsToMany(models.Rapport, { as: 'UserRapport', through: models.Telechargement, foreignKey: 'UserId' });
            this.belongsToMany(models.Rapport, { as: 'UserEvaluation', through: models.Evaluation_note, foreignKey: 'UserId' });
            this.hasMany(models.Commentaire);
            this.belongsToMany(models.Koori, { as: 'UserEvaluationKoori', through: models.EvaluationKoori, foreignKey: 'UserId' });
            this.belongsToMany(models.Ibox, { as: 'UserEvaluationIbox', through: models.EvaluationIbox, foreignKey: 'UserId' });
            this.belongsToMany(models.Fiche, { as: 'UserEvaluationFiche', through: models.EvaluationFiche, foreignKey: 'UserId' });
        }
    }
    User.init({
        ProfilId: DataTypes.INTEGER,
        nomComplet: DataTypes.STRING,
        email: DataTypes.STRING,
        profession: DataTypes.STRING,
        service: DataTypes.STRING,
        departement: DataTypes.STRING,
        direction: DataTypes.STRING,
        // avatar: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};