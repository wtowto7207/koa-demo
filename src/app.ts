import Koa from "koa";

import config from "./config";
const app = new Koa();

//logger 打印方法
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} ${rt}`);
})

//x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log(`${ms}ms`);
})

// response
app.use(async ctx => {
    ctx.body = "Hello Koa!";
    console.log("body");
});

// 监控服务器启动端口
app.listen(config.Port, () => {
    console.log(`启动端口${config.Port}`);
});