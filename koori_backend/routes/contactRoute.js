const express = require('express')
const contactCtrl = require('../controllers/contactCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");

//Contact routes

const contactRoute = new express.Router();

contactRoute.post('/contact/', validator.contact.validate('createContact'), contactCtrl.createContact);
contactRoute.get('/contact/', contactCtrl.getContact);
contactRoute.get('/contact/:id', contactCtrl.getContactById);
contactRoute.put('/contact/:id', validator.contact.validate('updateContact'), contactCtrl.updateContact);

module.exports = contactRoute