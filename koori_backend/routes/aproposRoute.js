const express = require('express')
const aproposCtrl = require('../controllers/aproposCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Apropos routes
const aproposRoute = new express.Router();
aproposRoute.post('/apropos/', aproposCtrl.createApropos);
aproposRoute.put('/apropos/:id', aproposCtrl.updateApropos);
aproposRoute.get('/apropos/', aproposCtrl.getApropos);

module.exports = aproposRoute

