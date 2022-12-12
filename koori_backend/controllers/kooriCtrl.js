// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer');
const { koori } = require("../validationsCheck/validationFilesRequire");
const { result } = require('lodash');
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

module.exports = {
    create_Koori: (req, res) => {
        const { description, quoi, quand, comment, version } = req.body
        models.Koori.create({
            description: description,
            quoi: quoi,
            quand: quand,
            comment: comment,
            version: version,
        }).then((kooris) => {
            console.log("koori : ", kooris);
            return res.status(200).json(kooris)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
        })
    },
    getAllkoori: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Koori.findAll({
            attributes: [
                'id',
                'description',
                'version'
            ],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
        }).then((AllKooris => {
            console.log(AllKooris);
            return res.status(200).json(AllKooris)

        })).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération' + err })
        })
    },
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
    getKoori: (req, res) => {
        models.Koori.findOne({
                order: [
                    ['id', 'DESC']
                ],
            }).then((koori) => {
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
                console.log(versions);
                res.status(200).json(versions)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    createKoori: (req, res) => {
        //return res.json(req.body)
        const { description, quoi, quand, comment, version } = req.body
        models.Koori.create({
            description: description,
            quoi: quoi,
            quand: quand,
            comment: comment,
            version: version
        }).then((ficheResult) => {
            console.log(ficheResult)
            return res.status(200).json(ficheResult)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
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