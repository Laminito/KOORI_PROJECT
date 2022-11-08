const express = require('express')
const evaluation_noteCtrl = require('../controllers/evaluation_noteCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Evaluation_note routes
const evaluation_noteRoute = new express.Router()

evaluation_noteRoute.post('/evaluation_note/user/:id/rapport/:id1', validator.evaluation_note.validate('createEvaluation_note'), evaluation_noteCtrl.createEvaluation_note);
evaluation_noteRoute.put('/evaluation_note/user/:id/rapport/:id1', evaluation_noteCtrl.updateEvaluation_note)
evaluation_noteRoute.get('/evaluation_note/user/:id/:idR?', evaluation_noteCtrl.getEvaluation_noteByUserId);
module.exports = evaluation_noteRoute