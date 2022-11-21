const { check } = require('express-validator')
const modelEvaluation_note = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Evaluation_note Validation
        case 'createEvaluation_note':
            return [
                check('evaluation', 'entrer une chaine de caracteres')
                .notEmpty()
                .withMessage('Donner une evaluation')
                .isString()
                .withMessage('Veuillez renseigner une chaine de caracteres')
                .trim(),
            ];
    }
}