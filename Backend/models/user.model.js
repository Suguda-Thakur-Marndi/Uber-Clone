const mongoose=require('mongoose');
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
       
    },
  socketId:{
    type:String,
  }
});
const User=mongoose.model('User',userSchema);
module.exports=User;