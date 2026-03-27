const express=require('express');
const router=express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authUser=require('../middlewares/auth.middleware');
const balcklistTokenModel=require('../models/blacklist.token.model');
router.post('/register',[
    body('fullname.firstname').isString().isLength({min:3}).withMessage('first name must be at least 3 characters'),
    body('fullname.lastname').optional().isString().isLength({min:3}).withMessage('last name must be at least 3 characters'),
    body('email').isEmail().withMessage('invalid email format').isLength({min:5}).withMessage('email must be at least 5 characters'),
    body('password').isString().isLength({min:6}).withMessage('password must be at least 6 characters')
],
userController.registerUser);
router.post('/login',[
    body('email').isEmail().withMessage('invalid email format').isLength({min:5}).withMessage('email must be at least 5 characters'),
    body('password').isString().isLength({min:6}).withMessage('password must be at least 6 characters')
],
userController.loginUser)
router.get('/profile',authUser,userController.getUserProfile);
router.get('/logout', authUser, async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        
        if (token) {
            await balcklistTokenModel.create({ token });
            res.clearCookie('token');
        }
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
});
router.post

module.exports=router;