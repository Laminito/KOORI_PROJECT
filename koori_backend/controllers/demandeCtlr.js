const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

module.exports = {
    createDemande: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    const { UserId, ServiceId, titre, description, date_realisation } = req.body
                    models.Demande.create({
                        UserId: UserId,
                        ServiceId: ServiceId,
                        date_realisation: date_realisation,
                        titre: _.capitalize(titre),
                        description: description
                    }).then((demandResult) => {
                        //callback2(null,demandResult)
                        return res.status(200).json({ 'sucess': demandResult })

                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            return res.status(500).json(result)
        })
    },
    addParticipantsToSession: (req, res) => {
        let usersSession = req.body
        if (usersSession) {
            usersSession.forEach(user => {
                const { nomComplet, email, profession, service, departement, direction } = user
                models.User.create({
                        ProfilId: 2,
                        nomComplet: nomComplet,
                        email: email,
                        profession: profession,
                        service: service,
                        departement: departement,
                        direction: direction,
                    }).then((user) => {
                        models.Session.create({
                            UserId: user.id,
                            DemandeId: demandeResult.id,
                        })

                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur d\'ajout' + err })
                    })
            })
        }
    },
    getDemande: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        models.Demande.findAll({
                attributes: ['id', 'titre', 'description', 'date_realisation', 'statut'],
                include: [{
                    model: models.Service,
                    attributes: ['id', 'libelle']
                }],
            }).then((demandes) => {
                res.status(200).json(demandes)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getDemandeByService: (req, res) => {
        const id = parseInt(req.params.id);
        models.Demande.findAll({
                //attributes: ['id','titre','description','date_realisation','statut' ],
                include: [{
                        model: models.Service,
                        attributes: ['id', 'libelle']
                    },
                    {
                        model: models.User,
                        attributes: ['nomComplet', 'email']
                    }
                ],

                where: { ServiceId: id }
            }).then((demandes_service) => {
                if (demandes_service) {
                    res.status(200).json(demandes_service)
                } else {
                    res.status(500).json({ 'demandes': "ce service n'a pas de demandes" })
                }

            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    updateDemande: (req, res) => {
        const statut = req.body.statut;
        const id = req.params.id
        const text = req.body.text;
        models.Demande.findOne({
            include: [
                { model: models.User, attributes: ["id", "email"] },
                { model: models.Service, attributes: ["id", "libelle"] }
            ],
            where: { id: id }
        }).then(
            (demandeFound) => {
                //return res.json(demandeFound.id)
                demandeFound.update({
                    statut: (statut ? _.capitalize(statut) : demandeFound.statut),
                    text: text
                }).then(
                    (demandeResult) => {
                        //return res.status(200).json(demandeResult.statut)
                        if (demandeResult.statut === 'Validee') {
                            //return res.status(200).json(' validee')

                            models.Session.create({
                                    UserId: demandeResult.User.id,
                                    DemandeId: demandeResult.id,
                                })
                                //return res.status(200).json(' validee')
                            var mailOptions = {
                                from: process.env.GMAIL_USER,
                                to: demandeFound.User.email,
                                subject: "retour votre demande " + demandeFound.Service.libelle,
                                text: text //retour de la demande
                            }
                            smtpTransport.sendMail(mailOptions, function(error, response) {
                                if (error) {
                                    return res.json(error);
                                } else {
                                    return res.status(200).json(demandeResult);
                                }
                            });
                            //return res.status(200).json(' validee')

                        } else if (demandeResult.statut === 'Traitee') {
                            demandeResult.update({
                                    date_fin: new Date()
                                })
                                //return res.status(200).json('traitee validee')

                        } else {
                            // return res.status(200).json('non validee')
                            var mailOptions = {
                                from: process.env.GMAIL_USER,
                                to: demandeFound.User.email,
                                subject: "retour sur votre demande " + demandeFound.Service.libelle,
                                text: text //retour de la demande 
                            }
                            smtpTransport.sendMail(mailOptions, function(error, response) {
                                if (error) {
                                    return res.json(error);
                                } else {
                                    return res.status(200).json(demandeResult);
                                }
                            });
                        }
                    }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err.message });
        })
    },

    updateStatutDemande: (req, res) => {
        const statut = req.body.statut;
        const text = req.body.text
        const id = req.params.id
        models.Demande.findOne({
            include: [{
                    model: models.User
                },
                {
                    model: models.Service
                }
            ],
            where: { id: id }
        }).then(
            (demandeFound) => {
                demandeFound.update({
                    UserId: demandeFound.UserId,
                    ServiceId: demandeFound.ServiceId,
                    date_realisation: demandeFound.date_realisation,
                    titre: demandeFound.titre,
                    description: demandeFound.description,
                    statut: statut ? _.capitalize(statut) : demandeFound.statut
                }).then((demandeResult) => {
                    if (demandeResult.statut !== 'Traitee' || demandeResult.statut !== 'Nouvelle') {
                        if (demandeResult.statut === 'Validee') {
                            models.Session.create({
                                UserId: demandeResult.User.id,
                                DemandeId: demandeResult.id,
                            })
                            var mailOptions = {
                                    from: process.env.GMAIL_USER,
                                    to: demandeFound.User.email,
                                    subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
                                    text: text //retour de la demande
                                }
                                //return res.json(mailOptions);
                            smtpTransport.sendMail(mailOptions, function(error, response) {
                                if (error) {
                                    return res.json(error);
                                } else {
                                    return res.status(200).json(demandeResult);
                                }
                            });
                        } else {
                            if (demandeResult.statut === 'Traitee') {
                                demandeResult.update({
                                    date_fin: new Date()
                                })
                            } else {
                                var mailOptions = {
                                    from: process.env.GMAIL_USER,
                                    to: demandeResult.User.email,
                                    subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
                                    text: text
                                }
                                smtpTransport.sendMail(mailOptions, function(error, response) {
                                    if (error) {
                                        return res.json(error);
                                    } else {
                                        return res.status(200).json(demandeResult);
                                    }
                                });
                            }
                        }
                    } else {
                        return res.status(200).json(demandeResult);
                    }
                    //return res.json(demandeResult);
                }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }
        ).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err });
        })
    },
}