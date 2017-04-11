'use strict';

var express = require('express');
var indexRouter = express.Router();

indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Angular-BackEnd' });
});

module.exports = indexRouter;
