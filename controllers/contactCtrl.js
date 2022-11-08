// Imports
const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models')
let asyncLib = require('async');

module.exports = {

    getContact: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.Contact.findAll({
                attributes: ['id', 'description', 'email', 'adresse', 'telephone', 'disponibilite'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
            }).then((contacts) => {
                res.status(200).json(contacts)
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })

    },

    getContactById: (req, res) => {
        const id = parseInt(req.params.id);
        models.Contact.findOne({
                //attributes: ['id', 'libelle'],
                where: { id: id },
            }).then((contact) => {
                if (contact) {
                    res.status(200).json(contact)
                } else {
                    res.status(404).json({ "erreur": "Le contact n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    //---------------------------------------------------------------------------

    createContact: (req, res) => {
        asyncLib.waterfall([
            (callback1) => {

                callback1(null, validationResults.error(req, res))
            },
            (errorResult, callback2) => {
                if (!errorResult) {
                    const { description, adresse, email, telephone, disponibilite } = req.body
                    models.Contact.create({
                        description,
                        adresse,
                        email,
                        telephone,
                        disponibilite
                    }).then((contactResult) => {
                        callback2(null, contactResult)
                    }).catch((err) => {
                        return res.status(500).json({ 'error': ' Erreur dajout ' + err })
                    })
                }
            },
        ], (err, result) => {
            res.json(result);
        })

    },

    updateContact: (req, res) => {
        const description = req.body.description
        const adresse = req.body.adresse
        const email = req.body.email
        const telephone = req.body.telephone
        const disponibilite = req.body.disponibilite

        const contactId = parseInt(req.params.id)

        asyncLib.waterfall([
            (callback) => {
                models.Contact.findOne({
                    attributes: ['id', 'description', 'adresse', 'email', 'telephone', 'disponibilite'],
                    where: { id: contactId }

                }).then(
                    (contactFound) => {
                        //  return res.json({'baxna':'batay baxna'})

                        callback(null, contactFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (contactFound, callback) => {
                if (contactFound) {
                    //return res.json({'baxna':contactFound,validationResults})
                    callback(null, contactFound, validationResults)
                }
            },
            (contactFound, validationResults, callback) => {
                if (!validationResults) {

                    contactFound.update({
                        description: description,
                        adresse: adresse,
                        email: email,
                        telephone: telephone,
                        disponibilite: disponibilite
                    }).then((contactResult) => {
                        callback(null, contactResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
}