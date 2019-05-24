var http = require('http');
var url = require('url');
var fs = require('fs');
var req = require('request');

http.createServer(function (request, response) {
    //我必须知道要请求什么东西 ,(请求是 ip+port +文件名)
    //我必须要获取请求的url
    //读取文件,并返回给浏览器
    //返回分三步 ,必须得有, 一个是头部,一个是数据,
    var pathname = url.parse(request.url).pathname;
    var is = isStaticfile(pathname);
    console.log(pathname);
    if (is){//是静态资源
        try {   //找的到,返回你请求的页面
            var data = fs.readFileSync('./page' + pathname);
            response.writeHead(200);
            response.write(data);
            response.end()
        }catch (e) { //找不到,返回404页面
            response.writeHead(404);
            response.write('<html><body><h1>404 NotFound</h1></body></html>');
            response.end();
        }
    } else{//是动态资源
        if (pathname == '/chat') {
            //向图灵发送请求
            var params = url.parse(request.url,true).query;
            var data = {
                "reqType":0,
                "perception": {
                    "inputText": {
                        "text": params.text
                    }
                },
                "userInfo": {
                    "apiKey": "d46333c4673c4306a5da9c4f084b6985",
                    "userId": "123456"
                }
            };
            var contents = JSON.stringify(data);
            req({
                url:'http://openapi.tuling123.com/openapi/api/v2',
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:contents
            },function (error, resp, body) {
                if (!error && resp.statusCode == 200){
                    //这是在本地服务器向图灵服务器获取到数据之后了 ,  
                    //然后将数据返回给前端页面, 如果这个前端页面和本地服务器是同源的,那么就正常
                    //如果这个前端页面和本地服务器不同源, 那么就跨域了, 数据被浏览器拦截
                    //如果将数据返回给前端页面时, 设置响应头,使得任何域都可以向我的本地服务器获取数据, 
                    //那么就可以解决跨域问题
                    var head = {
                        "Access-Control-Allow-Origin":"*",
                        "Access-Control-Allow-Methods":"GET",
                        "Access-Control-Allow-Headers": "x-request-with , content-type"
                    };
                    response.writeHead(200, head);
                    //把结果返回给前端页面
                    // response.writeHead(200);
                    var obj = JSON.parse(body);
                    console.log(obj);
                    //这里注意做严谨性判断
                    if (obj && obj.results && obj.results.length > 0 && obj.results[0].values){
                        response.write(JSON.stringify(obj.results[0].values));
                        response.end();
                    } else{
                        response.write(`{text : 我不知道是什么}`);
                        response.end();
                    }
                }else {//返回给自己前端页面一个400错误
                    response.writeHead(400);
                    response.write('数据异常');
                    response.end();
                }
            })
        }else { //接口访问错了
            console.log('接口错误')
        }
    }

}).listen(12306);

function isStaticfile(pathname) {
    //判断是不是静态资源
    var conf = ['.html','.css','.js','.json','.png','.jpg','.gif','.jpeg'];
    for (var i = 0; i < conf.length; i++){
        if(pathname.indexOf(conf[i]) == pathname.length - conf[i].length){
            return true;
        }
    }
    return false;
}

