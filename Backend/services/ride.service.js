const crypto = require('crypto');
const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const driverModel = require('../models/driver.model');

function getOtp(num = 6) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    return crypto.randomInt(min, max).toString();
}

module.exports.getOtp = getOtp;

module.exports.getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const distanceInKm = (distanceTime.distance.value || 1000) / 1000;
    const durationInMin = (distanceTime.duration.value || 300) / 60;

    // Fares structure (Base + Distance rate + Time rate)
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 1.5,
        car: 2.5,
        moto: 1.0
    };

    const fare = {
        auto: Math.max(40, Math.round(baseFare.auto + (distanceInKm * perKmRate.auto) + (durationInMin * perMinuteRate.auto))),
        car: Math.max(60, Math.round(baseFare.car + (distanceInKm * perKmRate.car) + (durationInMin * perMinuteRate.car))),
        moto: Math.max(25, Math.round(baseFare.moto + (distanceInKm * perKmRate.moto) + (durationInMin * perMinuteRate.moto))),
        distance: distanceTime.distance,
        duration: distanceTime.duration
    };

    return fare;
};

module.exports.createRide = async ({ user, pickup, destination, vehicleType = 'car' }) => {
    if (!user || !pickup || !destination) {
        throw new Error('User, pickup, and destination are required');
    }

    const fareCalculation = await module.exports.getFare(pickup, destination);
    const normalizedType = ['auto', 'moto', 'car'].includes(vehicleType.toLowerCase()) ? vehicleType.toLowerCase() : 'car';
    const selectedFare = fareCalculation[normalizedType] || fareCalculation.car;

    const otp = getOtp(6);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp,
        fare: selectedFare,
        status: 'pending',
        distance: fareCalculation.distance.value,
        duration: fareCalculation.duration.value
    });

    return ride;
};

module.exports.confirmRide = async ({ rideId, driver }) => {
    if (!rideId || !driver) {
        throw new Error('Ride ID and driver are required');
    }

    const ride = await rideModel.findOneAndUpdate(
        { _id: rideId, status: 'pending' },
        {
            status: 'accepted',
            driver: driver._id,
            captain: driver._id
        },
        { returnDocument: 'after' }
    ).select('+otp').populate('user').populate('driver');

    if (!ride) {
        throw new Error('Ride not found or already accepted');
    }

    // Set driver status to busy
    await driverModel.findByIdAndUpdate(driver._id, { status: 'busy' });

    return ride;
};

module.exports.startRide = async ({ rideId, otp, driver }) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }

    const ride = await rideModel.findOne({ _id: rideId }).select('+otp').populate('user').populate('driver');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error(`Ride cannot be started. Current status: ${ride.status}`);
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP provided');
    }

    ride.status = 'ongoing';
    await ride.save();

    return ride;
};

module.exports.endRide = async ({ rideId, driver }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findOneAndUpdate(
        { _id: rideId, status: { $in: ['accepted', 'ongoing'] } },
        { status: 'completed' },
        { returnDocument: 'after' }
    ).populate('user').populate('driver');

    if (!ride) {
        throw new Error('Ride not found or not currently active');
    }

    // Free up the driver
    if (driver && driver._id) {
        await driverModel.findByIdAndUpdate(driver._id, { status: 'available' });
    }

    return ride;
};
