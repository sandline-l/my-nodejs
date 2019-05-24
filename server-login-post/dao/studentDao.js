// 每个表都用一个dao 文件来处理 ,因为可能有多个表
var dbutil = require('./dbutil.js');
function queryStudentAll() {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据
    var querySql = 'select * from student;';
    //链接操作
    connection.connect();
    //执行查找的操作, 回调参数是 异常和结果
    connection.query(querySql, function (error, result) {
        if (error == null) {
            console.log(result);
        } else {
            console.log(error);
        }
    });
    //查找完之后,关闭操作
    connection.end();
}
function queryStudentByClassAndAge(classNum, age) {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据 来自class的, 语句中传参 可以写? , 参数在回调中写
    var querySql = 'select * from student where class = ? and age = ?;';
    //链接操作
    connection.connect();
    //多个参数
    var queryParams = [classNum, age];
    //执行查找的操作, 回调参数是 异常和结果
    connection.query(querySql, queryParams, function (error, result) {
        if (error == null) {
            console.log(result);
        } else {
            console.log(error);
        }
    });
    //查找完之后,关闭操作
    connection.end();
}
function queryStudentByStuNum(stuNum, success) {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据 来自class的, 语句中传参 可以写? , 参数在回调中写
    var querySql = 'select * from student where stu_Num = ?;';
    //链接操作
    connection.connect();
    //执行查找的操作, 回调参数是 异常和结果
    connection.query(querySql, stuNum, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    //查找完之后,关闭操作
    connection.end();
}


//这个模块导出给别人用的话, 下面的这句貌似就不能写了, 会报错,why
// queryStudentByClassAndAge(2,19);
module.exports = {
    'queryStudentAll': queryStudentAll,
    'queryStudentByClassAndAge': queryStudentByClassAndAge,
    'queryStudentByStuNum':queryStudentByStuNum
};
// module.exports = {
//     queryStudentAll,
//     queryStudentByClassAndAge
// };