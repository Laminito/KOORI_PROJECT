const express = require('express')
const sessionCtrl = require('../controllers/sessionCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user")

//Session routes
const sessionRoute = new express.Router()
sessionRoute.get('/session/', sessionCtrl.getSessions)
sessionRoute.get('/service/:id/session/', sessionCtrl.getSessionsByIdService)
sessionRoute.get('/session/rapport/:id', sessionCtrl.getSessionByIdRapport, )
sessionRoute.get('/rapport/:id/participant/', sessionCtrl.getParticipant)
sessionRoute.get('/sessions/user/:id/', sessionCtrl.getSessionsUser)
sessionRoute.get('/session/:id/', sessionCtrl.getSessionById)
sessionRoute.post('/evaluationSession/', validator.session.validate('createEvaluation_session'), sessionCtrl.evaluationSession)

module.exports = sessionRoute