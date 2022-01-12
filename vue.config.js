let path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const productionGzipExtensions = ["js", "css"];
const isProd = process.env.NODE_ENV === "production";

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios",
    nprogress: "NProgress",
    clipboard: "ClipboardJS",
    "@antv/data-set": "DataSet",
    "js-cookie": "Cookies",
  },
  css: [],
  js: [
    "//cdn.bootcdn.net/ajax/libs/vue@2.6.14/dist/vue.min.js",
    "//cdn.bootcdn.net/ajax/libs/vue-router@3.5.3/dist/vue-router.min.js",
    "//cdn.bootcdn.net/ajax/libs/vuex@3.6.2/dist/vuex.min.js",
    "//cdn.bootcdn.net/ajax/libs/axios@0.24.0/dist/axios.min.js",
    "//cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js",
    "//cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.8/clipboard.min.js",
    "//r5kuoefaw.hn-bkt.clouddn.com/npm/%40antv/data-set%400.11.4/build/data-set.min.jsdata-set.min.js",
    "//cdn.bootcdn.net/ajax/libs/js-cookie/latest/js.cookie.min.js",
  ],
};

module.exports = {
  devServer: {
    proxy: {
      "/fontconvert": {
        target: "https://api.jisuapi.com",
        changeOrigin: true,
        //   pathRewrite: {
        //     '^/api': ''
        //   }
      },
      "/fanyi/": {
        target: "https://v2.alapi.cn",
        changeOrigin: true,
        //   pathRewrite: {
        //     '^/api': ''
        //   }
      },
      "/tcc-interlib-service": {
        target: "http://120.77.244.40:38081",
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
      "/service": {
        target: "http://localhost:3001",
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    },
  },
  configureWebpack: (config) => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.performance = {
      hints: false,
    };
    config.plugins.push(
      new HtmlWebpackPlugin({
        favicon: "./public/favicon.ico",
        filename: "./public/index.html",
      })
    );
    // Ignore all locale files of moment.js
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
      config.plugins.push(
        new CopyPlugin([
          {
            from: "service",
            to: "./service",
          },
        ])
      );
    }
    // if prod, add externals
    if (isProd) {
      config.externals = assetsCDN.externals;
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("@pgs", path.join(__dirname, "packages"));
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (isProd) {
      config.plugin("optimize-css").tap((args) => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
    // 生产环境下使用CDN
    if (isProd) {
      config.plugin("html").tap((args) => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
};
