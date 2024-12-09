const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
