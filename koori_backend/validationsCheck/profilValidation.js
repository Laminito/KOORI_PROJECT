const { check } = require('express-validator')
const modelProfil = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Profil Validation
        case 'createProfil':
        case 'updateProfil':
            return [
                check('libelle', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Le libelle ne doit pas etre vide')
                .isAlpha()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
                .custom(value => {
                    return modelProfil.Profil.findOne({ where: { libelle: _.capitalize(value) } })
                        .then((profil) => {
                            if (profil) {
                                return Promise.reject('libelle existe deja')
                            }
                        })
                })
            ];
    }
}