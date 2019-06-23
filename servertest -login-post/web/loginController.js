//用一个方法来解决一个请求, 一个请求就是url .一个方法要和url 绑定,
// //所以使用map 数据结构
//约定controller要向外导出一个map
var studentService = require('../service/studentService')
let url = require('url');
var path = new Map();
function getData(request, response) {

}
path.set('/getData', getData);
function login(request, response) {
    //post请求的参数是在数据域里面的, request 的data 事件可以取到
    request.on('data', function (data) {
        var stuNum = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];
        studentService.queryStudentByStuNum(stuNum, function (result) {
            var res = '';
            //如果参数的密码 和 数据库存的密码一致, 写入ok, 否则写入fail
            if (result == null || result.length == 0) {
                res = 'fail'
            } else {
                if (password == result[0].psd) {
                    res = 'ok'
                } else {
                    res = 'fail'
                }
            }
            response.write(res)
            response.end()
        })
    })

}
path.set('/login', login);
//请求的路径, 解决请求的方法
module.exports.path = path;


