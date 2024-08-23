require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

//Generate JWT token
function generateToken(userID) {
    return jwt.sign({ userID }, SECRET_KEY, { expiresIn: '2h' });
}

//Token verification
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

//Middleware to protect routes
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.userID = decoded.userID;
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    authenticateToken
};