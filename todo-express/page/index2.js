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
//这个是将数据存到服务器上
var log = console.log.bind(console);
var q = function (dom) {
    return document.querySelector(dom)
};
//添加按钮的事件 , 发送ajax请求 . 请求后端接口,将数据存到服务器
q('.add-btn').addEventListener('click', function () {
    //获取input的值
    var input = q('.text-input');
    var value = input.value;
    //生成dom ,并插入
    addDom(value,false);
    var data = {};
    data.value = value;
    data.done = false;
    data = JSON.stringify(data);
    log('发送请求,',data);
    //保存值,和条目状态 . 发送请求
    ajax('post','/addTodo',function (response) {
        console.log('请求成功',response)
    },data,true);
});

//完成 事件,删除事件 , 发送请求, 通知后端将数据删除
q('#id-div-content').addEventListener('click',function(event){
    var target = event.target;
    var content = target.parentElement;
    if(target.classList.contains('over')){
        toggleClass(content,'done');
        savecontent()

    } else if(target.classList.contains('delete')){
        content.remove();
        //
        //删除值,和条目状态
        savecontent()

    }
})



//从localStorage 里面取值, 并将他返回
function load(){
    var v = localStorage.name;
    //判断是否有本地存储,增加错误判断
    if(v != undefined){
        var s = JSON.parse(v);
        return s
    }
    return '';
}


//添加dom
var addDom = function (value,done) {
    var c = creatdom(value,done);
    var wrap = q('#id-div-content');
    wrap.innerHTML += c
};
//读取值,
function readState(){
    var arr = load();
    if(arr == ''){
        return
    }
    for (let i = 0; i < arr.length; i++) {
        addDom(arr[i].content, arr[i].done)
    }
}
readState();

//创建dom
function creatdom(value,done) {
    var state = ''
    if(done){
        state="done"
    }
    var s = `<div class="wrapper ${state}">
                <button class="over">完成</button>
                <button class=delete>删除</button>
                <span class=todo-content>${value}</span>
            </div>`
    return s
}
//增加类名或者删除类名
function toggleClass(dom,name){
    if(dom.classList.contains(name)){
        dom.classList.remove(name)
    }else{
        dom.classList.add(name)
    }
}