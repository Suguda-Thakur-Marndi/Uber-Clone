const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    duration: {
        type: Number,
        default: 0
    }, // in seconds
    distance: {
        type: Number,
        default: 0
    }, // in meters
    paymentID: {
        type: String,
        default: null
    },
    orderId: {
        type: String,
        default: null
    },
    signature: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },
}, { timestamps: true });

const rideModel = mongoose.models.ride || mongoose.model('ride', rideSchema);
module.exports = rideModel;