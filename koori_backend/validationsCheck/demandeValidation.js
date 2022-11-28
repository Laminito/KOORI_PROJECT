const { check } = require('express-validator')
const modelDemande = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Demande Validation
        case 'createDemande':
            return [
                check('titre')
                .notEmpty()
                .withMessage('Le titre ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez renseigner une chaine'),
                check('description')
                .notEmpty()
                .withMessage('La description ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez entrer une description valide')
                .isLength({ min: 10 })
                .withMessage('Veuillez entrer au moins 10 caracteres'),
                check('date_realisation')
                .notEmpty()
                .withMessage('Veuillez choisir une date')
                .trim()
                .custom(value => {
                    return modelDemande.Demande.findOne({ where: { date_realisation: value } })
                        .then((demande) => {
                            if (demande) {
                                return Promise.reject('cette date est indisponible')
                            }
                        })
                })
            ];

            // ];
    }
}