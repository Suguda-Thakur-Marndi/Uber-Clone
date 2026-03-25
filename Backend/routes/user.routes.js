const express=require('express');
const router=express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
router.post('/register',[
    body('fullname.firstname').isString().isLength({min:3}).withMessage('first name must be at least 3 characters'),
    body('fullname.lastname').optional().isString().isLength({min:3}).withMessage('last name must be at least 3 characters'),
    body('email').isEmail().withMessage('invalid email format').isLength({min:5}).withMessage('email must be at least 5 characters'),
    body('password').isString().isLength({min:6}).withMessage('password must be at least 6 characters')
],
userController.registerUser);


module.exports=router;