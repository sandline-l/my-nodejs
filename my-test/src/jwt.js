
//一个token , 如何将他解析出来, 要使用什么模块吗?
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

// 第二部分即为我们在Java后端设置的数据map。我们在前端用split分割jwt，取第二部分的值即为map 

let userString = decodeURIComponent(encodeURIComponent(window.atob(response.data.split('.')[1])))
let user = JSON.parse(userString).user


//这个是将token 的中间部分取出来
response.data.split('.')[1]
//这个是将 base64 格式的 解码为 字符串(如果解码的是中间部分,那么此时就是一个json格式的字符串)
window.atob(response.data.split('.')[1])

JSON.parse(  )
//在这外面包着的两层,估计是将字符串变成 utf-8  的
decodeURIComponent(encodeURIComponent(window.atob(response.data.split('.')[1])))


// 将jwt 签名的处理, 应该是在服务端完成的吧, 
//返回给客户端的token , 由客户端处理 ,并存到本地


