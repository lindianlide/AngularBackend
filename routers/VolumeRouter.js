'use strict';

var express = require('express');
var mongoose = require('mongoose');
var VolumeModel = require('../dao/models/VolumeModel');
var volumeRouter = express.Router();

volumeRouter.get('/getAllVolumes', function (req, res, next) {


    /*// 利用非静态方法查询
     VolumeModel.getAllVolumes(function (err, result) {
     if (err) {
     console.log(err);
     throw err;
     }
     //res.json(result);
     res.render('volume/list', {    //返回首页
     title: '云硬盘列表页',    //传递参数，替代占位符
     volumes: result
     })
     });*/
    // 利用静态方法查询
    VolumeModel.fetch(function (err, volumes) {
        if (err) {
            console.log(err);
        }
        res.render('volume/list', {    //返回首页
            title: '云硬盘列表页',    //传递参数，替代占位符
            volumes: volumes
        });
    });
});


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
    res.render('volume/create', {    //返回首页,reader 第一个参数传入模板字符串，第二个参数传入变量,jade中可以获取该值显示
        title: '创建云硬盘', //传递参数，替代占位符
        volume: {
            name: '2', //测试jade可以获取该值
            size: '2',
            status: ''
        }
    });
});

volumeRouter.post('/createVolume', function (req, res, next) {
    var volume = req.body;
    VolumeModel.createVolume(volume, function (err, volume) {
        if (err) {
            console.log(err);
            throw err;
        }
        VolumeModel.fetch(function (err, volumes) {
            if (err) {
                console.log(err);
            }
            res.render('volume/list', {    //返回首页
                title: '云硬盘列表页',    //传递参数，替代占位符
                volumes: volumes
            });
        });
    });
});

volumeRouter.post('/pdateVolume', function (req, res, next) {
    var volume = req.body;
    var id = req.body.id;

    if (id !== 'undefined') {
        VolumeModel.updateVolume(id, volume, function (err, volumes) {
            if (err) {
                console.log(err)
            }
            VolumeModel.fetch(function (err, volumes) {
                if (err) {
                    console.log(err);
                }
                res.render('volume/list', {    //返回首页
                    title: '云硬盘列表页',    //传递参数，替代占位符
                    volumes: volumes
                });
            });
        })
    }
});

volumeRouter.get('/gotoUpdateVolume/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        VolumeModel.getVolumeById(id, function (err, volume) {
            res.render('volume/update', {
                title: '云硬盘更新页',
                volume: volume
            })
        })
    }

    /* var id = req.params.id;
     var newInfo = req.body;
     VolumeModel.updateVolume(id, newInfo, {}, function (err, volume) {
     if (err) {
     console.log(err);
     throw err;
     }
     res.json(volume);
     });*/
});

volumeRouter.delete('/deleteVolume', function (req, res, next) {
    // deleteVolume/:id时用 var id = req.params.id;
    var id = req.query.id;
    VolumeModel.deleteVolumeById(id, function (err, volumes) {
        if (err) {
            console.log(err);
            throw err;
        }
        VolumeModel.fetch(function (err, volumes) {
            if (err) {
                console.log(err);
            }
            res.render('volume/list', {    //返回首页
                title: '云硬盘列表页',    //传递参数，替代占位符
                volumes: volumes
            });
        });
    });
});

module.exports = volumeRouter;
