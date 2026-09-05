const User = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklist.token.model');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists. Please use a different email.' });
        }

        const hashedPassword = await User.hashPassword(password);
        const user = await userService.createUser(
            fullname.firstname,
            fullname.lastname || '',
            email.toLowerCase(),
            hashedPassword
        );

        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });
    } catch (error) {
        console.error('[UserController] registerUser error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });
    } catch (error) {
        console.error('[UserController] loginUser error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports.getUserProfile = async (req, res) => {
    return res.status(200).json({
        user: req.user
    });
};

module.exports.logoutUser = async (req, res) => {
    try {
        const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        if (token) {
            await blacklistTokenModel.create({ token });
            res.clearCookie('token');
        }
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('[UserController] logoutUser error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};