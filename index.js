
const compression = require('compression');
const helmet = require('helmet');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');
const error =  require('./middleware/error');
const mongoose = require('mongoose');
const staffs = require('./route/staffs');
const authent = require('./route/authent');
const express = require('express');
const app = express();



process.on('uncaughtException', (ex)=>{
 console.log('We have Problem in the Startup');
    winston.error(ex.message, ex);
});
winston.add(new winston.transports.File ({filename: 'errors'}));
winston.add(new winston.transports.MongoDB ({db: 'mongodb://localhost/INECSTAFF'}));

const url = 'mongodb+srv://Dreams1987:Dreams1987@cluster0.6t61y.mongodb.net/INECSTAFF?retryWrites=true&w=majority';
const db = config.get('db')
mongoose.connect(url)
.then(()=>winston.info(`Connected To db`))
.catch(err=>console.error('Could not connect', err));



app.use(helmet());
app.use(compression());
app.use('/staff', staffs);
app.use('/authent', authent);
app.use(error);






const port = process.env.PORT ||14;
const server =  app.listen(port, ()=>console.log(`Connected to ${port}`));

module.exports = server;