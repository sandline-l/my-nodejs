
var studentDao = require('../dao/studentDao.js');
function queryAllStudent() {
    studentDao.queryStudentAll();
}
function queryStudentByStuNum(stuNum, success){
    studentDao.queryStudentByStuNum(stuNum, success)
}

module.exports = {
    'queryStudentByStuNum':queryStudentByStuNum
}
