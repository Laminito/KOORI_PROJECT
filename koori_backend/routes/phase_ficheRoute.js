const express = require('express')
const phaseFicheCtrl = require('../controllers/phase_ficheCtrl');


//Phase_Fiche routes

const PhaseFicheRoute = new express.Router();
PhaseFicheRoute.get('/phasefiche/', phaseFicheCtrl.getAllPhase_fiche)

module.exports = PhaseFicheRoute