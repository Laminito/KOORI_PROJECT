const express = require('express')
const ficheCtrl = require('../controllers/ficheCtrl');
// const validator = require('../validationsCheck/validationFilesRequire')
// const multer = require('../multer-config')
const User = require("../models/user");

//Fiche routes
const ficheRoute = new express.Router()
// ficheRoute.post('/fiche/', multer, validator.fiche.validate('createFiche'), ficheCtrl.createFiche)
// ficheRoute.get('/fiche/:id/', ficheCtrl.getFicheById);
// ficheRoute.put('/fiche/:id/', multer, validator.fiche.validate('updateFiche'), ficheCtrl.updateFiche);
ficheRoute.get('/fiche/', ficheCtrl.getAllFiches);

module.exports = ficheRoute