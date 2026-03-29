const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const driverController = require('../controllers/driver.controller');
const authMiddleware = require('../middlewares/auth.middleware');

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

router.get('/profile', authMiddleware.userModel, driverController.getDriverProfile);
router.get('/logout', authMiddleware.userModel,driverController.logoutDriver);

module.exports = router;
