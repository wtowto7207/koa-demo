import Router from "koa-router";

//导入控制层
import usersController from '../../controllers/usersController';

let usersRouter = new Router();

usersRouter.post("/user/login", usersController);

module.exports = usersRouter;