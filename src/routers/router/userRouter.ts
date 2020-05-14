import Router from "koa-router";

//导入控制层
import usersController from '../../controllers/usersController';

let usersRouter = new Router();

usersRouter.post("/user/login", usersController.Login);
usersRouter.post("/user/findUserName", usersController.FindUserName);
usersRouter.post("/user/register", usersController.Register);

export default usersRouter;