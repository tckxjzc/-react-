let webpack = require('webpack');
let path = require('path');
let webpackConfig = require('../config/webpack.prod.config');
let del=require('del');
del(['../dist/**/*'],{force:true}).then(function () {
    webpack(webpackConfig, function (err, status) {
        console.log(status.toString());
        if (err) {
            console.log(err);
        }
    });
});

