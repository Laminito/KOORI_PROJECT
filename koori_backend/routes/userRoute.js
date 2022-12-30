 const express = require('express')
 const userCtrl = require('../controllers/userCtrl');
 const multer = require('../multer-config')
 const validator = require('../validationsCheck/validationFilesRequire')
 const router = express.Router();

 //User routes

 const userRouter = new express.Router();
 userRouter.get('/user/', userCtrl.getUsers);
 userRouter.get('/client/', userCtrl.getClients);
 //  userRouter.post('/user/', multer, validator.user.validate('createUsers'), userCtrl.createUsers);
 userRouter.put('/user/:id', multer, validator.user.validate('updateUser'), userCtrl.updateUser);
 userRouter.get('/user/:id', userCtrl.getUserById);
 userRouter.get('/user/profil/:id', userCtrl.getUserByProfil);
 userRouter.delete('/user/:id', userCtrl.deleteUser);
 userRouter.get('/demandes/user/:id/', userCtrl.getDemandesByUserId);
 module.exports = userRouter

