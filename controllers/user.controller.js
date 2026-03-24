const User=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
module.exports.registerUser=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {firstname,lastname,email,password}=req.body;
    const hashedPassword=await User.hashPassword(password);

  const user=await userService.createUser(firstname,lastname,email,hashedPassword);
  res.status(201).json({
    message:'User registered successfully',
    userId:user._id
  });
const token=user.generateAuthToken();
res.status(201).json({
    message:'User registered successfully',
    userId:user._id,
    token
  });
}
   