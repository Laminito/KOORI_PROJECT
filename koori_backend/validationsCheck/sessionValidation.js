const { check } = require('express-validator')
const modelSession = require('../models')
const _ = require('lodash');
module.exports.validate = (method) => {
    switch (method) {

        case 'createEvaluation_session':
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