//为静态资源请求重写url
export default {
  RewriteUrl: async (ctx, next) => {
    if (ctx.url.startsWith("/public")) {
      ctx.url = ctx.url.replace("/public", "");
    }
    await next();
  },
};
