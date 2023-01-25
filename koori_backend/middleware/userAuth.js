//importing modules
const express = require("express");
const db = require("../models");

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async(req, res, next) => {
    //search the database to see if user exist
    try {
        // const password = await db.User.findOne({
        //     where: {
        //         password: req.body.password,
        //     },
        // });
        // //if username exist in the database respond with a status of 409
        // if (password) {
        //     return res.status(409).json("password already exist");
        // }

        //checking if email already exist
        const emailcheck = await db.User.findOne({
            where: {
                email: req.body.email
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.status(409).send("ce mail existe déja");
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