const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters']
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    vehicle: {
        colour:{
            type: String,
            required: true,
            minlength: [3, 'Vehicle colour must be at least 3 characters']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
           enum: ['sedan', 'suv', 'hatchback', 'van', 'truck']
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    }
});
driverSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
driverSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
driverSchema.methods.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const driverModel=mongoose.model('Driver',driverSchema);

module.exports=driverModel;