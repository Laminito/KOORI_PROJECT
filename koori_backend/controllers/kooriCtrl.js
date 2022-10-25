// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer');
const { koori } = require("../validationsCheck/validationFilesRequire");
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
module.exports = {
    getLastKoori: (req, res) => {
        let headerAuth = req.headers['filter'];
        headerAuth === "*" ? attribute = ['id', 'description', 'quoi', 'comment', 'quand'] : attribute = [headerAuth]

        models.Koori.findOne({
                order: [
                    ['id', 'DESC']
                ],
                attributes: attribute,
                include: [{
                    model: models.Phase
                }],
            }).then((koori) => {
                koori.Phases.forEach(p => {
                    if (p.avatar) {
                        let buff = new Buffer(p.avatar);
                        p.avatar = buff.toString('base64');
                    }
                })
                res.status(200).json(koori)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getKooriByVersion: (req, res) => {
        const versionId = req.params.id
        models.Koori.findOne({
                order: [
                    ['id', 'DESC']
                ],
                where: { version: versionId },
                include: [{
                    model: models.Phase
                }],
            }).then((koori) => {
                res.status(200).json(koori)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getVersions: (req, res) => {
        models.Koori.findAll({
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['version'],
            }).then((versions) => {
                res.status(200).json(versions)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    createKoori: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    let version = 1;
                    //return res.json(req.body)
                    const { description, quoi, quand, comment } = req.body
                    models.Koori.create({
                        description,
                        quoi,
                        quand,
                        comment,
                        version
                    }).then((ficheResult) => {
                        callback2(null, ficheResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },
    updateKoori: (req, res) => {
        const { description, quoi, quand, comment } = req.body
        const KooriId = parseInt(req.params.id)
        asyncLib.waterfall([
            (callback) => {
                models.Koori.findOne({
                    attributes: ['id', 'description', 'quoi', 'quand', 'comment', 'version'],
                    include: [{
                        model: models.Phase
                    }],
                    where: { id: KooriId },
                }).then(
                    (kooriFound) => {
                        callback(null, kooriFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (kooriFound, callback) => {
                if (kooriFound) {
                    callback(null, kooriFound, validationResults.error(req, res))
                }
            },
            (kooriFound, validationResults, callback) => {
                if (!validationResults) {
                    //return res.status(200).json(kooriFound)
                    models.Koori.findOne({
                            order: [
                                ['id', 'DESC']
                            ],
                            include: [{
                                model: models.Phase
                            }],
                        }).then((koori) => {
                            let obj = koori
                            models.Koori.create({
                                description: (description ? description : kooriFound.description),
                                quoi: (quoi ? quoi : kooriFound.quoi),
                                quand: (quand ? quand : kooriFound.quand),
                                comment: (comment ? comment : kooriFound.comment),
                                version: obj.version + 1
                            }).then((KooriResult) => {
                                //return res.json(ficheResult)
                                for (let p of kooriFound.Phases) {
                                    //updatePhaseKoori(p.id, ficheResult.id)
                                    models.Phase.findOne({
                                            where: { id: p.id }
                                        }).then((phase) => {
                                            phase.update({
                                                KooriId: KooriResult.id
                                            })
                                        })
                                        .catch((err) => {
                                            return res.status(500).json({ 'Phase introuvable ': err.message });
                                        })
                                }
                                callback(null, KooriResult)
                            }).catch((err) => {
                                return res.status(500).json({ 'impossible de mettre a jour ': err.message });
                            })
                        })
                        .catch((err) => {
                            return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
                        })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },
    postMail: (req, res) => {
        const { to, text } = req.body;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: 'Feedback sur le livret Koori',
            text: text
        };
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                return res.json(error);
            } else {
                return res.json(response.sent.envelope);
            }
        });
    },
    postMailIbox: (req, res) => {
        const { to, text } = req.body;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: "Feedback sur l'outil Ibox",
            text: text
        };
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                return res.json(error);
            } else {
                return res.json(response.sent.envelope);
            }
        });
    },
    postMailFiche: (req, res) => {
        const { to, text } = req.body;
        const FicheId = parseInt(req.params.id)
        models.Fiche.findOne({
                attributes: ['id', 'titre'],
                where: { id: FicheId },
            }).then((fiche) => {
                const mailOptions = {
                    from: process.env.GMAIL_USER,
                    to: to,
                    subject: 'Feedback sur la fiche ' + fiche.titre + ' de notre livret ',
                    text: text
                };
                smtpTransport.sendMail(mailOptions, function(error, response) {
                    if (error) {
                        return res.status(500).json(error);
                    } else {
                        return res.status(200).json(response.sent.envelope);
                    }
                });
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    }
}