/*jshint esversion: 6 */

const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.status.json({
        message: "Connecting..."
    });
});

module.exports = app;