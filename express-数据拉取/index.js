var express = require('express');

var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

// app.use(express.static('./page'));
app.use(express.static('page'));

app.get('/getAllStudent',loader.get('/getAllStudent'));


var server = app.listen(globalConfig['port'],function () {
    console.log('访问地址是http://localhost:555')
});
