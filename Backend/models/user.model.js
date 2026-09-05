const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'first name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [2, 'last name must be at least 2 characters'],
            default: ''
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [5, 'email must be at least 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'password must be at least 6 characters']
    },
    socketId: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: 'user' },
        process.env.JWT_SECRET || 'uber-clone-production-secret-key-2026',
        { expiresIn: '24h' }
    );
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = User;