// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');
module.exports = {

    getEtapes: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Etape.findAll({
                attributes: ['id', 'FicheId', 'titre', 'description'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((etapes) => {
                res.status(200).json(etapes)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },

    createEtape: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {

                    let FicheId = req.body.FicheId
                    let titre = _.capitalize(req.body.titre)
                    let description = req.body.description
                    models.Etape.create({
                        FicheId: FicheId,
                        titre: titre,
                        description: description
                    }).then((etapeResult) => {
                        callback2(null, etapeResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },

    updateEtape: (req, res) => {

        const FicheId = req.body.FicheId
        const titre = req.body.libelle
        const description = req.body.description
        const etapeId = parseInt(req.params.id)

        asyncLib.waterfall([
            (callback) => {
                models.Etape.findOne({
                    attributes: ['id', 'FicheId', 'titre', 'description'],
                    where: { id: etapeId }
                }).then(
                    (etapeFound) => {
                        callback(null, etapeFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (etapeFound, callback) => {
                if (etapeFound) {
                    callback(null, etapeFound, validationResults.error(req, res))
                }
            },
            (etapeFound, validationResults, callback) => {
                if (!validationResults) {
                    etapeFound.update({
                        FicheId: FicheId,
                        titre: (titre ? _.capitalize(titre) : etapeFound.titre),
                        description: description
                    }).then((profilResult) => {
                        callback(null, profilResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
}