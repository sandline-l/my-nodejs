//创建服务 , 使用node 库 express
var express = require('express');
var app = express();
var boduParser = require('body-Parser')
const jwt = require('jsonwebtoken');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = boduParser.urlencoded({ extended: false })

app.use('/public', express.static('public'))

//http://127.0.0.1:12306/public/image/pic1.jpg  访问到图片


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //之前在请求头中带token, 都会被预检响应 给拒绝, 原来是因为,我在服务端没有设置允许的权限
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//生成token的函数
function creatrdToken(obj) {
    let content = obj; // 要生成token的主题信息
    let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
    var token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1  // 1小时过期
    });
    return token;
}

// function uncodeToken(token){
//     let userString = window.atob(token.split('.')[1])
//     var usermsg = JSON.parse(userString)
//     return usermsg;
// }



app.post('/test', function (req, res) {
    console.log('请求了test')
    //data事件
    req.on('data', function (data) {
        //这个data是一个buffer的格式,将他转化为 obj
        //获取post 请求发送过来的数据(用户登陆信息)
        obj = JSON.parse(data)
        var name = obj.username
        var psd = obj.password
        //获取到了请求头里面的 token
        //看是否有token,有的话,就验证, 验证通过了,将需要的数据返回给客户端,不通过,跳转到登录页
        //没有的话,就生成token 然后返回给客户端
        var token = req.headers.authorization;
        console.log(token && token != 'undefined')
        
        if (token && token != 'undefined') {
            console.log('验证token')
            var tokenobj = JSON.parse(token)
            console.log(tokenobj ,tokenobj.name, name , psd)
            // 将解析出来的tokenobj 和 获取的用户的用户名和密码进行比对,如果一致,就验证通过,不一致就失败
            if(tokenobj.name == name && tokenobj.psd == psd){
                console.log('验证通过')
                res.send({ 'status': 10000, 'token': tokenobj });
            }else{
                console.log('验证不通过')
                res.send({ 'status': 10010, 'token': 'undefined' });
            }

            // //验证token
            // var secretOrPrivateKey = "wt"; // 这是加密的key（密钥）

            // jwt.verify(token, secretOrPrivateKey, (err, decode) => {
            //     if (err) {  //  时间失效的时候 || 伪造的token
            //         //如果token失效, 发送状态 10010 , 如果可用 发送 10000
            //         console.log('验证不通过')
            //         res.send({ 'status': 10010, 'token': 'undefined' });
            //     } else {
            //         console.log('验证通过')
            //         res.send({ 'status': 10000, 'token': token });
            //     }
            // })
        } else {
            // 如果没有token, 先验证登陆用户名和密码是否正确, 然后生成token ,再将token返回给客户端
            //此处因为没有写数据库, 所以就假定用户名和密码正确
            console.log('生成token')
            var obj = { name: name, psd: psd }; // 要生成token的主题信息
            // var token = creatrdToken(obj)
           console.log(obj)
            //将他进行处理,生成token ,然后返回给前端 , 
            res.send({ 'status': 0, 'token': obj })
        }

    })
})




app.get('/demo', function (req, res) {
    res.send('页面响应')
})
app.get('/demo.html', function (req, res) {
    //注意文件的路径
    res.sendFile(__dirname + '/web/' + 'demo.html')
})
app.post('/process_post', urlencodedParser, function (req, res) {
    console.log(req)
    console.log(req.body)
    console.log('被访问了')
    // 输出 JSON 格式
    // var response = {
    //     "name":req.body.name,
    //     "password":req.body.psd
    // };
    // console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(12306, function () {
    var host = server.address().address;
    var port = server.address().port;
    // console.log(server.address())
    // console.log('访问地址 http://%s:%s',host,port)
})
//http://127.0.0.1:12306/















