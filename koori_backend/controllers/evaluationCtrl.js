// Imports

const _ = require('lodash')
const models = require('../models');
const Op = require('sequelize').Op;


module.exports = {
    //GET ALL 
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

    //GET BY ID 


    //POST
    createEvaluationKoori: (req, res) => {
        const UserId= parseInt(req.params.id)
        const KooriId= parseInt(req.params.id1)
        const { note, commentaire } = req.body
        models.Evaluation.create({
            UserId:UserId,
            KooriId:KooriId,
            note:note,
            commentaire:commentaire
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
    createEvaluationRapport: (req, res) => {
        const { commentaire, note } = req.body
        const UserId = parseInt(req.params.id);
        const RapportId = parseInt(req.params.id1);
        models.Evaluation.create({
            UserId:UserId,
            RapportId:RapportId,
            note:note,
            commentaire:commentaire
        }).then((evaluation_note_result) => {
            return res.status(201).json({
                success: true,
                message: "request create Evaluation Rapport successfully",
                results: evaluation_note_result
        })
        }).catch((err) => {
            return res.status(500).json({
                success: true,
                message: "failed create Evaluation Rapport request",
                results: err
        })
        })
    } ,
    createEvaluationFiche: (req, res) => {
        const UserId = parseInt(req.params.id);
        const FicheId = parseInt(req.params.id1);
        const { commentaire, note } = req.body
        models.Evaluation.create({
            UserId: UserId,
            FicheId: FicheId,
            commentaire: commentaire,
            note: note
        }).then((evaluations) => {
            return res.status(201).json({
                success: true,
                message: "request create EvaluationFiche successfully",
                results: evaluations
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create EvaluationFiche request",
                results: err
        })
        })
    },
    createEvaluationIbox: (req, res) => {
        const UserId = parseInt(req.params.id);
        const FicheId = parseInt(req.params.id1);
        const { commentaire, note } = req.body
        models.Evaluation.create({
            UserId: UserId,
            FicheId: FicheId,
            commentaire: commentaire,
            note: note
        }).then((evaluations) => {
            return res.status(201).json({
                success: true,
                message: "request create EvaluationFiche successfully",
                results: evaluations
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create EvaluationFiche request",
                results: err
        })
        })
    }     
                
}
    
    