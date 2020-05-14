import Koa from "koa";
import Routers from "./routers";
import config from "./config";
import KoaBody from "koa-body";
import error from "./middleware/error";
import KoaStatic from "koa-static";
import rewriteUrl from "./middleware/rewriteUrl";
import Session from "koa-session";
import SessionConfig from "./middleware/session";
import {isLogin} from "./middleware/isLogin";
const app = new Koa();

//异常处理
app.use(error.Error);

//为静态资源请求重写url
app.use(rewriteUrl.RewriteUrl);

//使用koa-static处理静态资源
app.use(KoaStatic(config.staticDir));

//session
app.keys = ["session app keys"];
app.use(Session(SessionConfig, app));

//判断是否登录
app.use(isLogin);

app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user;
  await next();
});

//使用中间件处理post传参和上传图片
app.use(
  KoaBody({
    multipart: true,
  })
);

// 使用路由中间件
app.use(Routers.routes()).use(Routers.allowedMethods());

// 监控服务器启动端口
app.listen(config.Port, () => {
  console.log(`启动端口${config.Port}`);
});
