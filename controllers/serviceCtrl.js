// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    getAllService: (req, res) => {
        let headerAuth = req.headers['filter'];
        headerAuth === "*" ? attribute = ['id', 'libelle', 'description', 'nom_des_clients', 'type_de_service', 'description_elements_service', 'benefices_client',
            'indicateur_mesure_qualite', 'engagement_niveaux_service', 'plage_horaire', 'livrables', 'suivi_gestion_relation_client',
            'avatar', 'liste_des_applications_metiers_supporte', 'tarifs_et_Facturation', 'archive'
        ] : attribute = [headerAuth]

        models.Service.findAll({

                where: { archive: false },
                include: [{
                    model: models.Demande
                }]
            }).then((services) => {
                services.forEach(s => {
                    if (s.avatar) {
                        let buff = new Buffer(s.avatar);
                        s.avatar = buff.toString('base64');
                    }
                })
                res.status(200).json(services)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
            })

    },
    getServiceBylibelle: (req, res) => {
        const libelle = req.params.libelle
            //return res.json({"ok":libelle})
        models.Service.findOne({

                where: { libelle: libelle }
            }).then((service) => {
                if (service) {
                    res.status(200).json(service)
                } else {

                    res.status(404).json({ "erreur": "Ce service n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getServiceById: (req, res) => {
        const id = parseInt(req.params.id);
        //return res.json({'ok': id})
        models.Service.findOne({
                include: [{
                    model: models.Demande,
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
    createService: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    //return res.json(req.body)
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
                    }).then((serviceResult) => {
                        callback2(null, serviceResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
                    })
                }
            },
        ], (err, result) => {
            return res.json(result);
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
            tarifs_et_Facturation
        } = req.body
        const ServiceId = parseInt(req.params.id)
            // return res.json(ServiceId)
        asyncLib.waterfall([
            (callback) => {
                models.Service.findOne({
                    attributes: ['id', 'libelle', 'description', 'nom_des_clients', 'type_de_service', 'description_elements_service', 'benefices_client',
                        'indicateur_mesure_qualite', 'engagement_niveaux_service', 'plage_horaire', 'livrables', 'suivi_gestion_relation_client',
                        'avatar', 'liste_des_applications_metiers_supporte', 'tarifs_et_Facturation', 'archive'
                    ],
                    where: { id: ServiceId },
                }).then(
                    (serviceFound) => {
                        callback(null, serviceFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (serviceFound, callback) => {
                if (serviceFound) {
                    callback(null, serviceFound, validationResults.error(req, res))
                }
            },
            (serviceFound, validationResults, callback) => {
                if (!validationResults) {
                    //return res.json(serviceFound)
                    serviceFound.update({
                        libelle: (libelle ? libelle : serviceFound.libelle),
                        nom_des_clients: (nom_des_clients ? nom_des_clients : serviceFound.nom_des_clients),
                        type_de_service: (type_de_service ? type_de_service : serviceFound.type_de_service),
                        description: (description ? description : serviceFound.description),
                        description_elements_service: (description_elements_service ? description_elements_service : serviceFound.description_elements_service),
                        benefices_client: (benefices_client ? benefices_client : serviceFound.benefices_client),
                        indicateur_mesure_qualite: (indicateur_mesure_qualite ? indicateur_mesure_qualite : serviceFound.indicateur_mesure_qualite),
                        engagement_niveaux_service: (engagement_niveaux_service ? engagement_niveaux_service : serviceFound.engagement_niveaux_service),
                        plage_horaire: (plage_horaire ? plage_horaire : serviceFound.plage_horaire),
                        livrables: (livrables ? livrables : serviceFound.livrables),
                        suivi_gestion_relation_client: (suivi_gestion_relation_client ? suivi_gestion_relation_client : serviceFound.suivi_gestion_relation_client),
                        avatar: (this.avatar ? req.file.buffer : serviceFound.avatar),
                        liste_des_applications_metiers_supporte: (liste_des_applications_metiers_supporte ? liste_des_applications_metiers_supporte : serviceFound.liste_des_applications_metiers_supporte),
                        tarifs_et_Facturation: (tarifs_et_Facturation ? tarifs_et_Facturation : serviceFound.tarifs_et_Facturation),

                    }).then((serviceResult) => {
                        //callback(null,serviceResult)
                        return res.status(200).json('update sucess')

                    }).catch((err) => {
                        return res.status(500).json({ 'impossible de mettre a jour ': err.message });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    }
}