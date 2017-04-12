'use strict';

var mongoose = require('mongoose');
var SEQSchema = require('../../dao/schemas/SEQSchema');
var SEQModel = mongoose.model('seq', SEQSchema);

SEQModel.getNextVal = function(callback) {
    return this.findOneAndUpdate({ "name": "ID_SEQ" }, { $inc: { 'curr_val': 1 } }, {}, callback);
};

module.exports = SEQModel;
