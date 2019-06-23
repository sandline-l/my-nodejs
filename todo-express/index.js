//引入express
var express = require('express');
//实例化express
var app = express();
app.use(express.static('./page'));
//json解析中间件
var bodyParser = require('body-parser');
//添加 json 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');
app.use(cookieParser());



//配置路由 ,如果有静态web服务的话, 那么就会去那个目录下找 / 这个路径,
//而这个路径应该默认的对应index.html
// app.get('/',function (req, res) {
//     res.cookie('name','泰小哥',{maxAge:60000});
//     console.log('cookie')
//     res.send('你好啊');
// });
//貌似被静态web服务给拦截了
// app.get('/index.html',function (req, res) {
//     res.cookie('name','kavn',{maxAge:60000});
//     console.log('cookie');
//     res.sendFile(__dirname + '/page/' + 'index.html')
// });
// app.get('/getform.html',function (req, res) {
//     // console.log(req)
//      // req.cookies.name;
//     console.log(req.cookies.name)
//     res.send(req.cookies.name);
//     // res.sendFile(__dirname + '/' + 'index.html')
// });

app.get('/setcookie',function (req, res) {
    //访问这个接口的时候, 设置cookie
    res.cookie('name','kavn',{maxAge:60000});
    console.log('cookie');
    res.send('设置cookie成功');
});

app.get('/getcookies',function (req, res) {
    //访问这个接口的时候, 设置cookie
    console.log(req.cookies);
    console.log(req.cookies.name);
    var data = JSON.stringify(req.cookies);
    res.send('设置的cookie是'+ data);
});
//form表单提交,使用中间件获取提交数据
app.post('/getform',function (req, res) {
    console.log(req.body);
    res.send('form表单提交成功,这是返回给你的数据',req.body)
});

//使用ajax 提交数据
app.post('/getajax',function (req, res) {
    console.log(req.body)
    console.log(req.body.name)
    res.send('请求成功了,这是返回给你的数据'+ req.body)
    // res.send('得到form表单的')
});


//添加数据的接口, 获取到前端传过来的数据,然后写入后端文件里,

app.post('/addTodo',function (req, res) {
     // var params = JSON.parse(req.body)
    // console.log('主体', req.body ) //请求主题
    // console.log(params ) //请求主题
    // console.log(req.body ) //请求主题

    res.send('yes得到了')
    res.end()
})

//监听端口
var server = app.listen(12306,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问地址为 http://%s:$s', host,port)
})



