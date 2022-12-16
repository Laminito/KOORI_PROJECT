const jwt = require("jsonwebtoken");

//Gestion des routes de post-authentification

const verifyToken = (req, res) => {

    // Récupération du token stocké dans le cookie
    const token = req.cookies.jwt;
    console.log("cooookii", token);

    // Si le cookie n'est pas défini, renvoie une erreur non autorisée
    if (!(req.cookies.jwt)) {
        return res.status(401).json("le cookie n'est pas défini")
    }
    var payload
    try {
        // Analysez la chaîne JWT et stockez le résultat dans `payload`.
        // si le jeton n'est pas valide (s'il a expiré selon le délai d'expiration que nous avons défini lors de la connexion),
        // ou si la signature ne correspond pas Alors
        payload = jwt.verify(req.cookies.jwt, process.env.secretKey)
        console.log("payload :", payload);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // si l'erreur est renvoyée parce que le JWT n'est pas autorisé, renvoie une erreur 401
            return res.status(401).json("JWT n'est pas autorisé")
        }
        // sinon, renvoie une erreur de requête incorrecte
        return res.status(400).json("Requete incorrecte")
    }

    //Enfin, renvoyez le message de bienvenue à l'utilisateur, ainsi que son
    //Nom d'utilisateur donné dans le jeton
    res.status(200).json(`Welcome ${payload.nomComplet}!`)
}

module.exports = { verifyToken }