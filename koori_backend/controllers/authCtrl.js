//importing modules

const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const send_mail = require("../middleware/sendMail")
const ms = require ('ms')
const passwordgenerator = require("../middleware/password_generator");

//hashing users password before its saved to the database with bcrypt
const signup = async(req, res) => {
    const expireDans = `Ce mot de pass expire dans : ${ms(2 * 60000, { long: true })}`
    const message = `Bonjour ${req.body.nomComplet} <br> Voici votre mot de passe par defaut <br> Utilisable une seule fois  <br> Via votre compte KOORI <br> Password : <a href="#">${passwordgenerator.password}</a>`
    try {
        
        const data = {...req.body, password: await bcrypt.hash(passwordgenerator.password, 10) };
       
        await db.User.create(data).then(user => {
            if (user) {
                // let token = jwt.sign({ email: user.email }, process.env.secretKey, {
                //     expiresIn: 1 * 24 * 60 * 60 * 1000,
                // });
                // res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                send_mail.sendEmail(req.body.email, expireDans, message)
                return res.status(201).json(user);
            } else {
                return res.status(500).json({ message: "Details are not correct"});
            }
        })
    } catch (error) {
        console.log(error);
    }
};

//login authentication
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        db.User.findOne({
            attributes: ['id', 'email', 'password'],
            where: {
                email: email
            },
        }).then( (user) => {
            //if user email is found, compare password with bcrypt
            const isSame = bcrypt.compare(password, user.dataValues.password);
            if (isSame) {
                let token = jwt.sign({ id: user.dataValues.id }, process.env.secretKey, {
                    algorithm: "HS256",
                    expiresIn: process.env.jwtExpirySeconds,
                });
                return res.status(200).json({
                    userID: user.dataValues.id,
                    token: token
                });
            } else {
                return res.status(401).json({message: "Connexion refusée"});
            }
        }).catch( error => {
            return res.status(500).json({ error });
        })
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

module.exports = {
    signup,
    login,
};
