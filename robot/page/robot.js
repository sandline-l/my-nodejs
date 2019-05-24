
function createMsg(val, num) {
    //创建标签, num=1 时 是左标签 , 2是右标签
    //获取父级
    var content = document.getElementsByClassName('content')[0];
    if (num == 1) {
        var str = `<div class="left">
                        <img src="./xiaodu.jpeg" alt="">
                        <p>${val}</p>
                    </div>`
    } else if (num == 2) {
        var str = ` <div class="right">
                        <p>${val}</p>
                        <img src="./panda.jpeg" alt="">
                    </div>`
    }
    content.innerHTML += str
}

//向自己的服务器 发送ajax请求 
function sendAjax() {
    //获取input输入的值
    var input = document.getElementById('oinput');
    var value = input.value;

    if(value == null || value == ''){
        return
    }
    createMsg(value, 2)
    // 创建并发送ajax请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //得到服务器返回给我的结果 ,是一个json格式的字符串,将他处理后,渲染到前端页面
                console.log(xhr.responseText)
                var obj = JSON.parse(xhr.responseText);
                var res = obj.text;
                console.log(res)
                createMsg(res, 1)
                input.value = ''
            } else {
                console.log('error');
            }
        }
    }
    //向chat接口发送请求
    xhr.open('get', 'http://localhost:12306/chat?text=' + value + '', true);
    xhr.send();
}
//绑定事件

var btn = document.getElementsByClassName('btn')[0];

btn.addEventListener('click', function (e) {
    sendAjax()
})

document.onkeydown = function(event){
    if(event.key == 'Enter'){
        sendAjax()
    }
}











