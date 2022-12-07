const { check } = require('express-validator')
const model = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Profil Validation
        case 'createSujet':
        case 'updateSujet':
            return [
                check('libelle', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Le libelle ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
                .custom(value => {
                    return model.Sujet.findOne({ where: { libelle: value } })
                        .then((sujet) => {
                            if (sujet) {
                                return Promise.reject('ce sujet a deja éte proposé')
                            }
                        })
                }),

            ];
    }
}