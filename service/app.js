const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 执行shell命令
app.route("/service/exec").post(function (req, res) {
  const params = req.body;
  exec(`cd ../ & ${params.content}`, (err, stdout, stderr) => {
    let code;
    if (!err && !stderr) {
      code = 200;
    } else {
      code = 500;
    }
    res.send({
      code: code,
      data: {
        path: "./doc/file.vue",
        message:
          `err: \n ${err}` +
          "\n" +
          `stdout: \n ${stdout}` +
          "\n" +
          `stderr: \n ${stderr}`,
      },
    });
  });
});
// 第三方请求
app.route("/service/request").post(function (req, res) {
  const body = req.body;
  const api = body.api;
  const content = body.content;
  // const type = params.type;
  // const headers = params.headers;
  request.post({ url: api, form: content }, function (error, response, body) {
    res.send(body);
  });
});
// 自动i18n
app.route("/service/i18n").get(function (req, res) {
  fs.readFile(
    path.join(__dirname, "../src/views/About.vue"),
    "utf-8",
    function (error, data) {
      //  用error来判断文件是否读取成功
      if (error) res.send(error);

      const i18n = ["开始", "我们开始了"];
      let fileText;
      i18n.forEach((text) => {
        const regExp = new RegExp(text, "g");
        fileText = data.replace(regExp, `this.$t('${text}')`);
      });

      fs.writeFile(
        path.join(__dirname, "../src/views/About1.vue"),
        fileText,
        (err) => {
          err && res.send(err);
          !err && res.send("success");
        }
      );
    }
  );
});
// 自动i18n
app.route("/service/i18n").get(function (req, res) {
  fs.readFile(
    path.join(__dirname, "../src/views/About.vue"),
    "utf-8",
    function (error, data) {
      //  用error来判断文件是否读取成功
      if (error) res.send(error);

      const i18n = ["开始", "我们开始了"];
      let fileText;
      i18n.forEach((text) => {
        const regExp = new RegExp(text, "g");
        fileText = data.replace(regExp, `this.$t('${text}')`);
      });

      fs.writeFile(
        path.join(__dirname, "../src/views/About1.vue"),
        fileText,
        (err) => {
          err && res.send(err);
          !err && res.send("success");
        }
      );
    }
  );
});
// 学习库
app.route("/service/loadFile").get(function (req, res) {
  const { name } = req.query;
  fs.readFile(
    path.join(__dirname, `./files/${name}`),
    "utf-8",
    function (error, data) {
      //  用error来判断文件是否读取成功
      if (error) res.send(error);
      res.send({
        code: 200,
        data: data,
      });
    }
  );
});

app.listen(3001, function () {
  console.log("服务已启动，访问地址：http://localhost:3001");
});
