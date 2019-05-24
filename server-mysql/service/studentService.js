var studentDao = require('../dao/studentDao.js');
// console.log(studentDao)
// console.log(studentDao.queryStudentAll)
function queryAllStudent() {
    studentDao.queryStudentAll();
}
queryAllStudent()