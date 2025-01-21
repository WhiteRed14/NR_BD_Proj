const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        if (!token){
            return res.status(401).json({ message: "Brak tokena"});
        }

        jwt.verify(token, process.env.JWT_KEY);
        next()
    }
    catch (err) {
        console.error("błąd autoryzacji:", err.message);
        return res.status(401).json({ message: "Niepoprawny token"})
    }
};