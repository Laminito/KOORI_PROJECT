// const express = require('express')
// const evaluation_ficheCtrl = require('../controllers/evaluation_ficheCtrl');
// const validator = require('../validationsCheck/validationFilesRequire')
// const multer = require('../multer-config')
// const User = require("../models/user");

// //Evaluation_Fiche routes
// const evaluation_ficheRoute = new express.Router()

// evaluation_ficheRoute.post('/evaluation_fiche/user/:id/fiche/:id1', validator.evaluation_fiche.validate('createEvaluation_fiche'), evaluation_ficheCtrl.createEvaluation_fiche);
// evaluation_ficheRoute.post('/evaluation/user/:id/fiche/:id1', evaluation_ficheCtrl.createEvaluation_fiche);
// evaluation_ficheRoute.get('/evaluation', evaluation_ficheCtrl.getAllEvaluation_fiche);
// evaluation_ficheRoute.get('/evaluation/fiche/:id', evaluation_ficheCtrl.getEvaluation_fiche);
// evaluation_ficheRoute.put('/evaluation/user/:id/fiche/:id1', evaluation_ficheCtrl.updateEvaluation_fiche);
// evaluation_ficheRoute.get('/evaluation/user/:id/fiche/:id1', evaluation_ficheCtrl.getEvaluation_ficheByUserId);
// module.exports = evaluation_ficheRoute