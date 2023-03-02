const express = require('express')
const evaluationCtrl = require('../controllers/evaluationCtrl');

//Evaluation Routes
const evaluationRoute = new express.Router()

//GET
evaluationRoute.get('/evaluations', evaluationCtrl.getAllEvaluations);
evaluationRoute.get('/evaluations/koori', evaluationCtrl.getAllEvaluationsKoori);
evaluationRoute.get('/evaluations/ibox', evaluationCtrl.getAllEvaluationsIbox);
evaluationRoute.get('/evaluations/rapport', evaluationCtrl.getAllEvaluationsRapport);
evaluationRoute.get('/evaluations/session', evaluationCtrl.getAllEvaluationsSession);
evaluationRoute.get('/evaluations/fiche', evaluationCtrl.getAllEvaluationsFiche);

//GET BY ID
evaluationRoute.get('/evaluations/:id', evaluationCtrl.getEvaluationById);
// evaluationRoute.get('/evaluations/ibox/:id', evaluationCtrl.getEvaluationIboxById);
// evaluationRoute.get('/evaluations/koori/:id', evaluationCtrl.getEvaluationKooriById);
// evaluationRoute.get('/evaluations/fiche/:id', evaluationCtrl.getEvaluationFicheById);
evaluationRoute.get('/evaluations/:id/user/:id1', evaluationCtrl.getEvaluationFicheByUserId);

// evaluationRoute.get('/evaluations/rapport/:id', evaluationCtrl.getEvaluationRapportById);


//POST
evaluationRoute.post('/evaluations/note/user/:id/rapport/:id1',evaluationCtrl.createEvaluationRapport);
evaluationRoute.post('/evaluations/note/user/:id/fiche/:id1', evaluationCtrl.createEvaluationFiche);
evaluationRoute.post('/evaluations/note/user/:id/koori/:id1', evaluationCtrl.createEvaluationKoori);
evaluationRoute.post('/evaluations/note/user/:id/ibox/:id1', evaluationCtrl.createEvaluationIbox);
// evaluationRoute.get('/evaluation_note/user/:id/:idR?', evaluation_noteCtrl.getEvaluation_noteByUserId);



module.exports = evaluationRoute