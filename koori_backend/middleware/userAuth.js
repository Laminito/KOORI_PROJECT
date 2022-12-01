//importing modules
const express = require("express");
const db = require("../models");
//Assigning db.users to User variable
// const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async(req, res, next) => {
    //search the database to see if user exist
    try {
        const nomComplet = await db.User.findOne({
            where: {
                nomComplet: req.body.nomComplet,
            },
        });
        //if username exist in the database respond with a status of 409
        if (nomComplet) {
            return res.json(409).send("nomComplet already taken");
        }


        //test
        // User.findOne({ where: { email } }).then(data => {
        //         console.log(data.get('password')
        //         });
        //fin test
        //checking if email already exist
        const emailcheck = await db.User.findOne({
            where: {
                email: req.body.email
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.json(409).send("ce mail existe déja");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//exporting module
module.exports = {
    saveUser,
};