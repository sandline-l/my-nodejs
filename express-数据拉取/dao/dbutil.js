
//引入数据库mysql , 先要用npm下载安装
var mysql = require('mysql');
//每次执行该函数都会创建一个数据库链接
var createConnection = function () {
    //创建数据库的链接
    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'sandline123',
        database: 'test'
    });
    return connection;
}
//这是都会使用到的公共模块, 导出
module.exports.createConnection = createConnection;


