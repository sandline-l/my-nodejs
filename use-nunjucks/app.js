// // 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
// // 创建一个Koa对象表示web app本身:
// const app = new Koa();
// // 导入controller middleware:  他执行后返回的是router.routes()
// const controller = require('./controller');
// //注意他的使用位置, 他要在路由之前调用, 因为要处理post请求里面的参数,是包含在请求体里面的
// app.use(bodyParser());
//
// // 使用middleware:
// app.use(controller());

//使用模板引擎
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            //创建一个文件系统加载器,从views 目录读取模板
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

// views , model ,  mvc  模型 - 视图 - 控制器
var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

// var s = env.render('hello.html', { name: '小明' });
// console.log(s);
var m = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(m);

