 const express = require('express')
 const userCtrl = require('../controllers/userCtrl');
 const multer = require('../multer-config')
 const validator = require('../validationsCheck/validationFilesRequire')
 const User = require("../models/user");
 //  const router = express.Router();

 //  * @swagger
 //  * /user:
 //  *   get:
 //  *     summary: Retrieve a list of JSONPlaceholder users.
 //  *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 //  *     responses:
 //  *       200:
 //  *         description: A list of users.
 //  *         content:
 //  *           application/json:
 //  *             schema:
 //  *               type: object
 //  *               properties:
 //  *                 data:
 //  *                   type: array
 //  *                   items:
 //  *                     type: object
 //  *                     properties:
 //  *                       id:
 //  *                         type: integer
 //  *                         description: The user ID.
 //  *                         example: 0
 //  *                       name:
 //  *                         type: string
 //  *                         description: The user's name.
 //  *                         example: Leanne Graham
 //  */



 //User routes

 const userRoute = new express.Router();
 userRoute.get('/user/', userCtrl.getUsers);
 userRoute.get('/client/', userCtrl.getClients);
 userRoute.post('/user/', multer, validator.user.validate('createUsers'), userCtrl.createUsers);
 userRoute.put('/user/:id', multer, validator.user.validate('updateUser'), userCtrl.updateUser);
 userRoute.get('/user/:id', userCtrl.getUserById);
 userRoute.get('/user/profil/:id', userCtrl.getUserByProfil);
 userRoute.delete('/user/:id', userCtrl.deleteUser);
 userRoute.get('/demandes/user/:id/', userCtrl.getDemandesByUserId);
 module.exports = userRoute;