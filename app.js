const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database '+config.database);
});

//On error
mongoose.connection.on('error', (err)=>{
    console.log('Database Connection Error: '+err);
});

const app = express();

//Port number
const port = 3000;

const users = require('./routes/users');
const qualifications = require('./routes/qualifications');
//CORS middleware enables to request an API from different domain name
app.use(cors());

//Set Static files
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware - parses incoming request body
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('/qualifications',qualifications);

//Index route
app.get('/', (req,res)=>{
    res.send('Invalid endpoint');
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

//Start server
app.listen(port,() => {
    console.log('Server started on port '+port);
});
