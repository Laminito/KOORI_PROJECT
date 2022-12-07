const { check } = require('express-validator')
const model = require('../models')
const _ = require('lodash');

module.exports.validate = (method) => {
    switch (method) {
        case 'createContact':
        case 'updateContact':

            return [
                check('description', 'entrez une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner une description ')
                .isLength({ min: 10 })
                .withMessage('Veuillez renseigner une description ')
                .trim(),

                check('adresse', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner une adresse')
                .isString()
                .withMessage('Veuillez renseigner une adresse')
                .trim(),

                check('email', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isEmail()
                .withMessage('Veuillez renseigner un e-mail valide')
                .trim(),
                check('telephone', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                // .custom((val) => /[^A-za-z0-9\s]/g.test(val))
                .custom((val) => /7[7|6|8|0|5][0-9]{7}$/.test(val))
                .withMessage('Veuillez renseigner un numero de telephone valide')
                .trim(),

                check('disponibilite', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner votre heure de disponibilite')
                .trim(),
            ];
    }
}