var fs = require('fs')
var globalConfig = require('./config')

var fileName = globalConfig.log_path + globalConfig.log_name;
console.log(fileName)

//异步写入 , 打印日志用异步,就可以了
// fs.writeFile(fileName,'asd',function(){
//
// })
//同步写入,
// fs.writeFileSync(fileName,'asd')
function log(data) {
    console.log(data)
    //默认追加写入
    fs.appendFile(fileName,data + '\n', {flag:'a'},function(){
    })
    // fs.writeFile(fileName,data + '\n', {flag:'a'},function(){
    //
    // })
}

module.exports = log;

