// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');

module.exports = {

    createProfil: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    let libelle = _.capitalize(req.body.libelle)
                    models.Profil.create({
                        libelle: libelle,
                    }).then((profilResult) => {
                        callback2(null, profilResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },

    getProfils: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Profil.findAll({
                attributes: ['id', 'libelle'],
                limit: (limit && !isNaN(limit)) ? limit : null,
                offset: (offset && !isNaN(offset)) ? offset : null,
            }).then((profils) => {
                res.status(200).json(profils)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    
    getProfilById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Profil.findOne({
                attributes: ['id', 'libelle'],
                where: { id: id },
            }).then((profil) => {
                if (profil) {
                    res.status(200).json(profil)
                } else {
                    res.status(404).json({ "erreur": "Le profil n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    updateProfil: (req, res) => {
        const libelle = req.body.libelle
        const profilId = parseInt(req.params.id)
        asyncLib.waterfall([
            (callback) => {
                models.Profil.findOne({
                    //attributes: ['id', 'libelle'],
                    where: { id: profilId },
                    include: [{
                        model: models.User
                    }],
                }).then(
                    (profilFound) => {
                        callback(null, profilFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },

            (profilFound, callback) => {
                if (profilFound) {
                    callback(null, profilFound, validationResults.error(req, res))

                }
            },

            (profilFound, validationResults, callback) => {
                if (!validationResults) {
                    profilFound.update({
                        libelle: (libelle ? _.capitalize(libelle) : profilFound.libelle),
                        //Users: profilFound.Users
                    }).then((profilResult) => {
                        //return res.json(profilResult.Users)
                        callback(null, profilResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
    deleteProfil: (req, res) => {
        const profilId = parseInt(req.params.id);
        models.Profil.destroy({
                where: { id: profilId }
            })
            .then((num) => {
                if (num === 1) {
                    return res.json({ 'Message': 'Suppression réussie' })
                } else {
                    return res.json({ 'Message': `Le profil dont l'id = ${profilId} n'existe pas` })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Erreur de suppression: ${err}`
                });
            })
    }
}