//加载配置文件,导出配置对象
let fs = require("fs");
let globalConf = {};
//同步读取文件
let conf = fs.readFileSync('./server.conf');
//将读到的文件转成数组
let confs = conf.toString().split('\r\n');
//将数组储存为对象格式
for (let i = 0; i <confs.length ; i++) {
    let tempConf = confs[i].split('=');
    if (tempConf.length <2 ){
        continue;
    } else {
        globalConf[tempConf[0]] = tempConf[1]
    }
}
// console.log(globalConf)
//读取资源的判断(静态资源的后缀),拆分为数组存放
if(globalConf.static_file_type){
    globalConf.static_file_type = globalConf.static_file_type.split('|');
}else{
    throw new Error('配置文件异常,缺少:static_file_type')
}
//将读取的配置文件导出
module.exports = globalConf;
