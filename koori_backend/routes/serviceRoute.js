const express = require('express')
const serviceCtrl = require('../controllers/serviceCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user")

//Service routes

const serviceRouter = new express.Router();
serviceRouter.get('/service/', serviceCtrl.getAllService);
serviceRouter.get('/service/:id', serviceCtrl.getServiceById);
serviceRouter.post('/service/', multer, validator.service.validate('createService'), serviceCtrl.createService);
serviceRouter.put('/service/:id/', multer, validator.service.validate('updateService'), serviceCtrl.updateService);

module.exports = serviceRouter