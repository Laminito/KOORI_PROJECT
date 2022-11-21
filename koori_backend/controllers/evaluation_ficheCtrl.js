// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    createEvaluation_fiche: (req, res) => {
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    const { UserId, FicheId, evaluation, note } = req.body
                    models.EvaluationFiche.create({
                        UserId: idUser,
                        FicheId: idFiche,
                        evaluation:evaluation,
                        note:note
                    }).then((evaluation_kooriResult) => {
                        callback2(null, evaluation_kooriResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout: ' + err.message })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },
    updateEvaluation_fiche: (req, res) => {
        const { statut } = req.body
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        // return res.json(FicheId)
        asyncLib.waterfall([
            (callback) => {
                models.EvaluationFiche.findOne({
                    attributes: ['id', 'evaluation', 'UserId', 'FicheId','note'],
                    where: {
                        [Op.and]: [{ UserId: idUser }, { FicheId: idFiche }] },
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
    getEvaluation_ficheByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        models.EvaluationFiche.findOne({
                attributes: ['id', 'UserId', 'FicheId', 'evaluation','note'],
                include: [{
                        model: models.Fiche,
                        attributes: ['id', 'description']
                    },
                    {
                        model: models.User,
                        attributes: ['id', 'nomComplet', 'email']
                    }
                ],
                where: {
                    [Op.and]: [{ UserId: idUser }, { FicheId: idFiche }] },
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
    getEvaluation_fiche: (req, res) => {
        const idFiche = parseInt(req.params.id);
        models.Fiche.findOne({
                where: { id: idFiche },
            }).then((fiche) => {
                models.EvaluationFiche.findAll({
                        include: [{
                            model: models.User,
                            attributes: ['id', 'nomComplet']
                        }],
                        where: { FicheId: fiche.id },
                    }).then((Evaluation_fiche) => {
                        if (Evaluation_fiche) {
                            return res.status(200).json(Evaluation_fiche)
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