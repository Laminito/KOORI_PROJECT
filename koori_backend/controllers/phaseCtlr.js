// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    
    createPhase: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {
                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {

                    const { KooriId, titre, description } = req.body
                        // return res.json(kooriId)

                    models.Phase.create({
                        KooriId: KooriId,
                        avatar: req.file.buffer,
                        titre: _.capitalize(titre),
                        description: description,
                    }).then((phaseResult) => {
                        callback2(null, phaseResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': 'Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            return res.status(400).json(result)
        })
    },
    getPhases: (req, res) => {
        models.Phase.findAll({
            attributes:['id','titre','description']
        }).then((phases) => {
                return res.status(200).json(phases)
            })
        .catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
        })
    },
    getPhaseById: (req, res) => {
        const PhaseId=parseInt(req.params.id)
        models.Phase.findOne({
            attributes:['id','titre','description','KooriId'],
            where:{id:PhaseId}
        }).then((phase) => {
            console.log(phase);
                return res.status(200).json(phase)
            })
        .catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
        })
    },
    updatePhase: (req, res) => {
        const { titre, description } = req.body;
        const id = req.params.id
        asyncLib.waterfall([
            (callback) => {
                models.Phase.findOne({
                    where: { id: id }
                }).then(
                    (phaseFound) => {
                        callback(null, phaseFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (phaseFound, callback) => {
                if (phaseFound) {
                    callback(null, phaseFound, validationResults.error(req, res))
                }
            },
            (phaseFound, validationResults, callback) => {
                //return res.json(req.file);
                if (!validationResults) {
                    phaseFound.update({
                        titre: (titre ? _.capitalize(titre) : phaseFound.titre),
                        description: (description ? description : phaseFound.description),
                        avatar: (req.file ? req.file.buffer : phaseFound.avatar)
                    }).then((phaseResult) => {
                        models.Koori.findOne({
                                //attributes: ['id','IboxId'],
                                include: [{
                                    model: models.Phase
                                }],
                                where: { id: phaseResult.KooriId },
                            }).then((koori) => {
                                if (koori) {
                                    koori.Phases.forEach(p => {
                                            let buff = new Buffer(p.avatar);
                                            p.avatar = buff.toString('base64');
                                        })
                                        //return res.json({'logs': fiche})
                                    callback(null, koori)
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({ 'impossible ': err.message });
                            })
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de mettre a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
    
}