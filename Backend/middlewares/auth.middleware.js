const userModel = require('../models/user.model.js');
const driverModel = require('../models/driver.model.js');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.token.model.js');

const getTokenFromRequest = (req) => {
     const authHeader = req.headers.authorization;
     return req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
};

const authorize = (expectedRole, model) => async (req, res, next) => {
     const token = getTokenFromRequest(req);
     if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
     }

     const blacklisted = await blacklistTokenModel.findOne({ token });
     if (blacklisted) {
          return res.status(401).json({ message: 'Unauthorized' });
     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded.role !== expectedRole) {
               return res.status(401).json({ message: 'Unauthorized' });
          }

          const entity = await model.findById(decoded._id);
          if (!entity) {
               return res.status(401).json({ message: 'Unauthorized' });
          }

          req.user = entity;
          next();
     } catch (error) {
          return res.status(401).json({ message: 'Invalid token' });
     }
};

module.exports.userModel = authorize('user', userModel);
module.exports.driverModel = authorize('driver', driverModel);