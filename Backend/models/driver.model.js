const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters'],
            default: ''
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [5, 'Email must be at least 5 characters'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters']
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'available', 'unavailable', 'busy'],
        default: 'available'
    },
    vehicle: {
        colour: {
            type: String,
            required: true,
            minlength: [2, 'Vehicle colour must be at least 2 characters']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['sedan', 'suv', 'hatchback', 'van', 'truck', 'car', 'auto', 'moto']
        },
        vehicleNumberPlate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Vehicle number plate must be at least 3 characters']
        }
    },
    location: {
        ltd: {
            type: Number,
            default: 0
        },
        lng: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

driverSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: 'driver' },
        process.env.JWT_SECRET || 'uber-clone-production-secret-key-2026',
        { expiresIn: '24h' }
    );
    return token;
};

driverSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const driverModel = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

// Register captain model alias to prevent MissingSchemaError on ride population
if (!mongoose.models.captain) {
    mongoose.model('captain', driverSchema);
}

module.exports = driverModel;