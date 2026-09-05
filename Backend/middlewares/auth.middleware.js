const userModel = require('../models/user.model.js');
const driverModel = require('../models/driver.model.js');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.token.model.js');

const getTokenFromRequest = (req) => {
    const authHeader = req.headers.authorization;
    if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};

const authorize = (expectedRoles, model) => async (req, res, next) => {
    const token = getTokenFromRequest(req);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'uber-clone-production-secret-key-2026');
        const roles = Array.isArray(expectedRoles) ? expectedRoles : [expectedRoles];

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Unauthorized: Forbidden role' });
        }

        const entity = await model.findById(decoded._id);
        if (!entity) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach to request flexibly
        req.user = entity;
        if (roles.includes('driver') || roles.includes('captain')) {
            req.driver = entity;
            req.captain = entity;
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

const authUser = authorize('user', userModel);
const authDriver = authorize(['driver', 'captain'], driverModel);

module.exports = {
    authUser,
    authDriver,
    authCaptain: authDriver,
    userModel: authUser,
    driverModel: authDriver
};