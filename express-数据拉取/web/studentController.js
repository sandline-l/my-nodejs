//web层文件夹下的文件, 是对每一个页面请求的控制,
//也就是对接口的处理
var studentDao = require('../dao/studentDao');

var path = new Map();

function getAllStudent(request, response) {
    //里面传递一个回调函数,代表查找出来之后的操作
    studentDao.queryStudentAll(function (result) {
        console.log(1223344)
        response.writeHead(200);
        console.log(1223344)
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set('/getAllStudent',getAllStudent);
module.exports.path = path;



