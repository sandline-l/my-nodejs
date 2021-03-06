
// 每个表都用一个dao 文件来处理 ,因为可能有多个表
//引入dbutil来创建对数据库的连接, 之后用函数对数据库进行操作, 操作完成之后,关闭连接
var dbutil = require('./dbutil.js');

function insertStudent(name,age,stuClass,stu_Num,psd,success) {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据,这个是sql语句,用来对数据库进行操作
    var insertSql = 'insert into student (name,age, class, stu_Num, psd) values (?,?,?,?,?);';
    var params = [name,age,stuClass,stu_Num,psd];
    //链接操作,连接数据库.
    connection.connect();
    //执行查找的操作, 回调参数是 异常和结果 . 查找完之后执行的函数(不管有没有成功)
    connection.query(insertSql,params, function (error, result) {
        if (error == null) {
            success(result);
            console.log(result);
        } else {
            throw new Error(error);
        }
    });
    //查找完之后,关闭连接
    connection.end();
}


//传入的参数是查找成功之后的回调函数,
function queryStudentAll(success) {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据,这个是sql语句,用来对数据库进行操作
    var querySql = 'select * from student;';
    //链接操作,连接数据库.
    connection.connect();
    //执行查找的操作, 回调参数是 异常和结果 . 查找完之后执行的函数(不管有没有成功)
    connection.query(querySql, function (error, result) {
        if (error == null) {
            success(result);
            console.log(result);
        } else {
            throw new Error(error);
        }
    });
    //查找完之后,关闭连接
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
            throw new Error(error);
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
            throw new Error(error);
        }
    });
    //查找完之后,关闭操作
    connection.end();
}


//这个模块导出给别人用的话, 下面的这句貌似就不能写了, 会报错,why
// queryStudentByClassAndAge(2,19);
//把操作数据库的方法导出, 给后面的东西用
module.exports = {
    'queryStudentAll': queryStudentAll,
    'queryStudentByClassAndAge': queryStudentByClassAndAge,
    'queryStudentByStuNum':queryStudentByStuNum,
    'insertStudent':insertStudent
};
// module.exports = {
//     queryStudentAll,
//     queryStudentByClassAndAge
// };