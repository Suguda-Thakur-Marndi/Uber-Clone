const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const driverController = require('../controllers/user.controller');

router.post('/register', [
    body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('first name must be at least 3 characters'),
    body('fullname.lastname').optional().isString().isLength({ min: 3 }).withMessage('last name must be at least 3 characters'),
    body('email').isEmail().withMessage('invalid email format').isLength({ min: 5 }).withMessage('email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    body('vehicle.colour').isString().isLength({ min: 3 }).withMessage('vehicle colour must be at least 3 characters'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['sedan', 'suv', 'hatchback', 'van', 'truck']).withMessage('invalid vehicle type')
], driverController.registerDriver);


router.post('/login', [
    body('email').isEmail().withMessage('invalid email format').isLength({ min: 5 }).withMessage('email must be at least 5 characters'),
    body('password').isString().isLength({ min: 6 }).withMessage('password must be at least 6 characters')
], driverController.loginDriver);

module.exports = router;
