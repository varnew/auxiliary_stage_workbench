const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const qs = require("querystring");
const { exec } = require("child_process");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(3001, function () {
  console.log("服务已启动，访问地址：http://localhost:3001");
});
