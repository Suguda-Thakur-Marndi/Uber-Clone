const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const connectToDatabase=require('./db/db');
connectToDatabase();
const cors=require('cors');
app.use(cors());
const userRoutes=require('./routes/user.routes');
const e = require('express');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);

module.exports=app;