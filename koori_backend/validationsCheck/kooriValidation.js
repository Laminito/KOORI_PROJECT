const { check } = require('express-validator')
const modelKoori = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Koori Validation
        case 'createKoori':
        case 'updateKoori':
            return [
                check('description', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner du texte')
                .trim(),
                check('quoi', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('quand', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('comment', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
            ];
            // ibox validation
        case 'updateIbox':
            return [
                check('description')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner du texte')
                .trim()
            ];
    }
}