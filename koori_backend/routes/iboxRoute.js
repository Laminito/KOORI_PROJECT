const express = require('express')
const iboxCtrl = require('../controllers/iboxCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");


//ibox routes

const iboxRoute = new express.Router();

iboxRoute.post('/ibox/', iboxCtrl.createIbox);
iboxRoute.put('/ibox/:id/', validator.koori.validate('updateIbox'), iboxCtrl.updateIbox);
iboxRoute.get('/lastibox/', iboxCtrl.getIbox);
// iboxRoute.get('/ibox/last', iboxCtrl.getLastIbox);
iboxRoute.get('/ibox/', iboxCtrl.getAllIbox);


module.exports = iboxRoute