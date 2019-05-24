//负责启动服务,判断是静态请求还是动态请求, 静态的就给页面, 动态的就给他接口
//接口是从loader 里来的
//引入note自带的模块 http  和  fs
let http = require('http');
let fs = require("fs");
//这个url模块 ,是专门解url的
let url = require('url');
//获取配置文件的配置对象
let globalConf = require('./config');
let loader = require('./loader');
//创建server, 并监听 ,当有请求时,返回值
//request ,请求  ,   response 响应
 http.createServer(function (request, response) {
     //url路径 ,url参数,传true会解析成对象
     var pathName = url.parse(request.url).pathname;
     var parama = url.parse(request.url,true).query;
     // console.log(pathName);
     // console.log(parama);
     var isStatic = isStaticsRequest(pathName);
     if(isStatic){  //请求的静态资源,找到就写入,没找到就404
         try {
             var data = fs.readFileSync(globalConf['page_path'] + pathName)
             response.writeHead(200)
             response.write(data)
             response.end()
         }catch (e) {
             response.writeHead(404)
             response.write('<html><body><h1>404 NotFound</h1></body></html>')
             response.end()
         }
     }else {    //请求的动态资源
       if (loader.get(pathName) != null){
           try {
               loader.get(pathName)(request,response)
           }catch (e) {
               response.writeHead(500)
               response.write('<html><body><h1>500 BadServer</h1></body></html>')
               response.end()
           }
       } else {
           response.writeHead(404)
           response.write('<html><body><h1>404 NotFound</h1></body></html>')
           response.end()
       }
     }
 }).listen(globalConf['port']);

//区分静态资源,还是动态资源,也就是看,后缀是否包含在配置文件里
function isStaticsRequest(pathName) {
    var lastPath = globalConf.static_file_type
    for (var i = 0 ; i < lastPath.length ; i++){
        // console.log(lastPath[i])
        if (pathName.indexOf(lastPath[i]) == pathName.length - lastPath[i].length){
            return true;
        }
    }
    return false;
}




