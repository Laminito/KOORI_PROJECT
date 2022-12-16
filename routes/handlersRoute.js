//importing modules
const express = require('express')
const userController = require('../controllers/handlers')
const { register } = userController
const userAuth = require('../middleware/userAuth')

const handlersRouter = express.Router()

//signup endpoint
//passing the middleware function to the signup
handlersRouter.post('/handler', userAuth.saveUser, register)

//login route
// authrouter.post('/login', login)

module.exports = handlersRouter