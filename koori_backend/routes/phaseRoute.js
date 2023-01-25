const express = require('express')
const phaseCtrl = require('../controllers/phaseCtlr');



//Phase-Fiche

const phaseRoute = new express.Router();
phaseRoute.get('/phases/', phaseCtrl.getAllPhases);
// phaseRoute.get('/phase-fiche/', phaseCtrl.getPhasesFiches);
// phaseRoute.get('/phase-fiche/:id', phaseCtrl.getFiches);
// phaseRoute.get('/all_fiches_by_phase/:id', phaseCtrl.getFichesByPhase);

module.exports = phaseRoute