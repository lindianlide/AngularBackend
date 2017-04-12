'use strict';

var mongoose = require('mongoose');
var VolumeSchema = require('../../dao/schemas/VolumeSchema');
// 将该Schema发布为Modelv
var VolumeModel = mongoose.model('volume', VolumeSchema);
var dbHelper = require('../../dao/utils/DBHelper');

VolumeModel.getAllVolumes = function(callback) {
    return this.find().sort('createAt').exec(callback);
};

VolumeModel.getVolumesByPage = function(page, limit, callback) {
    dbHelper.pageQuery(page, limit, VolumeModel, '', {}, {
        date: 'desc'
    }, callback);
};

VolumeModel.getAllVolumesCount = function(callback) {
    return this.count().exec(callback);
};

VolumeModel.getVolumesCountCondition = function(condition, callback) {
    return this.count(condition).exec(callback);
};

VolumeModel.getVolumeById = function(id, callback) {
    return this.findOne({ _id: id }).exec(callback);
};

VolumeModel.createVolume = function(Volume, callback) {
    //调用VolumeModel的内置方法，可以操作数据库
    return VolumeModel.create(Volume, callback);
   /*
   该方式也可以操作数据库，直接调用实体的save方法
    var _volume;
    _volume=new VolumeModel({
        name:Volume.name,
        size:Volume.size,
        status:Volume.status
    });
    _volume.save(function (err,volume) {
        if(err){
            console.log(err)
        }
        res.redirect('/volume/'+volume._id)
    })*/
};

VolumeModel.updateVolume = function(id, newInfo, options, callback) {
    var query = { _id: id };
    var update = {
        name: newInfo.name
    };
    return VolumeModel.findOneAndUpdate(query, update, options, callback);
};

VolumeModel.deleteVolumeById = function(id, callback) {
    return VolumeModel.remove({ _id: id }, callback);
};

module.exports = VolumeModel;
