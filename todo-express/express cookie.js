//引入express
var express = require('express');
//实例化express
var app = express();
app.use(express.static('./page'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

//拦截器 ,
app.get('/*',function (req, res, next) {
    console.log('000')
    //为啥能请求到这个重定向的页面, 但是却不跳转过去啊?
    res.redirect('/login.html');
    console.log('111')
    //如果没有cookie ,那么就跳转到登陆页. 有的话就继续下面的代码
    // if(req.cookies.id){
    //     next()
    // }else{
    //     res.redirect('./login.html')
    // }
});


//
// app.get('/getcookies',function (req, res) {
//     //访问这个接口的时候, 设置cookie
//     console.log(req.cookies);
//     console.log(req.cookies.name);
//     var data = JSON.stringify(req.cookies);
//     res.send('设置的cookie是'+ data);
// });


//监听端口
var server = app.listen(12306,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问地址为 http://%s:$s', host,port)
})



