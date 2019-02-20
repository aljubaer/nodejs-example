/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    error: err});
            });
});

router.post('/', (req, res, next) => {
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });  
});

router.get('/:productID', (req, res, next) => {
    let id = req.params.productID;
    Product.findById(id)
            .exec()
            .then(doc => {
                console.log(doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        message: 'No such product found'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
});

router.patch('/:productID', (req, res, next) => {
    let id = req.params.productID;
    let updateOptions = {};
    for (let option of req.body) {
        updateOptions[option.propName] = option.value;
    }
    Product.update({
        _id: id
    }, {
        $set: {
            updateOptions
        }
    }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productID', (req, res, next) => {
    let id = req.params.productID;
    Product.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;