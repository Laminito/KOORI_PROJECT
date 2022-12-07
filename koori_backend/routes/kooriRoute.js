const express = require('express')
const kooriCtrl = require('../controllers/kooriCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");
//Koori routes

const kooriRoute = new express.Router();
kooriRoute.post('/koori/', validator.koori.validate('createKoori'), kooriCtrl.createKoori);
kooriRoute.get('/koori/last', kooriCtrl.getLastKoori);
kooriRoute.get('/koori/version/:id', kooriCtrl.getKooriByVersion);
kooriRoute.get('/version', kooriCtrl.getVersions);
kooriRoute.put('/koori/:id/', validator.koori.validate('updateKoori'), kooriCtrl.updateKoori);
kooriRoute.get('/koori/', kooriCtrl.getKoori);

module.exports = kooriRoute