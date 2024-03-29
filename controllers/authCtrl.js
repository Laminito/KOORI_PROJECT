//importing modules

const bcrypt = require("bcrypt");
const db = require("../models");
const passwordgenerator = require("../middleware/password_generator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const send_mail = require('../middleware/sendMail')
const getUsers = require('../controllers/userCtrl')
const ms = require('ms');
const models = require("../models");



// Assigning users to the variable User
const User = db.users;


//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async(req, res) => {
    // console.log('pasjfgveyrbcehjberhvfhvghev', passwordgenerator.password);
    const expiredans = `Ce mot de pass expire dans : ${ms(10 * 60000, { long: true })}`
    const message = `Bonjour ${req.body.nomComplet} <br> Voici votre mot de passe par defaut <br> Utilisable une seule fois  <br> Via votre compte KOORI <br> Password : <a href="#">${passwordgenerator.password}</a>`
    try {
        const {
            ProfilId,
            nomComplet,
            email,
            profession,
            service,
            direction,
            departement,
            avatar,
            password = passwordgenerator.password
        } = req.body;
        const data = {
            ProfilId,
            nomComplet,
            email,
            profession,
            service,
            direction,
            departement,
            avatar,
            password: await bcrypt.hash(password, 10),
        };

        const user = await db.User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        //set cookie with the token generated
        if (user) {
            let token = jwt.sign({ email: user.email }, process.env.secretKey, {
                expiresIn: process.env.jwtExpirySeconds,
                // expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: process.env.jwtExpirySeconds, httpOnly: true });
            // res.cookie("jwt", token);
            // console.log("user", JSON.stringify(user, null, 2));
            // const expireDans = `Cet mot de passe expire dans : ${ms(10 * 60000, { long: true })} min`

            // send_mail.sendEmail(req.body.email, expireDans, message);

            console.log(token);
            //send users details
            return res.status(200).json(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication


const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            },
        });

        //if user email is found, compare password with bcrypt
        if (user) {

            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file
            if (isSame) {
                let currentUser
                models.User.findAll({
                    attributes: ['id', 'email']
                }).then((users) => {


                    let userId
                    users.forEach(users => {
                        if (users.email === user.email) {
                            userId = users.dataValues.id;
                            console.log("userId", userId, "\n", "email", user.email);
                        }
                        return userId
                    })
                    currentUser = userId
                    console.log("userNow1", currentUser);
                    let token = jwt.sign({ id: currentUser }, process.env.secretKey, {
                        algorithm: "HS256",
                        expiresIn: process.env.jwtExpirySeconds,
                    });
                    //if password matches wit the one in the database
                    //go ahead and generate a cookie for the user
                    res.cookie("jwt", token, { maxAge: process.env.jwtExpirySeconds * 1000, httpOnly: true });
                    // console.log("user", JSON.stringify(user, null, 2));
                    return res.json({
                        success: 1,
                        message: "login successfully",
                        token: token,
                        userID: currentUser
                    });
                })


            } else {
                return res.status(401).send("Connexion refusée");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};