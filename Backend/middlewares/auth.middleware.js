const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.token.model.js');

module.exports.userModel = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
     if(!token){
          return res.status(401).json({message:'Unauthorized'});
     }
     const blacklisted=await blacklistTokenModel.findOne({token});
     if(blacklisted){
          return res.status(401).json({message:'Unauthorized'});
     }
     try{
          const decoded=jwt.verify(token,process.env.JWT_SECRET);
          const user=await userModel.findById(decoded._id);
          if(!user){
                return res.status(401).json({message:'Unauthorized'});
          }
          req.user=user;
          next();
     } catch (error) {
          return res.status(401).json({message:'Invalid token'});
     }
}