// Imports

const _ = require('lodash')
const models = require('../models');
const Op = require('sequelize').Op;


module.exports = {
    getAllEvaluations: (req, res) => {
    models.Evaluation.findAll({
            attributes:['id','commentaire','note','UserId','KooriId','IboxId','RapportId','SessionId','FicheId','etat'], 
        }).then((evaluations) => {
            return res.status(200).json({
                success: true,
                message: "request get All Evaluations successfully",
                results: evaluations
               
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed get All Evaluations request",
                results: err
        })
        })
    },
    getAllEvaluationsKoori: (req, res) => {
        models.Evaluation.findAll({
                attributes:['id','commentaire','note'], 
                where:{
                    KooriId: {[Op.ne]: null}
                 },
                 include:[
                    {
                        model:models.User,
                        attributes:['id','email']
                    },
                    {
                        model:models.Koori,
                        attributes:['id','version']
                    }
                 ]
            }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Evaluations Koori successfully",
                    results: evaluations
                   
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Evaluations Koori request",
                    results: err
            })
            })
    },
    getAllEvaluationsIbox: (req, res) => {
        models.Evaluation.findAll({
                attributes:['id','commentaire','note','IboxId'], 
                where:{
                    IboxId: {[Op.ne]: null}
                 },
                 include:[
                    {
                        model:models.User,
                        attributes:['id','email']
                    },
                    // {
                    //     model:models.Ibox,
                    //     attributes:['id','version']
                    // }
                 ]
            }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Evaluations Ibox successfully",
                    results: evaluations
                   
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Evaluations Ibox request",
                    results: err
            })
            })
    },
    getAllEvaluationsRapport: (req, res) => {
        models.Evaluation.findAll({
                attributes:['id','commentaire','note'], 
                where:{
                    RapportId: {[Op.ne]: null}
                 },
                 include:[
                    {
                        model:models.User,
                        attributes:['id','email']
                    },
                    {
                        model:models.Rapport,
                        attributes:['id','titre']
                    }
                 ]
            }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Evaluations Rapport successfully",
                    results: evaluations
                   
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Evaluations Rapport request",
                    results: err
            })
            })
    },
    getAllEvaluationsSession: (req, res) => {
        models.Evaluation.findAll({
                attributes:['id','commentaire','note'], 
                where:{
                    SessionId: {[Op.ne]: null}
                 },
                 include:[
                    {
                        model:models.User,
                        attributes:['id','email']
                    },
                    {
                        model:models.Session,
                        attributes:['id','isNotified']
                    }
                 ]
            }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Evaluations Session successfully",
                    results: evaluations
                   
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Evaluations Session request",
                    results: err
            })
            })
    },
    getAllEvaluationsFiche: (req, res) => {
        models.Evaluation.findAll({
                attributes:['id','commentaire','note'], 
                where:{
                    FicheId: {[Op.ne]: null}
                 },
                 include:[
                    {
                        model:models.User,
                        attributes:['id','email']
                    },
                    {
                        model:models.Fiche,
                        attributes:['id','titre']
                    }
                 ]
            }).then((evaluations) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Evaluations Fiche successfully",
                    results: evaluations
                   
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Evaluations Fiche request",
                    results: err
            })
            })
    },
    createEvaluation: (req, res) => {
        const idUser= parseInt(req.params.id)
        const idDemande= parseInt(req.params.id1)
        const { note, evaluation } = req.body
        models.Evaluation_note.create({
            UserId:idUser,
            RapportId:idDemande,
            note:note,
            evaluation:evaluation,

        }).then((evaluations) => {
            return res.status(201).json({
                success: true,
                message: "request create Evaluation successfully",
                results: evaluations
        })
        }).catch((err) => {
            return res.status(500).json({
                success: true,
                message: "failed create Evaluation request",
                results: err
        })
        })
    },
    
}
    
    