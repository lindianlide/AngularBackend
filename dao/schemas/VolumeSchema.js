'use strict';

var mongoose = require('mongoose');
var SEQModel = require('../models/SEQModel');

var VolumeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    size: Number,
    status: String,
    shared: Boolean,
    createAt: {
        type: Date,
        defult: Date.now()
    },
    updateAt: {
        type: Date,
        defult: Date.now()
    },
    metaData: {}
});

VolumeSchema.pre('save', function (next) {
    var doc = this;
    this.createAt = this.updateAt = Date.now();

    /* if (this.isNew){        //判断数据是否为新
     this.createAt=Date.now();
     }
     else{
     this.updateAt=Date.now();
     }*/

    SEQModel.getNextVal(function (error, IDSEQ) {
        if (error) {
            return next(error);
        }
        console.log(IDSEQ);
        //doc._id = IDSEQ.curr_val;
        doc._id = 11;
        next();
    });
});

// 静态方法在Model层就能使用 VolumeModel.findById('www',function(err,persons){ });
VolumeSchema.statics = {
    fetch: function (cb) {       //取出数据库所有数据
        return this
            .find({})
            .sort('updateAt')  //排序
            .exec(cb)
    },
    findById: function (id, cb) {     //查询单条数据
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};
module.exports = VolumeSchema;
