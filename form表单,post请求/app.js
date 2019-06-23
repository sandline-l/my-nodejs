var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var formidable = require('formidable');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/public',express.static('public'));

//这是一个被请求的接口, 自己写的接口
//之前的问题是,前端上传的图片后端是怎么处理的,
//现在这个逻辑是, 前端上传了图片, 然后,后端写入到静态资源文件夹中 , 并跳转页面, 页面中引用了该资源
//这个接口是处理form表单的 ,   要用ajax请求的话, 就写另外一个接口
app.post('/upload',urlencodedParser, function (req, res) {
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));

});

//这是开启的服务, 地址是 http://localhost:3000
var server = app.listen(3000,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host , port)
});