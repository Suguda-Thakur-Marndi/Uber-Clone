const dotenv=require('dotenv');
dotenv.config();
const http=require('http');
const express=require('express');
const app=express();
const connectToDatabase=require('./db/db');
connectToDatabase();
const cores=require('cors');
app.use(cores());



module.exports=app;