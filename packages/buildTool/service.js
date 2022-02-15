// const express = require("express");
// const fs = require("fs");

// const app = express();

// //设置全局的全域问题，这里是把所有的全部允许了
// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", " 3.2.1");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
// const ws = require("nodejs-websocket");
// const port = 1996;

// // 文件检测
// const fileExists = (path) => {
//   return fs.existsSync(path);
// };

// // 生成文件
// const generateFile = (type, name, path, content, isCover) => {
//   if (!isCover && fileExists(path)) {
//     return {
//       code: 200,
//       desc: `${path}文件已存在`,
//     };
//   }
//   return new Promise((resolve, reject) => {
//     fs.writeFile(path, content, "utf8", (err) => {
//       if (err) {
//         reject({ code: 500, err });
//       } else {
//         resolve({ code: 200, desc: "文件已生成" });
//       }
//     });
//   });
// };

// ws.createServer(function (conn) {
//   // 向客户端推送消息
//   conn.on("text", function (data) {
//     const json = JSON.parse(data);
//     const { eventId, type, name, path, content, isCover = false } = json;
//     let res;
//     switch (eventId) {
//       case -1: // 检测文件是否已存在
//         conn.sendText(
//           JSON.stringify({
//             code: 200,
//             data: fileExists(path),
//             eventId: -1,
//           })
//         );
//         break;
//       default:
//         // 执行文件生成脚本
//         res = generateFile(type, name, path, content, isCover);
//         conn.sendText(JSON.stringify(res));
//         break;
//     }
//   });

//   // 监听关闭连接操作
//   conn.on("close", function (code, reason) {
//     console.log("关闭连接", `${code}${reason}`);
//   });

//   // 错误处理
//   conn.on("error", function (err) {
//     console.log("监听到错误");
//     console.log(err);
//   });
// }).listen(port, function () {
//   console.log("服务已启动，访问地址：http://localhost:1996");
// });
