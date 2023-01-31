// Imports
const models = require('../models')

module.exports = {
    getAllProfils: (req, res) =>{
        models.Profil.findAll({
            attributes: ['id', 'libelle'],
        }).then((profils) => {
            profils.forEach(profil=>{
                console.log(profil);
            })
        return res.status(200).json({
            success: true,
            message: "request get All Profils successfully",
            results: profils
            })
        }).catch((err) => {
        return res.status(500).json({
            success: false,
            message: "failed get All Profils request",
            results: err
            })
        })
    },
    createProfil: (req, res) => {
        const { libelle } = req.body
        models.Profil.create({
            libelle: libelle
        }).then((profilResult) => {
            console.log('libelle',profilResult);
            return res.status(201).json({
                success: true,
                message: "request create Profil successfully",
                results: profilResult
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create Profil request",
                results: err
            })
        })           
    },
    getProfilById: (req, res) =>{
        const id = parseInt(req.params.id);
        models.Profil.findOne({
                attributes: ['id', 'libelle'],
                where: { id: id },
            }).then((profil) => {
                if (profil) {
                    return res.status(201).json({
                        success: true,
                        message: "request create Profil successfully",
                        results: profil
                    })
                }else {
                    return res.status(404).json({
                        success: true,
                        message: "This profil does not exist",
                        results: err
                    })
                }
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed create Profil request",
                    results: err
                })
            })
    },
    updateProfil: (req, res) => {
        const libelle = req.body.libelle
        const profilId = parseInt(req.params.id)
        models.Profil.findOne({
            //attributes: ['id', 'libelle'],
            where: { id: profilId },
            include: [{
                model: models.User
            }],
        }).then((profilFound) => {
            profilFound.update({
                libelle: (libelle ? _.capitalize(libelle) : profilFound.libelle),
            }).then((profilResult) => {
                return res.status(201).json({
                    success: true,
                    message: "request create Profil successfully",
                    results: profilResult
                })
            }).catch((err) => {
                return res.status(404).json({
                    success: false,
                    message: "This profile update request is not possible",
                    results: err
                })
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed create Profil request",
                results: err
            })
        });
    },
    deleteProfil: (req, res) => {
        const id = parseInt(req.params.id)
        models.Profil.destroy({
            where:{ id : id }
        }).then((profilResult) => {
            console.log('delete',profilResult);
            return res.status(200).json({
                success: true,
                message: "request delete Profil successfully",
                results: profilResult
            })
        }).catch((err) => {
            return res.status(500).json({
                success: false,
                message: "failed delete Profil request",
                results: err
            })
        })           
    },
    // deleteProfil: (req, res) => {
    //     const profilId = parseInt(req.params.id);
    //     models.Profil.destroy({
    //             where: { id: profilId }
    //         })
    //         .then((num) => {
    //             if (num === 1) {
    //                 return res.json({ 'Message': 'Suppression réussie' })
    //             } else {
    //                 return res.json({ 'Message': `Le profil dont l'id = ${profilId} n'existe pas` })
    //             }
    //         })
    //         .catch((err) => {
    //             res.status(500).send({
    //                 message: `Erreur de suppression: ${err}`
    //             });
    //         })
    // }
}