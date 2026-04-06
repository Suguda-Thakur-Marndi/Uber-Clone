const dotenv=require('dotenv');
dotenv.config();
const driverRoute=require('./routes/driver.routes');
const express=require('express');
const app=express();
const connectToDatabase=require('./db/db');
connectToDatabase();
const cors=require('cors');
app.use(cors());
const userRoutes=require('./routes/user.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use('/drivers',driverRoute);

module.exports=app;