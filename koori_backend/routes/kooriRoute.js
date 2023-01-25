const express = require('express')
const kooriCtrl = require('../controllers/kooriCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");
//Koori routes

const kooriRoute = new express.Router();
kooriRoute.get('/koori/', kooriCtrl.getAllkoori);
kooriRoute.get('/koori/last', kooriCtrl.getLastKoori);
kooriRoute.get('/koori/:id', kooriCtrl.getKooriById);
kooriRoute.get('/koori/version/:version', kooriCtrl.getKooriByVersion);
kooriRoute.get('/version', kooriCtrl.getVersions);
kooriRoute.post('/koori/', kooriCtrl.createKoori);
kooriRoute.put('/koori/:id/', kooriCtrl.updateKoori);

module.exports = kooriRoute