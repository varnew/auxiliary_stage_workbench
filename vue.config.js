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
    },
  },
};
