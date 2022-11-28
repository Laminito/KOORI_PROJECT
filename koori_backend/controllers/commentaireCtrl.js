// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');
const { body } = require('express-validator');
const { sujet } = require('../validationsCheck/validationFilesRequire');
module.exports = {

    getCommentaires: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Commentaire.findAll({
                attributes: ['id', 'UserId', 'KooriId', 'SujetId', 'created', 'content', 'nbrlike', 'archived'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((commentaire) => {
                res.status(200).json(commentaire)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },

    createCommentaire: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {

                    let KooriId = req.body.KooriId
                    let SujetId = req.body.SujetId
                    let UserId = req.body.UserId
                    let created = req.body.created
                    let content = req.body.content
                    let nbrlike = req.body.nbrlike
                    let archived = req.body.archived
                    models.Commentaire.create({
                        UserId: UserId,
                        KooriId: KooriId,
                        SujetId: SujetId,
                        created: created,
                        content: content,
                        nbrlike: nbrlike,
                        archived: archived
                    }).then((commentaireResult) => {
                        callback2(null, commentaireResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },

    /**            let KooriId = req.body.KooriId
                let SujetId = req.body.SujetId
                let created = req.body.created
                let content = req.body.content
                let nbrlike = req.body.nbrlike
                let archived = req.body.archived */




    // updateCommentaire: (req, res)=>{
    //         //return res.json({"data": req.body})
    //     let UserId = req.body.UserId
    //     let KooriId = req.body.KooriId
    //     let SujetId = req.body.SujetId
    //     let created = req.body.created
    //     let content = req.body.content
    //     let nbrlike = req.body.nbrlike
    //     let archived = req.body.archived

    //     const commentaireId = parseInt(req.params.id)

    //       asyncLib.waterfall([
    //            (callback)=>{
    //               models.Commentaire.findOne({
    //                   attributes: ['id', 'UserId', 'KooriId', 'SujetId', 'created', 'content', 'nbrlike', 'archived'],
    //                   where: {id: commentaireId}
    //               }).then(
    //                   (CommentaireFound)=>{
    //                       callback(null, CommentaireFound)
    //                   }
    //               ).catch( (err)=>{
    //                   return res.status(500).json({'erreur serveur ': err});
    //               });
    //           },
    //            (CommentaireFound,callback)=>{
    //               if (CommentaireFound){
    //                   callback(null,CommentaireFound)
    //               }
    //           },
    //           (CommentaireFound, callback)=>{
    //           //if (!validationResults){
    //             CommentaireFound.update({
    //               UserId: UserId, KooriId:KooriId, SujetId: SujetId, created: created, content: content,
    //               nbrlike: nbrlike, archived: archived
    //               }).then((commentaireResult)=>{
    //                   callback(null,commentaireResult)
    //               }).catch((err)=>{
    //                   res.status(500).json({'impossible de  a jour ': err});
    //               })
    //           }
    //      // }
    //       ], (err,result)=>{
    //               return res.status(201).json(result);
    //       })

    //   },

    getCommentaireById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Commentaire.findOne({
                attributes: ['id', 'UserId', 'KooriId', 'SujetId', 'created', 'content', 'nbrlike', 'archived'],
                where: { id: id },
            }).then((Commentaire) => {
                if (Commentaire) {
                    res.status(200).json(Commentaire)
                } else {
                    res.status(404).json({ "erreur": "L'utilisateur n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },

    deleteCommentaire: (req, res) => {
        const commentaireId = parseInt(req.params.id);
        models.Commentaire.destroy({
                where: { id: commentaireId }
            })
            .then((num) => {
                if (num === 1) {
                    return res.json({ 'Message': 'Suppression réussie' })
                } else {
                    return res.json({ 'Message': `Le commentaire dont l'id = ${userId} n'existe pas` })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Erreur de suppression: ${err}`
                });
            })
    },

    getCommentairesBySujet: (req, res) => {
        const sujetId = parseInt(req.params.id);
        const commentaireId = parseInt(req.params.id);
        return res.json({ "ok": sujetId })

    }
}