const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "./public/favicon.ico",
        filename: "./public/index.html",
      }),
    ],
  },
  publicPath: ".",
  devServer: {
    proxy: {
      "/fontconvert": {
        target: "https://api.jisuapi.com",
        changeOrigin: true,
        //   pathRewrite: {
        //     '^/api': ''
        //   }
      },
      "/fanyi": {
        target: "https://v2.alapi.cn/api",
        changeOrigin: true,
        //   pathRewrite: {
        //     '^/api': ''
        //   }
      },
    },
  },
};
