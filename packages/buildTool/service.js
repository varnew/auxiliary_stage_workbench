const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 执行shell命令
app.route("/service/exec").post(function (req, res) {
  const params = req.body;
  const cmd = params.content;
  // 先去到项目跟目录
  exec(`cd ../../`);
  exec(cmd, (err, stdout, stderr) => {
    let code;
    if (!err && !stderr) {
      code = 200;
    } else {
      code = 500;
    }
    res.send({
      code: code,
      data: {
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

app.listen(9600, function () {
  console.log("辅助级文件生成系统服务已启动，访问地址：http://localhost:9600");
});
