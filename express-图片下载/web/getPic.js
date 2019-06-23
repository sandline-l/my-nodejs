
var path = new Map();
var url = require('url');
var fs = require('fs');
//解析请求路径,读取文件,然后写入 . 这里是直接读取的服务器上存的文件
//不是从数据库中获取的
function getPic(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.path);
    try{
        var data = fs.readFileSync('./'+params.path);
        response.writeHead(200);
        response.write(data);
        response.end()
    }catch (e) {
        response.writeHead(404);
        response.end();
    }
}

path.set('/getPic',getPic);
module.exports.path = path;