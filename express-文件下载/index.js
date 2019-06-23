var express = require('express');

var globalConfig = require('./config');
var loader = require('./loader');
var cookie = require('cookie-parser');
//文件上传中间件
var multer = require('multer');
//创建一个multer ,指定文件上传的位置
var uploadSingle = multer({dest:'./file/'});

var app = new express();

app.use(cookie());
app.use(express.static('page'));

//拦截器
app.get('/api/*',function (request, response, next) {
    //读取cookie
    console.log(request.cookies);
    if (request.cookies.id){
        next();
    } else{
        response.redirect('/login.html');
    }
});


app.get('/api/getAllStudent',loader.get('/api/getAllStudent'));

app.get('/api/addStudent',loader.get('/api/addStudent'));

app.get('/login',loader.get('/login'));

app.get('/getPic',loader.get('/getPic'));

//第二个参数指定了哪一个字段是文件
app.post('/upload',uploadSingle.single('file'),loader.get('/upload'));

var server = app.listen(globalConfig['port'],function () {
    console.log('访问地址是http://localhost:555')
});
