//importing modules
const express = require('express')
const userController = require('../controllers/authCtrl')
const { signup, login ,updatePassword,forgotPassword} = userController
const userAuth = require('../middleware/userAuth')
const verifyToken = require('../accessControl/verifyToken')

const authrouter = express.Router()

//signup endpoint
//passing the middleware function to the signup
authrouter.post('/register', userAuth.saveUser, signup)
//login route
authrouter.post('/login', login)
//forgotPasswword route
authrouter.put('/forgot-password', forgotPassword)
//updatePassword route
authrouter.put('/reset-password', updatePassword)

module.exports = authrouter