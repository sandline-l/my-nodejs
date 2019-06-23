// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 导入controller middleware:  他执行后返回的是router.routes()
const controller = require('./controller');
//注意他的使用位置, 他要在路由之前调用, 因为要处理post请求里面的参数,是包含在请求体里面的
app.use(bodyParser());

// 使用middleware:
app.use(controller());

// // add router middleware:
// app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...,http://localhost:3000/');