// const express = require('express')
// const evaluation_kooriCtrl = require('../controllers/evaluation_kooriCtrl');
// const validator = require('../validationsCheck/validationFilesRequire')
// const multer = require('../multer-config')
// const User = require("../models/user");

// //Evaluation_Koori routes
// const evaluation_kooriRoute = new express.Router()
//     // evaluation_kooriRoute.post('/evaluation_koori/user/:id/koori/:id1', validator.evaluation_koori.validate('createEvaluation_koori'), evaluation_kooriCtrl.createEvaluation_koori);
// evaluation_kooriRoute.get('/evaluation', evaluation_kooriCtrl.getAllEvaluation_koori);
// evaluation_kooriRoute.post('/evaluation/user/:id/koori/:id1', evaluation_kooriCtrl.createEvaluation_koori);
// evaluation_kooriRoute.put('/evaluation/user/:id/koori/:id1', evaluation_kooriCtrl.updateEvaluation_koori)
// evaluation_kooriRoute.get('/evaluation/user/:id/koori/:id1', evaluation_kooriCtrl.getEvaluation_kooriByUserId);
// evaluation_kooriRoute.get('/evaluation/version/:id', evaluation_kooriCtrl.getEvaluation_kooriByVersion);

// module.exports = evaluation_kooriRoute