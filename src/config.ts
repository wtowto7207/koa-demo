/* 全局配置信息 */
import path from 'path';
// const path = require("path");

/* 项目配置 */
const config = {
  //端口
  Port: 5000,
  //配置静态资源路径
  staticDir: path.join(__dirname, "../public"),
  //数据库连接设置
  dbConfig: {
    connection_limit: 10,
    host: 'localhost',
    user: 'root',
    password: 'MACmini_123456',
    database: 'storeDB'
  }
};

export default config;
