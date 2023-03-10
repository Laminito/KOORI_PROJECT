const express = require('express')
const phaseCtrl = require('../controllers/phase-ficheCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");


//Phase-Fiche

const phaseFicheRoute = new express.Router();


// phaseRoute.get('/phase-fiche/', phaseCtrl.getPhasesFiches);
// phaseRoute.get('/phase-fiche/:id', phaseCtrl.getFiches);
// phaseRoute.get('/all_fiches_by_phase/:id', phaseCtrl.getFichesByPhase);

phaseFicheRoute.get('/phase-fiche/',phaseCtrl.getPhaseFiches)
phaseFicheRoute.get('/phase-fiche/:id',phaseCtrl.getPhaseFicheById)

module.exports = phaseFicheRoute