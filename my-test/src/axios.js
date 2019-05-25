import axios from "axios";

//拦截器 , 请求拦截,用于将请求统一带上 token
axios.interceptors.request.use(function (config) {
    // let baseurl = 'http://127.0.0.1:12306';
    // config.baseURL = baseurl
    // 在 localStorage 获取 token
    let token = localStorage.getItem("token");
    console.log(token)
    // // 如果存在则设置请求头 , 把token放在请求头中,发送出去
    if (token) {
        console.log('发送了token')
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers.Authorization =  token ;
    }
    return config
}, function (error) {
    console.log('请求 发送失败')
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
    var token = response.data.token;
    var status = response.data.status;
    console.log('获取到响应,并对他进行处理');
    console.log(token)
    console.log(response)
    //获取到响应的内容, 里面的token , 然后将他解析出来 , 
    //然后赋值给他自己(相当于提前在拦截器中处理了token ,这样之后就可以直接使用了),
    //这里的数据是使用的 假数据来模拟的, (easymock)

    //收到响应之后,判断状态, 不同的状态代表了服务端验证token后的不同结果,如果token有效,就返回正常页面,
    //token失效,跳转到登陆页,重新登陆
    if(status == 0){
        console.log('新的token')
    }else if( status == 10000){
        console.log('token 有效 ,跳转到正常页面')

    }else if(status == 10010 && token == "undefined"){
        console.log('token失效了,跳转到登陆页面,重新登陆')
        response.data.token = undefined
        console.log(this.$router)
        this.$router.push("/login");
        console.log('444444')
    }
    //如果是新的token ,那么就将他解码,之后再存到localstorage里面
    if (token && status == 0) {
        // let userString = window.atob(token.split('.')[1])
        // var usermsg = JSON.parse(userString)
        // var usermsg = uncodeToken(token)
        // console.log(usermsg)
        // response.data.token = {
        //     token:token,
        //     newToken: usermsg
        // }
        response.data.token = token;
    }
    return response;
}, function (error) { //这里是返回状态码不为200时候的错误处理
    //集中对失败的请求进行处理
    //为啥我出错之后的 error 里面 没有状态码啊, 应该来说是有的, 然后可以更具不同的
    //状态码, 来说明不同的错误消息
    console.log('请求失败')
    console.log(error.response)
    console.log(error.response.status)
    if (error.response.status == 404) {
        console.log('Not Found')
    }
    //如果请求失败, 会走这个函数, 并且将promise 置为 reject 这样的话, 
    //之后的就会走catch 
    // return Promise.reject(error)
    //这里如果这样写的话,就会在出错时, 还是resolve , 执行成功的回调, 把错误消息弹出了
    return Promise.resolve(error)
})

//解析token的函数
function uncodeToken(token){
    let userString = window.atob(token.split('.')[1])
    var usermsg = JSON.parse(userString)
    return usermsg;
}


export default axios;

