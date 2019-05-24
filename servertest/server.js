let net = require('net');
let fs = require("fs");

let globalConf = require('./config')
//创建server
let server = net.createServer();
// server监听请求
server.listen(globalConf.port,"localhost");

//服务器启动
server.on('listening',function () {
    console.log('服务器已启动')
});
//监听链接事件
server.on('connection',function (socket) {
    //监听数据接受事件
    socket.on('data',function (data) {
        // console.log(data.toString());
        //获取url
        var url = data.toString().split('\r\n')[0].split(' ')[1];
        console.log('me;' ,url);
        try {
            var dataFile = fs.readFileSync(globalConf['basePath'] + url);
            // 写入页面内容
            socket.write('HTTP/1.1 200ok\r\n\r\n');
            socket.write(dataFile)
        }catch (e) {
            socket.write('HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>你的页面跑丢了</h1></body></html>')
        }
        //结束链接
        socket.end()
    })
});



