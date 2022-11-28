// const express = require('express')
// const userCtrl = require('../controllers/userCtrl');
// // const multer = require('../multer-config')
// // let validator = require('../validationsCheck/validationFilesRequire')
// const User = require("../models/user");
// const router = express.Router();
// /**
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

// router.get('/user/', userCtrl.getUsers);
// module.exports = router



// // router.get('/client/', userCtrl.getClients);
// // router.post('/user/', multer, validator.user.validate('createUsers'), userCtrl.createUsers) router.put('/user/:id', multer, validator.user.validate('updateUser'), userCtrl.updateUser) router.get('/user/:id', userCtrl.getUserById);
// // router.get('/user/profil/:id', userCtrl.getUserByProfil);
// // router.delete('/user/:id', userCtrl.deleteUser);
// // router.get('/demandes/user/:id/', userCtrl.getDemandesByUserId);