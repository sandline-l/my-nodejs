var express = require('express');
var app = express();
app.use(express.static('./page'));

var multer = require('multer');
var uploadSingle = multer({dest:'./file/'});

app.post('/upload',uploadSingle.single('file'),function () {

})


//监听端口
var server = app.listen(12306,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问地址为 http://%s:$s', host,port)
})



