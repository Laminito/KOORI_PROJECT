const express = require('express')
const etapesCtrl = require('../controllers/etapesCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Etapes
const etapeRoute = new express.Router()
etapeRoute.post('/etape/', validator.etape.validate('createEtape'), etapesCtrl.createEtape);
etapeRoute.put('/etape/:id', validator.etape.validate('updateEtape'), etapesCtrl.updateEtape);
etapeRoute.get('/etape/', etapesCtrl.getEtapes);

module.exports = etapeRoute