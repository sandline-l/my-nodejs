var express = require('express');

var globalConfig = require('./config');

var app = new express();
app.use(express.static(globalConfig['page_path']));

var server = app.listen(555 ,function () {
    console.log('访问地址是http://localhost:555')
})
