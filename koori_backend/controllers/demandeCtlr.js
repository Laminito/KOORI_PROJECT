const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer");
const send_mail = require('../middleware/sendMail');

module.exports = {
    createDemande: (req, res) => {
        const {titre, description, date_debut_souhaitee, disponibilite } = req.body
        const UserId = parseInt(req.params.id);
        const ServiceId = parseInt(req.params.id1);
        models.Demande.create({
            UserId: UserId,
            ServiceId: ServiceId,
            date_debut_souhaitee: date_debut_souhaitee,
            disponibilite: disponibilite,
            titre: _.capitalize(titre),
            description: description
        }).then((demandes) => {
            send_mail.sendEmail('abmangane14@gmail.com', "message de test")
            return res.status(201).json({
                success: true,
                message: "request create Demande successfully",
                results: demandes
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create Demande request",
                results: err
        })
    })
    },

    getDemande: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        models.Demande.findAll({
                attributes: ['id', 'titre', 'description', 'date_debut_souhaitee', 'disponibilite', 'statut','etat'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                        model: models.Service,
                        attributes: ['id', 'libelle']
                    },
                    {
                        model: models.User,
                        attributes: ['id','nomComplet','email']
                    }],
            }).then((demandes) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Demandes successfully",
                    results: demandes
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Demandes request",
                    results: err
                })
            })
    },
    getDemandeById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Demande.findOne({
            attributes: ['id', 'titre', 'description', 'date_debut_souhaitee', 'disponibilite', 'statut','etat'],
            where: { id: id },
            include: [
                {
                    model: models.User,
                    attributes:['id']
                },
                {
                    model: models.Service,
                    attributes:['id']
                }
            ],
            }).then((demandes) => {
                return res.status(200).json({
                    success: true,
                    message: "request get DemandeById successfully",
                    results: demandes
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get DemandeById request",
                    results: err
                })
            })
    },
    // getDemandeByService: (req, res) => {
    //     const ServiceId = parseInt(req.params.id);
    //     models.Demande.findOne({
    //         attributes:['id','titre'],
    //         where: { id: ServiceId },
    //             include: [{
    //                 model: models.Service,
    //                 attributes:['id','libelle'],
    //                 include: [{
    //                     model: models.User,
    //                     attributes: ['id','nomComplet','email']
    //                 }],
    //             }]
    //         }).then((service) => {
    //             if (service) {
    //                 if (service.avatar) {
    //                     let buff = new Buffer(service.avatar);
    //                     service.avatar = buff.toString('base64');
    //                     return res.status(200).json({
    //                         success: true,
    //                         message: "request getServiceByDemande successfully",
    //                         results: service
    //                     })
    //                 }
    //             } else {
    //                 return res.status(404).json({
    //                     success: false,
    //                     message: "failed this ressource does not existe!",
    //                     results: err
    //             })
    //             }
    //         }).catch((err) => {
    //             return res.status(500).json({
    //                 success: false,
    //                 message: "failed getServiceByDemande request",
    //                 results: err
    //         })
    //         })
    // },
    updateDemande: (req, res) => {
        const id = req.params.id
        const {titre,statut,description,date_debut_souhaitee,disponibilite,text}=req.body
        models.Demande.findOne({
            include: [
                { model: models.User, attributes: ["id", "email"] },
                { model: models.Service, attributes: ["id", "libelle"] }
            ],
            where: { id: id }
        }).then(
            (demandeFound) => {
                demandeFound.update({
                    statut: (statut ? _.capitalize(statut) : demandeFound.statut),
                    text: text,
                    titre: titre,
                    description: description,
                    date_debut_souhaitee: date_debut_souhaitee,
                    disponibilite: disponibilite
                }).then(
                    (demandeResult) => {
                        if (demandeResult.statut === 'Validee') {
                            return res.status(200).json(' validee')

                        } else if (demandeResult.statut === 'Traitee') {
                            demandeResult.update({
                                date_debut_souhaitee: new Date()

                            })
                            return res.status(200).json('traitee validee')

                        } else {
                            return res.status(200).json('non validee')
                        }
                    }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err.message });
        })
    },

    // updateStatutDemande: (req, res) => {
    //     const statut = req.body.statut;
    //     const text = req.body.text
    //     const id = req.params.id
    //     models.Demande.findOne({
    //         include: [{
    //                 model: models.User
    //             },
    //             {
    //                 model: models.Service
    //             }
    //         ],
    //         where: { id: id }
    //     }).then(
    //         (demandeFound) => {
    //             demandeFound.update({
    //                 UserId: demandeFound.UserId,
    //                 ServiceId: demandeFound.ServiceId,
    //                 date_realisation: demandeFound.date_debut_souhaitee,
    //                 disponibilite: disponiblite,
    //                 titre: demandeFound.titre,
    //                 description: demandeFound.description,
    //                 statut: statut ? _.capitalize(statut) : demandeFound.statut
    //             }).then((demandeResult) => {
    //                 if (demandeResult.statut !== 'Traitee' || demandeResult.statut !== 'Nouvelle') {
    //                     if (demandeResult.statut === 'Validee') {
    //                         models.Session.create({
    //                             UserId: demandeResult.User.id,
    //                             DemandeId: demandeResult.id,
    //                         })
    //                         var mailOptions = {
    //                                 from: process.env.GMAIL_USER,
    //                                 to: demandeFound.User.email,
    //                                 subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
    //                                 text: text //retour de la demande
    //                             }
    //                             //return res.json(mailOptions);
    //                         smtpTransport.sendMail(mailOptions, function(error, response) {
    //                             if (error) {
    //                                 return res.json(error);
    //                             } else {
    //                                 return res.status(200).json(demandeResult);
    //                             }
    //                         });
    //                     } else {
    //                         if (demandeResult.statut === 'Traitee') {
    //                             demandeResult.update({
    //                                 date_fin: new Date()
    //                             })
    //                         } else {
    //                             var mailOptions = {
    //                                 from: process.env.GMAIL_USER,
    //                                 to: demandeResult.User.email,
    //                                 subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
    //                                 text: text
    //                             }
    //                             smtpTransport.sendMail(mailOptions, function(error, response) {
    //                                 if (error) {
    //                                     return res.json(error);
    //                                 } else {
    //                                     return res.status(200).json(demandeResult);
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 } else {
    //                     return res.status(200).json(demandeResult);
    //                 }
    //                 //return res.json(demandeResult);
    //             }).catch((err) => {
    //                 res.status(500).json({ 'impossible de mettre a jour ': err });
    //             })
    //         }
    //     ).catch((err) => {
    //         return res.status(500).json({ 'erreur serveur ': err });
    //     })
    // },
}