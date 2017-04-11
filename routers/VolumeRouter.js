'use strict';

var express = require('express');
var mongoose = require('mongoose');
var VolumeModel = require('../dao/models/VolumeModel');
var volumeRouter = express.Router();

volumeRouter.get('/getVolumesByPage/:page/:limit', function (req, res, next) {
    var page = parseInt(req.params.page);
    var limit = parseInt(req.params.limit);
    VolumeModel.getVolumesByPage(page, limit, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(result);
    });
});

volumeRouter.get('/getAllVolumesCount', function (req, res, next) {
    VolumeModel.getAllVolumesCount(function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(result);
    });
});

volumeRouter.get('/getVolumeById/:_id', function (req, res, next) {
    var volumeId = req.params._id;
    VolumeModel.getVolumeById(volumeId, function (err, volume) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(volume);
    });
});

//后台录入页admin
volumeRouter.get('/gotoCreateVolume', function (req, res) {
    res.render('volume', {    //返回首页,reader 第一个参数传入模板字符串，第二个参数传入变量,jade中可以获取该值显示
        title: '创建云硬盘', //传递参数，替代占位符
        volume: {
            _id: '',
            name: '2', //测试jade可以获取该值
            size: '2',
            status: ''
        }
    })
});

volumeRouter.post('/createVolume', function (req, res, next) {
    var volume = req.body;
    VolumeModel.createVolume(volume, function (err, volume) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(volume);
    });
});

volumeRouter.put('/updateVolumeInfo/:_id', function (req, res, next) {
    var id = req.params._id;
    var newInfo = req.body;
    VolumeModel.updateVolumeInfo(id, newInfo, {}, function (err, volume) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(volume);
    });
});

volumeRouter.delete('/deleteVolumeById/:_id', function (req, res, next) {
    var id = req.params._id;
    VolumeModel.deleteVolumeById(id, function (err, volume) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(volume);
    });
});

module.exports = volumeRouter;