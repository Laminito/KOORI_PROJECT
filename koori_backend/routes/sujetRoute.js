const express = require('express')
const sujetCtrl = require('../controllers/sujetCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user")

//sujet Route
const sujetRoute = new express.Router()
sujetRoute.get('/sujet/', sujetCtrl.getSujets);
sujetRoute.post('/sujet/', validator.sujet.validate('createSujet'), sujetCtrl.createSujet);
sujetRoute.put('/sujet/:id', validator.sujet.validate('updateSujet'), sujetCtrl.updateSujet);
sujetRoute.get('/sujet/:id', sujetCtrl.getSujetById);
sujetRoute.delete('/sujet/:id', sujetCtrl.deleteSujet);
//sujetRoute.route('/get/sujet/:id/user/:id').get(sujetCtrl.getSujetB);

module.exports = sujetRoute