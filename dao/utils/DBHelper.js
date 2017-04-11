'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var pageQuery = function(page, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (page - 1) * pageSize;
    var result = {
        pageNumber: page
    };
    async.parallel({
        count: function(done) {
            Model.count(queryParams).exec(function(err, count) {
                done(err, count);
            });
        },
        records: function(done) {
            Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function(err, doc) {
                done(err, doc);
            });
        }
    }, function(err, queryResults) {
        var count = queryResults.count;
        result.count = count;
        result.totalPages = Math.ceil(count / pageSize);
        result.queryResults = queryResults.records;
        callback(err, result);
    });
};

module.exports = {
    pageQuery: pageQuery
};
