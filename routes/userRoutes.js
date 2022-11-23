//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { signup, login } = userController
const userAuth = require('../middleware/userAuth')

const authrouter = express.Router()

//signup endpoint
//passing the middleware function to the signup
authrouter.post('/signup', userAuth.saveUser, signup)

//login route
authrouter.post('/login', login)

module.exports = authrouter