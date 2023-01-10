// Imports
// const validationResults = require('../validationResult')
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
                attributes: ['id','email']
            }, {
                model: models.Ibox,
                attributes: ['id', 'description']
            }],
        }).then((evaluations) => {
            return res.status(200).json({
                success: true,
                message: "request get All EvaluationIboxs successfully",
                results: evaluations
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed get All EvaluationIboxs request",
                results: err
        })
        })
    },
    createEvaluation_ibox: (req, res) => {
        const idUser = parseInt(req.params.id);
        const idIbox = parseInt(req.params.id1);
        //return res.json({'ok': "ok"})
        // const limit = parseInt(req.query.limit);
        // const offset = parseInt(req.query.offset);

        const {evaluation, note } = req.body
        models.EvaluationIbox.create({
            UserId: idUser,
            IboxId: idIbox,
            evaluation: evaluation,
            note: note
        }).then((evaluations) => {
            return res.status(201).json({
                success: true,
                message: "request create EvaluationIbox successfully",
                results: evaluations
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create EvaluationIbox request",
                results: err
        })
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