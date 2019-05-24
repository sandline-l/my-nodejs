let fs = require('fs');
let globalConfig = require('./config');
//拦截器集合,他里面存的都是拦截器的方法
var filterSet = [];
let files = fs.readdirSync(globalConfig['filter_path']);
for (let i = 0; i < files.length; i++) {
    let temp = require('./' + globalConfig['filter_path'] + '/' + files[i])
    filterSet.push(temp)
}
module.exports = filterSet;

