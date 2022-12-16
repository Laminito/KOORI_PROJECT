// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
const { Op } = require("sequelize");
const sendMail = require('../middleware/sendMail')

module.exports = {
    getAllEvaluation_ibox: (req, res) => {
        var limit = parseInt(req.query.limit)
        var offset = parseInt(req.query.offset)
        models.EvaluationIbox.findAll({
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
                attributes: ['id', 'nomComplet']
            }, {
                model: models.Ibox,
                attributes: ['id', 'description']
            }],
        }).then((allEvaluationIbox => {
            console.log(allEvaluationIbox);
            return res.status(200).json(allEvaluationIbox)
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
            sendMail.sendEmail('seckmaguette036@gmail.com', "Commentaire sur ibox", req.body.evaluation, req.body.note)

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
        }).then((evaluation_iboxFound) => {
            console.log(evaluation_iboxFound);
            if (evaluation_iboxFound) {
                evaluation_iboxFound.update({
                    evaluation: evaluation,
                    note: note
                }).then((iboxResult) => {
                    return res.status(200).json(iboxResult)
                }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }
            return res.status(200).json(evaluation_iboxFound)
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
            }).then((userEvaluation_ibox) => {
                if (userEvaluation_ibox) {
                    console.log(userEvaluation_ibox);
                    res.status(200).json(userEvaluation_ibox)
                } else {
                    return res.status(500).json('NULL ')
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
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