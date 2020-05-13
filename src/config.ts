/* 全局配置信息 */

// const path = require("path");

/* 项目配置 */
const config = {
  //端口
  Port: 5000,
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
