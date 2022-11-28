const { check } = require('express-validator')
const modelEvaluation_ibox = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Evaluation_koori Validation
        case 'createEvaluation_ibox':
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