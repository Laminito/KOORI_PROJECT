const express = require('express')
const commentaireCtrl = require('../controllers/commentaireCtrl');
const validator = require('../validationsCheck/validationFilesRequire')
const multer = require('../multer-config')
const User = require("../models/user");


//commentaire routes
const commentaireRoute = new express.Router();

commentaireRoute.get('/commentaire/', commentaireCtrl.getCommentaires);
commentaireRoute.post('/commentaire/', validator.commentaire.validate('createCommentaire'), commentaireCtrl.createCommentaire);
commentaireRoute.get('/commentaire/:id', commentaireCtrl.getCommentaireById);
commentaireRoute.delete('/commentaire/:id', commentaireCtrl.deleteCommentaire);

module.exports = commentaireRoute