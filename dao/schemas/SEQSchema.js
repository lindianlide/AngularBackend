'use strict';

var mongoose = require('mongoose');

var SEQSchema = new mongoose.Schema({
    name: String,
    curr_val: Number
});

module.exports = SEQSchema;
