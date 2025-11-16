const jwt = require('jsonwebtoken');
const UserModel = require('../model/users');

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token middleware
const verifyToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No token provided."
            });
        }

        // Extract token (format: "Bearer <token>")
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. Invalid token format."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Check if user still exists
        const user = await UserModel.findById(decoded.user_id);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Access denied. User not found."
            });
        }

        // Add user info to request object
        req.user = {
            user_id: decoded.user_id,
            username: decoded.username,
            email: decoded.email
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: "Access denied. Token expired."
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: false,
                message: "Access denied. Invalid token."
            });
        } else {
            return res.status(500).json({
                status: false,
                message: "Server error during token verification."
            });
        }
    }
};

// Optional JWT middleware (for routes that can work with or without authentication)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            if (token) {
                const decoded = jwt.verify(token, JWT_SECRET);
                const user = await UserModel.findById(decoded.user_id);
                if (user) {
                    req.user = {
                        user_id: decoded.user_id,
                        username: decoded.username,
                        email: decoded.email
                    };
                }
            }
        }
        
        next();
    } catch (error) {
        // If token is invalid, just continue without user info
        next();
    }
};

module.exports = {
    generateToken,
    verifyToken,
    optionalAuth,
    JWT_SECRET
};