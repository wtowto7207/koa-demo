/* 用户模块数据持久层 */
import { query } from "../db";

export default {
  //连接数据库根据用户名和密码查询用户信息
  Login: async (userName: string, password: string) => {
    const sql = "select * from users where userName = ? and password = ?";
    return await query(sql, [userName, password]);
  },
  //连接数据库根据用户名查询用户信息
  FindUserName: async (userName: string) => {
    const sql = "select * from users where userName = ?";
    return await query(sql, [userName]);
  },
  //连接数据库进行用户信息注册
  Register: async (userName: string, password: string) => {
      const sql = "insert into users value(null,?,?,null)";
      return await query(sql, [userName, password]);
  }
};
