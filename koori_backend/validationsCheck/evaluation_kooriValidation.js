const { check } = require('express-validator')
const modelEvaluation_koori = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {
        // Evaluation_koori Validation
        case 'createEvaluation_koori':
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