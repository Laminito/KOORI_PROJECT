// Imports
// const validationResults = require('../validationResult')
// const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');

module.exports = {

    getApropos: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Apropos.findAll({
                attributes: ['id', 'description', 'mission'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((apropos) => {
                res.status(200).json(apropos)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },


    //----------------------------------------------------------------------------

    createApropos: (req, res) => {

        let description = req.body.description
        let mission = req.body.mission
        models.Apropos.create({
            description: description,
            mission: mission
        }).then((aproposResult) => {
            res.send(aproposResult);
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout ' + err })
        })
    },

    updateApropos: (req, res) => {
        const description = req.body.description
        const mission = req.body.mission

        const aproposId = parseInt(req.params.id)

        asyncLib.waterfall([
            (callback) => {
                models.Apropos.findOne({
                    attributes: ['id', 'description', 'mission'],
                    where: { id: aproposId }
                }).then(
                    (aproposFound) => {
                        callback(null, aproposFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (aproposFound, callback) => {
                if (aproposFound) {
                    callback(null, aproposFound)
                }
            },
            (aproposFound, callback) => {
                //if (!validationResults){
                aproposFound.update({
                    description: description,
                    mission: mission
                }).then((aproposResult) => {
                    callback(null, aproposResult)
                }).catch((err) => {
                    res.status(500).json({ 'impossible de  a jour ': err });
                })
            }
            // }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
}