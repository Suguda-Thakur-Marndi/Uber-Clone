const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
module.exports=async(req,res,next)=>{
   const authHeader = req.headers.authorization;
   const token = req.cookies?.token || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isblacklisted=await require('../models/blacklist.token.model').findOne({token});
    if(isblacklisted){
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