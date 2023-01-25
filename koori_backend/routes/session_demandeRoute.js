const express = require('express')
const session_demandeCtrl = require('../controllers/session_demandeCtrl');


//Session routes
const sessiondemandeRoute = new express.Router()
sessiondemandeRoute.get('/sessiondemande/',session_demandeCtrl.getAllSession_demande)


module.exports = sessiondemandeRoute