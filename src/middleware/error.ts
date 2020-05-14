//全局错误处理中间件
export default {
  Error: async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 500,
        msg: "服务器未知错误",
      };
    }
  },
};
