const express = require('express')
const kooriCtrl = require('../controllers/kooriCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Mailling
const mailRouter = new express.Router();
mailRouter.post('/mail/koori', kooriCtrl.postMail);
mailRouter.post('/mail/ibox', kooriCtrl.postMailIbox);
mailRouter.post('/mail/fiche/:id', kooriCtrl.postMailFiche);

module.exports = mailRouter