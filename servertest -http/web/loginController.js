//用一个方法来解决一个请求, 一个请求就是url .一个方法要和url 绑定,
//他负责接受所有login页面来的请求,
// //所以使用map 数据结构
//约定controller要向外导出一个 path (map数据结构,变量名为path)
var path = new Map();
function getData(request, response) {

}
path.set('/getData',getData);

function getData2() {

}
path.set('/getData2',getData2);
//请求的路径, 解决请求的方法
//导出的是对象, 对象的属性path 值是一个map数据结构
module.exports.path = path;