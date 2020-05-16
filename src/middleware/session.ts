import session from "koa-session";

const store = {
    storage: {},
    set (key, session: session.ContextSession) {
        this.storage[key] = session;
    },
    get (key) {
        return this.storage[key];
    },
    destroy (key) {
        delete this.storage[key];
    }
}

const CONFIG = {
    key: "koa:session",
    maxAge: 86400000,
    autoCommit: true, //自动提交标头
    overwrite: true, //是否可以覆盖
    httpOnly: true, //是否只能是http
    signed: true, //是否签名
    rolling: false, //强制在每个响应上设置会话标识符cookie。到期重置为原始的maxAge，重置到期倒数
    renew: false, // 在会话即将到期时更新会话，因此我们始终可以使用户保持登录状态。（默认为false）
    sameSite: null, // 会话cookie sameSite选项
    store // session池
}

export default CONFIG;