import userDao from "../models/dao/usersDao";
const usersController = {
  Login: async (ctx) => {
    console.log(ctx.request.body);
    let { userName, password } = ctx.request.body;
    //校验用户信息是否符合规则
    // if (!checkUserInfo(ctx, userName, password)) {
    //     return;
    // }
    //连接数据库根据用户名和密码查询用户信息
    let user: any = await userDao.Login(userName, password);
    // 判断是否有该用户存在
    if (user.length === 0) {
      ctx.body = {
        code: "004",
        msg: "用户名或密码错误",
      };
      return;
    }

    //数据库设置用户名唯一
    //结果集长度为1，则代表存在该用户
    if (user.length === 1) {
      console.log(user[0].user_id);
      const loginUser = {
        user_id: user[0].user_id,
        userName: user[0].userName,
        phone: user[0].userPhoneNumber,
      };
      //保存用户信息到session
      //   ctx.session.user = loginUser;
      ctx.body = {
        code: "001",
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
      code: "500",
      msg: "未知错误",
    };
  },
};

export default usersController;
