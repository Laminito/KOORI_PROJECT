// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    getAllEvaluation_koori: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.EvaluationKoori.findAll({
            attributes: [
                'id',
                'evaluation',
                'note'
            ],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['id']
            }, {
                model: models.Koori,
                attributes: ['id', 'description']
            }],
        }).then((allEvaluationKoori => {
            // console.log(allEvaluationFiche);
            return res.status(200).json(allEvaluationKoori)

        })).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération' + err })
        })
    },
    createEvaluation_koori: (req, res) => {
        // const idUser = parseInt(req.params.id);
        // const idKoori = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})


        const { UserId, KooriId, evaluation, note } = req.body
        models.EvaluationKoori.create({
            UserId: UserId,
            KooriId: KooriId,
            evaluation: evaluation,
            note: note
        }).then((evaluation_kooriResult) => {
            console.log(evaluation_kooriResult)
            return res.status(200).json(evaluation_kooriResult)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
        })
    },
    updateEvaluation_koori: (req, res) => {
        // const { statut } = req.body
        const idUser = parseInt(req.params.id);
        const idKoori = parseInt(req.params.id1);
        // return res.json(FicheId)
        models.EvaluationKoori.findOne({
            attributes: ['id', 'evaluation', 'note', 'UserId', 'KooriId'],
            where: {
                [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }]
            },
        }).then((evaluation_kooriFound) => {
            console.log(evaluation_kooriFound);
            res.status(200).json(evaluation_kooriFound)
        }).catch((err) => {
            res.status(500).json({ 'impossible de mettre a jour ': err });
        })


    },
    getEvaluation_kooriByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idKoori = parseInt(req.params.id1);
        models.EvaluationKoori.findOne({
                attributes: ['id', 'UserId', 'KooriId', 'evaluation', 'note'],
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
                    [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }]
                },
            }).then((userEvaluation_koori) => {
                console.log(userEvaluation_koori);
                res.status(200).json(userEvaluation_koori)

            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
            })
    },
    getEvaluation_kooriByVersion: (req, res) => {
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

            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur ' + err.message })
            })
    }
}