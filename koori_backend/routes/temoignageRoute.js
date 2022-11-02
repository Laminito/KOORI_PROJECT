const express = require('express')
const temoignageCtrl = require('../controllers/temoignageCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");


//Phase-Fiche

const temoignageRoute = new express.Router(); //  //Temoignage routes
temoignageRoute.post('/temoignage/', multer, validator.temoignage.validate('createTemoignage'), temoignageCtrl.createTemoignage)
temoignageRoute.get('/temoignage/:id/', temoignageCtrl.getTemoignageById);
temoignageRoute.put('/temoignage/:id/', multer, validator.temoignage.validate('updateTemoignage'), temoignageCtrl.updateTemoignage);
temoignageRoute.delete('/temoignage/:id/', temoignageCtrl.deleteTemoignage);
temoignageRoute.get('/temoignage/', temoignageCtrl.getTemoignages);

module.exports = temoignageRoute