const dotenv=require('dotenv');
dotenv.config();
const http=require('http');
const app=require('./app');
const cores=require('cors');
app.use(cores());



module.exports=app;