const express = require('express');
const auth = require('./auth/index');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
})

routes.use('/auth', auth);

function notFound(req, res, next){
    res.status(400);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
};

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

module.exports = routes;