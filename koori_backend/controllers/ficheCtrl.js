// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    createFiche: (req, res) => {
        const { IboxId, titre, sous_titre, description, prerequis, dureeMin, dureeMax, equipeMin, equipeMax, outils } = req.body
            //return res.json({'body': req.body.Etapes})
            //return res.json({"okk": _.split(req.body.prerequis,',')})
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    models.Fiche.create({
                        IboxId,
                        titre,
                        sous_titre,
                        description,
                        prerequis,
                        dureeMin,
                        dureeMax,
                        equipeMin,
                        equipeMax,
                        outils,
                        avatar: req.file ? req.file.buffer : null
                    }).then((ficheResult) => {
                        if (req.body.Etapes !== []) {
                            for (let e of req.body.Etapes) {
                                models.Etape.create({
                                    FicheId: ficheResult.id,
                                    titre: e.titre,
                                    description: e.description
                                })
                            }
                        }
                        models.Phase_fiche.create({
                            id_fiche: ficheResult.id,
                            id_phase: req.body.phase
                        })
                        callback2(null, ficheResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })
    },
    updateFiche: (req, res) => {
        const { IboxId, titre, sous_titre, description, prerequis, dureeMin, dureeMax, equipeMin, equipeMax, outils } = req.body
        const FicheId = parseInt(req.params.id)
        asyncLib.waterfall([
            (callback) => {
                models.Fiche.findOne({
                    include: [{
                        model: models.Etape
                    }],
                    where: { id: FicheId },
                }).then(
                    (ficheFound) => {
                        callback(null, ficheFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (ficheFound, callback) => {
                ficheFound.update({
                    IboxId: (IboxId ? IboxId : ficheFound.IboxId),
                    titre: (titre ? titre : ficheFound.titre),
                    sous_titre: (sous_titre ? sous_titre : ficheFound.sous_titre),
                    description: (description ? description : ficheFound.description),
                    prerequis: (prerequis ? prerequis : ficheFound.prerequis),
                    dureeMin: (dureeMin ? dureeMin : ficheFound.dureeMin),
                    dureeMax: (dureeMax ? dureeMax : ficheFound.dureeMax),
                    equipeMin: (equipeMin ? equipeMin : ficheFound.equipeMin),
                    equipeMax: (equipeMax ? equipeMax : ficheFound.equipeMax),
                    outils: (outils ? outils : ficheFound.outils),
                    avatar: (req.file ? req.file.buffer : ficheFound.avatar)
                }).then((ficheResult) => {
                    if (ficheFound.Etapes.length !== 0) {
                        models.Etape.destroy({
                            where: { FicheId: ficheFound.id }
                        })
                    }
                    for (let e of req.body.Etapes) {
                        if (e.titre !== '' && e.description !== '') {
                            models.Etape.create({
                                    FicheId: ficheResult.id,
                                    titre: e.titre,
                                    description: e.description
                                })
                                .then((etape) => {
                                    models.Fiche.findOne({
                                            include: [{
                                                model: models.Etape
                                            }],
                                            where: { id: ficheResult.id },
                                        }).then((fiche) => {
                                            if (fiche) {
                                                callback(null, fiche)
                                            }
                                        })
                                        .catch((err) => {
                                            res.status(500).json({ 'impossible ': err.message });
                                        })
                                })
                                .catch((err) => {
                                    res.status(500).json({ 'impossible ': err.message });
                                })
                        }
                    }
                }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err.message });
                })
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })
    },
    getFicheById: (req, res) => {
        const id = parseInt(req.params.id);
        //return res.json({"id ba: " : id})
        models.Fiche.findOne({
                attributes: ['id', 'IboxId', 'titre', 'sous_titre', 'description', 'prerequis', 'dureeMin', 'dureeMax', 'equipeMin', 'equipeMax', 'outils', 'avatar'],
                include: [{
                    model: models.Etape
                }],
                where: { id: id },
            }).then((fiche) => {
                if (fiche) {
                    if (fiche.avatar) {
                        let buff = new Buffer(fiche.avatar);
                        fiche.avatar = buff.toString('base64');
                    }
                    res.status(200).json(fiche)
                } else {
                    res.status(404).json({ "erreur": "La fiche n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getFiches: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        models.Fiche.findAll({
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((fiches) => {
                res.status(200).json(fiches)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
}