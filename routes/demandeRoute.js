const express = require('express')
const demandeCtrl = require('../controllers/demandeCtlr');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Demande routes

const demandeRoute = new express.Router();

demandeRoute.post('/demande/', demandeCtrl.createDemande);
// demandeRoute.post('/participant/', demandeCtrl.addParticipantsToSession);
demandeRoute.get('/service/:id/demande/', demandeCtrl.getDemandeByService);
demandeRoute.put('/demande/:id/', demandeCtrl.updateDemande);
demandeRoute.put('/statutdemande/:id/', demandeCtrl.updateStatutDemande);
demandeRoute.get('/demande/', demandeCtrl.getDemande);
demandeRoute.get('/demande/user/:id', demandeCtrl.getDemandeByUserId);


module.exports = demandeRoute