// Imports
const _ = require('lodash')
const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    getAllSession_demande: (req, res) => {
        models.Session_demande.findAll({
            attributes: [
                'id',
                'etat',
                'SessionId',
                'DemandeId'
            ],
            // include: [
            //     {
            //         model: models.Session,
            //         attributes: ['id','isNotified']
            //     }, 
            //     {
            //         model: models.Demande,
            //         attributes: ['id','titre']
            //     }
            // ],
        }).then((Session_demandes) => {
            // console.log(Session_demandes);
            return res.status(200).json({
                success: true,
                message: "request get All Session_demandes successfully",
                results: Session_demandes
        })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed get All Phase_fiche request",
                results: err
        })
        })
    }

}