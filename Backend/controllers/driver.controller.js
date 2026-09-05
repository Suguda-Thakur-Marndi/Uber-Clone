const driverModel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklist.token.model');

module.exports.registerDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    try {
        const existingDriver = await driverModel.findOne({
            $or: [
                { email: email.toLowerCase() },
                { 'vehicle.vehicleNumberPlate': vehicle.vehicleNumberPlate }
            ]
        });

        if (existingDriver) {
            return res.status(409).json({
                message: existingDriver.email === email.toLowerCase()
                    ? 'Email already registered as driver'
                    : 'Vehicle number plate already registered'
            });
        }

        const hashedPassword = await driverModel.hashPassword(password);

        const driver = await driverService.createDriver(
            fullname.firstname,
            fullname.lastname || '',
            email.toLowerCase(),
            hashedPassword,
            vehicle.colour,
            vehicle.capacity,
            vehicle.vehicleType,
            vehicle.vehicleNumberPlate
        );

        const token = driver.generateAuthToken();

        return res.status(201).json({
            message: 'Driver registered successfully',
            driverId: driver._id,
            driver: {
                _id: driver._id,
                fullname: driver.fullname,
                email: driver.email,
                vehicle: driver.vehicle,
                status: driver.status
            },
            token
        });
    } catch (error) {
        console.error('[DriverController] registerDriver error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error during registration' });
    }
};

module.exports.loginDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const driver = await driverModel.findOne({ email: email.toLowerCase() }).select('+password');
        if (!driver) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await driver.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = driver.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Driver logged in successfully',
            driverId: driver._id,
            driver: {
                _id: driver._id,
                fullname: driver.fullname,
                email: driver.email,
                vehicle: driver.vehicle,
                status: driver.status
            },
            token
        });
    } catch (error) {
        console.error('[DriverController] loginDriver error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error during login' });
    }
};

module.exports.getDriverProfile = async (req, res) => {
    const currentDriver = req.driver || req.captain || req.user;
    return res.status(200).json({
        driver: currentDriver
    });
};

module.exports.logoutDriver = async (req, res) => {
    try {
        const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        if (token) {
            await blacklistTokenModel.create({ token });
            res.clearCookie('token');
        }
        return res.status(200).json({ message: 'Driver logged out successfully' });
    } catch (error) {
        console.error('[DriverController] logoutDriver error:', error);
        return res.status(500).json({ message: error.message || 'Internal server error during logout' });
    }
};