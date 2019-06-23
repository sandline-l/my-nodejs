//加载配置文件
let fs = require("fs");

var globalConf = {};
var conf = fs.readFileSync('./server.conf');
var confs = conf.toString().split('\r\n');
for (var i = 0; i <confs.length ; i++) {
    var tempConf = confs[i].split('=');
    if (tempConf.length <2 ){
        continue;
    } else {
        globalConf[tempConf[0]] = tempConf[1]
    }
}
if (globalConf['path_position'] === 'relative') {
    globalConf.basePath = __dirname + globalConf.path
} else if (globalConf['path_position'] === 'absolute') {
    globalConf.basePath = globalConf.path;
}

//对不同的路径进行处理之后, 以后不管你的项目在哪里,都可以通过直接
//更改路径配置,来进行使用, 如果和服务器是有相对关系,可以使用相对路径
//也可以使用绝对路径
console.log(globalConf)
console.log(globalConf['basePath'])
// console.log(globalConf.port)
// console.log(globalConf["port"])
module.exports = globalConf;
