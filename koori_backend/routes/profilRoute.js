const express = require('express')
const profilCtrl = require('../controllers/profilCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

const profilRoute = new express.Router();
profilRoute.get('/profil/', profilCtrl.getProfils);
profilRoute.post('/profil/', validator.profil.validate('createProfil'), profilCtrl.createProfil)
profilRoute.put('/profil/:id/', validator.profil.validate('updateProfil'), profilCtrl.updateProfil);
profilRoute.get('/profil/:id/', profilCtrl.getProfilById);
profilRoute.delete('/profil/:id/', profilCtrl.deleteProfil);
module.exports = profilRoute;