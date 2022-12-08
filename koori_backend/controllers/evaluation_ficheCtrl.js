// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    createEvaluation_fiche: (req, res) => {
        // const idUser = parseInt(req.params.id);
        // const idFiche = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})

        const { UserId, FicheId, evaluation, note } = req.body
        models.EvaluationFiche.create({
            UserId: UserId,
            FicheId: FicheId,
            evaluation: evaluation,
            note: note
        }).then((evaluation_kooriResult) => {
            console.log("evaluation_kooriResult : ", evaluation_kooriResult);
            return res.status(200).json(evaluation_kooriResult)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
        })
    },

    updateEvaluation_fiche: (req, res) => {
        const { evaluation, note } = req.body
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        // return res.json(FicheId)

        models.EvaluationFiche.findOne({
            attributes: ['id', 'evaluation', 'note', 'UserId', 'FicheId'],
            where: {
                [Op.and]: [{ UserId: idUser }, { FicheId: idFiche }]
            },
        }).then((evaluation_kooriFound) => {
            console.log("evaluation_kooriFound :", evaluation_kooriFound)
            if (evaluation_kooriFound) {
                evaluation_kooriFound.update({
                    evaluation: evaluation,
                    note: note
                }).then((ficheResult) => {
                    console.log("ficheResult :", ficheResult)
                    return res.status(200).json(ficheResult)
                }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }
            return res.status(200).json(evaluation_kooriFound)
        }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err });
        });


    },
    getEvaluation_ficheByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        models.EvaluationFiche.findOne({
                attributes: ['id', 'UserId', 'note', 'FicheId', 'evaluation'],
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
                    [Op.and]: [{ UserId: idUser }, { FicheId: idFiche }]
                },
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