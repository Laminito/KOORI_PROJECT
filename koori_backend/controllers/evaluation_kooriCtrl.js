// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    createEvaluation_koori: (req, res) => {
        const idUser = parseInt(req.params.id);
        const idKoori = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    const { UserId, KooriId, evaluation } = req.body
                    models.EvaluationKoori.create({
                        UserId: idUser,
                        KooriId: idKoori,
                        evaluation
                    }).then((evaluation_kooriResult) => {
                        callback2(null, evaluation_kooriResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },
    updateEvaluation_koori: (req, res) => {
        const { statut } = req.body
        const idUser = parseInt(req.params.id);
        const idKoori = parseInt(req.params.id1);
        // return res.json(FicheId)
        asyncLib.waterfall([
            (callback) => {
                models.EvaluationKoori.findOne({
                    attributes: ['id', 'evaluation', 'UserId', 'KooriId'],
                    where: {
                        [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }] },
                }).then(
                    (evaluation_kooriFound) => {
                        callback(null, evaluation_kooriFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (evaluation_kooriFound, callback) => {
                if (evaluation_kooriFound) {
                    callback(null, evaluation_kooriFound, validationResults.error(req, res))
                }
            },
            (evaluation_kooriFound, validationResults, callback) => {
                if (!validationResults) {
                    evaluation_kooriFound.update({
                        statut: (statut ? statut : evaluation_kooriFound.statut),
                    }).then((ficheResult) => {
                        callback(null, ficheResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de mettre a jour ': err.message });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },
    getEvaluation_kooriByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idKoori = parseInt(req.params.id1);
        models.EvaluationKoori.findOne({
                attributes: ['id', 'UserId', 'KooriId', 'evaluation'],
                include: [{
                        model: models.Koori,
                        attributes: ['id', 'description']
                    },
                    {
                        model: models.User,
                        attributes: ['id', 'nomComplet', 'email']
                    }
                ],
                where: {
                    [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }] },
            }).then((userEvaluation_koori) => {
                if (userEvaluation_koori) {
                    res.status(200).json(userEvaluation_koori)
                } else {
                    return null
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
            })
    },
    getEvaluation_koori: (req, res) => {
        const version = parseInt(req.params.id);
        models.Koori.findOne({
                where: { version: version },
            }).then((koori) => {
                models.EvaluationKoori.findAll({
                        include: [{
                            model: models.User,
                            attributes: ['id', 'nomComplet']
                        }],
                        where: { KooriId: koori.id },
                    }).then((Evaluation_koori) => {
                        if (Evaluation_koori) {
                            return res.status(200).json(Evaluation_koori)
                        } else {
                            return null
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
                    })
                    //return res.status(200).json(Evaluation_koori)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur ' + err.message })
            })
    }
}