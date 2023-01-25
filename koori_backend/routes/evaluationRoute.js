const express = require('express')
const evaluationCtrl = require('../controllers/evaluationCtrl');

//Evaluation_note routes
const evaluationRoute = new express.Router()

// evaluationRoute.post('/evaluation/user/:id/demande/:id1',evaluation_noteCtrl.createEvaluation_note);
// evaluationRoute.put('/evaluation/user/:id/demande/:id1', evaluation_noteCtrl.updateEvaluation_note)
evaluationRoute.get('/evaluations', evaluationCtrl.getAllEvaluations);
evaluationRoute.get('/evaluations/koori', evaluationCtrl.getAllEvaluationsKoori);
evaluationRoute.get('/evaluations/ibox', evaluationCtrl.getAllEvaluationsIbox);
evaluationRoute.get('/evaluations/rapport', evaluationCtrl.getAllEvaluationsRapport);
evaluationRoute.get('/evaluations/session', evaluationCtrl.getAllEvaluationsSession);
evaluationRoute.get('/evaluations/fiche', evaluationCtrl.getAllEvaluationsFiche);


// evaluationRoute.post('/evaluations/user/:id/{}/:id', evaluationCtrl.getAllEvaluations);
module.exports = evaluationRoute