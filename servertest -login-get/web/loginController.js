//用一个方法来解决一个请求, 一个请求就是url .一个方法要和url 绑定,
// //所以使用map 数据结构
//约定controller要向外导出一个map
var studentService = require('../service/studentService')
let url = require('url');
var path = new Map();
function getData(request, response) {

}
path.set('/getData',getData);

function login(request, response) {
    //从url中获取参数
    var params = url.parse(request.url,true).query;
    console.log(params)
    console.log(params.stuNum)

    studentService.queryStudentByStuNum(params.stuNum,function(result){
        var res = '';
        //如果参数的密码 和 数据库存的密码一致, 写入ok, 否则写入fail
        if(result == null || result.length ==0){
            res = 'fail'
        }else{
            if(params.password == result[0].psd){
                res = 'ok'
            }else{
                res = 'fail'
            }
        }
        response.write(res)
        response.end()
    })
}
path.set('/login',login);
//请求的路径, 解决请求的方法
module.exports.path = path;


