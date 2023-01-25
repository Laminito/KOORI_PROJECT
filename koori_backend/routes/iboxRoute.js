const express = require('express')
const iboxCtrl = require('../controllers/iboxCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");


//ibox routes

const iboxRoute = new express.Router();

    iboxRoute.get('/ibox/', iboxCtrl.getAllIbox);
    iboxRoute.get('/ibox/last', iboxCtrl.getLastIbox);
    iboxRoute.get('/ibox/:id', iboxCtrl.getIboxById);
    iboxRoute.post('/ibox/', iboxCtrl.createIbox);
    iboxRoute.put('/ibox/:id/', iboxCtrl.updateIbox);


module.exports = iboxRoute