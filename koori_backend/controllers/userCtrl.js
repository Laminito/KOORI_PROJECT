//importcd
const models = require("../models");
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
                    'avatar',
                    'etat'
                ],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: models.Profil,
                    attributes:['id','libelle']
                }],
            }).then((users) => {
                // console.log("users : ",users);
                users.forEach(user => {
                    if (user.avatar) {
                        let buff = new Buffer(user.avatar);
                        user.avatar = buff.toString('base64');
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "request get All Users successfully",
                    results: users
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Users request",
                    results: err
            })
        })

    },
    updateUser: (req, res)=>{
        const {nomComplet, profession, service, departement, direction }= req.body
        const UserId = parseInt(req.params.id)
                models.User.findOne({
                    where: {id: UserId}
                }).then((userFound)=>{
                    console.log("userFound : ",userFound);
                    userFound.update({
                        nomComplet:nomComplet,
                        profession:profession,
                        service: service,
                        departement: departement,
                        direction:direction
                    })
                    return res.status(204).json({
                        success: true,
                        message: "request update User successfully",
                        results: singleUser
                    })
                }).catch((err)=>{
                    return res.status(500).json({
                        success: false,
                        message: "this user does not exist",
                        results: err
                    })
                })
    },
    getUserById: (req, res) => {
        const id = parseInt(req.params.id);
        models.User.findOne({
            attributes: [
                'id',
                'nomComplet',
                'email',
                'profession',
                'service',
                'departement',
                'direction',
                'avatar',
                'etat'
            ],
            where: { id: id },
            include: [{
                model: models.Profil,
                attributes:['id','libelle']
            }],
            }).then((singleUser) => {
                if (singleUser) {
                    let buff = new Buffer(singleUser.avatar);
                    singleUser.avatar = buff.toString('base64');
                    return res.status(200).json({
                        success: true,
                        message: "request get UserById successfully",
                        results: singleUser
                    })
                } else {
                    return res.status(500).json({
                        success: false,
                        message: "failed get UserById request",
                        results: err
                    })
                }
            }).catch((err) => {
                return res.status(404).json({
                    success: false,
                    message: "this Id does not exist",
                    results: err
                })
            })
    },
    getUserByEmail: (req, res) => {
        const email = req.params.email;
        models.User.findOne({
            attributes: [
                'id',
                'nomComplet',
                'email',
                'profession',
                'service',
                'departement',
                'direction',
                'avatar',
                'etat'
            ],
            where: { email: email },
            include: [{
                model: models.Profil,
                attributes:['id','libelle']
            }],
            }).then((singleUser) => {
                if (singleUser) {
                    let buff = new Buffer(singleUser.avatar);
                    singleUser.avatar = buff.toString('base64');
                    return res.status(200).json({
                        success: true,
                        message: "request get User By Email successfully",
                        results: singleUser
                    })
                } else {
                    return res.status(500).json({
                        success: false,
                        message: "failed get User By Email request",
                        results: err
                })
                }
            }).catch((err) => {
                return res.status(404).json({
                    success: false,
                    message: "This Email does not existe",
                    results: err
            })
            })
    },
    getUserByProfilClient: (req, res) => {
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
                    'avatar',
                    'etat'
                ],
                where:{
                    ProfilId: {[Op.ne]: 1}
                 },
                include: [{
                    model: models.Profil,
                    attributes:['id','libelle']
                }],
            }).then((users) => {
                users.forEach(user => {
                    if (user.avatar) {
                        let buff = new Buffer(user.avatar);
                        user.avatar = buff.toString('base64');
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "request get All Users Profil Client successfully",
                    results: users
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Users Profil Client request",
                    results: err
            })
        })
    },
    getUserByProfilAdmin: (req, res) => {
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
                    'avatar',
                    'etat'
                ],
                where:{
                    ProfilId: {[Op.ne]: 2}
                 },
                include: [{
                    model: models.Profil,
                    attributes:['id','libelle']
                }],
            }).then((users) => {
                users.forEach(user => {
                    if (user.avatar) {
                        let buff = new Buffer(user.avatar);
                        user.avatar = buff.toString('base64');
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "request get All Users Profil Admin successfully",
                    results: users
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: "failed get All Users Profil Admin request",
                    results: err
            })
        })
    }
}