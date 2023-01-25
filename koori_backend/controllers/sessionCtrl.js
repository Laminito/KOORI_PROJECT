// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');

module.exports = {
    getSessions: (req, res) => {
        models.Session.findAll({
                attributes: ['id', 'evaluation', 'note','etat'],
            }).then((sessions) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Sessions successfully",
                    results: sessions
                    })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Sessions request",
                    results: err
            })
            })
    },

    // avoir le nombre de participant sur une session et le nombre de personne  qui ont noté le rapport concerné

    getParticipant: (req, res) => {
        const tab = [];
        const idRapport = req.params.id;
        asyncLib.waterfall([
            (callback) => {
                models.Demande.findOne({
                        attributes: ['id', 'RapportId'],

                        where: { RapportId: idRapport }
                    }).then((demande) => {
                        callback(null, demande)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                    })
            },
            (demande, callback) => {
                if (demande) {
                    models.Session.count({
                            where: { DemandeId: demande.id }
                        }).then((participants) => {
                            tab.push({ "participants": participants })
                            callback(null, demande)
                        })
                        .catch((err) => {
                            return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                        })
                }
            },
            (demande, callback) => {
                models.Evaluation_note.count({
                        where: { RapportId: demande.RapportId }
                    }).then((rated_Participants) => {
                        tab.push({ "rated_Participants": rated_Participants })
                        callback(null, tab)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                    })
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },


    getSessionById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Demande.findOne({
                attributes: ['id', 'titre'],
                include: [{
                    model: models.User,
                    as: 'DemandeUser',
                    attributes: ['id', 'nomComplet', 'email', 'avatar'],
                    through: {
                        attributes: ['DemandeId', 'note', 'evaluation'],
                    }
                }],
                where: { id: id },
            }).then((demande) => {
                if (demande) {
                    demande.DemandeUser.forEach(d => {
                        if (d.avatar) {
                            let buff = new Buffer(d.avatar);
                            d.avatar = buff.toString('base64');
                        }
                    })
                    return res.status(200).json(demande)
                } else {
                    return res.status(404).json({ "erreur": "La session n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    getSessionsByIdService: (req, res) => {
        let tabSession = [];
        const id = parseInt(req.params.id);
        asyncLib.waterfall([
            (callback) => {
                models.Demande.findAll({
                        attributes: ['id', 'titre', 'description', 'ServiceId', 'RapportId', 'date_fin'],
                        include: [{
                            model: models.User,
                            as: 'DemandeUser',
                            attributes: ['id', 'nomComplet', 'email'],
                            through: {
                                attributes: ['DemandeId', 'note', 'isNotified'],
                            }
                        }],
                        where: { ServiceId: id },
                        order: [
                            ['id', 'ASC'],
                        ]
                    }).then((demande) => {
                        callback(null, demande)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                    })
            },
            (demande, callback) => {
                if (demande) {
                    demande.forEach(d => {
                        if (d.DemandeUser.length) {
                            tabSession.push(d)
                        }
                    })
                    callback(null, tabSession)
                } else {
                    return res.status(500).json({ 'error': 'Pas de demande faites sur ce service' + err })
                }
            }

        ], (err, result) => {
            return res.json(result);
        })
    },

    getSessionByIdRapport: (req, res) => {
        let tabSession = [];
        const idRapport = parseInt(req.params.id);
        asyncLib.waterfall([
            (callback) => {
                models.Demande.findOne({
                        attributes: ['id', 'titre', 'description', 'ServiceId', 'RapportId'],
                        include: [{
                            model: models.User,
                            as: 'DemandeUser',
                            attributes: ['id', 'nomComplet', 'email'],
                            through: {
                                attributes: ['DemandeId', 'isNotified'],
                            }
                        }],
                        where: { RapportId: idRapport },
                    }).then((demande) => {
                        callback(null, demande)
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                    })
            },

        ], (err, result) => {
            return res.json(result);
        })
    },


    evaluationSession: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    let DemandeId = req.body.DemandeId
                    let UserId = req.body.UserId
                    let evaluation = _.capitalize(req.body.evaluation)
                    let note = req.body.note
                    models.Session.create({
                        DemandeId: DemandeId,
                        UserId: UserId,
                        evaluation: evaluation,
                        note: note
                    }).then((sessionResult) => {
                        callback2(null, sessionResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            return res.json(result);
        })
    },
    getSessionsUser: (req, res) => {
        const id = parseInt(req.params.id);
        models.Session.findAll({
                //attributes: ['id','titre','description','date_realisation','statut' ],
                include: [{
                        model: models.Demande,
                        //attributes:['id','libelle']
                    },
                    {
                        model: models.User,
                        attributes: ['id']
                    }
                ],

                where: { UserId: id }
            }).then((SessionUser) => {
                if (SessionUser) {
                    res.status(200).json(SessionUser)
                } else {
                    res.status(500).json({ 'session': "vous n'avez participé a aucune session" })
                }

            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
}