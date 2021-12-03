const express = require("express");
const bodyParser = require("body-parser");
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

app.listen(3001, function () {
  console.log("服务已启动，访问地址：http://localhost:3001");
});
