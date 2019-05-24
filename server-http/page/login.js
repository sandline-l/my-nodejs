
//封装的ajax兼容性写法
function ajax(method, url, callback, data, flag) {
    var xhr = null;
    //定义Ajax对象
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    //监听Ajax状态码的变化
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    //根据不同的请求方式，发送不同的请求
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + data + '&timer=' + timer, flag);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data);
    }
}

window.onload = function (e) {
    ajax('get','/getData')
}