/* 用户模块数据持久层 */
import { query } from "../db";

export default {
  //连接数据库根据用户名和密码查询用户信息
  Login: async (userName: string, password: string) => {
    const sql = "select * from users where userName = ? and password = ?";
    return await query(sql, [userName, password]);
  },
};
