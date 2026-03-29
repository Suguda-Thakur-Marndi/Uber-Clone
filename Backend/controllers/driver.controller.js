const drivermodel = require('../models/driver.model');
const driverService = require('../services/driver.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklist.token.model');

module.exports.registerDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { fullname, email, password, vehicle } = req.body;
    const hashedPassword = await drivermodel.hashPassword(password);

    const driver = await driverService.createDriver(
        fullname.firstname,
        fullname.lastname,
        email,
        hashedPassword,
        vehicle.colour,
        vehicle.capacity,
        vehicle.vehicleType
    );

    const token = driver.generateAuthToken();
    res.status(201).json({
        message: 'Driver registered successfully',
        driverId: driver._id,
        token
    });
};

module.exports.loginDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    const driver = await drivermodel.findOne({ email }).select('+password');
    if (!driver) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await driver.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = driver.generateAuthToken();
    res.status(200).json({
        message: 'Driver logged in successfully',
        driverId: driver._id,
        token
    });
};
module.exports.getDriverProfile = async (req, res) => {
    res.status(200).json({
        driver: req.user
    }); 
}
module.exports.logoutDriver=async(req,res)=>{
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(token){
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
    }
    res.status(200).json({
        message:'Driver logged out successfully'
    });
}