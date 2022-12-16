const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const passwordgenerator = require("../middleware/password_generator");
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300


const register = async(req, res) => {
    // Get credentials from JSON body
    try {
        const {
            id,
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
            id,
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
        // if (!email || !password || users[email] !== password) {
        //     // return 401 error is username or password doesn't exist, or if password does
        //     // not match the password in our records
        //     return res.status(401).end()
        // }
        const user = await db.User.create(data);
        console.log("user", user);

        // Create a new token with the username in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign({ email: user.email }, process.env.secretkey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        console.log("token:", token)

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
        return res.status(201).json(token)
            // res.end()
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register }