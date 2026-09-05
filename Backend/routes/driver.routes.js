const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const driverController = require('../controllers/driver.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('fullname.lastname').optional().isString().withMessage('Last name must be a string'),
    body('email').isEmail().withMessage('Invalid email format').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.colour').isString().isLength({ min: 2 }).withMessage('Vehicle colour must be at least 2 characters'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['sedan', 'suv', 'hatchback', 'van', 'truck', 'car', 'auto', 'moto']).withMessage('Invalid vehicle type'),
    body('vehicle.vehicleNumberPlate').isString().isLength({ min: 3 }).withMessage('Vehicle number plate must be at least 3 characters')
], driverController.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format').isLength({ min: 5 }).withMessage('Email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], driverController.loginDriver);

router.get('/profile', authMiddleware.authDriver, driverController.getDriverProfile);
router.get('/logout', authMiddleware.authDriver, driverController.logoutDriver);

module.exports = router;
