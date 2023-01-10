const validationResults = require('../validationResult')
const _ = require('lodash')
const models = require('../models');
const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer");
const send_mail = require('../middleware/sendMail')


// function sendEmail() {
//     return new Promise((resolve, reject) => {
//         const username = process.env.GMAIL_USER
//         const password = process.env.GMAIL_PASSWORD
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true, // use TLS,
//             requireTLS: true,
//             auth: {
//                 user: username,
//                 pass: password
//             }
//         })

//         const mail_option = {
//             from: username,
//             to: "mainashou@gmail.com",
//             subject: "Message de test",
//             text: "Si vous recevez ce message c'est parceque\nVous avez effectuez une demande de service\nSur KOORI/IBOX"
//         }
//         transporter.sendMail(mail_option, function(error, info) {
//             if (error) {
//                 console.log(error);
//                 return reject({ message: `une erreur est survenue` })
//             }
//             return resolve({
//                 message: "Le mail a été envoyé avec succes "
//             })
//         })

//     })
// }



module.exports = {
    createDemande: (req, res) => {

        const { UserId, ServiceId, titre, description, date_debut_souhaitee, disponibilite } = req.body
        models.Demande.create({
            UserId: UserId,
            ServiceId: ServiceId,
            date_debut_souhaitee: date_debut_souhaitee,
            disponibilite: disponibilite,
            titre: _.capitalize(titre),
            description: description
        }).then((demandes) => {
            send_mail.sendEmail('abmangane14@gmail.com', "message de test")
                .then(demandes => res.status(200).json({ 'sucess': demandes }))
                .catch(error => res.status(500).send(error))

        }).catch((err) => {
            return res.status(500).json({ 'error': 'Erreur dajout ' + err })
        })
    },


    // addParticipantsToSession: (req, res) => {
    //     let usersSession = req.body
    //     if (usersSession) {
    //         usersSession.forEach(user => {
    //             const { nomComplet, email, profession, service, departement, direction } = user
    //             models.User.create({
    //                     ProfilId: 2,
    //                     nomComplet: nomComplet,
    //                     email: email,
    //                     profession: profession,
    //                     service: service,
    //                     departement: departement,
    //                     direction: direction,
    //                 }).then((user) => {
    //                     models.Session.create({
    //                         UserId: user.id,
    //                         DemandeId: demandeResult.id,
    //                     })

    //                 })
    //                 .catch((err) => {
    //                     return res.status(500).json({ 'error': 'Erreur d\'ajout' + err })
    //                 })
    //         })
    //     }
    // },
    getDemande: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        models.Demande.findAll({
                attributes: ['id', 'titre', 'description', 'date_debut_souhaitee', 'disponibilite', 'statut'],
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: models.Service,
                    attributes: ['id', 'libelle']

                },
                {
                    model: models.User,
                    attributes: ['id']

                }],
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
    updateDemande: (req, res) => {
        const id = req.params.id
        const titre = req.body.titre;
        const statut = req.body.statut;
        const description = req.body.description;
        const date_debut_souhaitee = req.body.date_debut_souhaitee;
        const disponibilite = req.body.disponibilite
        const text = req.body.text;
        models.Demande.findOne({
            include: [
                { model: models.User, attributes: ["id", "email"] },
                { model: models.Service, attributes: ["id", "libelle"] }
            ],
            where: { id: id }
        }).then(
            (demandeFound) => {
                // return res.json(demandeFound.id)
                demandeFound.update({
                    statut: (statut ? _.capitalize(statut) : demandeFound.statut),
                    text: text,
                    titre: titre,
                    description: description,
                    date_debut_souhaitee: date_debut_souhaitee,
                    disponibilite: disponibilite
                }).then(
                    (demandeResult) => {
                        // return res.status(200).json(demandeResult.statut)
                        if (demandeResult.statut === 'Validee') {
                            // return res.status(200).json(' validee')

                            // models.Session.create({
                            //         UserId: demandeResult.User.id,
                            //         DemandeId: demandeResult.id,
                            //     })
                            // return res.status(200).json(' validee')
                            // const mailOptions = {
                            //     from: process.env.GMAIL_USER,
                            //     to: demandeFound.User.email,
                            //     subject: "retour votre demande " + demandeFound.Service.libelle,
                            //     text: text //retour de la demande
                            // }
                            // smtpTransport.sendMail(mailOptions, function(error, response) {
                            //     if (error) {
                            //         return res.json(error);
                            //     } else {
                            //         return res.status(200).json(demandeResult);
                            //     }
                            // });
                            return res.status(200).json(' validee')

                        } else if (demandeResult.statut === 'Traitee') {
                            demandeResult.update({
                                date_debut_souhaitee: new Date()

                            })
                            return res.status(200).json('traitee validee')

                        } else {
                            return res.status(200).json('non validee')
                                // const mailOptions = {
                                //     from: process.env.GMAIL_USER,
                                //     to: demandeFound.User.email,
                                //     subject: "retour sur votre demande " + demandeFound.Service.libelle,
                                //     text: text //retour de la demande 
                                // }
                                // smtpTransport.sendMail(mailOptions, function(error, response) {
                                //     if (error) {
                                //         return res.json(error);
                                //     } else {
                                //         return res.status(200).json(demandeResult);
                                //     }
                                // });
                                // return res.status(200).json('non validee')
                        }
                    }).catch((err) => {
                    res.status(500).json({ 'impossible de mettre a jour ': err });
                })
            }).catch((err) => {
            return res.status(500).json({ 'erreur serveur ': err.message });
        })
    },

    // updateStatutDemande: (req, res) => {
    //     const statut = req.body.statut;
    //     const text = req.body.text
    //     const id = req.params.id
    //     models.Demande.findOne({
    //         include: [{
    //                 model: models.User
    //             },
    //             {
    //                 model: models.Service
    //             }
    //         ],
    //         where: { id: id }
    //     }).then(
    //         (demandeFound) => {
    //             demandeFound.update({
    //                 UserId: demandeFound.UserId,
    //                 ServiceId: demandeFound.ServiceId,
    //                 date_realisation: demandeFound.date_debut_souhaitee,
    //                 disponibilite: disponiblite,
    //                 titre: demandeFound.titre,
    //                 description: demandeFound.description,
    //                 statut: statut ? _.capitalize(statut) : demandeFound.statut
    //             }).then((demandeResult) => {
    //                 if (demandeResult.statut !== 'Traitee' || demandeResult.statut !== 'Nouvelle') {
    //                     if (demandeResult.statut === 'Validee') {
    //                         models.Session.create({
    //                             UserId: demandeResult.User.id,
    //                             DemandeId: demandeResult.id,
    //                         })
    //                         var mailOptions = {
    //                                 from: process.env.GMAIL_USER,
    //                                 to: demandeFound.User.email,
    //                                 subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
    //                                 text: text //retour de la demande
    //                             }
    //                             //return res.json(mailOptions);
    //                         smtpTransport.sendMail(mailOptions, function(error, response) {
    //                             if (error) {
    //                                 return res.json(error);
    //                             } else {
    //                                 return res.status(200).json(demandeResult);
    //                             }
    //                         });
    //                     } else {
    //                         if (demandeResult.statut === 'Traitee') {
    //                             demandeResult.update({
    //                                 date_fin: new Date()
    //                             })
    //                         } else {
    //                             var mailOptions = {
    //                                 from: process.env.GMAIL_USER,
    //                                 to: demandeResult.User.email,
    //                                 subject: 'Feedback sur votre demande du service ' + demandeResult.Service.libelle,
    //                                 text: text
    //                             }
    //                             smtpTransport.sendMail(mailOptions, function(error, response) {
    //                                 if (error) {
    //                                     return res.json(error);
    //                                 } else {
    //                                     return res.status(200).json(demandeResult);
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 } else {
    //                     return res.status(200).json(demandeResult);
    //                 }
    //                 //return res.json(demandeResult);
    //             }).catch((err) => {
    //                 res.status(500).json({ 'impossible de mettre a jour ': err });
    //             })
    //         }
    //     ).catch((err) => {
    //         return res.status(500).json({ 'erreur serveur ': err });
    //     })
    // },
}