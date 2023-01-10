// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');
const { Op } = require("sequelize");

module.exports = {
    // createEvaluation_note: (req, res) => {
    //     let sum = 0
    //     let nbrElement = 0
            
    //                 const { UserId, RapportId, note, evaluation, statut } = req.body
    //                 models.Evaluation_note.create({
    //                     UserId,
    //                     RapportId,
    //                     note,
    //                     evaluation,
    //                     statut,

    //                 }).then((evaluation_noteResult) => {
    //                     return res.status(201).json({
    //                         success: true,
    //                         message: "request create Evaluation_note successfully",
    //                         results: evaluation_noteResult
    //                 })
    //                 }).catch((err) => {
    //                     return res.status(500).json({
    //                         success: true,
    //                         message: "failed create Evaluation_note request",
    //                         results: err
    //                 })
    //                 })
    //                 models.Evaluation_note.findAll({
    //                         include: [{
    //                             model: models.Rapport,
    //                             attributes: ['moyenne']
    //                         }],
    //                         where: { RapportId: req.params.id1 }
    //                     }).then((evaluation_notes) => {
    //                         return res.status(200).json({
    //                             success: true,
    //                             message: "request get All Evaluation_notes successfully",
    //                             results: evaluation_notes
    //                     })
    //                     }).catch((err) => {
    //                         return res.status(500).json({
    //                             success: true,
    //                             message: "failed get all Evaluation_notes request",
    //                             results: err
    //                     })
    //                     })
                
    //         },
    //             if (evaluation_notes) {
    //                 evaluation_notes.forEach(ev => {
    //                     sum = sum + ev.note;
    //                     nbrElement++
    //                 })
    //                 models.Rapport.findOne({
    //                         attributes: ['id', 'moyenne'],
    //                         where: { id: req.params.id1 }
    //                     })
    //                     .then((rapport) => {
    //                         // callback4(null, evaluation_noteResult, rapport)
    //                         return res.status(200).json({
    //                             success: true,
    //                             message: "request findOne Rapport successfully",
    //                             results: rapport
    //                     })
    //                     }).catch((err) => {
    //                         return res.status(500).json({
    //                             success: true,
    //                             message: "failed findOne Rapport request",
    //                             results: err
    //                     })
    //                     })
                
    //             if (rapportToUpdate) {
    //                 rapportToUpdate.update({
    //                         moyenne: (sum / nbrElement).toFixed(2),
    //                     })
    //                     .then(() => {
    //                         callback5(null, evaluation_noteResult)
    //                     }).catch((err) => {
    //                         return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
    //                     })
    //             }

    getAllEvaluationNote:(req,res)=>{
        models.Evaluation_note.findAll({
            attributes:['id','UserId','RapportId','note','evaluation']
        }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request create Evaluation_notes successfully",
                    results: evaluations
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: true,
                    message: "failed get All Evaluation_notes request",
                    results: err
            })
            })
    },


    createEvaluation_note: (req, res) => {
        const idUser= parseInt(req.params.id)
        const idRapport= parseInt(req.params.id1)
                    const {note, evaluation, statut } = req.body
                    models.Evaluation_note.create({
                        UserId:idUser,
                        RapportId:idRapport,
                        note:note,
                        evaluation:evaluation,
                        statut:statut,

                    }).then((evaluations) => {
                        return res.status(201).json({
                            success: true,
                            message: "request create Evaluation_note successfully",
                            results: evaluations
                    })
                    }).catch((err) => {
                        return res.status(500).json({
                            success: true,
                            message: "failed create Evaluation_note request",
                            results: err
                    })
                    })
            },


    updateEvaluation_note: (req, res) => {
        const { statut } = req.body
        const idUser = parseInt(req.params.id);
        const idRapport = parseInt(req.params.id1);
        // return res.json(FicheId)
        asyncLib.waterfall([
            (callback) => {
                models.Evaluation_note.findOne({
                    attributes: ['id', 'evaluation', 'note', 'statut', 'UserId', 'RapportId'],
                    where: {
                        [Op.and]: [{ UserId: idUser }, { RapportId: idRapport }] },
                }).then(
                    (evaluation_noteFound) => {
                        callback(null, evaluation_noteFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (evaluation_noteFound, callback) => {
                if (evaluation_noteFound) {
                    callback(null, evaluation_noteFound, validationResults.error(req, res))
                }
            },
            (evaluation_noteFound, validationResults, callback) => {
                if (!validationResults) {
                    evaluation_noteFound.update({
                        statut: (statut ? statut : evaluation_noteFound.statut),
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
    getEvaluation_noteByUserId: (req, res) => {
        //return res.json({'ids': req.params.id1})
        const idUser = parseInt(req.params.id);
        const idRapport = parseInt(req.params.idR);
        let whereCondition = {}
        if (idRapport) {
            whereCondition = {
                [Op.and]: [{ UserId: idUser }, { RapportId: idRapport }] }
        } else {
            whereCondition = { UserId: idUser }
        }

        models.Evaluation_note.findOne({
                attributes: ['id', 'UserId', 'RapportId', 'evaluation', 'note', 'statut'],
                include: [{
                        model: models.Rapport,
                        attributes: ['id', 'titre', 'description', 'moyenne']
                    },
                    {
                        model: models.User,
                        attributes: ['id', 'nomComplet', 'email']
                    }
                ],
                where: whereCondition
            }).then((userEvaluation_note) => {
                if (userEvaluation_note) {
                    res.status(200).json(userEvaluation_note)
                } else {
                    return null
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err.message })
            })
    }
}