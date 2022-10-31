const express = require('express')
const aproposCtrl = require('../controllers/aproposCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Apropos routes
const aproposRoute = new express.Router();
aproposRoute.get('/apropos/', aproposCtrl.getApropos);
aproposRoute.post('/apropos/', aproposCtrl.createApropos);
aproposRoute.put('/apropos/:id', aproposCtrl.updateApropos);

module.exports = aproposRoute