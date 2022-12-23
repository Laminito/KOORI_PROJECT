//importing modules
const express = require('express')
const userController = require('../controllers/authCtrl')
const { signup, login } = userController
const userAuth = require('../middleware/userAuth')

const authrouter = express.Router();

//signup endpoint
//passing the middleware function to the signup
authrouter.post('/register', userAuth.saveUser, signup);

//login route
authrouter.post('/login', login);

module.exports = authrouter