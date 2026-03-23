const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const connectToDatabase=require('./db/db');
connectToDatabase();
const cors=require('cors');
app.use(cors());



module.exports=app;