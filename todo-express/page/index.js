
//这个是将数据存到本地的,
var log = console.log.bind(console);
var q = function (dom) {
    return document.querySelector(dom)
}
//添加按钮的事件
q('.add-btn').addEventListener('click', function () {
    //获取input的值
    var input = q('.text-input')
    var value = input.value
    //生成dom ,并插入
    addDom(value,false)
    //保存值,和条目状态
    savecontent()
})

//完成 事件,删除事件
q('#id-div-content').addEventListener('click',function(event){
    var target = event.target
    var content = target.parentElement
    if(target.classList.contains('over')){
        toggleClass(content,'done')
        savecontent()

    } else if(target.classList.contains('delete')){
        content.remove()
        //
        //删除值,和条目状态
        savecontent()

    }
})

//保存,传入一个数组, 保存到localStorage 里面
function save(arr){
    var v = JSON.stringify(arr)
    localStorage.name = v
}

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

//保存值
function savecontent(){
    var span = document.querySelectorAll('.todo-content')
    var arr = []
    for (let i = 0; i < span.length; i++) {
        var v =span[i]
        var done = v.parentElement.classList.contains('done')
        var todo = {
            done:done,
            content: v.innerText
        }
        arr.push(todo)
    }
    save(arr)
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