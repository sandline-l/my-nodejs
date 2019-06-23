var express = require('express');
var app = express();

var formidable = require('formidable');

//读取文件要用到的模块
var fs = require('fs');

app.use('/public',express.static('public'));
//这是请求的路径,根路径 ,结果是返回给你一个字符串
app.get('/',function (req, res) {
    res.send('ni hao')
});

//这是一个被请求的接口, 自己写的接口
//之前的问题是,前端上传的图片后端是怎么处理的,
//现在这个逻辑是, 前端上传了图片, 然后,后端写入到静态资源文件夹中 , 并跳转页面, 页面中引用了该资源
//这个接口是处理form表单的 ,   要用ajax请求的话, 就写另外一个接口
app.post('/upload', function (req, res) {
    //可以获取到post请求的接口地址吗? 应该是可以的
    // console.log(req)
    console.log(req.path);

    //写日志的
    // fs.appendFile('log/server.log',data + '\n', {flag:'a'},function(){
    //     console.log('写入了')
    // });

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        //读文件,并写入
        fs.writeFileSync("public/test.png", fs.readFileSync(files.upload.path));
        //请求的接口时upload , 处理完之后, 重定向到upload.html
        res.redirect("/public/upload.html") ;
    });
});
app.post('/upload2', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Methods","*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Headers", "*");

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // form.keepExtensions = true; // 保留扩展名
    // form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    // form.uploadDir = 'C:/Users/Administrator/Downloads'  // 存储路径
    form.parse(req,function(err,fileds,files){ // 解析 formData数据
        if(err){ return console.log(err) }

        let imgPath = files.img.path // 获取文件路径
        // let imgName = "./test." + files.img.type.split("/")[1] // 修改之后的名字
        let data = fs.readFileSync(imgPath) // 同步读取文件

        fs.writeFile(imgName,data,function(err){ // 存储文件

            if(err){ return console.log(err) }

            fs.unlink(imgPath,function(){}) // 删除文件
            res.json({code:1})
        })
    })
});


//这是开启的服务, 地址是 http://localhost:3000
var server = app.listen(3000,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host , port)
});