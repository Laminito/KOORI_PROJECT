const { check } = require('express-validator')
const model = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Profil Validation
        case 'createUsers':
        case 'updateUser':
            return [
                check('nomComplet')
                .notEmpty()
                .withMessage('Veuillez renseigner votre nom et prenom'),
                check('email', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner un email')
                .isEmail()
                .custom(value => {
                    return model.User.findOne({ where: { email: value } })
                        .then((User) => {
                            if (User) {
                                return Promise.reject('ce mail existe deja')
                            }
                        })
                }),
                check('profession')
                .notEmpty()
                .withMessage('Veuillez renseigner votre profession')
                .isString(),
                check('service')
                .notEmpty()
                .withMessage('Veuillez renseigner un service')
                .isString()
                .trim(),
                check('departement')
                .notEmpty()
                .isString()
                .withMessage('Veuillez renseigner le departement'),

                check('direction')
                .isString()
                .withMessage('Veuillez renseigner la direction')
                .trim(),
            ];
    }
}