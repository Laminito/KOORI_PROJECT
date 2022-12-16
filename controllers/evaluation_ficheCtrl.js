// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");
const sendMail = require('../middleware/sendMail')

module.exports = {
    getAllEvaluation_fiche: (req, res) => {
        var limit = parseInt(req.query.limit) || 50;
        var offset = parseInt(req.query.offset) || 0;
        models.EvaluationFiche.findAll({
            order: [
                ['id', 'ASC']
            ],
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
                model: models.Fiche,
                attributes: ['id', 'sous_titre']
            }],
        }).then((allEvaluationFiche => {
            // console.log(allEvaluationFiche);
            return res.status(200).json(allEvaluationFiche)

        })).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération' + err })
        })
    },
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
            sendMail.sendEmail('abmangane14@gmail.com', "Commentaire sur fiche", req.body.evaluation, req.body.note)
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
        }).then((evaluation_ficheFound) => {
            console.log("evaluation_ficheFound :", evaluation_ficheFound)
            if (evaluation_ficheFound) {
                evaluation_ficheFound.update({
                    evaluation: evaluation,
                    note: note
                }).then((ficheResult) => {
                    console.log("ficheResult :", ficheResult)
                    return res.status(200).json(ficheResult)
                }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }
        }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err });
        });


    },
    getEvaluation_ficheByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idFiche = parseInt(req.params.id1);
        models.EvaluationFiche.findOne({
                attributes: ['id', 'UserId', 'FicheId', 'note', 'evaluation'],
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
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
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