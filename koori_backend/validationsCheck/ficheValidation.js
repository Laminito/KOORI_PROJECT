const { check } = require('express-validator')
const modelFiche = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Fiche Validation
        case 'createFiche':
        case 'updateFiche':
            return [
                check('titre', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim(),
                check('prerequis', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim(),
                check('dureeMin', 'entrer un entier')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isNumeric()
                .withMessage('Veuillez renseigner un entier')
                .trim(),
                check('dureeMax', 'entrer un entier')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isNumeric()
                .withMessage('Veuillez renseigner un entier')
                .trim(),
                check('equipeMin', 'entrer une bonne taille')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isNumeric()
                .withMessage('Veuillez renseigner une bonne taille')
                .trim(),
                check('equipeMax', 'entrer une bonne taille')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isNumeric()
                .withMessage('Veuillez renseigner une bonne taille')
                .trim(),
                check('outils', 'entrer une chaine de caractere')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine')
                .trim()
            ];
    }
}