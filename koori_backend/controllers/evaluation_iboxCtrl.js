// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    getAllEvaluation_fiche: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.EvaluationIbox.findAll({
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
                model: models.Ibox,
                attributes: ['id', 'description']
            }],
        }).then((allEvaluationFiche => {
            // console.log(allEvaluationFiche);
            return res.status(200).json(allEvaluationFiche)

        })).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération' + err })
        })
    },
    createEvaluation_ibox: (req, res) => {
        // const idUser = parseInt(req.params.id);
        // const idIbox = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})
        // const limit = parseInt(req.query.limit);
        // const offset = parseInt(req.query.offset);

        const { UserId, IboxId, evaluation, note } = req.body
        models.EvaluationIbox.create({
            UserId: UserId,
            IboxId: IboxId,
            evaluation: evaluation,
            note: note
        }).then((evaluation_kooriResult) => {
            console.log(evaluation_kooriResult)
            return res.status(200).json(evaluation_kooriResult)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
        })
    },
    updateEvaluation_ibox: (req, res) => {
        const idUser = parseInt(req.params.id);
        const idIbox = parseInt(req.params.id1);
        // return res.json(FicheId)

        models.EvaluationIbox.findOne({
            attributes: ['id', 'evaluation', 'note', 'UserId', 'IboxId'],
            where: {
                [Op.and]: [{ UserId: idUser }, { IboxId: idIbox }]
            },
        }).then((evaluation_kooriFound) => {
            console.log(evaluation_kooriFound);
            return res.status(200).json(evaluation_kooriFound)
        }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err });
        });
    },
    getEvaluation_iboxByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idIbox = parseInt(req.params.id1);
        models.EvaluationIbox.findOne({
                attributes: ['id', 'UserId', 'IboxId', 'evaluation', 'note'],
                include: [{
                    model: models.User,
                    attributes: ['id']
                }, {
                    model: models.Ibox,
                    attributes: ['id', 'description']
                }],
                where: {
                    [Op.and]: [{ UserId: idUser }, { IboxId: idIbox }]
                },
            }).then((userEvaluation_koori) => {
                if (userEvaluation_koori) {
                    console.log(userEvaluation_koori);
                    res.status(200).json(userEvaluation_koori)
                } else {
                    return null
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
            })
    },
    getEvaluation_ibox: (req, res) => {
        //return res.status(200).json({'ok':'oui'})
        models.EvaluationIbox.findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: [{
                    model: models.User,
                    attributes: ['id']
                }]
            }).then((Evaluation_ibox) => {
                console.log(Evaluation_ibox);
                return res.status(200).json(Evaluation_ibox)

            })
            .catch((err) => {
                return res.status(500).json({ 'Erreur de recuperation ': +err })
            })
    }
}