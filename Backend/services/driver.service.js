const drivermodel = require('../models/driver.model');
module.exports.createDriver = async (firstname, lastname, email, password, color, capacity, vehicleType) => {
   if(!firstname || !email || !password || !color || !capacity || !vehicleType){
    throw new Error('Missing required fields: firstname, email, password, color, capacity, and vehicleType are required');
   }
 const driver=await drivermodel.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password,
    vehicle:{
        colour: color,
        capacity: capacity,
        vehicleType: vehicleType
    }   
   });
   return driver; 
};
