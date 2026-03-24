const mongoose=require('mongoose');
const bycrpt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    fullname:{
     firstname:{
        type:String,
        required:true,
        minlength:[3,'first name must be at least 3 characters']
     },
     lastname:{
        type:String,
        minlength:[3,'last name must be at least 3 characters']
     }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email must be at least 5 characters']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,'password must be at least 6 characters']
       
    },
  socketId:{
    type:String,
  }
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}
userSchema.methods.comparePassword=async function(password){
    return await bycrpt.compare(password,this.password);
}
userSchemastatic.hashPassword=async function(password){
    return await bycrpt.hash(password,10);
}
const User=mongoose.model('user',userSchema);
module.exports=User;