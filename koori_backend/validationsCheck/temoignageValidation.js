const { check } = require('express-validator')
const modelTemoignage = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Temoignage Validation
        case 'createTemoignage':
        case 'updateTemoignage':
            return [
                check('nomComplet', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Le nom ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim(),
                check('message', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Le message ne doit pas etre vide')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
            ];
    }
}