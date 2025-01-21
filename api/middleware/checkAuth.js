const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader){
            return res.status(401).json({ message: "Brak tokena"});
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_KEY);
        next()
    }
    catch (err) {
        console.error("błąd autoryzacji:", err.message);
        return res.status(401).json({ message: "Niepoprawny token"})
    }
};