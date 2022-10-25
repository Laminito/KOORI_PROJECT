 let express = require('express');
 const multer = require('../multer-config')
 let profilCtrl = require('../controllers/profilCtrl');
 //  let aproposCtrl = require('../controllers/aproposCtrl');
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
     apiRouter.get('/user/', userCtrl.getUsers);


     //  apiRouter.post('/add/profil/', validator.profil.validate('createProfil'), profilCtrl.createProfil)
     // apiRouter.route('/get/profils/').get(profilCtrl.getProfils);
     // apiRouter.route('/get/profil/:id/').get(profilCtrl.getProfilById);
     // apiRouter.put('/update/profil/:id/', validator.profil.validate('updateProfil'), profilCtrl.updateProfil);
     // apiRouter.route('/delete/profil/:id/').delete(profilCtrl.deleteProfil);


     // User routes
     apiRouter.get('/user/', userCtrl.getUsers);
     //  apiRouter.get('/get/client/', userCtrl.getClients);
     //  apiRouter.post('/add/user/', multer, validator.user.validate('createUsers'), userCtrl.createUsers)
     //  apiRouter.put('/update/user/:id', multer, validator.user.validate('updateUser'), userCtrl.updateUser)
     //  apiRouter.route('/get/user/:id').get(userCtrl.getUserById);
     //  apiRouter.route('/get/user/profil/:id').get(userCtrl.getUserByProfil);
     //  apiRouter.route('/delete/user/:id').delete(userCtrl.deleteUser);
     //  apiRouter.route('/get/demandes/user/:id/').get(userCtrl.getDemandesByUserId);

     // // Contact routes
     // apiRouter.post('/add/contact/', validator.contact.validate('createContact'), contactCtrl.createContact);
     // apiRouter.route('/get/contact/').get(contactCtrl.getContact);
     // apiRouter.route('/get/contact/:id').get(contactCtrl.getContactById);
     // apiRouter.put('/update/contact/:id', validator.contact.validate('updateContact'), contactCtrl.updateContact);

     // // Apropos routes
     // apiRouter.route('/add/apropos/').post(aproposCtrl.createApropos);
     // apiRouter.route('/get/apropos/').get(aproposCtrl.getApropos);
     // apiRouter.route('/update/apropos/:id').put(aproposCtrl.updateApropos);

     // // //commentaire routes
     // apiRouter.route('/get/commentaire/').get(commentaireCtrl.getCommentaires);
     // apiRouter.post('/add/commentaire/', validator.commentaire.validate('createCommentaire'), commentaireCtrl.createCommentaire);
     // apiRouter.route('/get/commentaire/:id').get(commentaireCtrl.getCommentaireById);
     // apiRouter.route('/delete/commentaire/:id').delete(commentaireCtrl.deleteCommentaire);

     // // //sujet Route
     // apiRouter.route('/get/sujet/').get(sujetCtrl.getSujets);
     // apiRouter.post('/add/sujet/', validator.sujet.validate('createSujet'), sujetCtrl.createSujet);
     // apiRouter.put('/update/sujet/:id', validator.sujet.validate('updateSujet'), sujetCtrl.updateSujet);
     // apiRouter.route('/get/sujet/:id').get(sujetCtrl.getSujetById);
     // apiRouter.route('/delete/sujet/:id').delete(sujetCtrl.deleteSujet);
     // // apiRouter.route('/get/sujet/:id/user/:id').get(sujetCtrl.getSujetB);


     // //Etapes
     // apiRouter.route('/get/etapes/').get(etapesCtrl.getEtapes);
     // apiRouter.post('/add/etapes/', validator.etape.validate('createEtape'), etapesCtrl.createEtape);
     // apiRouter.put('/update/etapes/:id', validator.etape.validate('updateEtape'), etapesCtrl.updateEtape);


     // //Phase-Fiche
     // apiRouter.route('/get/phase-fiche/:id').get(phaseCtrl.getFiches);
     // apiRouter.route('/get/phase-fiche/').get(phaseCtrl.getPhasesFiches);
     // apiRouter.route('/get/phase/fiche/:id').get(phaseCtrl.getFichesByPhase);


     // // Fiches routes
     // apiRouter.post('/add/fiche/', multer, validator.fiche.validate('createFiche'), ficheCtrl.createFiche)
     // apiRouter.put('/update/fiche/:id/', multer, validator.fiche.validate('updateFiche'), ficheCtrl.updateFiche);
     // apiRouter.route('/get/fiche/:id/').get(ficheCtrl.getFicheById);
     // apiRouter.route('/get/fiches/').get(ficheCtrl.getFiches);

     // // Koori routes
     // apiRouter.route('/get/koori/last').get(kooriCtrl.getLastKoori);
     // apiRouter.route('/get/koori/version/:id').get(kooriCtrl.getKooriByVersion);
     // apiRouter.route('/get/versions').get(kooriCtrl.getVersions);
     // /*apiRouter.route('/get/koori/').get(kooriCtrl.getKoori);*/
     // apiRouter.post('/add/koori/', validator.koori.validate('createKoori'), kooriCtrl.createKoori);
     // apiRouter.put('/update/koori/:id/', validator.koori.validate('updateKoori'), kooriCtrl.updateKoori);
     // //Mailling
     // apiRouter.route('/post/mail/koori').post(kooriCtrl.postMail);
     // apiRouter.route('/post/mail/ibox').post(kooriCtrl.postMailIbox);
     // apiRouter.route('/post/mail/fiche/:id').post(kooriCtrl.postMailFiche);

     // // ibox routes
     // apiRouter.route('/get/ibox/last').get(iboxCtrl.getLastIbox);
     // apiRouter.route('/get/ibox/').get(iboxCtrl.getIbox);
     // apiRouter.put('/update/ibox/:id/', validator.koori.validate('updateIbox'), iboxCtrl.updateIbox);

     // // Service routes

     // apiRouter.get('/get/services/', serviceCtrl.getAllService);
     // apiRouter.route('/get/service/:id').get(serviceCtrl.getServiceById);
     // apiRouter.post('/add/service/', multer, validator.service.validate('createService'), serviceCtrl.createService);
     // apiRouter.put('/update/service/:id/', multer, validator.service.validate('updateService'), serviceCtrl.updateService);

     // // Session routes
     // apiRouter.get('/get/sessions/', sessionCtrl.getSessions)
     // apiRouter.route('/service/:id/sessions/').get(sessionCtrl.getSessionsByIdService)
     // apiRouter.route('/session/rapport/:id').get(sessionCtrl.getSessionByIdRapport, )
     // apiRouter.get('/get/rapport/:id/participants/', sessionCtrl.getParticipant)
     // apiRouter.get('/get/sessions/user/:id/', sessionCtrl.getSessionsUser)
     // apiRouter.get('/session/:id/', sessionCtrl.getSessionById)
     // apiRouter.post('/add/evaluationSession/', validator.session.validate('createEvaluation_session'), sessionCtrl.evaluationSession)


     // // Evaluation_note routes
     // apiRouter.post('/add/evaluation_note/user/:id/rapport/:id1', validator.evaluation_note.validate('createEvaluation_note'), evaluation_noteCtrl.createEvaluation_note);
     // apiRouter.put('/update/evaluation_note/user/:id/rapport/:id1', evaluation_noteCtrl.updateEvaluation_note)
     // apiRouter.route('/get/evaluation_note/user/:id/:idR?').get(evaluation_noteCtrl.getEvaluation_noteByUserId);


     // // Evaluation_Koori routes
     // apiRouter.post('/add/evaluation_koori/user/:id/koori/:id1', validator.evaluation_koori.validate('createEvaluation_koori'), evaluation_kooriCtrl.createEvaluation_koori);
     // apiRouter.put('/update/evaluation_koori/user/:id/koori/:id1', evaluation_kooriCtrl.updateEvaluation_koori)
     // apiRouter.route('/get/evaluation_koori/user/:id/koori/:id1').get(evaluation_kooriCtrl.getEvaluation_kooriByUserId);
     // apiRouter.route('/get/evaluation_koori/version/:id').get(evaluation_kooriCtrl.getEvaluation_koori);


     // // Evaluation_Ibox routes
     // apiRouter.post('/add/evaluation_ibox/user/:id/ibox/:id1', validator.evaluation_ibox.validate('createEvaluation_ibox'), evaluation_iboxCtrl.createEvaluation_ibox);
     // apiRouter.put('/update/evaluation_ibox/user/:id/ibox/:id1', evaluation_iboxCtrl.updateEvaluation_ibox)
     // apiRouter.route('/get/evaluation_ibox/user/:id/ibox/:id1').get(evaluation_iboxCtrl.getEvaluation_iboxByUserId);
     // apiRouter.route('/get/evaluation_ibox').get(evaluation_iboxCtrl.getEvaluation_ibox);



     // // Evaluation_Fiche routes
     // apiRouter.post('/add/evaluation_fiche/user/:id/fiche/:id1', validator.evaluation_fiche.validate('createEvaluation_fiche'), evaluation_ficheCtrl.createEvaluation_fiche);
     // apiRouter.put('/update/evaluation_fiche/user/:id/fiche/:id1', evaluation_ficheCtrl.updateEvaluation_fiche)
     // apiRouter.route('/get/evaluation_fiche/user/:id/fiche/:id1').get(evaluation_ficheCtrl.getEvaluation_ficheByUserId);
     // apiRouter.route('/get/evaluation_fiche/fiche/:id').get(evaluation_ficheCtrl.getEvaluation_fiche);



     // // Temoignage routes
     // apiRouter.post('/add/temoignage/', multer, validator.temoignage.validate('createTemoignage'), temoignageCtrl.createTemoignage)
     // apiRouter.route('/get/temoignages/').get(temoignageCtrl.getTemoignages);
     // apiRouter.route('/get/temoignage/:id/').get(temoignageCtrl.getTemoignageById);
     // apiRouter.put('/update/temoignage/:id/', multer, validator.temoignage.validate('updateTemoignage'), temoignageCtrl.updateTemoignage);
     // apiRouter.route('/delete/temoignage/:id/').delete(temoignageCtrl.deleteTemoignage);

     // // Rapport routes
     // apiRouter.post('/add/rapport/', multer, validator.rapport_phase.validate('createRapport'), rapportCtrl.createRapport)
     // apiRouter.get('/get/rapports/', rapportCtrl.getAllRapport)
     // apiRouter.put('/update/rapport/:id/', multer, validator.rapport_phase.validate('updateRapport'), rapportCtrl.updateRapport);
     // apiRouter.get('/rapport/:id/', rapportCtrl.getRapportById);
     // apiRouter.get('/get/user/:id/rapports', rapportCtrl.getRapportsByUser);

     // // Phase routes
     // apiRouter.post('/add/phase/', multer, validator.rapport_phase.validate('createPhase'), phaseCtrl.createPhase);
     // apiRouter.get('/get/phases/', phaseCtrl.getPhases);
     // apiRouter.put('/update/phase/:id', multer, validator.rapport_phase.validate('updatePhase'), phaseCtrl.updatePhase);
     // //apiRouter.put('/update/phase/:id/koori/:id1',phaseCtrl.updatePhaseKoori);

     // // Demande routes
     // apiRouter.post('/add/demande/', validator.demande.validate('createDemande'), demandeCtrl.createDemande);
     // apiRouter.post('/add/participants/', demandeCtrl.addParticipantsToSession);
     // apiRouter.get('/get/demandes/', demandeCtrl.getDemande);
     // apiRouter.get('/get/service/:id/demandes/', demandeCtrl.getDemandeByService);
     // apiRouter.put('/update/demande/:id/', demandeCtrl.updateDemande);
     // apiRouter.put('/update/statutdemande/:id/', demandeCtrl.updateStatutDemande);

     return apiRouter;
 })();