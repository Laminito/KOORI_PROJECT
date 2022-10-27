// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    createTemoignage: (req, res) => {
        //return res.json(req.body);
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    let nom = _.startCase(_.toLower(req.body.nomComplet)).split(' ')
                    let nomComplet = nom[0] + ' ' + _.upperCase(nom[_.size(nom) - 1])
                    let message = _.capitalize(req.body.message)
                    models.Temoignage.create({
                        nomComplet,
                        message: message,
                        avatar: req.file.buffer
                    }).then((temoignageResult) => {
                        callback2(null, temoignageResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },
    getTemoignages: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Temoignage.findAll({
                attributes: ['id', 'nomComplet', 'message', 'avatar'],
                limit: (limit && !isNaN(limit)) ? limit : null,
                offset: (offset && !isNaN(offset)) ? offset : null,
            }).then((temoignages) => {
                temoignages.forEach(t => {
                    if (t.avatar) {
                        let buff = new Buffer(t.avatar);
                        t.avatar = buff.toString('base64');
                    }
                })
                res.status(200).json(temoignages)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getTemoignageById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Temoignage.findOne({
                attributes: ['id', 'nomComplet', 'message', 'avatar'],
                where: { id: id },
            }).then((temoignage) => {
                if (temoignage) {
                    temoignage.forEach(t => {
                        if (t.avatar) {
                            let buff = new Buffer(t.avatar);
                            t.avatar = buff.toString('base64');
                        }
                    })
                    res.status(200).json(temoignage)
                } else {
                    res.status(404).json({ "erreur": "Le temoignage n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    updateTemoignage: (req, res) => {
        const temoignageId = parseInt(req.params.id)
        const { message } = req.body
        asyncLib.waterfall([
            (callback) => {
                models.Temoignage.findOne({
                    attributes: ['id', 'nomComplet', 'message', 'avatar'],
                    where: { id: temoignageId }
                }).then(
                    (temoignageFound) => {
                        callback(null, temoignageFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err.message });
                });
            },
            (temoignageFound, callback) => {
                if (temoignageFound) {
                    callback(null, temoignageFound, validationResults.error(req, res))
                }
            },
            (temoignageFound, validationResults, callback) => {
                if (!validationResults) {
                    temoignageFound.update({
                        nomComplet: (this.nomComplet ? this.nomComplet : temoignageFound.nomComplet),
                        message: (message ? _.capitalize(message) : temoignageFound.message),
                        avatar: this.avatar ? req.file.buffer : temoignageFound.avatar
                    }).then((temoignageResult) => {
                        callback(null, temoignageResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
    deleteTemoignage: (req, res) => {
        const temoignageId = parseInt(req.params.id);
        models.Temoignage.destroy({
                where: { id: temoignageId }
            })
            .then((num) => {
                if (num === 1) {
                    return res.json({ 'Message': 'Suppression réussie' })
                } else {
                    return res.json({ 'Message': `Le temoignage dont l'id = ${temoignageId} n'existe pas` })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Erreur de suppression: ${err}`
                });
            })
    }
}