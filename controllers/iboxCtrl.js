// Imports
const validationResults = require('../validationResult')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    createIbox: (req, res) => {
        const { description, version } = req.body
        models.Ibox.create({
            description: description,
            version: version,
        }).then((Iboxs) => {
            console.log(Iboxs);
            return res.status(200).json(Iboxs)
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout: ' + err })
        })
    },
    getAllIbox: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Ibox.findAll({
            attributes: [
                'id',
                'description',
                'version'
            ],
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
        }).then((AllIboxs => {
            console.log(AllIboxs);
            return res.status(200).json(AllIboxs)

        })).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération' + err })
        })
    },
    // getLastIbox: (req, res) => {
    //     headerAuth = req.headers['filter'];
    //     headerAuth === "*" ? attribute = ['id', 'description'] : attribute = [headerAuth]

    //     models.Ibox.findOne({
    //             order: [
    //                 ['id', 'DESC']
    //             ],
    //             attributes: attribute,
    //             include: [{
    //                 model: models.Fiche
    //             }],
    //         }).then((ibox) => {
    //             res.status(200).json(ibox)
    //         })
    //         .catch((err) => {
    //             return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
    //         })
    // },
    getIbox: (req, res) => {
        models.Ibox.findOne({
                order: [
                    ['id', 'DESC']
                ],
            }).then((ibox) => {
                res.status(200).json(ibox)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    updateIbox: (req, res) => {
        const description = req.body.description
        const iboxId = parseInt(req.params.id)
            // return res.json(FicheId)
        asyncLib.waterfall([
            (callback) => {
                models.Ibox.findOne({
                    where: { id: iboxId },
                }).then(
                    (iboxFound) => {
                        callback(null, iboxFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (iboxFound, callback) => {
                if (iboxFound) {
                    callback(null, iboxFound, validationResults.error(req, res))
                }
            },
            (iboxFound, validationResults, callback) => {
                if (!validationResults) {
                    iboxFound.update({
                        description: (description ? description : iboxFound.description),
                    }).then((iboxResult) => {
                        callback(null, iboxResult)
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