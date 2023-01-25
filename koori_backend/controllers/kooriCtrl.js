// Imports
const _ = require('lodash')
const models = require('../models');
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = {
    createKoori: (req, res) => {
        const { description, quoi, quand, comment, avatar,version,etat } = req.body
        models.Koori.create({
            description: description,
            quoi: quoi,
            quand: quand,
            comment: comment,
            avatar:avatar,
            version: version,
            etat:etat
        }).then((kooris) => {
            if (kooris.dataValues.avatar) {
                let buff = new Buffer(kooris.dataValues.avatar);
                kooris.dataValues.avatar = buff.toString('base64');
                console.log("createKoori : ",kooris.dataValues.avatar);
            }
            return res.status(201).json({
                success: true,
                message: "request create Koori successfully",
                results: kooris
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create koori request",
                results: err
        })
        })
    },
    getAllkoori: (req, res) => {
        models.Koori.findAll({
            attributes: [
                'id',
                'description',
                'quoi',
                'quand',
                'comment',
                'avatar',
                'version',
                'etat'
            ],
        }).then((kooris) => {
            kooris.forEach(koori=>{
                if (koori.avatar) {
                    let buff = new Buffer(koori.avatar);
                    koori.avatar = buff.toString('base64');
                }
            })
            return res.status(200).json({
                success: true,
                message: "request get All Kooris successfully",
                results: kooris
                })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed get All Kooris request",
                results: err
            })
        })
    },
    getLastKoori: (req, res) => {
        models.Koori.findAll({
            limit:1,
            attributes: ['id', 'description', 'quoi', 'comment', 'quand','avatar','version'],
                order: [[ 'createdAt', 'DESC' ]]
            }).then((kooris) => {
                kooris.forEach((koori) => {
                    let buff = new Buffer(koori.avatar);
                    koori.avatar = buff.toString('base64');
                })
                return res.status(200).json({
                    success: true,
                    message: "request get Last Koori successfully",
                    results: kooris
                    })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get Last Koori request",
                    results: err
                })
            })
    },
    getKooriById: (req, res) => {
        const id = parseInt(req.params.id)
        models.Koori.findOne({
            where: { id: id }
        }).then((kooris) => { 
            if (kooris.avatar) {
                let buff = new Buffer(kooris.avatar);
                kooris.avatar = buff.toString('base64');
            }
            return res.status(200).json({
                success: true,
                message: "request get KooriById successfully",
                results: kooris
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed KooriById request",
                results: err
            }) 
        })
    },
    getKooriByVersion: (req, res) => {
        const version = parseInt(req.params.version)
        models.Koori.findOne({
                where: { version: version }
            }).then((kooris) => {
                if (kooris.avatar) {
                    let buff = new Buffer(kooris.avatar);
                    kooris.avatar = buff.toString('base64');
                }
                return res.status(200).json({
                    success: true,
                    message: "request get KooriByVersion successfully",
                    results: kooris
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed KooriByVersion request",
                    results: err
                }) 
            })
    },
    getVersions: (req, res) => {
        models.Koori.findAll({
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['version'],
            }).then((kooris) => {
                return res.status(200).json({
                    success: true,
                    message: "request get All Versions successfully",
                    results: kooris
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Versions request",
                    results: err
                })
                
            })
    },
    updateKoori: (req, res) => {
        const { description, quoi, quand, comment } = req.body
        const KooriId = parseInt(req.params.id)
                models.Koori.findOne({
                    attributes: ['id', 'description', 'quoi', 'quand', 'comment'],
                    where: { id: KooriId },
                }).then((kooriFound) => {
                    kooriFound.update({
                            description: description,
                            quoi: quoi,
                            quand: quand,
                            comment: comment
                        }).then((koori)=>{
                            if (koori.avatar) {
                                let buff = new Buffer(koori.avatar);
                                koori.avatar = buff.toString('base64');
                            }
                            return res.status(200).json({
                                success: true,
                                message: "request update koori successfully",
                                results: koori
                            })
                        }).catch((err) => {
                            return res.status(500).json({
                                success: false,
                                message: "failed update koori request",
                                results: err
                            })
                        })
                        
                }).catch((err) => {
                        return res.status(500).json({
                            success: false,
                            message: "failed update koori request",
                            results: err
                        })
                });
    },
            
            
                   
                        
             
    
    // postMail: (req, res) => {
    //     const { to, text } = req.body;
    //     const mailOptions = {
    //         from: process.env.GMAIL_USER,
    //         to: to,
    //         subject: 'Feedback sur le livret Koori',
    //         text: text
    //     };
    //     smtpTransport.sendMail(mailOptions, function(error, response) {
    //         if (error) {
    //             return res.json(error);
    //         } else {
    //             return res.json(response.sent.envelope);
    //         }
    //     });
    // },
    // postMailIbox: (req, res) => {
    //     const { to, text } = req.body;
    //     const mailOptions = {
    //         from: process.env.GMAIL_USER,
    //         to: to,
    //         subject: "Feedback sur l'outil Ibox",
    //         text: text
    //     };
    //     smtpTransport.sendMail(mailOptions, function(error, response) {
    //         if (error) {
    //             return res.json(error);
    //         } else {
    //             return res.json(response.sent.envelope);
    //         }
    //     });
    // },
    // postMailFiche: (req, res) => {
    //     const { to, text } = req.body;
    //     const FicheId = parseInt(req.params.id)
    //     models.Fiche.findOne({
    //             attributes: ['id', 'titre'],
    //             where: { id: FicheId },
    //         }).then((fiche) => {
    //             const mailOptions = {
    //                 from: process.env.GMAIL_USER,
    //                 to: to,
    //                 subject: 'Feedback sur la fiche ' + fiche.titre + ' de notre livret ',
    //                 text: text
    //             };
    //             smtpTransport.sendMail(mailOptions, function(error, response) {
    //                 if (error) {
    //                     return res.status(500).json(error);
    //                 } else {
    //                     return res.status(200).json(response.sent.envelope);
    //                 }
    //             });
    //         })
    //         .catch((err) => {
    //             return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
    //         })
    // }
}