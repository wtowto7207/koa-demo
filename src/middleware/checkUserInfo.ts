/* 校验用户信息是否符合规则 */

function userNameRuleCheck(ctx, userName: string): boolean {
  const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
  if (!userNameRule.test(userName)) {
    ctx.body = {
      code: 212,
      msg: "用户名不符合规则(以字母开头，允许5-16位，允许字母数字下划线)",
    };
    return false;
  }
  return true;
}

function passwordRuleCheck(ctx, password: string): boolean {
  const passwordRule = /^[a-zA-Z]\w{5,17}$/;
  if (!passwordRule.test(password)) {
    ctx.body = {
      code: 212,
      msg: "密码不合法(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)",
    };
    return false;
  }
  return true;
}
/**
 * @param  {} ctx
 * @param  {} userName=""
 * @param  {string} password?
 * @returns returnfalse
 */
function userNameOrPassIsEmpty(ctx, userName = "", password?: string): boolean {
  if (password) {
    if (userName.length === 0 || password.length === 0) {
      ctx.body = {
        code: 210,
        msg: "用户名或密码不能为空",
      };
      return false;
    }
  } else {
    if (userName.length === 0) {
      ctx.body = {
        code: 210,
        msg: "用户名不能为空",
      };
      return false;
    }
  }
  return true;
}

export default {
  /* 校验用户名是否符合规则 */
  checkUserName: (ctx, userName = ""): boolean => {
    // // 判断是否为空
    // userNameOrPassIsEmpty(ctx, userName);

    // //用户名规则
    // userNameRuleCheck(ctx, userName);

    if (
      userNameOrPassIsEmpty(ctx, userName) &&
      userNameRuleCheck(ctx, userName)
    ) {
      return true;
    } else {
      return false;
    }
  },
  /* 校验用户名和密码 */
  checkUserInfo: (ctx, userName = "", password = ""): boolean => {
    // //判断用户名或者密码是否为空
    // userNameOrPassIsEmpty(ctx, userName, password);
    // //校验用户名是否合规
    // userNameRuleCheck(ctx, userName);
    // //校验密码是否合规
    // passwordRuleCheck(ctx, password);
    if (
      userNameOrPassIsEmpty(ctx, userName, password) &&
      userNameRuleCheck(ctx, userName) &&
      passwordRuleCheck(ctx, password)
    ) {
      return true;
    } else {
      return false;
    }
  },
};
