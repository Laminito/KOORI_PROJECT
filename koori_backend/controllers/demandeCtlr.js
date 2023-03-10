const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


module.exports = {

    createDemande: (req, res) => {

        const { UserId, ServiceId, titre, description, date_debut_souhaitee, disponibilite } = req.body
        models.Demande.create({
            UserId: UserId,
            ServiceId: Number(ServiceId),
            date_debut_souhaitee: date_debut_souhaitee,
            disponibilite: disponibilite,
            titre: _.capitalize(titre),
            description: description
        }).then((demandes) => {
            return res.status(201).json({ data: demandes })
        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout ' + err })
        })
    },

    getDemande: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        models.Demande.findAll({
            attributes: ['id', 'UserId', 'ServiceId', 'titre', 'description', 'date_debut_souhaitee', 'disponibilite', 'statut'],
            include: [{
                model: models.Service,
                attributes: ['id', 'libelle']
            }
        ],
        }).then((demandes) => {
            res.status(200).json(demandes)
        })
        .catch((err) => {
            return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
        })
    },


    getDemandeByService: (req, res) => {
        const id = parseInt(req.params.id);
        models.Demande.findAll({
                attributes: ['id', 'titre', 'description', 'date_debut_souhaitee', 'disponibilite', 'statut'],
                include: [{
                        model: models.Service,
                        attributes: ['id', 'libelle']
                    },
                    {
                        model: models.User,
                        attributes: ['id', 'nomComplet', 'email']
                    }
                ],

                where: { ServiceId: id }
            }).then((demandes_service) => {
                if (demandes_service) {
                    res.status(200).json(demandes_service)
                } else {
                    res.status(500).json({ 'demandes': "ce service n'a pas de demandes" })
                }

            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },

    // update 
    updateDemande: (req, res) => {
        const demande = req.body
        models.Demande.findOne({
            include: [
                { model: models.User, attributes: ["id", "email"] },
                { model: models.Service, attributes: ["id", "libelle"] }
            ],
            where: { id: demande.id }
        }).then((demandeFound) => {
            if (demandeFound) {
                req.body.titre = _.capitalize(req.body.titre)
                models.Demande.update(
                    { ...req.body },
                    {
                        where: { id: req.body.id }
                    }
                ).then(result => {
                    if (result) {
                        res.status(200).json({ message: "demande updated successfully !" })
                    } else {
                        res.status(500).json({ message: "demande not modify !"})
                    }
                }).catch(err => {
                    res.status(500).json({ err })
                })
            } else {
                res.status(500).json({message: "Cette objet demande n'existe pas dans la base de donnée !"})
            }
        }).catch( (err) => {
            res.status(500).json({ err })
        })
    },

    updateStatutDemande: (req, res) => {
        const statut = req.body.statut;
        const id = Number(req.params.id)
        models.Demande.findOne({
            attributes: ['id', 'statut'],
            include: [{
                    model: models.User,
                    attributes: ['id', 'nomComplet']
                },
                {
                    model: models.Service,
                    attributes: ['id', 'libelle']
                }
            ],
            where: { id: id }
        }).then((demandeFound) => {
            demandeFound.update({
                statut: statut ? _.capitalize(statut) : demandeFound.statut
            }).then((demandeResult) => {
                if (demandeResult) {
                    if (demandeResult.dataValues.statut === 'Traitee') {
                        return res.status(200).json(demandeResult)
                    }
                    if (demandeResult.dataValues.statut === 'Validee') {
                        return res.status(200).json(demandeResult)
                    }
                    if (demandeResult.dataValues.statut === 'En attente') {
                        return res.status(200).json(demandeResult)
                    }
                } else {
                    return res.status(500).json("Le statut n'existe pas");
                }
            }).catch((err) => {
                res.status(500).json({ 'impossible de mettre a jour ': err });
            })
        }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err });
        })
    },

}