//importing modules

const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.User

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async(req, res) => {
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
            password
        } = req.body;
        const data = {
            ProfilId,
            nomComplet,
            email,
            profession,
            service,
            service,
            direction,
            departement,
            avatar,
            password: await bcrypt.hash(password, 10),
        };
        //saving the user
        const user = await db.User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ email: user.emial }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
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
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            },
        });
        console.log(user);
        if (user) {
            userEmail = user.email            
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id: user.id }
                    , process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,}
                    );
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                return res.status(200).json({email: userEmail, token: token});
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