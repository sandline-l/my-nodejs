//web层文件夹下的文件, 是对每一个页面请求的控制,
//也就是对接口的处理
var studentDao = require('../dao/studentDao');

var url = require('url');
var path = new Map();



function getAllStudent(request, response) {
    //里面传递一个回调函数,代表查找出来之后的操作
    studentDao.queryStudentAll(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set('/api/getAllStudent',getAllStudent);


function addStudent(request, response) {
    var params = url.parse(request.url,true).query;
    // var params = [name,age,stuClass,stu_Num,psd];
    //里面传递一个回调函数,代表查找出来之后的操作
    studentDao.insertStudent(params.name, params.age, params.stuClass,params.stu_Num,params.psd, function (result) {
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.write('添加成功');
        response.end();
    })
}
path.set('/api/addStudent',addStudent);


module.exports.path = path;



