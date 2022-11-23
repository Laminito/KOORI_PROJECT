const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
const dotenv = require('dotenv').config()
const asyncLib = require('async');
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { session } = require("../validationsCheck/validationFilesRequire");
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

module.exports = {

    createRapport: (req, res) => {
        const { titre, description, statut, ServiceId, idDemande, participants } = req.body
        asyncLib.waterfall([
            (callback) => {
                callback(null, validationResults.error(req, res));
            },
            (errorResults, callback) => {
                if (!errorResults) {

                    models.Rapport.create({
                        titre: _.capitalize(titre),
                        description: _.trim(description),
                        statut: _.trim(statut),
                        file: req.file.buffer,
                        ServiceId: ServiceId,
                    }).then((rapport) => {
                        if (participants) {
                            let participantsObj = []
                            participants.forEach(p => {
                                participantsObj.push(JSON.parse(p))
                            })
                            participantsObj.forEach(user => {
                                var mailOptions = {
                                    from: process.env.GMAIL_USER,
                                    to: user.email,
                                    subject: "NEW RAPPORT",
                                    text: "le rapport est disponible pour etre consulter"
                                }
                                smtpTransport.sendMail(mailOptions, function(error, response) {
                                    if (response) {
                                        models.Session.findOne({
                                            where: {
                                                [Op.and]: [{ DemandeId: idDemande }, { UserId: user.id }]
                                            }
                                        }).then((sessionUser) => {
                                            sessionUser.update({
                                                isNotified: true
                                            }).then(() => {
                                                callback(null, rapport)
                                            }).catch((error) => {
                                                return res.status(500).json({ "erreur de modification": error });
                                            })
                                        }).catch((error) => {
                                            return res.status(500).json({ "erreur de recuperation de la session du User": error });
                                        })
                                    } else {
                                        return res.json(error);
                                    }
                                });
                            })
                        } else {
                            callback(null, rapport)
                        }
                    }).catch((error) => {
                        return res.status(500).json({ "erreur d'ajout": error });
                    })
                }
            },
            (rapport, callback) => {
                models.Demande.findOne({
                    where: { id: idDemande }
                }).then((demande) => {
                    demande.update({
                        RapportId: rapport.id
                    })
                    callback(null, rapport)
                }).catch((error) => {
                    return res.status(500).json({ "erreur de recuperation": error });
                })
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },

    getAllRapport: (req, res) => {
        headerAuth = req.headers['filter'];
        headerAuth === "*" ? attribute = ['id', 'description', 'moyenne', 'titre', 'statut', 'file'] : attribute = [headerAuth]
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        models.Rapport.findAll({
                attributes: attribute,
                limit: (limit && !isNaN(limit)) ? limit : null,
                offset: (offset && !isNaN(offset)) ? offset : null,
                where: { statut: 'visible' },
                order: [
                    ['moyenne', 'DESC']
                ],
                include: [{
                    model: models.Service,
                    attributes: ['libelle'],
                }, ],
            }).then((rapports) => {
                rapports.forEach(r => {
                    if (r.file) {
                        let buff = new Buffer(r.file);
                        r.file = buff.toString('base64');
                    }
                })
                res.status(200).json(rapports)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreure de récupération ' + err.message })
            })
    },

    getRapportsByUser: (req, res) => {
        const idUser = parseInt(req.params.id);
        const rapportByIdTab = []
        asyncLib.waterfall([
            (callback) => {
                models.Session.findAll({
                        attributes: ['id', 'UserId', 'DemandeId'],
                        where: { UserId: idUser }
                    }).then((session) => {
                        callback(null, session)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
                    })
            },
            (sessions, callback) => {
                models.Demande.findAll({
                        attributes: ['id'],
                        include: [{
                            model: models.Rapport,
                            attributes: ['id', 'titre', 'description', 'moyenne'],
                            include: [{
                                model: models.Service,
                                attributes: ['libelle'],
                            }, ],
                        }, ],
                        where: {
                            RapportId: {
                                [Op.ne]: null
                            }
                        }
                    }).then((demandes) => {
                        demandes.forEach(d => {
                            sessions.forEach(s => {
                                if (d.id === s.DemandeId) {
                                    rapportByIdTab.push(d.Rapport);
                                }
                            })
                        })

                        callback(null, rapportByIdTab)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de  ' + err.message })
                    })
            }
        ], (err, rapportByIdTab) => {
            return res.json(rapportByIdTab)
        })
    },

    updateRapport: (req, res) => {
        const { titre, description, statut, idDemande, participants } = req.body;
        const rapportId = req.params.id
        asyncLib.waterfall([
            (callback) => {
                models.Rapport.findOne({
                    where: { id: rapportId }
                }).then(
                    (rapportFound) => {
                        callback(null, rapportFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur': err.message });
                });
            },
            (rapportFound, callback) => {
                if (rapportFound) {
                    callback(null, rapportFound, validationResults.error(req, res))
                }
            },
            (rapportFound, validationResults, callback) => {
                if (!validationResults) {
                    rapportFound.update({
                        titre: (titre ? _.capitalize(titre) : rapportFound.titre),
                        description: (description ? description : rapportFound.description),
                        statut: (statut ? statut : rapportFound.statut),
                        ServiceId: rapportFound.ServiceId,
                        moyenne: rapportFound.moyenne,
                        file: (req.file ? req.file.buffer : rapportFound.file)
                    }).then((rapportResult) => {

                        if (participants) {
                            let participantsObj = []
                            participants.forEach(p => {
                                participantsObj.push(JSON.parse(p))
                            })
                            participantsObj.forEach(user => {
                                var mailOptions = {
                                    from: process.env.GMAIL_USER,
                                    to: user.email,
                                    subject: "NEW RAPPORT",
                                    text: "le rapport est disponible pour etre consulter"
                                }
                                smtpTransport.sendMail(mailOptions, function(error, response) {
                                    if (response) {
                                        models.Session.findOne({
                                            where: {
                                                [Op.and]: [{ DemandeId: idDemande }, { UserId: user.id }]
                                            }
                                        }).then((sessionUser) => {
                                            sessionUser.update({
                                                isNotified: true
                                            }).then(() => {
                                                callback(null, rapportResult)
                                            }).catch((error) => {
                                                return res.status(500).json({ "erreur de modification": error });
                                            })
                                        }).catch((error) => {
                                            return res.status(500).json({ "erreur de recuperation de la session du User": error });
                                        })
                                    } else {
                                        return res.json(error);
                                    }
                                });
                            })
                        } else {
                            callback(null, rapportResult)
                        }
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de mettre a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
    getRapportById: (req, res) => {
        const rapportId = parseInt(req.params.id);
        asyncLib.waterfall([
            (callback) => {
                models.Demande.findOne({
                    attributes: ['id'],

                    where: { RapportId: rapportId }

                }).then(
                    (demandeFound) => {
                        callback(null, demandeFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err.message });
                });
            },
            (demandeFound, callback) => {
                if (demandeFound) {
                    models.Session.findAll({
                        attributes: ['DemandeId', 'UserId'],
                        include: [{
                            model: models.User,
                            attributes: ['id', 'nomComplet', 'email', 'avatar'],
                            include: [{
                                model: models.Rapport,
                                attributes: ['id', 'titre'],
                                as: 'UserEvaluation',
                                through: {
                                    attributes: ['note', 'evaluation'],
                                    where: { RapportId: rapportId }
                                }
                            }]
                        }, ],
                        where: { DemandeId: demandeFound.id }

                    }).then(sessionFound => {

                        sessionFound.forEach(r => {
                            if (r.User.avatar != null) {
                                let buff = new Buffer(r.User.avatar);
                                r.User.avatar = buff.toString('base64');
                            }
                        })

                        callback(null, sessionFound)
                    }).catch(err => {
                        return res.status(500).json({ 'erreur serveur ': err.message });
                    })
                } else {
                    return res.status(400).json({ 'Erreur': 'La demande n\'existe pas' });
                }
            },
        ], (err, result) => {
            return res.status(201).json(result);
        })

    }
}