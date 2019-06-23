var express = require('express');

var globalConfig = require('./config');
var loader = require('./loader');
var cookie = require('cookie-parser');
var app = new express();

app.use(cookie());
app.use(express.static('page'));

//拦截器
app.get('/api/*',function (request, response, next) {
    console.log(request.cookies);
    if (request.cookies.id){
        next();
    } else{
        response.redirect('/login.html');
    }
});


app.get('/api/getAllStudent',loader.get('/api/getAllStudent'));

app.get('/api/addStudent',loader.get('/api/addStudent'));


var server = app.listen(globalConfig['port'],function () {
    console.log('访问地址是http://localhost:555')
});
