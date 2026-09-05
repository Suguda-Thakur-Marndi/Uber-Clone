const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        // Fetch coordinates to notify nearby drivers
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const driversInRadius = await mapService.getDriversInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 15);

        // Fetch fully populated ride with user details for broadcast
        const rideWithUser = await rideModel.findById(ride._id).populate('user');

        // Broadcast new-ride request to all available drivers
        driversInRadius.forEach(driver => {
            if (driver.socketId) {
                sendMessageToSocketId(driver.socketId, {
                    event: 'new-ride',
                    data: {
                        ...rideWithUser.toObject(),
                        otp: undefined // Don't leak OTP to drivers
                    }
                });
            }
        });

        // Return ride with OTP to rider
        return res.status(201).json(ride);
    } catch (err) {
        console.error('[RideController] createRide error:', err);
        return res.status(500).json({ message: err.message || 'Internal server error creating ride' });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error('[RideController] getFare error:', err);
        return res.status(500).json({ message: err.message || 'Error calculating fare' });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const currentDriver = req.driver || req.captain || req.user;

    try {
        const ride = await rideService.confirmRide({
            rideId,
            driver: currentDriver
        });

        // Notify rider that their ride has been accepted
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error('[RideController] confirmRide error:', err);
        return res.status(500).json({ message: err.message || 'Error confirming ride' });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    const currentDriver = req.driver || req.captain || req.user;

    try {
        const ride = await rideService.startRide({
            rideId,
            otp,
            driver: currentDriver
        });

        // Notify rider that trip is ongoing
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error('[RideController] startRide error:', err);
        return res.status(400).json({ message: err.message || 'Error starting ride' });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const currentDriver = req.driver || req.captain || req.user;

    try {
        const ride = await rideService.endRide({
            rideId,
            driver: currentDriver
        });

        // Notify rider that ride has ended
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-ended',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error('[RideController] endRide error:', err);
        return res.status(500).json({ message: err.message || 'Error completing ride' });
    }
};