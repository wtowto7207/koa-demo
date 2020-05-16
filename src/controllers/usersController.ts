import userDao from "../models/dao/usersDao";
import checkUser from '../middleware/checkUserInfo';
import Application from "koa";
const usersController = {
  //登录
  Login: async (ctx: Application.Context) => {
    let { userName, password } = ctx.request.body;
    //校验用户信息是否符合规则
    if (!checkUser.checkUserInfo(ctx, userName, password)) {
        return;
    }
    //连接数据库根据用户名和密码查询用户信息
    let user: any = await userDao.Login(userName, password);
    // 判断是否有该用户存在
    if (user.length === 0) {
      ctx.body = {
        code: 210,
        msg: "用户名或密码错误",
      };
      return;
    }

    //数据库设置用户名唯一
    //结果集长度为1，则代表存在该用户
    if (user.length === 1) {
      const loginUser = {
        user_id: user[0].user_id,
        userName: user[0].userName,
        phone: user[0].userPhoneNumber,
      };
      //保存用户信息到session
      if (ctx.session) {
        ctx.session.user = loginUser;
      }
      ctx.body = {
        code: 200,
        user: loginUser,
        msg: "登录成功",
      };
      return;
    }

    //数据库设置用户名唯一
    //若存在user.length != 1 || user.length != 0
    //返回未知错误
    //正常不会出现
    ctx.body = {
      code: 500,
      msg: "未知错误",
    };
  },
  //查询是否存在某个用户名，用于注册时的前端校验
  FindUserName: async (ctx) => {
    const { userName } = ctx.request.body;

    //校验用户名是否符合规则
    if (!checkUser.checkUserName(ctx, userName)) {
      return;
    }
    // console.log(checkUser.checkUserName(ctx, userName));
    //连接数据库根据用户名查询用户信息
    const user: any = await userDao.FindUserName(userName);

    //结果集长度为0则代表该用户名未被使用，可以注册
    if (user.length === 0) {
      ctx.body = {
        code: 200,
        msg: "用户名不存在，可以注册",
      };
      return;
    }

    //结果集长度为1，则代表该用户名已被注册
    if (user.length === 1) {
      ctx.body = {
        code: 201,
        msg: "用户名已存在，不可注册",
      };
      return;
    }

    //若存在user.length != 1 || user.length!=0
    //返回未知错误
    //正常不会出现
    ctx.body = {
      code: 500,
      msg: "未知错误",
    };
  },
  //注册账户
  Register: async (ctx) => {
    const { userName, password } = ctx.request.body;

    //校验用户信息是否符合规则
    if (!checkUser.checkUserInfo(ctx, userName, password)) {
        return;
    }

    //判断用户信息是否已被占用
    const user: any = await userDao.FindUserName(userName);
    if (user.length !== 0) {
      ctx.body = {
          code: 210,
          msg: "用户名已经存在，不能注册"
      }
      return;
    }

    //用户信息注册
    try {
      //连接数据库插入用户信息
      const registerResult: any = await userDao.Register(userName, password);
      //操作所影响对记录行数为1，则代表注册成功
      if (registerResult.affectedRows === 1) {
        ctx.body = {
            code: 200,
            msg: "注册成功"
        }
        return;
      }
      //否则注册失败
      ctx.body = {
          code: 500,
          msg: "未知错误，注册失败"
      }
    } catch (e) {
      console.log(e);
    }

  }
};

export default usersController;
