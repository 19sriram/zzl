'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const chalk = require('chalk');
const cors = require('cors');

app.use(morgan('dev'));
app.use(helmet());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authentication-token, application/json,charset=utf-8");
    next();
});

require('dotenv').config();
require('./config/db.mongoose');
require('./config/routes')(app);
require('./config/errorHandler')(app);
require('./config/passport');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(chalk.green(`Server listening on port: ${PORT}`), chalk.yellow(' -- \u2708'));
});
