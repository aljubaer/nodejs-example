/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET request to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST request to /products'
    });
});

router.get('/:productID', (req, res, next) => {
    let id = req.params.productID;
    if (id > 99) {
       res.status(200).json({
           message: "This is special product",
           ID: id
       });
   } else {
       res.status(200).json({
           message: "This is simple id"
       });
   }
});

router.patch('/:productID', (req, res, next) => {
    res.status.json({
        message: 'Product updated'
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status.json({
        message: 'Product deleted'
    });
});

module.exports = router;