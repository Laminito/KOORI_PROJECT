// Imports
const _ = require('lodash')
const models = require('../models');


module.exports = {
    createService: (req, res) => {
                    const {
                        libelle,
                        nom_des_clients,
                        type_de_service,
                        description,
                        description_elements_service,
                        benefices_client,
                        indicateur_mesure_qualite,
                        engagement_niveaux_service,
                        plage_horaire,
                        livrables,
                        suivi_gestion_relation_client,
                        liste_des_applications_metiers_supporte,
                        tarifs_et_Facturation
                    } = req.body
                    models.Service.create({
                        libelle,
                        nom_des_clients,
                        type_de_service,
                        description,
                        description_elements_service,
                        benefices_client,
                        indicateur_mesure_qualite,
                        engagement_niveaux_service,
                        plage_horaire,
                        livrables,
                        suivi_gestion_relation_client,
                        avatar: req.file.buffer,
                        liste_des_applications_metiers_supporte,
                        tarifs_et_Facturation
                    }).then((service) => {
                        return res.status(201).json({
                            success: true,
                            message: "request create Service successfully",
                            results: service
                        })
                    }).catch((err) => {
                        return res.status(500).json({
                            success: false,
                            message: "failed create Service request",
                            results: err
                    })
                    })
    },
    getAllService: (req, res) => {
        models.Service.findAll({
            attribute : [
                'id', 'libelle', 'description', 'nom_des_clients', 'type_de_service', 'description_elements_service', 'benefices_client',
                'indicateur_mesure_qualite', 'engagement_niveaux_service', 'plage_horaire', 'livrables', 'suivi_gestion_relation_client',
                'avatar', 'liste_des_applications_metiers_supporte', 'tarifs_et_Facturation', 'archive','etat'
                ],
                where: { etat: true },
               
            }).then((services) => {
                services.forEach(service => {
                    if (service.avatar) {
                        let buff = new Buffer(service.avatar);
                        service.avatar = buff.toString('base64');
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "request get All Services successfully",
                    results: services
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Services request",
                    results: err
            })
            })
    },
    getServiceById: (req, res) => {
        const id = parseInt(req.params.id);
        //return res.json({'ok': id})
        models.Service.findOne({
                include: [{
                    model: models.Demande,
                    attributes:['id','titre'],
                    include: [{
                            model: models.User,
                            attributes: ['nomComplet', 'email']
                        },
                        {
                            model: models.Service,
                            attributes: ['id', 'libelle']
                        }
                    ],

                }],

                where: { id: id }
            }).then((service) => {
                if (service) {
                    if (service.avatar) {
                        let buff = new Buffer(service.avatar);
                        service.avatar = buff.toString('base64');
                    }
                    // let buff = new Buffer(service.avatar);
                    // service.avatar = buff.toString('base64');
                    res.status(200).json(service)
                } else {

                    res.status(404).json({ "erreur": "beugouma guiss lii" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    updateService: (req, res) => {
        const {
            libelle,
            nom_des_clients,
            type_de_service,
            description,
            description_elements_service,
            benefices_client,
            indicateur_mesure_qualite,
            engagement_niveaux_service,
            plage_horaire,
            livrables,
            suivi_gestion_relation_client,
            liste_des_applications_metiers_supporte,
            tarifs_et_Facturation,
            avatar
        } = req.body
        const ServiceId = parseInt(req.params.id)
        models.Service.findOne({
                attributes: ['id', 'libelle', 'description', 'nom_des_clients', 'type_de_service', 'description_elements_service', 'benefices_client',
                'indicateur_mesure_qualite', 'engagement_niveaux_service', 'plage_horaire', 'livrables', 'suivi_gestion_relation_client',
                'avatar', 'liste_des_applications_metiers_supporte', 'tarifs_et_Facturation', 'archive'],
                where: { id: ServiceId },
                }).then((serviceFound) => {
                    serviceFound.update({
                        libelle: libelle,
                        nom_des_clients:nom_des_clients ,
                        type_de_service: type_de_service ,
                        description: description,
                        description_elements_service: description_elements_service ,
                        benefices_client: benefices_client,
                        indicateur_mesure_qualite: indicateur_mesure_qualite ,
                        engagement_niveaux_service: engagement_niveaux_service,
                        plage_horaire: plage_horaire,
                        livrables: livrables,
                        suivi_gestion_relation_client: suivi_gestion_relation_client,
                        avatar: avatar ,
                        liste_des_applications_metiers_supporte: liste_des_applications_metiers_supporte,
                        tarifs_et_Facturation: tarifs_et_Facturation 
                    }).then((serviceResult) => {
                        if (serviceResult.avatar) {
                            let buff = new Buffer(serviceResult.avatar);
                            serviceResult.avatar = buff.toString('base64');
                        }
                        return res.status(200).json({
                            success: true,
                            message: "request update Service successfully",
                            results: serviceResult
                        })
                    }).catch((err) => {
                        return res.status(400).json({
                            success: false,
                            message: "unable to update this service",
                            results: err.message
                        })
                    })
                }).catch((err) => {
                    return res.status(500).json({
                        success: false,
                        message: "Server Error",
                        results: err
                    })
                })
    }
}