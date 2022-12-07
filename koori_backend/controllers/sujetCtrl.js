// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');
const { body } = require('express-validator');

module.exports = {

    getSujets: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Sujet.findAll({
                attributes: ['id', 'libelle', 'nbrlike'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((sujets) => {
                res.status(200).json(sujets)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },

    createSujet: (req, res) => {

        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    let UserId = req.body.UserId
                    let libelle = req.body.libelle
                    let nbrlike = req.body.nbrlike

                    models.Sujet.create({

                            libelle: libelle,
                            nbrlike: nbrlike,
                            UserId: UserId

                        }).then((sujetResult) => {
                            callback2(null, sujetResult)
                                //res.send(sujetResult);
                        })
                        .catch((err) => {

                            return res.status(500).json({ 'error': 'Erreur d ajout ' + err })
                        })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },

    updateSujet: (req, res) => {
        UserId = req.body.UserId
        const libelle = req.body.libelle
        const nbrlike = req.body.nbrlike
        const sujetId = parseInt(req.params.id)

        asyncLib.waterfall([
            (callback) => {
                models.Sujet.findOne({
                    attributes: ['id', 'UserId', 'libelle', 'nbrlike'],
                    where: { id: sujetId }
                }).then(
                    (sujetFound) => {
                        callback(null, sujetFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (sujetFound, callback) => {
                if (sujetFound) {
                    callback(null, sujetFound, validationResults.error(req, res))
                }
            },
            (sujetFound, validationResults, callback) => {
                if (!validationResults) {
                    sujetFound.update({
                        UserId: UserId,
                        libelle: libelle,
                        nbrlike: nbrlike
                    }).then((sujetResult) => {
                        callback(null, sujetResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },

    getSujetById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Sujet.findOne({
                attributes: ['id', 'libelle', 'nbrlike'],
                where: { id: id },
            }).then((sujet) => {
                if (sujet) {
                    res.status(200).json(sujet)
                } else {
                    res.status(404).json({ "erreur": "L'utilisateur n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    deleteSujet: (req, res) => {
        const sujetId = parseInt(req.params.id);
        models.Sujet.destroy({
                where: { id: sujetId }
            })
            .then((num) => {
                if (num === 1) {
                    return res.json({ 'Message': 'Suppression réussie' })
                } else {
                    return res.json({ 'Message': `Le profil dont l'id = ${userId} n'existe pas` })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Erreur de suppression: ${err}`
                });
            })
    }
}