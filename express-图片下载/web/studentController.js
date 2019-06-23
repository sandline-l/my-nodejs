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

//登陆接口,如果登陆成功,那么写入cookie(用户名的id) ,并且跳转到获取学生的接口
//如果登陆失败, 跳转到登录失败的页面,
//获取请求的参数,并解析参数,姐可以得到登陆时输入的用户和密码了
function login(request, response) {
    var params = url.parse(request.url,true).query;
    //里面传递一个回调函数,代表查找出来之后的操作
    studentDao.queryStudentByStuNum(params.stuNum,function (result) {
        console.log(result)
        if (result && result.length > 0 && result[0].psd == params.psd){
            //写cookie
            response.cookie('id',result[0].id);
            response.redirect('/api/getAllStudent');
        }else{
            response.redirect('/loginError.html');
        }
    })
}
path.set('/login',login);

module.exports.path = path;



