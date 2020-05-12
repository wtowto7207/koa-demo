/* 全局配置信息 */

const path = require("path");
module.exports = {
  Port: 5000,
  staticDir: path.resolve("../public"),
  uploadDir: path.join(__dirname, path.resolve("../public/")),
};
