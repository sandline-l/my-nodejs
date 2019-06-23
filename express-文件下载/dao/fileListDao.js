var dbutil = require('./dbutil.js');

function insertFileList(fileName,fileSize,filePath,stuNum,success) {
    var connection = dbutil.createConnection();
    //查找student 里面的所有数据,这个是sql语句,用来对数据库进行操作
    var insertSql = 'insert into filelist (file_name,file_size, file_path, stu_num) values (?,?,?,?);';
    var params = [fileName,fileSize, filePath, stuNum];
    //链接操作,连接数据库.
    connection.connect();
    //执行查找的操作, 第一个参数是sql语句, 回调参数是 异常和结果 . 查找完之后执行的函数(不管有没有成功)
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
module.exports = {
    'insertFileList': insertFileList,

};




