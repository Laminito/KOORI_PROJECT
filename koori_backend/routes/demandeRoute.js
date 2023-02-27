const express = require('express')
const demandeCtrl = require('../controllers/demandeCtlr');
const multer = require('../multer-config')
const User = require("../models/user");
const upload = require("../middleware/upload");

//Demande routes

const demandeRoute = new express.Router();

// demandeRoute.post("/demande/upload/", upload.single("file"), demandeCtrl.upload);
demandeRoute.get('/demande/', demandeCtrl.getDemande);
demandeRoute.get('/demande/:id', demandeCtrl.getDemandeById);
demandeRoute.put('/demande/:id/', demandeCtrl.updateDemande);
// demandeRoute.get('/demande/:id/service', demandeCtrl.getDemandeByService);
demandeRoute.post('/demande/user/:id/service/:id1', demandeCtrl.createDemande);


module.exports = demandeRoute