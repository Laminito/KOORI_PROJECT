 const express = require('express')
 const rapportCtrl = require('../controllers/rapportCtrl');
 const validator = require('../validationsCheck/validationFilesRequire')
 const multer = require('../multer-config')
 const User = require("../models/user");


 //Rapport routes

 const rapportRoute = new express.Router();
 rapportRoute.post('/rapport/', multer, validator.rapport_phase.validate('createRapport'), rapportCtrl.createRapport)
 rapportRoute.put('/rapport/:id/', multer, validator.rapport_phase.validate('updateRapport'), rapportCtrl.updateRapport);
 rapportRoute.get('/rapport/:id/', rapportCtrl.getRapportById);
 rapportRoute.get('/user/:id/rapport', rapportCtrl.getRapportsByUser);
 rapportRoute.get('/rapport/', rapportCtrl.getAllRapport)

 module.exports = rapportRoute