const express = require('express');
const mongoose = require('mongoose');

// const morgan = require('morgan');
const routes = require('./routes');

require('dotenv').config();

mongoose.connect(`${process.env.DATABASE_URL}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

// app.use(morgan('tiny'));
app.use(express.json());

app.use(routes);

module.exports = app;