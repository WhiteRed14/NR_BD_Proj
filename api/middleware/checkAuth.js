const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Brak tokena, autoryzacja nie powiodła się" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY)
    .then(decoded => {
        req.userData = decoded; 
        next(); 
    })
    .catch(error => {
        res.status(401).json({ message: "Nieprawidłowy token, autoryzacja nie powiodła się" });
    });
};