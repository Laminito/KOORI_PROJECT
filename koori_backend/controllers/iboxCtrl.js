// Imports
const validationResults = require('../validationResult')
const models = require('../models');
let asyncLib = require('async');

module.exports = {
    createIbox: (req, res) => {
        const { description,avatar,etat} = req.body
        models.Ibox.create({
            description: description,
            avatar:avatar,
            etat:etat
        }).then((iboxs) => {
            if (iboxs.dataValues.avatar) {
                let buff = new Buffer(iboxs.dataValues.avatar);
                iboxs.dataValues.avatar = buff.toString('base64');
            }
            return res.status(201).json({
                success: true,
                message: "request create Ibox successfully",
                results: iboxs
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create Ibox request",
                results: err
        })
    })
    },
    getAllIbox: (req, res) => {
        models.Ibox.findAll({
            attributes: [
                'id',
                'description',
                'avatar',
                'etat'
            ],
        }).then((AllIboxs) => {
            AllIboxs.forEach(ibox => {
                if (ibox.avatar) {
                    let buff = new Buffer(ibox.avatar);
                    ibox.avatar = buff.toString('base64');
                    console.log("iboxs : ",ibox)
                }
            })
            return res.status(200).json({
                success: true,
                message: "request get All Iboxs successfully",
                results: AllIboxs
                })

        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed get All Iboxs request",
                results: err
        })
        })
    },
    getLastIbox: (req, res) => {
        models.Ibox.findAll({
            limit:1,
            attributes: ['id', 'description','avatar'],
                order: [ [ 'createdAt', 'DESC' ]]
            }).then((iboxs) => {
                iboxs.forEach(ibox => {
                    if (ibox.avatar) {
                        let buff = new Buffer(ibox.avatar);
                        ibox.avatar = buff.toString('base64');
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "request get Last Ibox successfully",
                    results: iboxs
                    })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get Last Koori request",
                    results: err
            })
            })
    },
    getIboxById:(req,res)=>{
            const id = parseInt(req.params.id)
            models.Ibox.findOne({
                    where: { id: id }
                }).then((iboxs) => {
                        if (iboxs.avatar) {
                            let buff = new Buffer(iboxs.avatar);
                            iboxs.avatar = buff.toString('base64');
                        }
                    return res.status(200).json({
                        success: true,
                        message: "request get IboxById successfully",
                        results: iboxs
                    })
                }).catch((err) => {
                    return res.status(500).json({
                        success: false,
                        message: "failed IboxById request",
                        results: err
                    })
                    
                })
    },
    updateIbox: (req, res) => {
        const {description,avatar,etat} = req.body.description
        const iboxId = parseInt(req.params.id)
        models.Ibox.findOne({
            where: { id: iboxId },
        }).then((iboxFound) => {
            iboxFound.update({
                description: description, 
                avatar:avatar,
                etat:etat
            }).then((iboxResult) => {
                if (iboxResult.avatar) {
                    let buff = new Buffer(iboxResult.avatar);
                    iboxResult.avatar = buff.toString('base64');
                }
                return res.status(200).json({
                    success: true,
                    message: "request update ibox successfully",
                    results: koori
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed update ibox request",
                    results: err
                })
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed update ibox request",
                results: err
            })
        });
    },

}