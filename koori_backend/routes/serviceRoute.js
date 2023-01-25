const express = require('express')
const serviceCtrl = require('../controllers/serviceCtrl');


//Service routes

const serviceRouter = new express.Router();
serviceRouter.get('/service/', serviceCtrl.getAllService);
serviceRouter.get('/service/:id', serviceCtrl.getServiceById);
serviceRouter.post('/service/', serviceCtrl.createService);
serviceRouter.put('/service/:id/', serviceCtrl.updateService);

module.exports = serviceRouter