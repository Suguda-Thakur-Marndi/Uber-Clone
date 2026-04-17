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
    const { fullname, email, password } = req.body;
    try {
        const hashedPassword = await User.hashPassword(password);
        const user = await userService.createUser(
            fullname.firstname,
            fullname.lastname,
            email,
            hashedPassword
        );
        const token = user.generateAuthToken();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({
                message: 'Email already exists. Please use a different email.'
            });
        }
        // Other errors
        res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
}
module.exports.loginUser=async(req,res)=>{
    const { email, password }=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:'Email and password are required'
        });
    }
    const user=await User.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({
            message:'Invalid email or password'
        });
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({
            message:'Invalid email or password'
        });
    }
    const token=user.generateAuthToken();
    res.status(200).json({
        message:'Login successful',
        user:{
            _id:user._id,
            email:user.email,
            fullname:user.fullname
        },
        token
    });
}
module.exports.getUserProfile=async(req,res)=>{
   res.status(200).json({
    user:req.user
   })
}
   