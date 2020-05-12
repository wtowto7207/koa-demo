const Koa = require("koa");
let { Port } = require("./config");
let app = new Koa();

// response
app.use(async(ctx) => {
    ctx.body = "Hi Koa";
});

// 监控服务器启动端口
app.listen(Port, () => {
    console.log(`启动端口${Port}`);
});