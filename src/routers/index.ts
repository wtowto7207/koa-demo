import Router from "koa-router";
import usersRouter from "./router/userRouter";
let Routers = new Router();

Routers.use(usersRouter.routes());

module.exports = Routers;