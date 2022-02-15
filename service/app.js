const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const md5 = require("md5");

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
// 学习库
app.route("/service/files").get(async (req, res) => {
  const getAll = (dir) => {
    let filesNameArr = [];
    // 用个hash队列保存每个目录的深度
    let mapDeep = {};
    mapDeep[dir] = 0;
    // 先遍历一遍给其建立深度索引
    function getMap(dir, curIndex) {
      let files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
      files.map(function (file) {
        //let subPath = path.resolve(dir, file) //拼接为绝对路径
        let subPath = path.join(dir, file); //拼接为相对路径
        let stats = fs.statSync(subPath); //拿到文件信息对象
        // 必须过滤掉node_modules文件夹
        if (file != "node_modules") {
          mapDeep[file] = curIndex + 1;
          if (stats.isDirectory()) {
            //判断是否为文件夹类型
            return getMap(subPath, mapDeep[file]); //递归读取文件夹
          }
        }
      });
    }
    getMap(dir, mapDeep[dir]);
    function readdirs(dir, folderName) {
      let result = {
        //构造文件夹数据
        path: dir,
        title: path.basename(dir),
        type: "directory",
        deep: mapDeep[folderName],
      };
      let files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
      result.children = files.map(function (file) {
        //let subPath = path.resolve(dir, file) //拼接为绝对路径
        let subPath = path.join(dir, file); //拼接为相对路径
        let stats = fs.statSync(subPath); //拿到文件信息对象
        if (stats.isDirectory()) {
          //判断是否为文件夹类型
          return readdirs(subPath, file, file); //递归读取文件夹
        }
        return {
          //构造文件数据
          path: subPath,
          title: file,
          type: "file",
        };
      });
      return result; //返回数据
    }
    filesNameArr.push(readdirs(dir, dir));
    return filesNameArr;
  };
  const pathName = path.join(__dirname, `./files`);
  const data = getAll(pathName);
  res.send({
    code: 200,
    data,
  });
});
// 百度翻译
app.route("/service/baidu/fanyi").post((req, res) => {
  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate`;
  const {
    q,
    from,
    to,
    appid = "20210819000921184",
    secret = "uRWgs0kaWwCJ5Oj4PUPo",
    salt = Math.random(),
  } = req.body;
  const sign = md5(`${appid}${q}${salt}${secret}`);
  const form = {
    q,
    from,
    to,
    appid,
    salt,
    sign,
  };
  request.post({ url, form }, function (error, response, body) {
    res.send({
      code: 200,
      data: JSON.parse(body),
    });
  });
});

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
