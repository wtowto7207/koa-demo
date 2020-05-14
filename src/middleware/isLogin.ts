export async function isLogin(ctx, next) {
  if (ctx.url.startsWith("/login/")) {
    if (!ctx.session.user) {
      ctx.body = {
        code: 401,
        msg: "用户未登录，请登录后再操作",
      };
      return;
    }
  }
  await next();
}
