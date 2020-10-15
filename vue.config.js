// Axios跨域代理配置
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 使用"/api"来代替"http://f.apiplus.c"
        // target: 'http://127.0.0.1:8080', // 源地址
        target: "http://192.168.0.101:8080", // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          "^/api": "", // 路径重写
        },
      },
    },
  },
};
