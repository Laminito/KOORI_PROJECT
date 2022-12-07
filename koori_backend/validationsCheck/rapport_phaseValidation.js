const { check } = require('express-validator');

module.exports.validate = (method) => {
    switch (method) {
        case 'createRapport':
        case 'updateRapport':
        case 'createPhase':
        case 'updatePhase':
            return [
                check('titre')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Entrer du texte')
                .trim(),
                check('description')
                .notEmpty()
                .withMessage('Veuillez renseigner le champs')
                .isString()
                .withMessage('Entrer du texte')
                .trim(),
            ];
    }
}