// Imports
const _ = require('lodash')
const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    getAllPhase_fiche: (req, res) => {
        models.Phase_fiche.findAll({
            attributes: [
                'id',
                'etat'
            ],
            include: [
                {
                    model: models.Phase,
                    attributes: ['id','titre','description','avatar']
                }, 
                {
                    model: models.Fiche,
                    attributes: ['id', 'titre','sous_titre','description']
                }
            ],
        }).then((phases_fiches) => {
            console.log(phases_fiches);
            return res.status(200).json({
                success: true,
                message: "request get All Phase_fiche successfully",
                results: phases_fiches
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