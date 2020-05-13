import Koa from "koa";
import Routers from './routers';
import config from "./config";
const app = new Koa();

// 使用路由中间件
app.use(Routers.routes()).use(Routers.allowedMethods());

// app.use(async ctx => {
//     ctx.body = "Hello"
// })

// 监控服务器启动端口
app.listen(config.Port, () => {
    console.log(`启动端口${config.Port}`);
});