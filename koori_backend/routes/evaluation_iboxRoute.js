// const express = require('express')
// const evaluation_iboxCtrl = require('../controllers/evaluation_iboxCtrl');
// const validator = require('../validationsCheck/validationFilesRequire')
// const multer = require('../multer-config')
// const User = require("../models/user");

// //Evaluation_Ibox routes
// const evaluation_IboxRoute = new express.Router()
//     // evaluation_IboxRoute.post('/evaluation_ibox/user/:id/ibox/:id1', validator.evaluation_ibox.validate('createEvaluation_ibox'), evaluation_iboxCtrl.createEvaluation_ibox);

// evaluation_IboxRoute.get('/evaluation/', evaluation_iboxCtrl.getAllEvaluation_fiche);
// evaluation_IboxRoute.post('/evaluation/user/:id/ibox/:id1', evaluation_iboxCtrl.createEvaluation_ibox);
// evaluation_IboxRoute.put('/evaluation/user/:id/ibox/:id1', evaluation_iboxCtrl.updateEvaluation_ibox);
// evaluation_IboxRoute.get('/evaluation/user/:id/ibox/:id1', evaluation_iboxCtrl.getEvaluation_iboxByUserId);
// evaluation_IboxRoute.get('/evaluation', evaluation_iboxCtrl.getEvaluation_ibox);

// module.exports = evaluation_IboxRoute