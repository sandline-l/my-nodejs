// 拦截器,如果是登陆页面,或者登陆接口,或者是静态文件(除html之外的) 都放行
//如果不是这些, 那么就检查cookie ,看是否有id ,有就放行, 没有就拦截
let url = require('url');
let globalConf = require('../config');
function loginFilter(request, response) {
    var pathName = url.parse(request.url).pathname;
    if (pathName == '/login.html' || pathName == '/login' || isStaticsRequest(pathName)) {
        return true;
    }
    if (request.headers.cookie) {
        var cookies = request.headers.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].split('=')[0].trim() == 'id') {
                return true;
            }
        }
    }
    response.writeHead(302, { 'location': '/login.html' });
    response.end()
    return false;
}
function isStaticsRequest(pathName) {
    for (var i = 0; i < globalConf.static_file_type.length; i++) {
        var temp = globalConf.static_file_type[i]
        if (temp == '.html') {
            continue;
        }
        if (pathName.indexOf(temp) == pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}
module.exports = loginFilter;
