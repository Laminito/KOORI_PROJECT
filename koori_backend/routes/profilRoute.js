const express = require('express')
const profilCtrl = require('../controllers/profilCtrl');


const profilRoute = new express.Router();
profilRoute.post('/profil/', profilCtrl.createProfil)
profilRoute.get('/profil/', profilCtrl.getAllProfils);
profilRoute.get('/profil/:id/', profilCtrl.getProfilById);
profilRoute.put('/profil/:id/', profilCtrl.updateProfil);
profilRoute.delete('/profil/:id/', profilCtrl.deleteProfil);
module.exports = profilRoute;