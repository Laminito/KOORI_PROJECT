'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        static associate(models) {
            // define association here
            this.hasMany(models.Demande);
            this.hasMany(models.Rapport);
        }
    }
    Service.init({
        libelle: DataTypes.STRING,
        description: DataTypes.TEXT,
        nom_des_clients: DataTypes.STRING,
        type_de_service: DataTypes.STRING,
        description_elements_service: DataTypes.TEXT,
        benefices_client: DataTypes.TEXT,
        indicateur_mesure_qualite: DataTypes.TEXT,
        engagement_niveaux_service: DataTypes.TEXT,
        plage_horaire: DataTypes.TEXT,
        livrables: DataTypes.TEXT,
        suivi_gestion_relation_client: DataTypes.TEXT,
        avatar: DataTypes.BLOB,
        liste_des_applications_metiers_supporte: DataTypes.STRING,
        tarifs_et_Facturation: DataTypes.STRING,
        archive: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Service',
        tableName: 'Services',
    });
    return Service;
};