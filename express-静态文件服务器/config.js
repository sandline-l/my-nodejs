//读取配置文件,并讲信息保存到对象中,并导出这个配置对象
var fs = require('fs');
var globalConfig = {}
var conf = fs.readFileSync('./server.conf');

var configArr = conf.toString().split('\n');

for (var i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1];
}

module.exports = globalConfig;