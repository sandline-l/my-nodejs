//负责读取路径
let fs = require('fs');
let globalConfig = require('./config');
let controller = [];
//全局的映射
let pathMap = new Map();
//读取该路径下所有的文件,得到的是一个数组,成员是文件名
let files = fs.readdirSync(globalConfig['web_path']);
for (let i=0;i < files.length ; i++){
    //自动引入 所有web文件夹下面的文件 , temp是被导出的对象, 将map数据存到全局的映射里
    //然后将全局的映射map 导出 ,如果path存在,那么就是导出了一个map数据结构,就执行下面的代码
    let temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
    if (temp.path){
        for (let [key,value] of temp.path){
            if (pathMap.get(key) == null){
                pathMap.set(key,value);
            } else {
                throw new Error('url path 异常, url:' + key)
            }
            controller.push(temp)
        }
    }
}
//他是一个map数据结构 , 是一个增强的对象, 直接导出
module.exports = pathMap;

