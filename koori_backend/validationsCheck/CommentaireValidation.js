const { check } = require('express-validator')
const model = require('../models')
const _ = require('lodash');

module.exports.validate = (method) => {
    switch (method) {
        case 'createCommentaire':
        case 'updateCommentaire':

            return [
                check('content')
                .notEmpty()
                .withMessage('Veuillez renseigner une description ')
                .isString()
                .withMessage('entrez une chaine de caractere ')
                .trim()
            ]
    }
}