/*jshint esversion: 6 */

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressPublicIp = require('express-public-ip');

const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');

// Connect to mongo
mongoose.connect('mongodb://aljubaer:'+ process.env.ATLAS_PASSWORD +'@shop-api-shard-00-00-x3byg.mongodb.net:27017,shop-api-shard-00-01-x3byg.mongodb.net:27017,shop-api-shard-00-02-x3byg.mongodb.net:27017/test?ssl=true&replicaSet=shop-api-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

// Logging all request in console using morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.enable('trust proxy');

app.use(expressPublicIp());
app.use(bodyParser.json());
app.set('trust proxy', true)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

// Errors will caught here
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;