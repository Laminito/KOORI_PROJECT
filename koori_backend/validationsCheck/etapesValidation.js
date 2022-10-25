const { check } = require('express-validator')
const model = require('../models')
const _ = require('lodash');

module.exports.validate = (method) => {
    switch (method) {
        // Etape Validation
        case 'createEtape':
        case 'updateEtape':
            return [
                check('titre', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Le libelle ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
                .custom(value => {
                    return model.Etape.findOne({ where: { titre: _.capitalize(value) } })
                        .then((etape) => {
                            if (etape) {
                                return Promise.reject('ce titre existe deja')
                            }
                        })
                }),
                check('description', )
                .notEmpty()
                .withMessage('veuillez saisir une description')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
            ]

    }
}