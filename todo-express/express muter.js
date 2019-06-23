//引入express
var express = require('express');
//实例化express
var app = express();
app.use(express.static('./page'));

var multer = require('multer');
var uploadSingle = multer({dest:'./file/'});

app.post('/upload',uploadSingle.single('file'),function () {
    
})
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



