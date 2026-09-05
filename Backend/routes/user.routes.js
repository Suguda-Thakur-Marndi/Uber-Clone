const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('fullname.lastname').optional().isString().withMessage('Last name must be a string'),
    body('email').isEmail().withMessage('Invalid email format').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;