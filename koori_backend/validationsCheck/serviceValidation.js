const { check } = require('express-validator')
const modelService = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Service Validation
        case 'createService':
        case 'updateService':
            return [
                check('libelle')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('description', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('description_elements_service', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('benefices_client', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('indicateur_mesure_qualite', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('engagement_niveaux_service', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('plage_horaire', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('livrables', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
                check('suivi_gestion_relation_client', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
            ];
    }
}