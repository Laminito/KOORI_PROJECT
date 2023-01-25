const express = require('express')
const telechargementCtrl = require('../controllers/telechargementCtrl');
const User = require("../models/user");


//telechargement routes

const telechargementRoute = new express.Router();

telechargementRoute.get('/telechargement/', telechargementCtrl.getAllTelechargement)

module.exports = telechargementRoute