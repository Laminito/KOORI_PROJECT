// // Imports
// const validationResults = require('../validationResult')
// const _ = require('lodash')
// const models = require('../models');
// let asyncLib = require('async');
// const { Op } = require("sequelize");

// module.exports = {
//     getAllEvaluation_koori: (req, res) => {
//         var limit = parseInt(req.query.limit);
//         var offset = parseInt(req.query.offset);
//         models.EvaluationKoori.findAll({
//             attributes: [
//                 'id',
//                 'evaluation',
//                 'note'
//             ],
//             limit: (!isNaN(limit)) ? limit : null,
//             offset: (!isNaN(offset)) ? offset : null,
//             // include: [{
//             //     model: models.User,
//             //     attributes: ['id','email']
//             // }, {
//             //     model: models.Koori,
//             //     attributes: ['id', 'description','version']
//             // }],
//         }).then((evaluations) => {
//             return res.status(201).json({
//                 success: true,
//                 message: "request get All EvaluationKoori successfully",
//                 results: evaluations
//         })
//         }).catch((err) => {
//             return res.status(500).json({
//                 success: false,
//                 message: "failed get All EvaluationKoori request",
//                 results: err
//         })
//         })
//     },
//     createEvaluation_koori: (req, res) => {
//         const idUser = parseInt(req.params.id);
//         const idKoori = parseInt(req.params.id1);
//         //return res.json({'ok': "ok"})
//         const {evaluation, note } = req.body
//         models.EvaluationKoori.create({
//             UserId: idUser,
//             KooriId: idKoori,
//             evaluation: evaluation,
//             note: note
//         }).then((evaluations) => {
//                 return res.status(201).json({
//                     success: true,
//                     message: "request create Evaluation_Koori successfully",
//                     results: evaluations
//             })
//             }).catch((err) => {
//                 return res.status(500).json({
//                     success: true,
//                     message: "failed create Evaluation_note request",
//                     results: err
//             })
//             })
//     },
//     updateEvaluation_koori: (req, res) => {
//         // const { statut } = req.body
//         const idUser = parseInt(req.params.id);
//         const idKoori = parseInt(req.params.id1);
//         // return res.json(FicheId)
//         models.EvaluationKoori.findOne({
//             attributes: ['id', 'evaluation', 'note', 'UserId', 'KooriId'],
//             where: {
//                 [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }]
//             },
//         }).then((evaluation) => {
//                 return res.status(201).json({
//                     success: true,
//                     message: "request create EvaluationFiche successfully",
//                     results: evaluation
//             })
//             }).catch((err) => {
//                 return res.status(500).json({
//                     success: false,
//                     message: "failed to update EvaluationFiche request",
//                     results: err
//             })
//             })


//     },
//     getEvaluation_kooriByUserId: (req, res) => {
//         //return res.json({'ids': req.params.id1})
//         const idUser = parseInt(req.params.id);
//         const idKoori = parseInt(req.params.id1);
//         models.EvaluationKoori.findOne({
//                 attributes: ['id', 'UserId', 'KooriId', 'evaluation', 'note'],
//                 include: [{
//                         model: models.Koori,
//                         attributes: ['id', 'description']
//                     },
//                     {
//                         model: models.User,
//                         attributes: ['id', 'nomComplet', 'email']
//                     }
//                 ],
//                 where: {
//                     [Op.and]: [{ UserId: idUser }, { KooriId: idKoori }]
//                 },
//             }).then((userEvaluation_koori) => {
//                 console.log(userEvaluation_koori);
//                 return res.status(200).json({
//                     success: true,
//                     message: "request get One EvaluationFiche by Id successfully",
//                     results: userEvaluation_koori
//             })
//             }).catch((err) => {
//                 return res.status(500).json({
//                     success: true,
//                     message: "failed to get One EvaluationFiche by Id request",
//                     results: userEvaluation_koori
//                 })
//     })
// },
//     getEvaluation_kooriByVersion: (req, res) => {
//         const version = parseInt(req.params.id);
//         models.Koori.findOne({
//                 where: { version: version },
//             }).then((koori) => {
//                 models.EvaluationKoori.findAll({
//                         include: [{
//                             model: models.User,
//                             attributes: ['id', 'nomComplet']
//                         }],
//                         where: { KooriId: koori.id },
//                     }).then((userEvaluation_koori) => {
//                         return res.status(200).json({
//                             success: true,
//                             message: "request get One EvaluationFiche by Id successfully",
//                             results: userEvaluation_koori
//                     })
//                     }).catch((err) => {
//                         return res.status(500).json({
//                             success: true,
//                             message: "failed to get One EvaluationFiche by Id request",
//                             results: userEvaluation_koori
//                         })

//                     })
//             })
//     }
// }