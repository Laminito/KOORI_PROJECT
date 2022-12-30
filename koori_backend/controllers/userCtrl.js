//importcd
const models = require("../models");
const asyncLib = require("async");
const validationResults = require("../validationResult");
const { Op } = require("sequelize");

module.exports = {

    getUsers: (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        models.User.findAll({
                attributes: [
                    'id',
                    'nomComplet',
                    'email',
                    'password',
                    'profession',
                    'service',
                    'departement',
                    'direction',
                    'avatar'
                ],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: models.Profil
                }],
            }).then((users) => {
                users.forEach(user => {
                        if (user.avatar) {
                            let buff = new Buffer(user.avatar);
                            user.avatar = buff.toString('base64');
                            // return res.status(200).json(users)
                        }
                    })
                    // res.send('Vous etes bien dans la methode getUsers.')
                     return res.status(200).json(users)
            })
            .catch((err) => {
                return res.status(500).json({ 'Erreur de récupération' : err })
            })

    },
    // createUsers: (req, res) => {
    //     //return res.json({"ok": req.body})
    //     asyncLib.waterfall([
    //         (callback1) => {
    //             callback1(null, validationResults.error(req, res))
    //         },
    //         (errorResult, callback2) => {
    //             if (!errorResult) {

    //                 const { ProfilId, nomComplet, email, password, profession, service, departement, direction } = req.body
    //                 models.User.create({
    //                     ProfilId: ProfilId,
    //                     nomComplet: nomComplet,
    //                     email: email,
    //                     password: password,
    //                     profession: profession,
    //                     service: service,
    //                     departement: departement,
    //                     direction: direction,
    //                     avatar: req.file.buffer

    //                 }).then((userResult) => {

    //                     callback2(null, userResult)
    //                 }).catch((err) => {
    //                     return res.status(500).json({ 'error': 'Erreur d ajout ' + err })
    //                 })
    //             }
    //         },
    //     ], (err, result) => {
    //         res.json(result);
    //     })
    // },

    updateUser: (req, res) => {
        const { ProfilId, nomComplet, email, profession, service, departement, direction } = req.body
        const UserId = parseInt(req.params.id)
        asyncLib.waterfall([
            (callback) => {
                models.User.findOne({
                    where: { id: UserId }
                }).then(
                    (userFound) => {
                        callback(null, userFound)
                    }
                ).catch((err) => {
                    return res.status(500).json({ 'erreur serveur ': err });
                });
            },
            (userFound, callback) => {
                if (userFound) {
                    callback(null, userFound, validationResults.error(req, res))
                }
            },
            (userFound, validationResults, callback) => {
                if (!validationResults) {
                    userFound.update({
                        ProfilId: ProfilId,
                        nomComplet: nomComplet,
                        email: email,
                        profession: profession,
                        service: service,
                        departement: departement,
                        direction: direction,
                        avatar: req.file.buffer

                    }).then((userResult) => {
                        callback(null, userResult)
                    }).catch((err) => {
                        res.status(500).json({ 'impossible de  a jour ': err });
                    })
                }
            }
        ], (err, result) => {
            return res.status(201).json(result);
        })

    },
    getUserById: (req, res) => {
        const id = parseInt(req.params.id);
        models.User.findOne({
                attributes: ['id', 'ProfilId', 'nomComplet', 'email', 'profession', 'service', 'departement', 'direction'],
                where: { id: id },
                include: [{
                    model: models.Profil
                }],
            }).then((user) => {
                if (user) {
                    // let buff = new Buffer(user.avatar);
                    // user.avatar = buff.toString('base64');
                    res.status(200).json(user)
                } else {
                    res.status(404).json({ "erreur": "L'utilisateur n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getUserByProfil: (req, res) => {
        const id = parseInt(req.params.id);
        models.User.findAll({
                where: { ProfilId: id },
                include: [{
                    model: models.Profil
                }],
            }).then((user) => {
                if (user) {
                    user.forEach(u => {
                        let buff = new Buffer(u.avatar);
                        u.avatar = buff.toString('base64');
                    })
                    res.status(200).json(user)
                } else {
                    res.status(404).json({ "erreur": "L'utilisateur n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    getClients: (req, res) => {
        /*const id = parseInt(req.params.id);*/
        models.User.findAll({
                include: [{
                    model: models.Profil
                }],
            }).then((user) => {
                if (user) {
                    let tab = []
                    user.forEach(u => {
                        if (u.Profil['libelle'] === 'Client') {
                            if (u.avatar) {
                                let buff = new Buffer(u.avatar);
                                u.avatar = buff.toString('base64');
                            }
                            tab.push(u)
                        }
                    })
                    res.status(200).json(tab)
                } else {
                    res.status(404).json({ "erreur": "L'utilisateur n'existe pas" })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'Erreur de récupération ' + err })
            })
    },
    deleteUser: (req, res) => {
        const userId = parseInt(req.params.id);
        models.User.destroy({
                where: { id: userId }
            })
            .then((num) => {
                if (num === 1) {
                    return res.json({ 'Message': 'Suppression réussie' })
                } else {
                    return res.json({ 'Message': `Le profil dont l'id = ${userId} n'existe pas` })
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: `Erreur de suppression: ${err}`
                });
            })
    },
    getDemandesByUserId: (req, res) => {
        const id = parseInt(req.params.id);
        //return res.json({"id ba: " : id})
        models.Demande.findAll({
                include: [{
                    model: models.Service,
                }],
                where: { UserId: id },
            }).then((userDemandes) => {
                if (userDemandes) {
                    res.status(200).json(userDemandes)
                } else {
                    res.status(404).json({ "erreur": "Cette utilisateur n'a participé à aucune session" })
                }
            })
            .catch((err) => { return res.json({ 'ok': err.message }) })
    },
}