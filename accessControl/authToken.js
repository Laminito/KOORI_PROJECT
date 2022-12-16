const jwt = require("jsonwebtoken");

const checkToken = async(req, res, next) => {
    // let token = req.get("authorization");
    let token = req.header("Authorization")
    if (token) {
        // Remove Bearer from string
        console.log("token", token);
        // token = token.slice(7);
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            // req.decoded = decoded;
            if (err) {
                console.log("decodeeee", req.decoded);
                return res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: 0,
            message: "Access Denied! Unauthorized User"
        });
    }
}
module.exports = { checkToken };