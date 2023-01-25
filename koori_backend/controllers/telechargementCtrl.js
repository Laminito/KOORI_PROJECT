// Imports
const _ = require('lodash')
const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    getAllTelechargement:(req,res)=>{
        models.Telechargement.findAll({
            attributes:['id','UserId','RapportId','date','etat']
        }).then((telechargement) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Telechargements successfully",
                    results: telechargement
            })
            }).catch((err) => {
                return res.status(500).json({
                    success: true,
                    message: "failed get All Telechargements request",
                    results: err
            })
            })
    },
}