//创建服务 , 使用node 库 express

var express = require('express');
var app = express();
var boduParser = require('body-Parser')
//
const jwt = require('jsonwebtoken');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = boduParser.urlencoded({ extended: false })


app.use('/public', express.static('public'))

//http://127.0.0.1:12306/public/image/pic1.jpg  访问到图片


//生成token的方法
function generateToken(data) {
    let created = Math.floor(Date.now() / 1000);
    // let cert = fs.readFileSync(path.join(__dirname, '../config/pri.pem'));//私钥
    let cert = 'uio';
    let token = jwt.sign({
        data,
        exp: created + 3600 * 24
    }, cert, { algorithm: 'RS256' });
    return token;
}

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


app.post('/test', function (req, res) {
    console.log('请求了test')
    //data事件
    req.on('data', function (data) {
        //这个data是一个buffer的格式,将他转化为 obj
        console.log(data)
        obj = JSON.parse(data)
        console.log(obj)
        var name = obj.username
        var psd = obj.password
        console.log('从前端获取的数据:', name, psd)

        //看是否有token,有的话,就验证,没有的话,就加上
        // let token = req.get("Authorization"); // 从Authorization中获取token
        // console.log('是否有token:',token)
        // if (token) {
        //     let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
        //     jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        //         if (err) {  //  时间失效的时候 || 伪造的token
        //             res.send({ 'status': 10010 });
        //         } else {
        //             res.send({ 'status': 10000 });
        //         }
        //     })
        // } else {
           
        // }

 //生成token
 let content = { name: name, psd: psd }; // 要生成token的主题信息
 let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
 var token = jwt.sign(content, secretOrPrivateKey, {
     expiresIn: 60 * 60 * 1  // 1小时过期
 });

        console.log(token)
        //将他进行处理,生成token ,然后返回给前端
        // res.send('数据已接受')
        res.send(token)
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















