 const express = require('express')
 const userCtrl = require('../controllers/userCtrl');
 const multer = require('../multer-config')
 const validator = require('../validationsCheck/validationFilesRequire')
 const router = express.Router();
 //  const verifyToken = require('../accessControl/verifyToken')
 const verifyToken = require('../accessControl/authToken')



 //User routes

 const userRouter = new express.Router();
 
 userRouter.get('/user/', userCtrl.getUsers);
 userRouter.get('/user/actif', userCtrl.getUsersActif);
 userRouter.get('/user/inactif', userCtrl.getUsersInactif);
 userRouter.get('/user/:id', userCtrl.getUserById);
 userRouter.get('/user/email/:email', userCtrl.getUserByEmail);
 userRouter.get('/user/profil/client', userCtrl.getUserByProfilClient);
 userRouter.get('/user/profil/admin', userCtrl.getUserByProfilAdmin);
 userRouter.put('/user/:id', userCtrl.updateUser);

 module.exports = userRouter