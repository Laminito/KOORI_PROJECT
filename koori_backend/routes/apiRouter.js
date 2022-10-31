 let express = require('express');
 const multer = require('../multer-config')
 let profilCtrl = require('../controllers/profilCtrl');
 let contactCtrl = require('../controllers/contactCtrl');
 let userCtrl = require('../controllers/userCtrl');
 let aproposCtrl = require('../controllers/aproposCtrl');
 let commentaireCtrl = require('../controllers/commentaireCtrl');
 let sujetCtrl = require('../controllers/sujetCtrl');
 let etapesCtrl = require('../controllers/etapesCtrl')
 let ficheCtrl = require('../controllers/ficheCtrl');
 let kooriCtrl = require('../controllers/kooriCtrl');
 let iboxCtrl = require('../controllers/iboxCtrl');
 let serviceCtrl = require('../controllers/serviceCtrl');
 let rapportCtrl = require('../controllers/rapportCtrl')
 let phaseCtrl = require('../controllers/phaseCtlr')
 let validator = require('../validationsCheck/validationFilesRequire')
 let sessionCtrl = require('../controllers/sessionCtrl')
 let evaluation_noteCtrl = require('../controllers/evaluation_noteCtrl')
 let evaluation_kooriCtrl = require('../controllers/evaluation_kooriCtrl')
 let evaluation_iboxCtrl = require('../controllers/evaluation_iboxCtrl')
 let evaluation_ficheCtrl = require('../controllers/evaluation_ficheCtrl')
 let temoignageCtrl = require('../controllers/temoignageCtrl')
 let demandeCtrl = require('../controllers/demandeCtlr')

 exports.router = (() => {
     const apiRouter = express.Router();
     // Profils routes

     apiRouter.get('/profil/', profilCtrl.getProfils);
     apiRouter.post('/profil/', validator.profil.validate('createProfil'), profilCtrl.createProfil)
     apiRouter.put('/profil/:id/', validator.profil.validate('updateProfil'), profilCtrl.updateProfil);
     //  apiRouter.get('/profil/:id/', profilCtrl.getProfilById);
     //  apiRouter.delete('/profil/:id/', profilCtrl.deleteProfil);


     //User routes
     apiRouter.get('/user/', userCtrl.getUsers);
     apiRouter.get('/client/', userCtrl.getClients);
     apiRouter.post('/user/', multer, validator.user.validate('createUsers'), userCtrl.createUsers)
     apiRouter.put('/user/:id', multer, validator.user.validate('updateUser'), userCtrl.updateUser)
     apiRouter.get('/user/:id', userCtrl.getUserById);
     apiRouter.get('/user/profil/:id', userCtrl.getUserByProfil);
     apiRouter.delete('/user/:id', userCtrl.deleteUser);
     apiRouter.get('/demandes/user/:id/', userCtrl.getDemandesByUserId);

     //Contact routes
     apiRouter.post('/contact/', validator.contact.validate('createContact'), contactCtrl.createContact);
     apiRouter.get('/contact/', contactCtrl.getContact);
     apiRouter.get('/contact/:id', contactCtrl.getContactById);
     apiRouter.put('/contact/:id', validator.contact.validate('updateContact'), contactCtrl.updateContact);

     //Apropos routes
     apiRouter.get('/apropos/', aproposCtrl.getApropos);
     apiRouter.post('/apropos/', aproposCtrl.createApropos);
     apiRouter.put('/apropos/:id', aproposCtrl.updateApropos);

     //commentaire routes
     apiRouter.get('/commentaire/', commentaireCtrl.getCommentaires);
     apiRouter.post('/commentaire/', validator.commentaire.validate('createCommentaire'), commentaireCtrl.createCommentaire);
     apiRouter.get('/commentaire/:id', commentaireCtrl.getCommentaireById);
     apiRouter.delete('/commentaire/:id', commentaireCtrl.deleteCommentaire);

     //sujet Route
     apiRouter.get('/sujet/', sujetCtrl.getSujets);
     apiRouter.post('/sujet/', validator.sujet.validate('createSujet'), sujetCtrl.createSujet);
     apiRouter.put('/sujet/:id', validator.sujet.validate('updateSujet'), sujetCtrl.updateSujet);
     apiRouter.get('/sujet/:id', sujetCtrl.getSujetById);
     apiRouter.delete('/sujet/:id', sujetCtrl.deleteSujet);
     // apiRouter.route('/get/sujet/:id/user/:id').get(sujetCtrl.getSujetB);


     //Etapes
     apiRouter.get('/etape/', etapesCtrl.getEtapes);
     apiRouter.post('/etape/', validator.etape.validate('createEtape'), etapesCtrl.createEtape);
     apiRouter.put('/etape/:id', validator.etape.validate('updateEtape'), etapesCtrl.updateEtape);


     //Phase-Fiche
     apiRouter.get('/phase-fiche/', phaseCtrl.getPhasesFiches);
     apiRouter.get('/phase-fiche/:id', phaseCtrl.getFiches);
     apiRouter.get('/all_fiches_by_phase/:id', phaseCtrl.getFichesByPhase);


     //Fiches routes
     apiRouter.get('/fiche/', ficheCtrl.getFiches);
     apiRouter.get('/fiche/:id/', ficheCtrl.getFicheById);
     apiRouter.post('/fiche/', multer, validator.fiche.validate('createFiche'), ficheCtrl.createFiche)
     apiRouter.put('/fiche/:id/', multer, validator.fiche.validate('updateFiche'), ficheCtrl.updateFiche);

     //Koori routes
     apiRouter.get('/koori/last/', kooriCtrl.getLastKoori);
     apiRouter.get('/koori/version/:id', kooriCtrl.getKooriByVersion);
     apiRouter.get('/version', kooriCtrl.getVersions);

     //  apiRouter.post('/koori/', validator.koori.validate('createKoori'), kooriCtrl.createKoori);
     apiRouter.put('/koori/:id/', validator.koori.validate('updateKoori'), kooriCtrl.updateKoori);
     apiRouter.get('/koori/', kooriCtrl.getLastKoori);

     //Mailling
     //  apiRouter.post('/mail/koori', kooriCtrl.postMail);
     apiRouter.post('/mail/ibox/', kooriCtrl.postMailIbox);
     apiRouter.post('/mail/fiche/:id', kooriCtrl.postMailFiche);

     //ibox routes
     apiRouter.get('/ibox/last', iboxCtrl.getLastIbox);
     apiRouter.get('/ibox/', iboxCtrl.getIbox);
     apiRouter.put('/ibox/:id/', validator.koori.validate('updateIbox'), iboxCtrl.updateIbox);

     //Service routes

     apiRouter.get('/service/', serviceCtrl.getAllService);
     apiRouter.get('/service/:id', serviceCtrl.getServiceById);
     apiRouter.post('/service/', multer, validator.service.validate('createService'), serviceCtrl.createService);
     apiRouter.put('/service/:id/', multer, validator.service.validate('updateService'), serviceCtrl.updateService);

     //Session routes
     apiRouter.get('/session/', sessionCtrl.getSessions)
     apiRouter.get('/service/:id/session/', sessionCtrl.getSessionsByIdService)
     apiRouter.get('/session/rapport/:id', sessionCtrl.getSessionByIdRapport, )
     apiRouter.get('/rapport/:id/participant/', sessionCtrl.getParticipant)
     apiRouter.get('/sessions/user/:id/', sessionCtrl.getSessionsUser)
     apiRouter.get('/session/:id/', sessionCtrl.getSessionById)
     apiRouter.post('/evaluationSession/', validator.session.validate('createEvaluation_session'), sessionCtrl.evaluationSession)


     //Evaluation_note routes
     apiRouter.post('/evaluation_note/user/:id/rapport/:id1', validator.evaluation_note.validate('createEvaluation_note'), evaluation_noteCtrl.createEvaluation_note);
     apiRouter.put('/evaluation_note/user/:id/rapport/:id1', evaluation_noteCtrl.updateEvaluation_note)
     apiRouter.get('/evaluation_note/user/:id/:idR?', evaluation_noteCtrl.getEvaluation_noteByUserId);


     //Evaluation_Koori routes
     apiRouter.post('/evaluation_koori/user/:id/koori/:id1', validator.evaluation_koori.validate('createEvaluation_koori'), evaluation_kooriCtrl.createEvaluation_koori);
     apiRouter.put('/evaluation_koori/user/:id/koori/:id1', evaluation_kooriCtrl.updateEvaluation_koori)
     apiRouter.get('/evaluation_koori/user/:id/koori/:id1', evaluation_kooriCtrl.getEvaluation_kooriByUserId);
     apiRouter.get('/evaluation_koori/version/:id', evaluation_kooriCtrl.getEvaluation_koori);


     //Evaluation_Ibox routes
     apiRouter.post('/evaluation_ibox/user/:id/ibox/:id1', validator.evaluation_ibox.validate('createEvaluation_ibox'), evaluation_iboxCtrl.createEvaluation_ibox);
     apiRouter.put('/evaluation_ibox/user/:id/ibox/:id1', evaluation_iboxCtrl.updateEvaluation_ibox)
     apiRouter.get('/evaluation_ibox/user/:id/ibox/:id1', evaluation_iboxCtrl.getEvaluation_iboxByUserId);
     apiRouter.get('/evaluation_ibox', evaluation_iboxCtrl.getEvaluation_ibox);



     //Evaluation_Fiche routes
     apiRouter.post('/evaluation_fiche/user/:id/fiche/:id1', validator.evaluation_fiche.validate('createEvaluation_fiche'), evaluation_ficheCtrl.createEvaluation_fiche);
     apiRouter.put('/evaluation_fiche/user/:id/fiche/:id1', evaluation_ficheCtrl.updateEvaluation_fiche)
     apiRouter.get('/evaluation_fiche/user/:id/fiche/:id1', evaluation_ficheCtrl.getEvaluation_ficheByUserId);
     apiRouter.get('/evaluation_fiche/fiche/:id', evaluation_ficheCtrl.getEvaluation_fiche);



     //Temoignage routes
     apiRouter.post('/temoignage/', multer, validator.temoignage.validate('createTemoignage'), temoignageCtrl.createTemoignage)
     apiRouter.get('/temoignage/', temoignageCtrl.getTemoignages);
     apiRouter.get('/temoignage/:id/', temoignageCtrl.getTemoignageById);
     apiRouter.put('/temoignage/:id/', multer, validator.temoignage.validate('updateTemoignage'), temoignageCtrl.updateTemoignage);
     apiRouter.delete('/temoignage/:id/', temoignageCtrl.deleteTemoignage);

     //Rapport routes
     apiRouter.post('/rapport/', multer, validator.rapport_phase.validate('createRapport'), rapportCtrl.createRapport)
     apiRouter.get('/rapport/', rapportCtrl.getAllRapport)
     apiRouter.put('/rapport/:id/', multer, validator.rapport_phase.validate('updateRapport'), rapportCtrl.updateRapport);
     apiRouter.get('/rapport/:id/', rapportCtrl.getRapportById);
     apiRouter.get('/user/:id/rapport', rapportCtrl.getRapportsByUser);

     //Phase routes
     apiRouter.post('/phase/', multer, validator.rapport_phase.validate('createPhase'), phaseCtrl.createPhase);
     apiRouter.get('/phase/', phaseCtrl.getPhases);
     apiRouter.put('/phase/:id', multer, validator.rapport_phase.validate('updatePhase'), phaseCtrl.updatePhase);
     //  apiRouter.put('/phase/:id/koori/:id1', phaseCtrl.updatePhaseKoori);

     //Demande routes
     apiRouter.post('/demande/', validator.demande.validate('createDemande'), demandeCtrl.createDemande);
     apiRouter.post('/participant/', demandeCtrl.addParticipantsToSession);
     apiRouter.get('/demande/', demandeCtrl.getDemande);
     apiRouter.get('/service/:id/demande/', demandeCtrl.getDemandeByService);
     apiRouter.put('/demande/:id/', demandeCtrl.updateDemande);
     apiRouter.put('/statutdemande/:id/', demandeCtrl.updateStatutDemande);



     return apiRouter;
 })();